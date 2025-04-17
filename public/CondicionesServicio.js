import React from 'react';
import styles from "../src/styles/PoliticayCondiciones.css"

const CondicionesServicio = () => {
  return (
    <div className='politicaycondiciones'>
      <h1>Condiciones del Servicio</h1>
      <h2>Aceptación de términos</h2>
      <p>
        Al utilizar nuestros servicios, el usuario acepta estas condiciones y
        declara haber leído nuestra política de privacidad.
      </p>
      <h2>Servicios ofrecidos</h2>
      <p>
        Nuestros servicios incluyen el desarrollo de landings, pequeñas páginas
        web tipo SPA y sistemas autoadministrables. Nos reservamos el derecho de
        modificar, suspender o cancelar servicios sin previo aviso.
      </p>
      <h2>Responsabilidad</h2>
      <p>No nos hacemos responsables de:</p>
      <ul>
        <li>Errores causados por el uso inadecuado del sistema.</li>
        <li>Fallas técnicas o interrupciones temporales del servicio.</li>
        <li>Pérdidas o daños derivados del uso del sistema.</li>
      </ul>
      <h2>Recopilación de datos</h2>
      <p>Solo recopilamos y almacenamos:</p>
      <ul>
        <li>Email</li>
        <li>Nombre</li>
        <li>Imágenes proporcionadas por el usuario</li>
      </ul>
      <p>
        No recopilamos ni almacenamos información adicional sin el
        consentimiento explícito del usuario.
      </p>
      <h2>Modificaciones de las condiciones</h2>
      <p>
        Nos reservamos el derecho de actualizar estas condiciones en cualquier
        momento. Las modificaciones serán notificadas a los usuarios por correo
        electrónico.
      </p>
      <h2>Contacto</h2>
      <p>
        Para consultas o dudas sobre estas condiciones, puede contactarnos a
        través de nuestro email de soporte.
      </p>
    </div>
  );
};

export default CondicionesServicio;
