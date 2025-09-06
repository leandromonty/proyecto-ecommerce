// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';
import Logo from '../../assets/Logo.png';

const Footer = () => {
  return (
    <footer className="footer-web">
      <div className="footer-main">
        <div className="footer-logo">
          <img src={Logo} alt="La Celestina - Logo" />
        </div>
        <div className="footer-links">
          {/* Columna 1 de links */}
          <div className="links-col">
            <h3>Navegación</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#products">Productos</a></li>
              <li><a href="#contact">Contacto</a></li>
            </ul>
          </div>
          {/* Columna 2 de links */}
          <div className="links-col">
            <h3>Soporte</h3>
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#returns">Devoluciones</a></li>
              <li><a href="#shipping">Envíos</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-social">
          <h3>Contacto y Redes</h3>
          <p>Email: contacto@lacelestina.com</p>
          <div className="social-icons">
            <span>FB</span>
            <span>IG</span>
            <span>TW</span>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>© 2024 La Celestina. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;