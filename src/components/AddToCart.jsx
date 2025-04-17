import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import '../styles/AddToCart.css';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, update } from '../redux/slices/cartSlice.js';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import DOMPurify from 'dompurify';

export default function AddToCart({ item }) {
  const currentUser = useSelector((state) => state.users.userActive);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
  
    if (!currentUser) {
      swal({
        title: 'Error',
        text: 'Debes iniciar sesión para añadir productos al carrito.',
        icon: 'error',
        buttons: {
          cancel: 'Seguir navegando',
          confirm: 'Iniciar sesión'
        }
      }).then((value) => {
        if (value) {
          navigate("/login");
        }
      });
      return;
    }
  
    const sanitizedItem = {
      name: sanitizeInput(item.name),
      image: sanitizeInput(item.image),
      price: item.price, // Price is a number, doesn't need sanitization
      amount: 1,
    };
  
    try {
      dispatch(addToCart({ 
        product: sanitizedItem, 
        user: currentUser.id 
      }));
      dispatch(update(true));
      
      swal('Éxito', 'Producto añadido al carrito', 'success');
      setMessage('Producto añadido con éxito');
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      setMessage('Error al añadir al carrito');
    }
  };

  return (
    <div className="add-to-cart-container">
      <form onSubmit={handleAddToCart} className="add-to-cart-form">
        <button 
          type="submit" 
          className="add-to-cart-button"
          aria-label="Añadir al carrito"
          disabled={!currentUser}
        >
          <AiOutlineShoppingCart className="add-to-cart-icon" />
        </button>
        {message && (
          <p className="add-to-cart-message">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}