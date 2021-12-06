import os
import json
import base64
import numpy as np
import cv2

from tensorflow import keras
from keras import Model
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Conv2DTranspose, GlobalAveragePooling2D
from keras.layers import Activation, Dropout, Flatten, Dense, Input
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.applications import VGG16, InceptionV3
import tensorflow as tf
from flask import Flask
from flask import jsonify, request
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    return app

SIZE = (200, 200)

app = create_app()

vgg = VGG16(weights="imagenet", include_top=False, input_tensor=Input(shape=(*SIZE, 3)))
vgg.trainable = False
flatten_bbox = Flatten()(vgg.output)
dense_1_bbox = Dense(128, activation = 'relu')(flatten_bbox)
dense_2_bbox = Dense(32, activation = 'relu')(dense_1_bbox)
output_bbox = Dense(4, activation = lambda x: 200*tf.keras.activations.sigmoid(x))(dense_2_bbox)
model_bbox_base = Model(inputs = vgg.inputs, outputs = output_bbox)
model_bbox_base.compile(optimizer = keras.optimizers.Adam(learning_rate=0.0001), loss = 'mse')
model_bbox_base.load_weights(os.environ.get('BBOX_WEIGHTS'))

inception = keras.applications.InceptionV3(include_top=False, weights="imagenet", input_shape=(*SIZE, 3),)
inception.trainable = False
flatten_emo = Flatten()(inception.output)
dense_1_emo = Dense(128, activation = 'relu')(flatten_emo)
dense_2_emo = Dense(32, activation = 'relu')(dense_1_emo)
output_emo = Dense(3, activation = lambda x: 10*tf.keras.activations.sigmoid(x))(dense_2_emo)
model_reg_base = Model(inputs = inception.inputs, outputs = output_emo)
model_reg_base.compile(optimizer = keras.optimizers.Adam(learning_rate=0.0001), loss = 'mse')
model_reg_base.load_weights(os.environ.get('REG_WEIGHTS'))

@app.route('/api/predict', methods=['POST'])
def predict():
    json_req = request.json
    if json_req is None:
        json_req = json.loads(request.data.decode("utf-8"))    
    if json_req.get('imageUri') is None:
        return jsonify({'message': 'Bad request'}), 400
    
    print(json_req.get('imageUri').split(",")[0])
    image_b64 = json_req.get('imageUri').split(",")[1]
    binary = base64.b64decode(image_b64)
    image = np.asarray(bytearray(binary), dtype="uint8")
    imageBGR = cv2.imdecode(image, cv2.IMREAD_COLOR)
    imageRGB = cv2.cvtColor(imageBGR , cv2.COLOR_BGR2RGB)
    final_image = cv2.resize(imageRGB, SIZE).astype(np.float32)
    final_image = final_image / 255.

    bbox = model_bbox_base.predict(np.array([final_image]))[0].tolist()
    emo = model_reg_base.predict(np.array([final_image]))[0].tolist()
    response = {'bbox': bbox, 'emo': emo}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
