import { Link } from "react-router-dom";
import "../styles/Card.css";
import AddToCart from "./AddToCart";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";

export default function Card({ name, image, price, description, calification, isForBuildPc }) {
  const sanitize = (input) => {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
  };

  // Animaciones
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const imageVariants = {
    hover: {
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="card-container"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <div className="card-content">
        <Link className="card-image-link" to={isForBuildPc ? "" : `/detail/${sanitize(name)}`}>
          <motion.div className="card-image-container" variants={imageVariants}>
            <img 
              className="card-image" 
              src={sanitize(image)} 
              alt={sanitize(description) || `${name} product image`}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = '/images/placeholder-product.png';
              }}
            />
            <div className="card-badge">Nuevo</div>
          </motion.div>
        </Link>
        
        <div className="card-details">
          <h3 className="card-name">{sanitize(name)}</h3>
          <div className="card-price-container">
            <span className="card-price">${sanitize(price.toString())}</span>
            {price > 100 && (
              <span className="card-shipping">Envío gratis</span>
            )}
          </div>
          <div className="card-rating">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`star ${i < Math.floor(calification || 0) ? 'filled' : ''}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        
        {!isForBuildPc && (
          <div className="card-actions">
            <AddToCart item={{ name: sanitize(name), image: sanitize(image), price }} />
            <button className="quick-view-btn">
              <FiShoppingBag /> Vista rápida
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}