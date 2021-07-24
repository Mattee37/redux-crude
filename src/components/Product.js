import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import {
  borrarProductoAction,
  obtenerProductoEditar
} from "../actions/productoActions";

const Product = ({ producto }) => {
  //desestructura desde producto
  const { nombre, precio, id } = producto;

  //asigna el dispatch
  const dispatch = useDispatch();
  //asigna el history
  const history = useHistory();

  //alerta de SweetAlert2
  const confirmarEliminarProducto = id => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "El producto a eliminar no se podrá recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        //despacha borrarPorductoAction con la respectiva id
        dispatch(borrarProductoAction(id));
      }
    });
  };

  //redirecciona luego de la edicion con history
  const redireccionarEdicion = producto => {
    //despacha sobre obtenerProductosEditar
    dispatch(obtenerProductoEditar(producto));
    //redirecciona con el hook
    history.push(`/productos/editar/${producto.id}`);
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">$ {precio}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redireccionarEdicion(producto)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminarProducto(id)}
        >
          Eliminar &times;
        </button>
      </td>
    </tr>
  );
};

export default Product;
