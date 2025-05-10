import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Home.css";
import {
  FaShippingFast,
  FaUserPlus,
  FaCreditCard,
  FaShoppingCart,
  FaUser,
  FaCheckCircle,
  FaPercentage,
  FaLeaf,
  FaShoppingBag,
  FaHandsHelping,
} from "react-icons/fa";
import { ChatBot } from "./ChatBot";
import tarjetas from "../images/tarjetas.png";
import blazer_mujer from "../images/blazer_mujer.jpg";
import casaca from "../images/casaca.jpg";
import jean_mom from "../images/jean-mom.jpeg";
import vestidolargo from "../images/vestido-largo.jpg";
import mujer from "../images/mujer.jpg";
import hombre from "../images/hombre.jpg";
import ninios from "../images/niños.jpg";
import accesorios from "../images/accesorios.jpg";

const featuredProducts = [
  {
    id: 1,
    name: "Blazer Oversize Mujer",
    price: "$34.990",
    discount: "30% OFF",
    freeShipping: true,
    img: blazer_mujer,
  },
  {
    id: 2,
    name: "Camisa Lino Hombre",
    price: "$25.900",
    discount: "20% OFF",
    freeShipping: true,
    img: casaca,
  },
  {
    id: 3,
    name: "Jeans Mom Fit",
    price: "$18.450",
    originalPrice: "$22.000",
    discount: "15% OFF",
    freeShipping: false,
    img: jean_mom,
  },
  {
    id: 4,
    name: "Vestido Satén Largo",
    price: "$42.000",
    discount: "40% OFF",
    freeShipping: true,
    img: vestidolargo,
  },
];

const categories = [
  {
    name: "MUJER",
    discount: "30% OFF",
    installments: "3 CUOTAS SIN INTERÉS",
    img: mujer,
  },
  {
    name: "HOMBRE",
    discount: "25% OFF",
    installments: "AHORA 12",
    img: hombre,
  },
  {
    name: "NIÑOS",
    discount: "20% OFF",
    installments: "",
    img: ninios,
  },
  {
    name: "ACCESORIOS",
    discount: "15% OFF",
    installments: "",
    img: accesorios,
  },
];

export const Home = () => {
  const handleClick = () => {
    window.location.href = "https://wa.me/5493764331313";
  };

  return (
    <div className="home-container">
      {/* Banner principal */}
      <motion.section
        className="hero-banner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      ></motion.section>

      <section className="values-section">
        <h3 className="home-titulocontrapelo">Cómo comprar? </h3>
        <div className="values-grid">         

          {/* Nuevas tarjetas explicando el proceso de compra */}
          <div className="value-card">
            <FaUserPlus className="value-icon" />
            <h4>Registrate e Iniciá Sesión</h4>
            <p>Crea tu cuenta, iniciá sesión y cargá tus datos personales.</p>
          </div>

          <div className="value-card">
            <FaShoppingCart className="value-icon" />
            <h4>Agregá al Carrito</h4>
            <p>Visitá la tienda, elegí tus prendas y agregalas al carrito.</p>
          </div>

          <div className="value-card">
            <FaCreditCard className="value-icon" />
            <h4>Pagá con MercadoPago</h4>
            <p>Confirmá tus datos, realizá el pago y coordiná la entrega.</p>
          </div>
        </div>
      </section>

      <section className="moda-hero-banner">
        <div className="moda-hero-content">
          <h1>Moda para Cada Estilo</h1>
          <p>Descubrí tendencias para mujer, urbana y deportiva</p>
          <Link to="/Products">
            <button className="moda-shop-now-btn">Entrar a Tienda</button>
          </Link>
        </div>
      </section>

      <section className="moda-hero-banner2">
        <div className="moda-hero-content">
          <h1>Moda para Ellas</h1>
          <p>Descubrí tendencias para mujer</p>
          <Link to="/Products">
            <button className="moda-shop-now-btn">Entrar a Tienda</button>
          </Link>
        </div>
      </section>

      {/* Productos Destacados */}

      <section className="featured-products">
        <h2 className="home-titulocontrapelo">Lo más Vendido</h2>
        <p>Los items más comprados por nuestros clientes</p>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="product-card"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={product.img}
                alt={product.name}
                className="product-image"
              />
              <div className="product-discount">{product.discount}</div>
              {product.freeShipping && (
                <div className="free-shipping-tag">ENVÍO GRATIS</div>
              )}
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-pricing">
                  {product.originalPrice && (
                    <span className="original-price">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="current-price">{product.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="categories-section">
        <h2 className="home-titulocontrapelo">ENCONTRÁ TU ESTILO</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="category-card"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={category.img}
                alt={category.name}
                className="category-image"
              />
              <div className="category-discount">
                <FaPercentage />
                <span>{category.discount}</span>
              </div>
              <h3>{category.name}</h3>
              {category.installments && <p>{category.installments}</p>}
            </motion.div>
          ))}
        </div>
      </section>

      <div className="hero-content">
        <h1>Nueva Temporada Invierno ❄️</h1>
        <p>Elegí tu estilo. Envíos gratis a todo el país.</p>
        <motion.button
          className="shop-now-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/Products" className="navbar-link">
            <span>Tienda</span>
          </Link>
        </motion.button>
      </div>

      {/* Garantías / Valores */}
      <section className="values-section">
        <h3 className="home-titulocontrapelo">NUESTROS COMPROMISOS</h3>
        <div className="values-grid">
          <div className="value-card">
            <FaHandsHelping className="value-icon" />
            <h4>Atención Personalizada</h4>
            <p>Te asesoramos en cada paso. Comprá con confianza y seguridad.</p>
          </div>

          <div className="value-card">
            <FaShoppingBag className="value-icon" />
            <h4>Calidad y Estilo</h4>
            <p>Prendas seleccionadas con los más altos estándares de moda.</p>
          </div>

          <div className="value-card">
            <FaLeaf className="value-icon" />
            <h4>Moda Sustentable</h4>
            <p>
              Confeccionamos con materiales conscientes y empaques reciclables.
            </p>
          </div>
          
        </div>
      </section>

      {/* Asistente Virtual */}
      <motion.section
        className="chatbot-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3>¿Necesitás ayuda? </h3>
        <p>Consultá con nuestro Asistente IA</p>
        <p> </p>
        <div className="chatbot-container">
          <ChatBot />
        </div>
      </motion.section>

      {/* Contacto */}
      {/* Contacto */}
      <section className="contact-section">
        <h3 style={{ color: "white" }} className="home-titulocontrapelo">
          ¿Tenés preguntas? Estamos aquí para ayudarte
        </h3>

        <motion.button
          className="contact-button"
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Escribinos por WhatsApp
        </motion.button>
        <h3 className="home-titulocontrapelo">
          {" "}
          Aceptamos Todos los Medios de Pago
        </h3>
        <img
          src={tarjetas}
          alt="tarjetas de crédito"
          className="credit-cards-image"
        />
      </section>
    </div>
  );
};
