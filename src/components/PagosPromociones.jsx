import React from 'react';
import '../styles/PagosPromociones.css';

export const PagosPromociones = () => {
  const promociones = [
    {
      title: 'Cuota Simple',
      content: 'Hasta 6 cuotas con Visa, Mastercard, Cabal y American Express. Promoción válida del 01/01/2025 al 30/06/2025 para productos seleccionados.',
    },
    {
      title: 'Supervielle – Jueves',
      content: 'Hasta 12 cuotas sin interés con Visa Identité y hasta 9 cuotas con Visa o MasterCard Clásica. Solo los jueves entre el 01/03/2025 y el 30/04/2025.',
    },
    {
      title: 'Mercado Crédito – 25% OFF',
      content: 'Descuento del 25% en productos seleccionados abonando con Cuotas sin Tarjeta. Válido del 21/04/2025 al 25/04/2025. Tope: $10.000.',
    },
    {
      title: 'Mercado Crédito – 20% OFF',
      content: 'Descuento del 20% en productos seleccionados con Cuotas sin Tarjeta. Válido hasta agotar stock o alcanzar tope de $12.000.',
    },
    {
      title: 'Mercado Crédito – 10% OFF',
      content: 'Descuento del 10% usando Cuotas sin Tarjeta. Tope de $15.000. Válido entre el 21/04/2025 y el 25/04/2025 en publicaciones adheridas.',
    },
  ];

  const mediosPago = [
    'Tarjetas de crédito: Visa, MasterCard, American Express, Cabal',
    'Transferencias bancarias',
    'Billeteras digitales: Mercado Pago, Ualá, Modo',
    'Cuotas sin tarjeta (Mercado Crédito)',
  ];

  return (
    <div className="pagos-container">
      <div className="pagos-header">
        <div className="icono-tarjeta">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#263d23" viewBox="0 0 256 256">
            <path d="M216,48H40A16,16,0,0,0,24,64V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,64H216V80H40ZM216,192H40V96H216Z" />
          </svg>
        </div>
        <h1 className="pagos-titulo">Pagos y Promociones</h1>
        <p className="pagos-subtitulo">Conocé las formas de pago disponibles y las promos bancarias vigentes.</p>
      </div>

      <div className="pagos-medios">
        <h2>Medios de Pago Aceptados</h2>
        <ul>
          {mediosPago.map((medio, index) => (
            <li key={index}>✔ {medio}</li>
          ))}
        </ul>
      </div>

      <div className="pagos-grid">
        {promociones.map((promo, i) => (
          <div className="pagos-card" key={i}>
            <h3>{promo.title}</h3>
            <p>{promo.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
