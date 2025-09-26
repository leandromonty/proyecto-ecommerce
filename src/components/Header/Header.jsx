// src/components/Header/Header.jsx

import React, { useState } from 'react';
import './Header.css';
import Logo from '../../assets/Logo.png'; 
import { FaUser, FaSearch } from 'react-icons/fa';


const Header = ({ onSearchChange }) => { 
  
  
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
  const handleMobileSearchClick = () => {
  
    if (!isMobileSearchVisible) {
      setIsMobileMenuOpen(false);
    }
    setIsMobileSearchVisible(!isMobileSearchVisible);
  };

  
  const handleMobileMenuClick = () => {
    
    if (!isMobileMenuOpen) {
      setIsMobileSearchVisible(false);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  
  const handleInputChange = (e) => {
 
      onSearchChange(e.target.value);
  };


  return (
      <header className="header">
      
      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="La Celestina - Delicias y más" className="logo-img" />
      </div>

      { }
      <div className="social-icons">
        <span>FB</span>
        <span>TW</span>
        <span>IG</span>
      </div>
      
      { }
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

      { }
      <div className="header-actions">
        
        { }
        <div className="user-icon" title="Mi Cuenta">
          <FaUser />
        </div>
        
        { }
        <div className="mobile-search-icon" onClick={handleMobileSearchClick} title="Buscar">
          <FaSearch />
        </div>

        { }
        <div className="mobile-menu-icon" onClick={handleMobileMenuClick} title="Menú">
          ☰
        </div>
      </div>


      { }
      {isMobileSearchVisible && (
        <div className="search-container-mobile">
          <input 
            type="text" 
            placeholder="Buscar productos por nombre..." 
            onChange={handleInputChange} 
          />
        </div>
      )}


      { }
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
