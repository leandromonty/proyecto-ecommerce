// src/components/Header/Header.jsx

import React, { useState } from 'react';
import './Header.css';
import Logo from '../../assets/Logo.png'; 
// ...
const Header = () => {
  // controla la visibilidad del buscador
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  //  si el menú móvil está abierto
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Función para mostrar/ocultar el buscador al hacer clic en el ícono
  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  // Función para  el menú de hamburguesa
  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
      <header className="header">
      {/* Reemplazamos el div del logo con una etiqueta img */}
      <div className="logo">
        <img src={Logo} alt="La Celestina - Delicias y más" className="logo-img" />
      </div>

      {/* agregar Íconos de redes sociales */}
      <div className="social-icons">
        <span>FB</span>
        <span>TW</span>
        <span>IG</span>
      </div>

      {/* Ícono de búsqueda */}
      <div className="search-icon" onClick={handleSearchClick}>
        🔍
      </div>

      {/* Buscador */}
      {isSearchVisible && (
        <div className="search-container">
          <input type="text" placeholder="Buscar..." />
        </div>
      )}

      {/* Ícono de menú de hamburguesa */}
      <div className="mobile-menu-icon" onClick={handleMobileMenuClick}>
        ☰
      </div>

      {/* Menú de navegación móvil */}
      {isMobileMenuOpen && (
        <nav className="mobile-nav">
          <ul>
            <li>Home</li>
            <li>Destacado</li>
            <li>Contacto</li>
            <li>Favoritos</li>
            <li>Carrito</li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;