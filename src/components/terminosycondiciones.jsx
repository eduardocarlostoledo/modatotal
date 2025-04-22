import React from 'react';
import './TermsAndConditions.css';

export const TermsAndConditions = () => {
  const terms = [
    {
      title: "1. Información General",
      content: "Moda Total es una tienda online de indumentaria con sede en Posadas, Misiones, Argentina. Al utilizar nuestro sitio web, aceptás estos términos y condiciones en su totalidad."
    },
    {
      title: "2. Registro y Cuenta",
      content: "Para realizar compras, debés registrarte proporcionando información veraz y actualizada. Sos responsable de mantener la confidencialidad de tu cuenta y contraseña."
    },
    {
      title: "3. Productos y Precios",
      content: "Todos los precios están expresados en pesos argentinos e incluyen IVA. Nos reservamos el derecho de modificar precios y descripciones sin previo aviso."
    },
    {
      title: "4. Medios de Pago",
      content: "Aceptamos tarjetas de crédito y débito, transferencias bancarias y pagos a través de plataformas como Mercado Pago. Todos los pagos están sujetos a verificación y autorización."
    },
    {
      title: "5. Envíos",
      content: "Realizamos envíos a todo el país mediante servicios de mensajería confiables. Los tiempos de entrega varían según la ubicación y se informarán al momento de la compra."
    },
    {
      title: "6. Cambios y Devoluciones",
      content: "Podés solicitar cambios o devoluciones dentro de los 10 días hábiles posteriores a la recepción del producto, siempre que esté en condiciones originales y con su embalaje intacto."
    },
    {
      title: "7. Propiedad Intelectual",
      content: "Todos los contenidos del sitio, incluyendo imágenes, textos y logotipos, son propiedad de Moda Total y están protegidos por las leyes de propiedad intelectual."
    },
    {
      title: "8. Privacidad y Protección de Datos",
      content: "Respetamos tu privacidad. Tus datos personales se utilizarán exclusivamente para procesar pedidos y mejorar tu experiencia de compra, conforme a nuestra Política de Privacidad."
    },
    {
      title: "9. Modificaciones",
      content: "Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor al ser publicadas en nuestro sitio web."
    },
    {
      title: "10. Legislación Aplicable",
      content: "Estos términos se rigen por las leyes de la República Argentina. Cualquier disputa será resuelta por los tribunales competentes de la ciudad de Posadas, Misiones."
    }
  ];

  return (
    <div className="terms-container">
      <h1 className="terms-title">Términos y Condiciones</h1>
      <div className="terms-cards">
        {terms.map((term, index) => (
          <div key={index} className="term-card">
            <h2>{term.title}</h2>
            <p>{term.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
