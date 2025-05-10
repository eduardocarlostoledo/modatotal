import "./styles/themes/pinko.css"; // 🎨 Paleta activa
import "./styles/global.css"; // 🧱 Variables base y estilos
import "./styles/App.css"; // 🧩 Layout general
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./components/Home.jsx";
import { Products } from "./components/Products.jsx";
import { Detail } from "./components/Detail.jsx";
import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";
import { Register } from "./components/Register.jsx";
import Profile from "./components/Profile.jsx";
import { Login } from "./components/Login.jsx";
import { CreateProducts } from "./components/CreateProduct.jsx";
import { getFiltersForEmail, userActive } from "./redux/slices/userSlice.js";
import { useEffect, useState } from "react";
import Cart from "./components/Cart.jsx";
import { AdminProducts } from "./components/AdminProducts.jsx";
import { AdminUsers } from "./components/AdminUsers.jsx";
import { AdminOrder } from "./components/AdminOrder.jsx";
import About from "./components/About.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import ChangePass from "./components/Changepass.jsx";
import axiosClient from "../src/herramientas/clienteAxios.js";
import { verifyUser } from "./herramientas/verificaUsuario.js";
import { useDispatch, useSelector } from "react-redux";
import { PoliticaPrivacidad } from "./components/PoliticaPrivacidad.jsx";
import  CondicionesServicio  from "./components/CondicionesServicio.jsx";
import SuccessPage from "./components/SuccessPage.jsx";
import { Orders } from "./components/Orders.jsx";
import { checkAuth } from "./redux/slices/userSlice";
import { ChatBot } from "./components/ChatBot.jsx";
import { TermsAndConditions } from "./components/terminosycondiciones.jsx";
import { ContactUs } from "./components/contacto.jsx";
import { FAQ } from "./components/Faq.jsx";
import { CambiosDevoluciones } from "./components/CambiosDevoluciones.jsx";
import { PagosPromociones } from "./components/PagosPromociones.jsx";
import { PoliticaEnvios } from "./components/PoliticaEnvios.jsx";
import { SeguridadPaquetes } from "./components/SeguridadPaquetes.jsx";
import { ScrollToTop } from "./components/ScrollToTop.jsx";
import { HistoriaTienda } from "./components/HistoriaTienda.jsx";

// console.log(import.meta.env.VITE_APP_BACK)
// console.log(import.meta.env.VITE_APP_YOUR_CLIENT_ID_LOGIN)

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const usuarioConectado = useSelector((state) => state.users.userActive);
  //console.log (usuarioConectado.status)
  //const usuarioConectado = JSON.parse(localStorage.getItem("USUARIO")) || {}

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getFiltersForEmail());
  // }, [dispatch]);

  return (
    <div className="App">
      <ScrollToTop /> {/* 👈 Este es el truco */}
      {location.pathname === "/admin/Orders" ||
      location.pathname === "/admin/CreateProduct" ||
      location.pathname === "/admin/settings" ||
      location.pathname === "/admin/users" ||
      location.pathname === "/admin/Products" ||
      location.pathname.startsWith("/detail/") ? null : (
        <NavBar />
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/Products" element={<Products />} />

        <Route path="/about" element={<About />} />

        <Route path="/detail/:Name" element={<Detail />} />

        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/condiciones-servicio" element={<CondicionesServicio />} />
        <Route
          path="/terminos-y-condiciones"
          element={<TermsAndConditions />}
        />
        <Route path="/contacto" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/mis-ordenes" element={<Orders />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/CambiosDevoluciones" element={<CambiosDevoluciones />} />
        <Route path="/PagosPromociones" element={<PagosPromociones />} />
        <Route path="/PoliticaEnvios" element={<PoliticaEnvios />} />
        <Route path="/SeguridadPaquetes" element={<SeguridadPaquetes />} />
        <Route path="/historia" element={<HistoriaTienda />} />

        <Route
          element={
            <ProtectedRoute
              redirecTo={"/Profile"}
              isAllowed={!usuarioConectado?.status}
            />
          }
        >
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/changePass" element={<ChangePass />} />
        </Route>

        <Route path="/about" element={<About />} />

        <Route
          path="/Profile"
          element={
            <ProtectedRoute
              isAllowed={usuarioConectado?.status}
              redirecTo={"/Login"}
            >
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/Cart" element={<Cart />} />

        <Route
          element={
            <ProtectedRoute
              redirecTo={"/Profile"}
              isAllowed={usuarioConectado?.admin}
            />
          }
        >
          <Route path="admin/Products" element={<AdminProducts />} />
          <Route path="admin/CreateProduct" element={<CreateProducts />} />
          <Route path="/admin/Orders" element={<AdminOrder />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
      </Routes>
      {location.pathname === "/admin/Orders" ||
      location.pathname === "/admin/CreateProduct" ||
      location.pathname === "/admin/settings" ||
      location.pathname === "/admin/users" ||
      location.pathname === "/admin/Products" ? null : (
        <Footer />
      )}
    </div>
  );
}

export default App;
