// src/components/Nav/Nav.jsx
import React from 'react';
import './Nav.css';

const Nav = () => {
  return (
    <nav className="nav-sticky nav-desktop">
      <ul>
        <li>Home</li>
        <li>Destacado</li>
        <li>Contacto</li>
        <li>Favoritos</li>
        <li>Carrito</li>
      </ul>
    </nav>
  );
};

export default Nav;