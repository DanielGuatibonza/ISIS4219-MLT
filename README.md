# ISIS4219-MLT

## Proyecto final

### Acceso al notebook
El notebook utilizado en el desarrollo del proyecto se encuenta en la ruta [Proyecto/Emociones/emotic/](https://github.com/DanielGuatibonza/ISIS4219-MLT/tree/main/Proyecto/Emociones/emotic) bajo el nombre ProyectoFinal_Cárdenas_Cerda_Guatibonza.ipynb. Para su correcta ejecución se requiere tener en esa misma ruta las cuatro carpetas de datos que provee el dataset EMOTIC([EMOTIC Dataset](http://sunai.uoc.edu/emotic/index.html)). Por otro lado, si se desean cargar los modelos seleccionados, se tiene en la misma ubicación el archivo Carga de modelo.ipynb. Este notebook por su parte requiere que en la carpeta se ubiquen los archivos que almacenan los pesos de cada red los cuales se pueden descargar del siguiente
[link a los pesos de las redes](https://uniandes-my.sharepoint.com/:f:/g/personal/dm_guatibonza_uniandes_edu_co/EtiVRWm95bNMheYXBM2p3o4BQiu2U5yt64dyyN-RduRh9g?e=CcAd8g).


### Ejecución de la aplicación
Para la ejecución de la aplicación, se deben tener de forma local todos los archivos de la carpeta [Aplicación](https://github.com/DanielGuatibonza/ISIS4219-MLT/tree/main/Aplicación).

#### Back-end
El back-end fue desarrollado en el framework Flask por lo que en principio se debe tener instalado Python con una versión >=3.7. Adicionalmente, se deben seguir las siguientes intrucciones:
- Descargar los archivos de pesos descritos anteriormente en la sección de acceso al notebook.
- Agregar las variables de entorno que hacen referencia a los archivos de pesos. Esto se puede realizar desde la consola de PowrShell con los siguientes comandos reemplazando la respectiva ruta en la que fueron descargados los archivos

    > setx BBOX_WEIGHTS <ruta>/modelo_bbox_mse_weights
    
    > setx REG_WEIGHTS <ruta>/modelo_reg_mse_weights
    
- Instalar las dependencias del proyecto, esto se puede realizar desde la consola en la ruta [Aplicación/back-flask](https://github.com/DanielGuatibonza/ISIS4219-MLT/tree/main/Aplicación/back-flask) con el comando
    > pip install -r requierements.txt
  
Una vez efectuados estos pasos, solo resta ejecutar la aplicación desde Python con el comando:
    
    > python app.py
  
### Front-end
El front-end fue desarollado en React por lo que inicialmente se debe instalar Node.js para lo cual se puede seguir el siguiente tutorial [Tutorial instalación Node.js](https://phoenixnap.com/kb/install-node-js-npm-on-windows). Después de realizar esto, se debe ejecutar una consola en la [ruta base del proyecto del front-end](https://github.com/DanielGuatibonza/ISIS4219-MLT/tree/main/Aplicación/front-react/emotions-detection-app) y correr el siguiente comando para instalar todas las dependncias:
    
    > npm install
    
De forma seguida, se puede ejecutar la aplicación como tal con la instrucción
    
    > npm start
    
    
Cabe aclarar que la ejecución de ambas aplicaciones se realiza de forma local en un entorno de desarrollo. No obstante, una vez ejecutado el último comando y teniendo en ejecución la aplicación del back-end, se desplegará la aplicación web en el navegador predeterminado y se podrán cargar imágenes o tomar fotos para efectuar la detección de personas y emociones.
