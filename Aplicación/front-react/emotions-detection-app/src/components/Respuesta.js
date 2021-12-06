import Boundingbox from "react-bounding-box";
function Respuesta(props) {
  function decimalAdjust(type, value, exp) {
    if (typeof exp === "undefined" || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
      return NaN;
    }
    value = value.toString().split("e");
    value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
    value = value.toString().split("e");
    return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
  }
  function round10(value, exp) {
    return decimalAdjust("round", value, exp);
  }

  function darBboxes() {
    let img = new Image();
    img.src = props.dataURI;
    let factorX = img.width / 200;
    let factorY = img.height / 200;
    let x = factorX * props.respuesta.bbox[1];
    let y = factorY * props.respuesta.bbox[0];
    let ancho = factorX * (props.respuesta.bbox[3] - props.respuesta.bbox[1]);
    let alto = factorY * (props.respuesta.bbox[2] - props.respuesta.bbox[0]);

    let bboxes = [[x, y, ancho, alto]];
    if (props.nombre !== "") {
      x = factorX * parseInt(props.nombre.split("_")[5]);
      y = factorY * parseInt(props.nombre.split("_")[4]);
      ancho =
        factorX *
        (parseInt(props.nombre.split("_")[7].split(".")[0]) -
          parseInt(props.nombre.split("_")[5]));
      alto =
        factorY *
        (parseInt(props.nombre.split("_")[6]) -
          parseInt(props.nombre.split("_")[4]));
      bboxes.push([x, y, ancho, alto]);
    }
    return bboxes;
  }

  return (
    <div className="col-6">
      <div className="row">
        <div className="col-6">
          <Boundingbox
            image={props.dataURI}
            boxes={darBboxes()}
            options={{
              colors: {
                normal: "rgba(255,225,255,1)",
                selected: "rgba(0,225,204,1)",
                unselected: "rgba(100,100,100,1)",
              },
              style: { width: "400px", height: "400px" },
            }}
          />
        </div>
        <div className="col-1"></div>
        <div className="col-5">
          <div className="row prediccion">
            <h3>Valencia predicha: {round10(props.respuesta.emo[0], 0)}</h3>
            <h3>Excitación predicha: {round10(props.respuesta.emo[1], 0)}</h3>
            <h3>Dominancia predicha: {round10(props.respuesta.emo[2], 0)}</h3>
          </div>
          {props.nombre !== "" && (
            <div className="row prediccion">
              <h3>Valencia real: {props.nombre.split("_")[1]}</h3>
              <h3>Excitación real: {props.nombre.split("_")[2]}</h3>
              <h3>Dominancia real: {props.nombre.split("_")[3]}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Respuesta;
