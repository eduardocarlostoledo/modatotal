// main.jsx (punto de entrada principal)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store/store';
import './styles/themes/pinko.css';  // 💡 Primero: define las variables
import './styles/global.css';        // ✅ Luego: estilos base que usan esas variables
import './styles/App.css';           // ✅ Y después layout, componentes, etc.


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);