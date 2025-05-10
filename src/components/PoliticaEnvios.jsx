import React, { useEffect } from 'react';
import '../styles/PoliticaEnvios.css';

export const PoliticaEnvios = () => {
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
   // para que al recargar los componentes la vista sea desde el inicio de la pagina
    // Verificar sesión al cargar

  const sections = [
    {
      title: '¿Dónde entregamos?',
      content:
        'Realizamos envíos a todo el país. También podés retirar sin cargo por nuestro punto de entrega en Posadas, Misiones.',
    },
    {
      title: 'Tiempos de entrega',
      content:
        'Los envíos dentro de Misiones demoran entre 1 y 3 días hábiles. Para el resto del país, el tiempo estimado es de 3 a 7 días hábiles.',
    },
    {
      title: 'Costos de envío',
      content:
        'El costo de envío se calcula automáticamente al ingresar tu dirección. Para compras mayores a $40.000 el envío es gratuito.',
    },
    {
      title: 'Seguimiento de tu pedido',
      content:
        'Una vez despachado tu pedido, recibirás un código de seguimiento por email para rastrear tu compra en tiempo real.',
    },
    {
      title: 'Empaque y seguridad',
      content:
        'Cada producto es embalado cuidadosamente para garantizar que llegue en perfectas condiciones. Utilizamos packaging reciclable y seguro.',
    },
  ];

  return (
    <div className="envios-container">
      <h1 className="envios-titulo">Política de Envíos</h1>
      <div className="envios-grid">
        {sections.map((section, i) => (
          <div className="envios-card" key={i}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
