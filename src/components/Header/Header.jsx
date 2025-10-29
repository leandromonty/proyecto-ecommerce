// src/components/Header/Header.jsx
import React, { useState, useCallback } from 'react';
import './Header.css';
import Logo from '../../assets/Logo.png'; 
import { FaUser, FaSearch, FaShoppingCart, FaHeart, FaQuestionCircle, FaTimes, FaFilter } from 'react-icons/fa';


const Header = ({ 
    onSearchChange, 
    onToggleCart, 
    onToggleSidebar, 
    cartItemCount 
}) => { 
  
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Links de Navegación del Menú
  const menuLinks = [
    { name: 'Home', href: '#home', action: null },
    { name: 'Destacado', href: '#featured', action: null },
    { name: 'Contacto', href: '#contact', action: null },
  ];

  // Manejadores
  const handleMobileSearchClick = useCallback(() => {
    // Si abrimos el buscador, cerramos el menú.
    if (!isMobileSearchVisible) {
      setIsMobileMenuOpen(false);
    }
    setIsMobileSearchVisible(prev => !prev);
  }, [isMobileSearchVisible]);

  const handleMobileMenuClick = useCallback(() => {
    // Si abrimos el menú, cerramos el buscador.
    if (!isMobileMenuOpen) {
      setIsMobileSearchVisible(false);
    }
    setIsMobileMenuOpen(prev => !prev);
  }, [isMobileMenuOpen]);

  // Cierra el menú y ejecuta la acción (si existe)
  const handleMenuAction = useCallback((action) => {
    setIsMobileMenuOpen(false); // Siempre cierra el menú después de una acción
    if (action) {
      action(); 
    }
  }, []);

  // Conecta el input de búsqueda con App.jsx.
  const handleInputChange = useCallback((e) => {
      onSearchChange(e.target.value);
  }, [onSearchChange]);


  return (
      <header className="header">
      
      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="La Celestina - Delicias y más" className="logo-img" />
      </div>

      {/* Buscador Fijo (Desktop) */}
      <div className="search-container fixed-search">
        <input 
          type="text" 
          placeholder="Buscar productos por nombre..." 
          onChange={handleInputChange} 
        />
        <div className="search-icon-fixed">
          <FaSearch />
        </div>
      </div>

      {/* Contenedor de Acciones  */}
      <div className="header-actions">
        
        {/* Ícono de Usuario */}
        <div className="user-icon" title="Mi Cuenta">
          <FaUser />
        </div>
        
        {/* Ícono de Búsqueda Móvil - Solo visible en móvil vía Header.css */}
        <div className="mobile-search-icon" onClick={handleMobileSearchClick} title="Buscar">
          <FaSearch />
        </div>

        {/* Ícono de menú de hamburguesa - Solo visible en móvil vía Header.css */}
        <div className="mobile-menu-icon" onClick={handleMobileMenuClick} title="Menú">
          {isMobileMenuOpen ? <FaTimes /> : '☰'}
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


      {/* Menú de navegación móvil */}
      {isMobileMenuOpen && (
        <nav className="mobile-nav">
            <button className="mobile-menu-close" onClick={handleMobileMenuClick}><FaTimes /> Cerrar</button>
            <ul className="mobile-nav-links">
                
                {/* Links de Navegación Estándar */}
                {menuLinks.map(link => (
                    <li key={link.name} onClick={() => handleMenuAction(link.action)}>
                        <a href={link.href} onClick={(e) => { e.preventDefault(); handleMenuAction(); }}>{link.name}</a>
                    </li>
                ))}
                
                <hr />
                
                {/* Acciones Rápidas (Favoritos, Carrito, Filtros, Ayuda) */}
                <li onClick={() => handleMenuAction()}>
                    <FaHeart className="mobile-menu-icon-link"/> Favoritos
                </li>
                
                <li onClick={() => handleMenuAction(onToggleCart)}>
                    <FaShoppingCart className="mobile-menu-icon-link"/> Carrito ({cartItemCount})
                </li>
                
                <li onClick={() => handleMenuAction(onToggleSidebar)}>
                    <FaFilter className="mobile-menu-icon-link"/> Ver Filtros
                </li>
                
                <li onClick={() => handleMenuAction(() => alert("¡Hola! ¿Necesitas ayuda?"))}>
                    <FaQuestionCircle className="mobile-menu-icon-link"/> Ayuda
                </li>
                
            </ul>
            <div className="mobile-menu-user">
                <FaUser /> Mi Cuenta
            </div>
        </nav>
      )}
      </header>
  );
}

export default Header;