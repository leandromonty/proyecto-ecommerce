// src/components/ProductCard/ProductCard.jsx

import React, { useState } from 'react';
// Reutilizamos los estilos existentes del ProductGrid
import '../../components/ProductGrid/ProductGrid.css'; 
import { FaHeart, FaShoppingCart, FaCheck } from 'react-icons/fa'; 
import { IoIosArrowDown } from 'react-icons/io'; 

// Opciones de cantidad tomadas de tu ProductGrid.jsx
const QUANTITY_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];

// Componente de Tarjeta de Producto, ahora reusable
const ProductCard = ({ product, isFavorite, onToggleFavorite, onUpdateCart, cartItem }) => {
    
    // Inicializa la cantidad a agregar (usando la cantidad del carrito si ya existe)
    const initialQuantity = cartItem ? cartItem.quantity : 1;
    const [quantityLocal, setQuantityLocal] = useState(initialQuantity); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const handleQuantityChangeLocal = (newQuantity) => {
        setQuantityLocal(newQuantity);
        setIsDropdownOpen(false); 
    };

    const handleAddInitial = (item) => {
        // Llama a la función de App.jsx para agregar al carrito
        onUpdateCart(item, 'ADD', quantityLocal); 
    };

    // Formato de Precio
    const formattedPrice = product.price.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    });
    
    // Verificamos si el producto está en el carrito para mostrar el contador (Requisito del 'Tilde')
    const itemInCart = cartItem && cartItem.quantity > 0;
    
    // Si el producto está en el carrito, mostramos el control de cantidad (+/-)
    const displayCartControls = (itemInCart) => (
        <div className="product-cart-controls">
            <div className="quantity-selector cart-controls-active">
                {/* Botones de + / - que interactúan directamente con el carrito */}
                <button 
                    className="qty-btn minus" 
                    onClick={() => onUpdateCart(product, 'UPDATE', -1)} 
                    disabled={cartItem.quantity <= 1}
                >
                    -
                </button>
                {/* Muestra el contador y el ícono de check (Tilde al Comprar - Requisito PDF) */}
                <span>
                    <FaCheck className="check-icon" />
                    {cartItem.quantity}
                </span>
                <button 
                    className="qty-btn plus" 
                    onClick={() => onUpdateCart(product, 'UPDATE', 1)}
                >
                    +
                </button>
            </div>
        </div>
    );
    
    // Si el producto NO está en el carrito, mostramos el control de agregar (dropdown)
    const displayInitialControls = () => (
        <div className="add-to-cart-control">
            <div className="quantity-dropdown-wrapper">
                <button 
                    className={`dropdown-toggle ${isDropdownOpen ? 'open' : ''}`}
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                >
                    {quantityLocal} un <IoIosArrowDown className="dropdown-icon" />
                </button>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        {QUANTITY_OPTIONS.map(qty => (
                            <div 
                                key={qty} 
                                className={`dropdown-item ${qty === quantityLocal ? 'selected' : ''}`}
                                onClick={() => handleQuantityChangeLocal(qty)}
                            >
                                {qty} un
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Botón grande de Agregar */}
            <button 
                className="add-btn initial"
                onClick={() => handleAddInitial(product)}
            >
                <FaShoppingCart /> Agregar
            </button>
        </div>
    );

    return (
        <div className="product-card">
            {/* Botón de Favorito (Muestra el 'Tilde' cuando isFavorite es true - Requisito PDF) */}
            <button 
                className={`favorite-btn ${isFavorite ? 'active' : ''}`} 
                onClick={() => onToggleFavorite(product.id)}
                title={isFavorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
            >
                {isFavorite ? <FaCheck className="check-icon-favorite" /> : <FaHeart />} 
            </button>

            {/* Imagen del Producto */}
            <img 
                src={product.image} 
                alt={product.name} 
                // Asumiendo que la función de navegación se manejaría aquí
                onClick={() => { /* onProductClick(product.id) */ }}
            />

            <div className="product-info">
                <h3 
                    className="product-name" 
                    onClick={() => { /* onProductClick(product.id) */ }}
                >
                    {product.name}
                </h3>
                <p className="product-price">{formattedPrice}</p>

                {/* Controles: Si está en carrito, muestra (+/-), sino muestra (Dropdown + Agregar) */}
                <div className="product-actions">
                    {itemInCart ? displayCartControls(itemInCart) : displayInitialControls()}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;