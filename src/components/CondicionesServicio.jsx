import React from 'react';
import '../styles/PoliticaPrivacidad.css';

const PoliticaPrivacidad = () => {
  const sections = [
    {
      title: '1. Datos que recopilamos',
      text: [
        'Nombre completo',
        'Correo electrónico',
        'Imágenes proporcionadas por el usuario'
      ]
    },
    {
      title: '2. Uso de la información',
      text: [
        'Proporcionar los servicios solicitados por el usuario.',
        'Mejorar y personalizar la experiencia del usuario.',
        'Enviar actualizaciones y ofertas sobre nuestros servicios.'
      ]
    },
    {
      title: '3. Almacenamiento y seguridad',
      text: [
        'No compartimos ni vendemos tus datos.',
        'La información está protegida con medidas de seguridad estándar.',
        'Solo el personal autorizado puede acceder a tus datos.'
      ]
    },
    {
      title: '4. Derechos del usuario',
      text: [
        'Acceder, modificar o eliminar tus datos.',
        'Ejercer tus derechos escribiendo a nuestro email de soporte.',
        'Solicitar la baja total de tus registros.'
      ]
    }
  ];

  return (
    <div className="privacidad-container">
      <h1 className="privacidad-titulo">Política de Privacidad</h1>
      <div className="privacidad-grid">
        {sections.map((section, idx) => (
          <div key={idx} className="privacidad-card">
            <h2>{section.title}</h2>
            <ul>
              {section.text.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}; 


export default PoliticaPrivacidad;