function ImagenBase(props) {
  return (
    <div className="col-3">
      <img src={props.dataURI} alt="Foto seleccionada" id="foto-seleccionada" />
    </div>
  );
}

export default ImagenBase;
