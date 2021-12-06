import { useState } from "react";
import Botones from "./Botones";
import ImagenBase from "./ImagenBase";
import Respuesta from "./Respuesta";
import TomarFoto from "./TomarFoto";

function Main() {
  let [respuesta, setRespuesta] = useState({});
  let [dataURI, setDataURI] = useState("");
  let [tomarFoto, setTomarFoto] = useState(true);
  let [nombre, setNombre] = useState("");

  return (
    <div>
      <div className="row">
        <div className="col-3" id="logo">
          <div className="row">
            <div className="col-12">
              <img
                src="assets/logo.png"
                alt="Logo principal"
                id="logo-imagen"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Botones
                dataURI={dataURI}
                setDataURI={setDataURI}
                setTomarFoto={setTomarFoto}
                setRespuesta={setRespuesta}
                setNombre={setNombre}
              />
            </div>
          </div>
        </div>
        <div className="col-7">
          <p id="bienvenidos">
            ¡Bienvenidos a <i>Emotions Detection</i>!
          </p>
          <p id="descripcion">
            Puedes seleccionar la imagen sobre la que deseas aplicar la
            detección de personas y el estimado de emociones o tomarte una foto
            para ello. Los tres valores numéricos que serán dados corresponden
            a:
          </p>
          <ul id="descripcion">
            <li>
              <b>Valencia</b>: Esta dimensión mide qué tan positiva o agradable
              es una emoción.
            </li>
            <li>
              <b>Dominancia</b>: Esta dimensión mide el nivel de agitación de la
              persona. Varía desde no activo/en calma hasta agitado/listo para
              actuar.
            </li>
            <li>
              <b>Excitación</b>: Esta dimensión mide el nivel de control de la
              situación por parte de la persona. Va desde sumiso/sin control
              hasta dominante/en control.
            </li>
          </ul>
          <p id="descripcion">
            Las tres variables toman un valor numérico entre 1 y 10.
          </p>
        </div>
      </div>
      <div className="row" id="imagenes">
        <div className="col-1"></div>
        {!tomarFoto && <ImagenBase dataURI={dataURI} />}
        {tomarFoto && (
          <TomarFoto setDataURI={setDataURI} setTomarFoto={setTomarFoto} />
        )}
        <div className="col-1"></div>
        {Object.keys(respuesta).length !== 0 && (
          <Respuesta respuesta={respuesta} dataURI={dataURI} nombre={nombre} />
        )}
      </div>
    </div>
  );
}

export default Main;
