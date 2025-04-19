import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Home.css";
import { FaShippingFast, FaPercentage, FaLeaf, FaShoppingBag, FaHandsHelping } from "react-icons/fa";
import { ChatBot } from "./ChatBot";
import tarjetas from "../images/tarjetas.png";
const featuredProducts = [
  { id: 1, name: "Blazer Oversize Mujer", price: "$34.990", discount: "30% OFF", freeShipping: true , img: "https://img.ltwebstatic.com/images3_pi/2024/11/06/fe/17308868500565200bd2563b671f3170415d51efb6_thumbnail_405x.jpg"},
  { id: 2, name: "Camisa Lino Hombre", price: "$25.900", discount: "20% OFF", freeShipping: true, img:"https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dwae3515ab/CH4901_166_20.jpg?imwidth=615&impolicy=pctp" },
  { id: 3, name: "Jeans Mom Fit", price: "$18.450", originalPrice: "$22.000", discount: "15% OFF", freeShipping: false, img:"https://img.ltwebstatic.com/images3_spmp/2025/02/22/84/17402072690545affca15188a438e23e8a406a1fe2_wk_1740551060_thumbnail_560x.webp" },
  { id: 4, name: "Vestido Satén Largo", price: "$42.000", discount: "40% OFF", freeShipping: true, img:"https://www.allomartinez.com/media/catalog/product/cache/7fca96df29d0806c8ecefe7d9fd8a78d/v/e/vestido_durex_1239.jpg" },
];

const categories = [
  { name: "MUJER", discount: "30% OFF", installments: "3 CUOTAS SIN INTERÉS", img:"https://static01.nyt.com/images/2017/05/07/arts/07GAL-GADOTweb/07GAL-GADOTweb-articleLarge.jpg?quality=75&auto=webp&disable=upscale" },
  { name: "HOMBRE", discount: "25% OFF", installments: "AHORA 12", img:"https://www.lolitamoda.com/uploads/post/image/61/56.Reglas_de_estilo_que_todo_hombre_debe_conocer.jpg"  },
  { name: "NIÑOS", discount: "20% OFF", installments: "" , img:"https://img.freepik.com/foto-gratis/nino-sonriente-aislado-rosa_23-2148984798.jpg?semt=ais_hybrid&w=740" },
  { name: "ACCESORIOS", discount: "15% OFF", installments: "", img:"https://nupciasmagazine.com/wp-content/uploads/2024/01/Joyeria-y-accesorios-2024-Lo-que-no-te-puede-faltar-scaled.jpg"  },
];

export const Home = () => {
  const handleClick = () => {
    window.location.href = "https://wa.me/5493764331313";
  };

  return (
    <div className="home-container">
      {/* Banner principal */}
      <motion.section className="hero-banner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="hero-content">
          <h1>Nueva Temporada Invierno ❄️</h1>
          <p>Elegí tu estilo. Envíos gratis a todo el país.</p>
          <motion.button className="shop-now-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/Products" className="navbar-link">              
              <span>Tienda</span>
            </Link>
          </motion.button>
        </div>
      </motion.section>

      {/* Productos Destacados */}
<section className="featured-products">
  <h2 className="home-titulocontrapelo">DESTACADOS DE LA SEMANA</h2>
  <div className="products-grid">
    {featuredProducts.map(product => (
      <motion.div key={product.id} className="product-card" whileHover={{ scale: 1.03 }}>
        <img src={product.img} alt={product.name} className="product-image" />
        <div className="product-discount">{product.discount}</div>
        {product.freeShipping && <div className="free-shipping-tag">ENVÍO GRATIS</div>}
        <div className="product-info">
          <h3>{product.name}</h3>
          <div className="product-pricing">
            {product.originalPrice && <span className="original-price">{product.originalPrice}</span>}
            <span className="current-price">{product.price}</span>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>

{/* Categorías */}
<section className="categories-section">
  <h2 className="home-titulocontrapelo" >ENCONTRÁ TU ESTILO</h2>
  <div className="categories-grid">
    {categories.map((category, index) => (
      <motion.div key={index} className="category-card" whileHover={{ scale: 1.05 }}>
        <img src={category.img} alt={category.name} className="category-image" />
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
            <p>Confeccionamos con materiales conscientes y empaques reciclables.</p>
          </div>
        </div>
      </section>

      {/* Asistente Virtual */}
      <motion.section className="chatbot-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <h3>¿Necesitás ayuda? Consultá con nuestro asistente</h3>
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
<h3 className="home-titulocontrapelo"> Aceptamos Todos los Medios de Pago</h3>
  <img
  style={{ marginTop: "20px", borderRadius: "25px" }}
    src={tarjetas}
    alt="tarjetas de crédito"
    className="credit-cards-image"
  />
</section>
    </div>
  );
};
