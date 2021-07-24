import { combineReducers } from "redux";

import productosReducer from "./productosReducer";
import alertaReducer from "./alertaReducer";

//combina ambos reducer, ya que redux trabaja con un solo reducer
export default combineReducers({
  productos: productosReducer,
  alerta: alertaReducer
});
