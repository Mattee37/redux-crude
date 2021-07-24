import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/Header";
import Products from "./components/Products";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container mt-5">
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/productos/nuevo" component={NewProduct} />
            <Route exact path="/productos/editar/:id" component={EditProduct} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
