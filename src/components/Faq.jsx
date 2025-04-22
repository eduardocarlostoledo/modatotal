import React from 'react';
import './FAQ.css';

export const FAQ = () => {
  const faqItems = [
    {
      question: "¿Cómo realizo una compra?",
      answer: "Navegá por nuestras categorías, seleccioná tus productos favoritos y agregalos al carrito. Luego, completá tus datos y elegí el método de pago y envío que prefieras.",
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="7" cy="21" r="1" />
          <circle cx="17" cy="21" r="1" />
        </svg>
      ),
    },
    {
      question: "¿Cuáles son los métodos de pago disponibles?",
      answer: "Aceptamos tarjetas de crédito y débito (Visa, MasterCard, American Express), transferencias bancarias y pagos en efectivo a través de Rapipago y Pago Fácil.",
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="5" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M2 10h20" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      question: "¿Realizan envíos a todo el país?",
      answer: "Sí, realizamos envíos a todo el territorio argentino a través de servicios de mensajería confiables. También podés optar por retirar tu pedido en nuestras sucursales.",
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h18v13H3z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M16 16l4 4m0-4l-4 4" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      question: "¿Puedo cambiar o devolver un producto?",
      answer: "Sí, tenés hasta 15 días desde la recepción del pedido para realizar cambios o devoluciones. El producto debe estar en perfectas condiciones y con su embalaje original.",
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M9 9l6 6m0-6l-6 6" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      question: "¿Cómo puedo seguir el estado de mi pedido?",
      answer: "Una vez despachado tu pedido, recibirás un correo electrónico con el número de seguimiento y el enlace para rastrear tu envío en tiempo real.",
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l9 4-9 4-9-4 9-4z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M12 22V10" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="faq-container">
      <h1 className="faq-title">Preguntas Frecuentes</h1>
      <div className="faq-grid">
        {faqItems.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-icon">{item.icon}</div>
            <h2 className="faq-question">{item.question}</h2>
            <p className="faq-answer">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
