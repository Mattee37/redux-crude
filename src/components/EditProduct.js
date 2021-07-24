import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { editarProductoAction } from "../actions/productoActions";

const EditProduct = () => {
  //asigna history
  const history = useHistory();
  //asigna dispatch
  const dispatch = useDispatch();

  //[estado, actualizador]
  const [producto, setProducto] = useState({
    nombre: "",
    precio: ""
  });

  //asigna el estado a la variable
  const productoeditar = useSelector(state => state.productos.productoeditar);
  //desestructura desde producto
  const { nombre, precio } = producto;

  //al cargar el elemento asigna el producto a editar al estado
  useEffect(() => {
    setProducto(productoeditar);
  }, [productoeditar]);

  //asigna los valores a las respectivas instancias del objeto
  const onChangeFormulario = e => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  //previene el comportamiento default, despacha y redirecciona
  const submitEditarProducto = e => {
    //previene
    e.preventDefault();
    //despacha
    dispatch(editarProductoAction(producto));
    //redirecciona
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar producto
            </h2>
            <form onSubmit={submitEditarProducto}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeFormulario}
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
                  onChange={onChangeFormulario}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
