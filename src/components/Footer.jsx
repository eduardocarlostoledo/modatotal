import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import logo from '../img/logoinvertido.png';

export const Footer = () => {
  return (
    <footer className="footer">
      {/* Suscripción */}
      <div className="footer-subscribe">
        <p>¡Llegá primero a nuestras novedades!
        </p>
        <button className="newsletter-button">SUSCRIBITE AL NEWSLETTER &gt;</button>
      </div>

      <div className="footer-columns">
        {/* ATENCIÓN AL CLIENTE */}
        <div className="footer-column">
          <h4>ATENCIÓN AL CLIENTE</h4>
          <ul>
            <li><Link to="/envios">POLÍTICA DE ENVÍOS</Link></li>
            <li><Link to="/cambios">CAMBIOS Y DEVOLUCIONES</Link></li>
            <li><Link to="/pagos">PAGOS Y PROMOCIONES</Link></li>
            <li><Link to="/seguridad">SEGURIDAD DE LOS PAQUETES</Link></li>
            <li><Link to="/giftcard">GIFT CARD</Link></li>
            <li><Link to="/privacidad">POLÍTICAS DE PRIVACIDAD</Link></li>
          </ul>
        </div>

        {/* TIENDA ONLINE */}
        <div className="footer-column">
          <h4>TIENDA ONLINE</h4>
          <ul>
            <li><Link to="/mujer">MUJER</Link></li>
            <li><Link to="/hombre">HOMBRE</Link></li>
            <li><Link to="/mini">MINI</Link></li>
            <li><Link to="/argentina">ARGENTINA</Link></li>
            <li><Link to="/deportes">DEPORTES</Link></li>
            <li><Link to="/accesorios">ACCESORIOS</Link></li>
            <li><Link to="/outlet">OUTLET</Link></li>
          </ul>
        </div>

        {/* EMPRESA */}
        <div className="footer-column">
          <h4>EMPRESA</h4>
          <ul>
            <li><Link to="/historia">NUESTRA HISTORIA</Link></li>
            <li><Link to="/nocturna">NOCTURNA MODA</Link></li>
            <li><Link to="/estacion">ESTACIÓN MODA</Link></li>
            <li><Link to="/club">CLUB MODA</Link></li>
          </ul>
        </div>

        {/* CONTACTO MAYORISTA */}
        <div className="footer-column">
          <h4>CONTACTO MAYORISTA</h4>
          <ul>
            <li><Link to="/mayorista">SUMÁ MODA TOTAL A TU LOCAL</Link></li>
          </ul>

          {/* Redes */}
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Parte inferior */}
      <div className="footer-bottom-bar">
        <div>
          <button className="footer-legal-btn">BOTÓN DE ARREPENTIMIENTO</button>
        </div>
        <div>
          <p>&copy; {new Date().getFullYear()} MODA TOTAL - TODOS LOS DERECHOS RESERVADOS</p>
        </div>
        <div>
          <img src={logo} alt="MODA TOTAL logo" className="footer-logo-small" />
        </div>
      </div>
    </footer>
  );
};

// import { Link } from 'react-router-dom';
// import '../styles/Footer.css';
// import logo from '../img/logoinvertido.png';

// export const Footer = () => {
//   return (
//     <footer className='footer'>
//       <div className='footer-top'>
//         <div className='footer-logo'>
//           <img src={logo} alt="Logo El MODA TOTAL" />
//         </div>
//         <div className='footer-links'>
//           <Link to="/politica-privacidad">Política de Privacidad</Link>
//           <Link to="/condiciones-servicio">Condiciones del Servicio</Link>
//           <Link to="/terminos-y-condiciones">Términos y Condiciones</Link>
//           <Link to="/faq">Ayuda</Link>
//           <Link to="/contacto">Contacto</Link>
//         </div>
//       </div>

//       <div className='footer-bottom'>
//         <p>&copy; {new Date().getFullYear()} El MODA TOTAL. Todos los derechos reservados.</p>
//         <p>Hecho con ❤️ en Misiones, Argentina</p>
//       </div>
//     </footer>
//   );
// };
