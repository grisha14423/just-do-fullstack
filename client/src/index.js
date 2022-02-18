import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "./store/createStore";
import history from "./utils/history";

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
