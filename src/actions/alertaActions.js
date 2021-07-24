import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";

//despacha mostrar la alerta hacia el reducer por medio de la funcion
export function mostrarAlerta(alerta) {
  return dispatch => {
    dispatch(crearAlerta(alerta));
  };
}

//envia el type y su payload
const crearAlerta = alerta => ({
  type: MOSTRAR_ALERTA,
  payload: alerta
});

//despacha ocultar la alerta hacia el reducer por medio de la funcion
export function ocultarAlertaAction() {
  return dispatch => {
    dispatch(ocultarAlerta());
  };
}

//envia el type
const ocultarAlerta = () => ({
  type: OCULTAR_ALERTA
});
