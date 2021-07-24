import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_ERROR,
  DESCARGA_PRODUCTOS_EXITO,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODCUTO_ELIMINADO_ERROR,
  PRODUCTO_ELIMINADO_EXITO,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITADO_ERROR,
  PRODUCTO_EDITADO_EXITO
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//despacha la creacion de un nuevo producto hacia la DB y muestra una alerta
export function crearNuevoProductoAction(producto) {
  return async dispatch => {
    //despacha
    dispatch(agregarProducto());

    try {
      //envia hacia la DB
      await clienteAxios.post("/productos", producto);
      //despacha en caso de exito
      dispatch(agregarProductoExito(producto));
      //muestra la alerta
      Swal.fire("Correcto", "El producto se agrego correctamente", "success");
    } catch (error) {
      console.error(error);
      //despacha en caso de error
      dispatch(agregarProductoError(true));
      //muestra por alerta
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Intentelo de nuevo"
      });
    }
  };
}

//envia el type y su payload
const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true
});

//envia el type y su payload
const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

//envia el type y su payload
const agregarProductoError = estado => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
});

//obtiene la lista de productos
export function obtenerProductosAction() {
  return async dispatch => {
    //despacha
    dispatch(descargarProductos());

    try {
      //los obtiene desde la DB
      const respuesta = await clienteAxios.get("/productos");
      //despacha en caso de exito
      dispatch(descargarProductosExitosa(respuesta.data));
    } catch (error) {
      console.error(error);
      //despacha en caso de error
      dispatch(descargarProductosError());
    }
  };
}

//envia el type y su payload
const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
});

//envia el type y su payload
const descargarProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
});

//envia el type y su payload
const descargarProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true
});

//borra un producto
export function borrarProductoAction(id) {
  return async dispatch => {
    //despacha el producto a eliminar
    dispatch(obtenerProductoEliminar(id));

    try {
      //lo borra desde la DB
      await clienteAxios.delete(`/productos/${id}`);
      //despacha en caso de exito
      dispatch(eliminarProductoExito());
      //muestra por alerta
      Swal.fire(
        "Elimiando!",
        "El producto se elimino correctamente.",
        "success"
      );
    } catch (error) {
      //despacha en caso de error
      dispatch(eliminarProductoError());
    }
  };
}

//envia el type y su payload
const obtenerProductoEliminar = id => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
});

//envia el type
const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO
});

//envia el type y su payload
const eliminarProductoError = () => ({
  type: PRODCUTO_ELIMINADO_ERROR,
  payload: true
});

//obtiene el producto a editar
export function obtenerProductoEditar(producto) {
  return dispatch => {
    //despacha
    dispatch(obtenerProductoEditarAction(producto));
  };
}

//envia el type y su payload
const obtenerProductoEditarAction = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
});

//actualiza el producto
export function editarProductoAction(producto) {
  return async dispatch => {
    try {
      //actualzia en la DB
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      //despacha en caso de exito
      dispatch(editarProductoExito(producto));
    } catch (error) {
      //dispacha en caso de error
      dispatch(editarProductoError());
    }
  };
}

//envia el type y su payload
const editarProductoExito = producto => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
});

//envia el type
const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR
});
