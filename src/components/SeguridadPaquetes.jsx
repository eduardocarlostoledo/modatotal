import React from 'react';
import '../styles/SeguridadPaquetes.css';

export const SeguridadPaquetes = () => {
  const medidas = [
    {
      title: 'Embalaje Seguro',
      content: 'Todos los productos son embalados con materiales resistentes y a medida para minimizar golpes o daños durante el traslado.',
    },
    {
      title: 'Etiquetado y Precintos',
      content: 'Cada paquete cuenta con etiquetas identificadoras y precintos de seguridad para evitar manipulaciones indebidas.',
    },
    {
      title: 'Seguimiento en Tiempo Real',
      content: 'Una vez despachado, te enviamos un código de seguimiento para que puedas rastrear tu compra en todo momento.',
    },
    {
      title: 'Envíos Asegurados',
      content: 'Trabajamos con operadores logísticos que brindan seguro de envío ante pérdida o robo. Si algo ocurre, gestionamos la reposición o reintegro.',
    },
  ];

  return (
    <div className="seguridad-container">
      <div className="seguridad-header">
        <div className="icono-candado">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#263d23" viewBox="0 0 256 256">
            <path d="M208,96H176V72a48,48,0,0,0-96,0V96H48A16,16,0,0,0,32,112V216a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V112A16,16,0,0,0,208,96ZM96,72a32,32,0,0,1,64,0V96H96Z" />
          </svg>
        </div>
        <h1 className="seguridad-titulo">Seguridad de los Paquetes</h1>
        <p className="seguridad-subtitulo">Cuidamos cada pedido como si fuera nuestro. Estas son las medidas que tomamos para asegurar tu compra.</p>
      </div>

      <div className="seguridad-grid">
        {medidas.map((item, i) => (
          <div className="seguridad-card" key={i}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
