import React from 'react';
import './Nav.css';

const Nav = () => {
  return (
    <nav className="nav-sticky">
      {/* Aquí pondremos los links de navegación, como Home, Contacto, etc. */}
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