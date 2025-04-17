import React from "react";
import ReactDOM from "react-dom/client";

// Estilos
import './styles/themes/pinko.css';  // 🌈 Paleta activa
import './styles/global.css';        // 🧱 Variables base
import './styles/App.css';           // 📐 Layout general
import './styles/index.css';         // 🎨 Fuente y reset

// App y configuración
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals.js";
import { Provider } from "react-redux";
import store from './redux/store/store';

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

reportWebVitals();
