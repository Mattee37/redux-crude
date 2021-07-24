import axios from "axios";

//crea un cliente de axios, para mayor comodidad
const clienteAxios = axios.create({
  baseURL: "http://localhost:4000/"
});

export default clienteAxios;
