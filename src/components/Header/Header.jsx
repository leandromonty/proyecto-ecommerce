// src/components/Header/Header.jsx

import React, { useState } from 'react';
import './Header.css';
import Logo from '../../assets/Logo.png'; 
import { FaUser, FaSearch } from 'react-icons/fa';

// NOTA: Header recibe la función de App.jsx para manejar el filtro.
const Header = ({ onSearchChange }) => { 
  
  // Estado para controlar la visibilidad del input de búsqueda en MÓVIL
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  // Estado para controlar si el menú móvil de hamburguesa está abierto (solo móvil)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Maneja la visibilidad del buscador MÓVIL
  const handleMobileSearchClick = () => {
    // Si abrimos el buscador, cerramos el menú móvil.
    if (!isMobileSearchVisible) {
      setIsMobileMenuOpen(false);
    }
    setIsMobileSearchVisible(!isMobileSearchVisible);
  };

  // Maneja el estado del menú de hamburguesa.
  const handleMobileMenuClick = () => {
    // Si abrimos el menú móvil, cerramos el buscador.
    if (!isMobileMenuOpen) {
      setIsMobileSearchVisible(false);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Conecta el input de búsqueda con App.jsx.
  const handleInputChange = (e) => {
      // Envía el valor del input a la función en App.jsx para filtrar.
      onSearchChange(e.target.value);
  };


  return (
      <header className="header">
      
      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="La Celestina - Delicias y más" className="logo-img" />
      </div>

      {/* Íconos de Redes Sociales (se ocultan en móvil vía Header.css) */}
      <div className="social-icons">
        <span>FB</span>
        <span>TW</span>
        <span>IG</span>
      </div>
      
      {/* 1. Buscador Fijo para Desktop (Se oculta en móvil vía Header.css) */}
      <div className="search-container fixed-search">
        <input 
          type="text" 
          placeholder="Buscar productos..." 
          onChange={handleInputChange} 
        />
        <div className="search-icon-fixed">
          <FaSearch />
        </div>
      </div>

      {/* Contenedor de Acciones (Usuario, Lupa Móvil, Hamburguesa) */}
      <div className="header-actions">
        
        {/* Ícono de Usuario - Visible en todas partes, a menos que el menú móvil esté abierto */}
        <div className="user-icon" title="Mi Cuenta">
          <FaUser />
        </div>
        
        {/* Ícono de Búsqueda Móvil - Solo visible en móvil vía Header.css */}
        <div className="mobile-search-icon" onClick={handleMobileSearchClick} title="Buscar">
          <FaSearch />
        </div>

        {/* Ícono de menú de hamburguesa - Solo visible en móvil vía Header.css */}
        <div className="mobile-menu-icon" onClick={handleMobileMenuClick} title="Menú">
          ☰
        </div>
      </div>


      {/* Buscador Desplegable para MÓVIL (Solo visible si isMobileSearchVisible es true) */}
      {isMobileSearchVisible && (
        <div className="search-container-mobile">
          <input 
            type="text" 
            placeholder="Buscar productos por nombre..." 
            onChange={handleInputChange} 
          />
        </div>
      )}


      {/* Menú de navegación móvil (solo visible si isMobileMenuOpen es true Y en móvil) */}
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
