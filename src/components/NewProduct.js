import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { crearNuevoProductoAction } from "../actions/productoActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

const NewProduct = ({ history }) => {
  //[estado, actualziador]
  const [nombre, setNombre] = useState("");
  //[estado, actualziador]
  const [precio, setPrecio] = useState(0);

  //asigna el dispatch
  const dispatch = useDispatch();

  //asigna el estado a la variable
  const cargando = useSelector(state => state.productos.loading);
  //asigna el estado a la variable
  const error = useSelector(state => state.productos.error);
  //asigna el estado a la variable
  const alerta = useSelector(state => state.alerta.alerta);

  //despacha sobre crearNuevoProductoAction
  const agregaProducto = producto =>
    dispatch(crearNuevoProductoAction(producto));

  //previene el comportmaiento default del formulario, valida, despacha, envia y redirecciona
  const submitNuevoProducto = e => {
    //previene
    e.preventDefault();

    //valida
    if (nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3"
      };
      //despacha
      dispatch(mostrarAlerta(alerta));
      return;
    }
    //despacha
    dispatch(ocultarAlertaAction());
    //envia
    agregaProducto({
      nombre,
      precio
    });
    //redirecciona
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar producto nuevo
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  name="nombre"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio"
                  name="precio"
                  value={precio}
                  onChange={e => setPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
