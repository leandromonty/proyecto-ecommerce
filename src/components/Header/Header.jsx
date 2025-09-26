// src/components/Header/Header.jsx

import React, { useState } from 'react';
// Eliminamos la dependencia de './Header.css' y 'react-icons/fa'

// Usamos una URL de placeholder para simular el logo
const LOGO_PLACEHOLDER = 'https://placehold.co/150x50/e0f2f7/007bff?text=La+Celestina';


const Header = () => {
  
  // Controla la visibilidad del buscador (input de texto)
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  // Controla si el menú móvil de hamburguesa está abierto
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Función para mostrar/ocultar el buscador
  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  // Función para abrir/cerrar el menú de hamburguesa
  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Estilos CSS en línea
  const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#e0f2f7',
        borderBottom: '1px solid #ccc',
        color: '#333',
        position: 'relative', // Necesario para el buscador desplegable
    },
    logo: {
        flexGrow: 1, // Permite que el logo ocupe el espacio restante
    },
    logoImg: {
        height: '50px',
    },
    headerActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px', // Espacio entre íconos
    },
    icon: {
        fontSize: '1.5rem',
        cursor: 'pointer',
        padding: '5px',
        transition: 'color 0.2s',
    },
    searchContainer: {
        position: 'absolute',
        top: '70px', // Debajo del header
        left: '0',
        width: '100%',
        padding: '10px',
        backgroundColor: '#f8f8f8',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        zIndex: 999,
        display: isSearchVisible ? 'block' : 'none', // Controlado por el estado
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    mobileMenuIcon: {
        fontSize: '1.5rem',
        cursor: 'pointer',
        padding: '5px',
        // Ocultar en desktop (se puede manejar con media queries o dejar en línea para este ejemplo)
        display: window.innerWidth <= 768 ? 'block' : 'none', 
    },
    mobileNav: {
        position: 'absolute',
        top: '70px',
        left: '0',
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 998,
        display: isMobileMenuOpen ? 'flex' : 'none',
        flexDirection: 'column',
        listStyle: 'none',
        padding: '0',
        margin: '0',
    },
    mobileNavItem: {
        padding: '10px 20px',
        width: '100%',
        borderBottom: '1px solid #eee',
        textAlign: 'left',
    }
  };


  return (
      <header style={styles.header}>
      {/* 1. Logo */}
      <div style={styles.logo}>
        <img src={LOGO_PLACEHOLDER} alt="La Celestina - Logo" style={styles.logoImg} />
      </div>

      <div style={styles.headerActions}>
          
          {/* 2. Ícono de búsqueda (usamos lupa emoji) */}
          <div style={styles.icon} onClick={handleSearchClick} title="Buscar">
              🔍
          </div>
          
          {/* 3. Ícono de Usuario (usamos emoji de persona) */}
          <div style={styles.icon} title="Mi Cuenta">
              👤
          </div>

          {/* Ícono de menú de hamburguesa (para móvil) - Usamos emoji */}
          <div style={{...styles.icon, ...styles.mobileMenuIcon}} onClick={handleMobileMenuClick} title="Menú">
              ☰
          </div>
      </div>

      {/* Buscador (condicionalmente visible) - Solo input */}
      <div style={styles.searchContainer}>
          <input type="text" placeholder="Buscar productos..." style={styles.searchInput} />
      </div>

      {/* Menú de navegación móvil (Mantenemos la estructura) */}
      {isMobileMenuOpen && (
          <nav>
              <ul style={styles.mobileNav}>
                  <li style={styles.mobileNavItem}>Home</li>
                  <li style={styles.mobileNavItem}>Destacado</li>
                  <li style={styles.mobileNavItem}>Contacto</li>
                  <li style={styles.mobileNavItem}>Favoritos</li>
                  <li style={styles.mobileNavItem}>Carrito</li> 
              </ul>
          </nav>
      )}
    </header>
  );
};

export default Header;