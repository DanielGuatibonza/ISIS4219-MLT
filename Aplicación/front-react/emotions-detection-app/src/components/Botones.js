function Botones(props) {
  function getBase64(file, setDataUri) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setDataUri(reader.result);
    };
  }

  function tomarFoto() {
    props.setTomarFoto(true);
    props.setNombre("");
    props.setRespuesta({});
  }

  function seleccionarArchivo(archivos) {
    props.setRespuesta({});
    props.setTomarFoto(false);
    props.setNombre(archivos[0].name);
    getBase64(archivos[0], props.setDataURI);
  }

  function detectar() {
    if (props.dataURI !== "") {
      fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUri: props.dataURI }),
      }).then((res) => {
        res.json().then((json) => {
          props.setRespuesta(json);
        });
      });
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-7">
          <button
            type="button"
            className="btn"
            id="detectar-foto"
            onClick={tomarFoto}
          >
            Tomar foto
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-7">
          <label id="seleccionar-foto" className="btn">
            <input
              type="file"
              onChange={(e) => seleccionarArchivo(e.target.files)}
            />
            Seleccionar foto
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-7">
          <button
            type="button"
            className="btn"
            id="detectar-foto"
            onClick={detectar}
          >
            Detectar persona y emociones
          </button>
        </div>
      </div>
    </div>
  );
}

export default Botones;
