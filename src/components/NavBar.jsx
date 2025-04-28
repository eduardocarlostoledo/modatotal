import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { FaShoppingBag, FaHome, FaOpencart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  deleteUserLocalStorage,
  userActive,
} from "../redux/slices/userSlice.js";
import { getCart } from "../redux/slices/cartSlice.js";
import logo from "../img/logoinvertido.png";
import logowhatsapp from "../images/logowhatsapp.png";

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const carts = useSelector((state) => state.cart.items) || [];
  const user = useSelector((state) => state.users.userActive);
  const itemQuantity = carts.reduce((acc, item) => acc + item.amount, 0);

  useEffect(() => {
    dispatch(getCart());
    
    // Verificar sesión al cargar
    const storedUser = localStorage.getItem("userActive");
    if (storedUser) {
      dispatch(userActive(JSON.parse(storedUser)));
    }

    // Efecto de scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(deleteUserLocalStorage());
    localStorage.removeItem("userActive");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`navbar-container ${scrolled ? "navbar-scrolled" : ""}`}>
      {/* Logo */}
      <div className="navbar-logo-container">
        <Link to="/" className="navbar-logo-link">
          <img 
            src={logo} 
            alt="Logo" 
            className="navbar-logo"
            width="120"
            height="120"
          />
        </Link>
      </div>

      {/* Menú desktop */}
      <nav className="navbar-desktop">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              <FaHome className="navbar-icon" />
              <span>Inicio</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/Products" className="navbar-link">
              <FaShoppingBag className="navbar-icon" />
              <span>Tienda</span>
            </Link>
          </li>

          {user ? (
            <>
              <li className="navbar-item">
                <Link to="/Cart" className="navbar-link navbar-cart">
                  <FaOpencart className="navbar-icon" />
                  <span>Carrito</span>
                  {itemQuantity > 0 && (
                    <span className="navbar-cart-badge">{itemQuantity}</span>
                  )}
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/Profile" className="navbar-link">
                  <FaUser className="navbar-icon" />
                  <span>Perfil</span>
                </Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-link navbar-logout">
                  <BiLogOutCircle className="navbar-icon" />
                  <span>Cerrar sesión</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/Login" className="navbar-link">
                  <span>Iniciar sesión</span>
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/Register" className="navbar-link navbar-register">
                  <span>Registrarse</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Botón hamburguesa para móvil */}
      <button 
        className="navbar-hamburger" 
        onClick={toggleMenu}
        aria-label="Menú de navegación"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            className="navbar-mobile"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <ul className="navbar-mobile-list">
              <li className="navbar-mobile-item">
                <Link to="/" className="navbar-mobile-link" onClick={toggleMenu}>
                  <FaHome className="navbar-mobile-icon" />
                  <span>Inicio</span>
                </Link>
              </li>
              <li className="navbar-mobile-item">
                <Link to="/Products" className="navbar-mobile-link" onClick={toggleMenu}>
                  <FaShoppingBag className="navbar-mobile-icon" />
                  <span>Tienda</span>
                </Link>
              </li>

              {user ? (
                <>
                  <li className="navbar-mobile-item">
                    <Link to="/Cart" className="navbar-mobile-link" onClick={toggleMenu}>
                      <FaOpencart className="navbar-mobile-icon" />
                      <span>Carrito</span>
                      {itemQuantity > 0 && (
                        <span className="navbar-mobile-cart-badge">{itemQuantity}</span>
                      )}
                    </Link>
                  </li>
                  <li className="navbar-mobile-item">
                    <Link to="/Profile" className="navbar-mobile-link" onClick={toggleMenu}>
                      <FaUser className="navbar-mobile-icon" />
                      <span>Perfil</span>
                    </Link>
                  </li>
                  <li className="navbar-mobile-item">
                    <button onClick={(e) => { handleLogout(e); toggleMenu(); }} className="navbar-mobile-link">
                      <BiLogOutCircle className="navbar-mobile-icon" />
                      <span>Cerrar sesión</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="navbar-mobile-item">
                    <Link to="/Login" className="navbar-mobile-link" onClick={toggleMenu}>
                      <span>Iniciar sesión</span>
                    </Link>
                  </li>
                  <li className="navbar-mobile-item">
                    <Link to="/Register" className="navbar-mobile-link navbar-mobile-register" onClick={toggleMenu}>
                      <span>Registrarse</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Botón de WhatsApp */}
      <a
        className="navbar-whatsapp"
        href="https://wa.me/5493764331313"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <img
          src={logowhatsapp}
          alt="WhatsApp"
          width="40"
          height="40"
        />
      </a>
    </header>
  );
};

export default NavBar;