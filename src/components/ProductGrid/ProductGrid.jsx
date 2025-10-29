import React, { useState } from 'react';
import './ProductGrid.css';
import { FaHeart, FaShoppingCart, FaCheck } from 'react-icons/fa'; 
import { IoIosArrowDown } from 'react-icons/io'; 

const QUANTITY_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];

// Recibe onProductClick para la navegación
const ProductGrid = ({ products, onToggleFavorite, onUpdateCart, cartItems, onProductClick }) => {
    
    // Estado local para la cantidad a agregar antes de presionar el botón
    const [quantities, setQuantities] = useState({}); 
    // Estado local para controlar qué dropdown está abierto
    const [openDropdownId, setOpenDropdownId] = useState(null);


    if (products.length === 0) {
        return <div className="no-results-message">No se encontraron productos que coincidan con los filtros.</div>;
    }
    
    // --- LÓGICA DE CANTIDAD LOCAL ---

    const handleQuantityChangeLocal = (productId, newQuantity) => {
        setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
        setOpenDropdownId(null); // Cerrar el dropdown al seleccionar
    };

    const toggleDropdown = (productId) => {
        setOpenDropdownId(prevId => (prevId === productId ? null : productId));
    };

    // --- LÓGICA DE CARRITO ---

    // Añadir el producto con la cantidad seleccionada localmente
    const handleAddInitial = (product) => {
        const quantity = quantities[product.id] || 1;
        onUpdateCart(product, 'ADD', quantity);
    };

    // Sumar o restar 1 del carrito (control +/- cuando ya está en carrito)
    const handleUpdateCartQuantity = (product, change) => {
        const action = change > 0 ? 'ADD' : 'REMOVE';
        onUpdateCart(product, action, 1); 
    };

    // Verificar si un producto ya está en el carrito
    const isProductInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };
    
    // Obtener la cantidad actual en el carrito
    const getCartQuantity = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };


    return (
        <div className="product-grid">
            {products.map((product) => {
                const initialQuantity = quantities[product.id] || 1;
                const isInCart = isProductInCart(product.id);
                const cartQuantity = getCartQuantity(product.id);

                return (
                    <div key={product.id} className="product-card">
                        
                        {/* Botón de Favorito */}
                        <button 
                            className={`favorite-btn ${product.isFavorite ? 'active' : ''}`}
                            onClick={() => onToggleFavorite(product.id)}
                            title={product.isFavorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
                        >
                            <FaHeart />
                        </button>
                        
                        {/* ENLACE DE IMAGEN: Navega al detalle del producto */}
                        <a 
                            href="#!" 
                            className="product-link"
                            onClick={(e) => { e.preventDefault(); onProductClick(product.id); }}
                        >
                            <img src={product.image} alt={product.name} className="product-image" />
                        </a>

                        <div className="product-info">
                            
                            {/* ENLACE DE NOMBRE: Navega al detalle del producto */}
                            <a 
                                href="#!" 
                                className="product-name"
                                onClick={(e) => { e.preventDefault(); onProductClick(product.id); }}
                            >
                                {product.name}
                            </a>
                            
                            <p className="product-price">${product.price.toLocaleString('es-AR')}</p>

                            <div className="cart-controls">
                                
                                {isInCart ? (
                                    /* --- CONTROL DE CANTIDAD EN CARRITO (+ / -) --- */
                                    <div className="quantity-selector in-cart">
                                        <button 
                                            onClick={() => handleUpdateCartQuantity(product, -1)}
                                            disabled={cartQuantity <= 0} 
                                        >
                                            -
                                        </button>
                                        
                                        <span>
                                            <FaCheck className="check-icon" />
                                            {cartQuantity}
                                        </span>
                                        
                                        <button 
                                            onClick={() => handleUpdateCartQuantity(product, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    /* --- CONTROL INICIAL (Dropdown + Botón) --- */
                                    <div className="add-to-cart-initial">
                                        {/* Dropdown de Cantidad */}
                                        <div className="quantity-dropdown-wrapper">
                                            <button 
                                                className="dropdown-toggle"
                                                onClick={() => toggleDropdown(product.id)}
                                            >
                                                {initialQuantity} un <IoIosArrowDown className={`dropdown-icon ${openDropdownId === product.id ? 'open' : ''}`} />
                                            </button>
                                            
                                            {/* Opciones del Dropdown */}
                                            {openDropdownId === product.id && (
                                                <div className="quantity-dropdown">
                                                    {QUANTITY_OPTIONS.map((qty) => (
                                                        <div 
                                                            key={qty} 
                                                            className={`dropdown-item ${qty === initialQuantity ? 'selected' : ''}`}
                                                            onClick={() => handleQuantityChangeLocal(product.id, qty)}
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
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductGrid;