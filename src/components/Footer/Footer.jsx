// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';
import Logo from '../../assets/Logo.png';
// Importamos los iconos de Font Awesome
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="footer-web">
      <div className="footer-main">
        
        {/* Logo (Web: Izquierda, Mobile: Centrado) */}
        <div className="footer-logo">
          <img src={Logo} alt="La Celestina - Logo" />
        </div>
        
        {/* Links (2 Columnas) */}
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
        
        {/* Columna de Contacto, Redes y QR Data Fiscal */}
        <div className="footer-social-qr"> {/* Clase específica para esta columna */}
          <h3>Contacto y Redes</h3>
          <p>Email: contacto@lacelestina.com</p>
          
          <div className="social-icons">
            {/* Íconos de Redes Sociales */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter"><FaTwitter /></a>
          </div>
          
          {/* NUEVO: QR Data Fiscal */}
          <div className="data-fiscal-qr">
             <p>QR Data Fiscal (Placeholder)</p>
             <div className="qr-placeholder"></div>
          </div>
        </div>
        
      </div>
      
      {/* Fila con info copyright */}
      <div className="footer-copyright">
        <p>© 2024 La Celestina | Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;