// src/components/Nav/Nav.jsx
import React from 'react';
import './Nav.css';

const CART_ICON = '🛒';
const FAVORITES_ICON = '❤️'; 


const Nav = ({ cartItemCount, onToggleCart, favoriteItemCount }) => {
  return (
    <nav className="nav-sticky nav-desktop">
      <ul>
        <li>Home</li>
        <li>Destacado</li>
        <li>Contacto</li>
        
        {/* Enlace de Favoritos con Badge */}
        <li className="favorites-nav-item">
            <span className="favorites-icon">{FAVORITES_ICON}</span> 
            Favoritos
            {/* Badge condicional para Favoritos */}
            {favoriteItemCount > 0 && <span className="favorites-badge">{favoriteItemCount}</span>} 
        </li>
        
        {/* Enlace del Carrito con Badge */}
        <li onClick={onToggleCart} className="cart-nav-item">
            <span className="cart-icon">{CART_ICON}</span> 
            Carrito
            {/* Badge condicional para Carrito */}
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>} 
        </li>
      </ul>
    </nav>
  );
};

export default Nav;