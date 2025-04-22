import React from 'react';
import '../styles/CambiosDevoluciones.css';

export const CambiosDevoluciones = () => {
  const sections = [
    {
      title: '¿Tenés que cambiar algo?',
      content:
        'Aceptamos cambios de productos dentro de los 30 días corridos desde la entrega. El producto debe estar sin uso, con etiquetas y empaque original.',
    },
    {
      title: '¿Cómo solicitar un cambio o devolución?',
      content:
        'Contactanos por WhatsApp o correo indicando tu número de orden y el motivo. Te daremos instrucciones para gestionar el envío del producto.',
    },
    {
      title: 'Costos de devolución',
      content:
        'Si el producto tiene falla o el error fue nuestro, cubrimos todos los gastos. Si el cambio es por talle o color, el costo del envío corre por cuenta del cliente.',
    },
    {
      title: 'Reembolsos',
      content:
        'Una vez recibida la devolución, evaluamos el estado del producto. Si todo está en orden, realizamos el reembolso en un plazo de hasta 7 días hábiles.',
    },
  ];

  return (
    <div className="devoluciones-container">
      <div className="devoluciones-header">
        <div className="icono-caja">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="#263d23"
            viewBox="0 0 256 256"
          >
            <path d="M216,104H40a8,8,0,0,0-8,8v96a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V112A8,8,0,0,0,216,104ZM208,200H48V120H208Zm-80-80a8,8,0,0,1,8,8v24h16a8,8,0,0,1,0,16H136a8,8,0,0,1-8-8V128A8,8,0,0,1,128,120Z" />
          </svg>
        </div>
        <h1 className="devoluciones-titulo">Cambios y Devoluciones</h1>
        <p className="devoluciones-intro">
          Tu satisfacción es nuestra prioridad. Leé nuestras condiciones para cambios o devoluciones de manera ágil y clara.
        </p>
      </div>

      <div className="devoluciones-grid">
        {sections.map((item, idx) => (
          <div className="devoluciones-card" key={idx}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
