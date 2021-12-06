import React from "react";
import Camera from "react-html5-camera-photo";

function TomarFoto(props) {
  function handleTakePhoto(dataUri) {
    props.setDataURI(dataUri);
    props.setTomarFoto(false);
  }

  return (
    <div className="col-3">
      <Camera
        imageType="jpg"
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
      />
    </div>
  );
}
export default TomarFoto;
