// src/components/Nav/Nav.jsx
import React, { useCallback } from 'react';
import './Nav.css';
// Importamos FaQuestionCircle para el ícono de ayuda
import { FaHeart, FaShoppingCart, FaFilter, FaQuestionCircle } from 'react-icons/fa'; 

const Nav = ({ onToggleCart, cartItemCount, favoriteItemCount, onToggleSidebar }) => {
    
    // Lista de enlaces de navegación
    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Destacado', href: '#featured' },
        { name: 'Contacto', href: '#contact' },
    ];

    // NUEVO: Manejador para el ícono de Ayuda
    const handleHelpClick = useCallback(() => {
        // En un proyecto real, esto abriría un modal de soporte o redirigiría a la página de FAQ/Ayuda.
        alert("¡Hola! ¿Necesitas ayuda? Puedes contactarnos en contacto@lacelestina.com o visitar la sección FAQ en el Footer.");
    }, []);

    return (
        <nav className="main-nav-bar">
            
            {/* Enlaces de Navegación */}
            <ul className="nav-links">
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <a href={link.href} className="nav-item">{link.name}</a>
                    </li>
                ))}
            </ul>

            {/* Íconos de Contadores, Filtro Móvil y Ayuda */}
            <div className="nav-counters">
                
                {/* Ícono de Filtro (Móvil) */}
                <div 
                    className="nav-icon-wrapper filter-wrapper" 
                    title="Filtrar Productos"
                    onClick={onToggleSidebar} 
                >
                    <FaFilter className="nav-icon mobile-filter-icon" />
                </div>
                
                {/* Contador de Favoritos */}
                <div className="nav-icon-wrapper" title="Ver Favoritos">
                    <FaHeart className="nav-icon" />
                    {favoriteItemCount > 0 && (
                        <span className="counter favorite-counter">{favoriteItemCount}</span>
                    )}
                </div>

                {/* Contador de Carrito */}
                <div 
                    className="nav-icon-wrapper cart-wrapper" 
                    onClick={onToggleCart} 
                    title="Ver Carrito de Compras"
                >
                    <FaShoppingCart className="nav-icon" />
                    {cartItemCount > 0 && (
                        <span className="counter cart-counter">{cartItemCount}</span>
                    )}
                </div>

                {/* NUEVO: Ícono de Ayuda */}
                <div 
                    className="nav-icon-wrapper help-wrapper" 
                    onClick={handleHelpClick} 
                    title="Ayuda / Soporte"
                >
                    <FaQuestionCircle className="nav-icon help-icon" />
                </div>
            </div>
        </nav>
    );
};

export default Nav;