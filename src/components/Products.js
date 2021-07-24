import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { obtenerProductosAction } from "../actions/productoActions";

import Product from "../components/Product";

const Products = () => {
  //asignamos el dispatch
  const dispatch = useDispatch();

  //al cargar el componente hacemos dispatch sobre obtenerProductos
  useEffect(() => {
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
    // eslint-disable-next-line
  }, []);

  //asigna el estado a la variable
  const productos = useSelector(state => state.productos.productos);
  //asigna el estado a la variable
  const error = useSelector(state => state.productos.error);
  //asigna el estado a la variable
  const cargando = useSelector(state => state.productos.loading);

  return (
    <Fragment>
      <h2 className="text-center my-5">Listado de productos</h2>
      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un error
        </p>
      ) : null}
      {cargando ? <p className="text-center">Cargando...</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0
            ? "No hay Productos"
            : productos.map(producto => (
                <Product key={producto.id} producto={producto} />
              ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Products;
