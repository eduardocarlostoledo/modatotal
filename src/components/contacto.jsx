import React from 'react';
import '../styles/ContactUs.css';
import { motion } from 'framer-motion';

export const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contacto</h1>
      <p className="contact-subtitle">¿Tenés alguna consulta? ¡Escribinos y te respondemos a la brevedad!</p>

      <div className="contact-grid">
        {/* Formulario */}
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form>
            <label>
              Nombre
              <input type="text" placeholder="Tu nombre" required />
            </label>
            <label>
              Email
              <input type="email" placeholder="tu@email.com" required />
            </label>
            <label>
              Mensaje
              <textarea rows="5" placeholder="¿Cómo podemos ayudarte?" required />
            </label>
            <button type="submit">Enviar mensaje</button>
          </form>
        </motion.div>

        {/* Información de contacto */}
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Información de contacto</h2>
          <div className="info-item">
            <span>📧</span>
            <div>
              <p>Email</p>
              <p>hola@modatotal.com</p>
            </div>
          </div>
          <div className="info-item">
            <span>📞</span>
            <div>
              <p>Teléfono</p>
              <p>+54 9 376 400-1234</p>
            </div>
          </div>
          <div className="info-item">
            <span>📍</span>
            <div>
              <p>Dirección</p>
              <p>Av. Moda 123, Posadas, Misiones</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
