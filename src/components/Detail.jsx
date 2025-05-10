import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail } from "../redux/slices/productSlice.js";
import { getCart } from "../redux/slices/cartSlice.js";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AddToCart from "./AddToCart.jsx";
import Review from "./Review.jsx";
import StarsCalification from "./StarsCalification.jsx";
import NavBar from "./NavBar.jsx";
import DOMPurify from "dompurify";
import "../styles/Detail.css";

export const Detail = () => {
  const { Name } = useParams();
  const [updateReviews, setUpdateReviews] = useState(false);
  const dispatch = useDispatch();
const allProducts = useSelector((state) => state.products.allProducts);
const types = useSelector((state) => state.products.types);

  const cart = useSelector((state) => state?.cart?.items);
  const detail = useSelector((state) => state?.products?.productDetail);
  const currentUser = useSelector((state) => state?.users?.userActive);
  const productInCart = cart?.find((p) => p.name === Name);

  const relatedProducts = allProducts.filter(
  (p) => p.type === detail?.type && p.name !== detail?.name
).slice(0, 4); // Mostramos máximo 4


  // Sanitizar inputs
  const sanitize = (input) => {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
  };

  useEffect(() => {
    dispatch(getProductDetail(Name));

    if (currentUser) {
      dispatch(getCart(currentUser.id));
    }

    if (updateReviews) {
      dispatch(getProductDetail(Name));
      setUpdateReviews(false);
    }
  }, [Name, dispatch, updateReviews, currentUser]);

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  if (!detail) {
    return (
      <div className="detail-loading">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="detail-spinner"
        />
      </div>
    );
  }

  return (
    <div className="detail-container"
    style={{
      color: '#fff',
      marginTop: "180px",
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',      
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    }}>
      <NavBar />

      <motion.div
        className="detail-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Producto */}
        <motion.div className="detail-product" variants={itemVariants}>
          <motion.div 
            className="detail-image-container"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              className="detail-image" 
              src={sanitize(detail?.image)} 
              alt={sanitize(detail?.description) || `Imagen de ${Name}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder-product.png';
              }}
            />
          </motion.div>

          <div className="detail-info">
            <h1 className="detail-title">{sanitize(Name)}</h1>
            <hr className="detail-divider" />
            
            <div className="detail-meta">
              <div className="detail-rating">
                <StarsCalification width={20} calif={detail?.calification} />
                <span>{detail?.calification?.toFixed(1) || '0.0'}/5.0</span>
              </div>
              
              <div className="detail-categories">
                <span className="detail-category">{sanitize(detail?.type)}</span>
                <span className="detail-category">{sanitize(detail?.brand)}</span>
              </div>
            </div>

            <div className="detail-description">
              <h2 className="detail-price">${sanitize(detail?.price?.toString())}</h2>
              <p>{sanitize(detail?.description)}</p>
              
              {detail?.info_adicional && (
                <div className="detail-additional-info">
                  <h4>Información adicional</h4>
                  <p>{sanitize(detail?.info_adicional)}</p>
                </div>
              )}
              
              <div className="detail-stock">
                <strong>Disponibilidad:</strong> 
                <span className={detail?.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                  {detail?.stock > 0 ? `${detail?.stock} unidades` : 'Agotado'}
                </span>
              </div>
            </div>

            {/* Acciones */}
            <div className="detail-actions">
              {!productInCart ? (
                <div className="detail-add-to-cart">
                  <AddToCart
                    item={{
                      name: sanitize(Name),
                      price: detail?.price,
                      image: sanitize(detail?.image),
                      id: detail?.id
                    }}
                  />
                </div>
              ) : (
                <motion.div 
                  className="detail-cart-status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>Este producto está en tu carrito</p>
                  <p>Cantidad: {productInCart?.amount || 1}</p>
                  <Link to="/cart" className="detail-view-cart">
                    Ver carrito
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Reseñas */}
        <motion.div className="detail-reviews" variants={itemVariants}>
          <h2 className="detail-reviews-title">Opiniones de clientes</h2>
          
          <AnimatePresence>
            {detail?.reviews?.length > 0 ? (
              detail?.reviews.map((review, index) => (
                <motion.div
                  key={review.id || index}
                  className="detail-review"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="review-header">
                    <StarsCalification width={16} calif={review.calification} />
                    <h4>{sanitize(review.nameUser)} {sanitize(review.lastnameUser)}</h4>
                  </div>
                  <p className="review-comment">{sanitize(review.comment)}</p>
                </motion.div>
              ))
            ) : (
              <p className="detail-no-reviews">No hay reseñas todavía</p>
            )}
          </AnimatePresence>

          {/* Formulario de reseña */}
          {currentUser ? (
            <motion.div
              className="detail-review-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Review
                setUpdateReviews={setUpdateReviews}
                nameUser={currentUser.name}
                lastnameUser={currentUser.lastname}
                productId={detail?.id}
              />
            </motion.div>
          ) : (
            <div className="detail-login-prompt">
              <Link to="/login">Inicia sesión</Link> para dejar tu reseña
            </div>
          )}
        </motion.div>

        {relatedProducts.length > 0 && (
  <motion.div className="detail-related-products" variants={itemVariants}>
    <h2 className="detail-related-title">Productos Similares</h2>
    <div className="detail-related-grid">
      {relatedProducts.map((product) => (
        <Link to={`/detail/${product.name}`} key={product.id} className="detail-related-card">
          <img
            src={product.image}
            alt={product.name}
            className="detail-related-image"
          />
          <div className="detail-related-info">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  </motion.div>
)}


      </motion.div>
    </div>
  );
};