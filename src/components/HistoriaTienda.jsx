import React, { useEffect } from 'react';
import '../styles/HistoriaTienda.css';
import nuestraempresa2 from '../images/nuestraempresa2.jpg';
import nosotros from '../images/nosotros.jpg';
import historiaempresa from '../images/historiaempresa.webp';

export const HistoriaTienda = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section className="historiaTienda-container">
      <h1 className="historiaTienda-titulo">Nuestra Historia</h1>

      <div className="historiaTienda-grid">
        <div className="historiaTienda-texto">
          <p>
            Nuestra historia comenzó hace más de <strong>20 años</strong>, en el seno de una <strong>familia trabajadora y apasionada</strong> por la moda. Desde nuestros primeros pasos, nos propusimos crear una marca que representara <em>calidad, cercanía y autenticidad</em>.
          </p>

          <p>
            Lo que empezó como un pequeño taller de confección, se transformó con esfuerzo y dedicación en una <strong>empresa sólida que diseña y fabrica sus propios productos</strong>. Elaboramos cada prenda con altos estándares de confección, priorizando materiales nobles y procesos responsables.
          </p>
        </div>

        <div className="historiaTienda-imagen">
          <img src={historiaempresa} alt="Historia de nuestra empresa" />
        </div>
      </div>

      <div className="historiaTienda-grid reverse">
        <div className="historiaTienda-imagen">
          <img src={nosotros} alt="Nosotros como equipo de trabajo" />
        </div>
        <div className="historiaTienda-texto">
          <p>
            Nuestra tienda ofrece indumentaria para <strong>hombres, mujeres y niños</strong>, pensada para el día a día y las distintas etapas de la vida. Desde estilos <em>deportivos</em>, <em>informales</em> y <em>casuales</em>, hasta colecciones que combinan <strong>comodidad, diseño y tendencia</strong>.
          </p>

          <p>
            Entendemos que vestir es una forma de expresión, y por eso buscamos que cada producto transmita nuestra identidad: <em>una marca con alma familiar</em>, que creció de la mano de sus clientes.
          </p>
        </div>
      </div>

      <div className="historiaTienda-grid">
        <div className="historiaTienda-texto">
          <p>
            Nos enorgullece decir que <strong>cada prenda es pensada para durar</strong> y acompañarte en tu rutina. Creemos en una moda accesible, ética y con sentido. Y sobre todo, creemos en el valor de construir relaciones genuinas con cada persona que nos elige.
          </p>

          <p>
            Hoy, como ayer, seguimos apostando al trabajo argentino, al trato humano y al crecimiento colectivo. Gracias por confiar en nosotros y permitirnos ser parte de tu historia.
          </p>
        </div>
        <div className="historiaTienda-imagen">
          <img src={nuestraempresa2} alt="Nuestra empresa textil" />
        </div>
      </div>
    </section>
  );
};
