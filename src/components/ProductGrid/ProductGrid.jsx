// src/components/ProductGrid/ProductGrid.jsx
import React, { useState } from 'react';
import './ProductGrid.css';
import { FaHeart, FaShoppingCart, FaCheck } from 'react-icons/fa'; // Importamos FaCheck
import { IoIosArrowDown } from 'react-icons/io'; 

const QUANTITY_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];

const ProductGrid = ({ products, onToggleFavorite, onUpdateCart, cartItems }) => {
    
    const [quantities, setQuantities] = useState({}); 
    const [openDropdownId, setOpenDropdownId] = useState(null);

    if (products.length === 0) {
        return <div className="no-results-message">No se encontraron productos que coincidan con los filtros.</div>;
    }
    
    // Handler para cambiar la cantidad local (Dropdown)
    const handleQuantityChangeLocal = (productId, newQuantity) => {
        setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
        setOpenDropdownId(null); 
    };

    // Handler para añadir el producto (Primer click en 'Agregar')
    const handleAddInitial = (product) => {
        const quantity = quantities[product.id] || 1;
        onUpdateCart(product, 'ADD', quantity);
    };

    // Handler para cambiar la cantidad EN EL CARRITO (Usando el control + / -)
    const handleUpdateCartQuantity = (product, change) => {
        const action = change > 0 ? 'ADD' : 'REMOVE';
        onUpdateCart(product, action, Math.abs(change)); 
    };
    
    // Toggle del dropdown de cantidad
    const toggleDropdown = (productId) => {
        if (!quantities[productId]) {
            setQuantities(prev => ({ ...prev, [productId]: 1 }));
        }
        setOpenDropdownId(openDropdownId === productId ? null : productId);
    };


    return (
        <div className="product-grid">
            {products.map(product => {
                const cartItem = cartItems.find(item => item.id === product.id);
                const itemInCart = cartItem && cartItem.quantity > 0;
                const currentCartQuantity = itemInCart ? cartItem.quantity : 0;
                
                const initialQuantity = quantities[product.id] || 1; 
                
                const priceDisplay = product.price 
                    ? product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })
                    : 'Precio no disponible';
                    
                const isDropdownOpen = openDropdownId === product.id;

                return (
                    <div key={product.id} className="product-card">
                        
                        {/* Ícono de Favorito - Implementamos FaCheck si ya es favorito */}
                        <button 
                            className={`favorite-btn ${product.isFavorite ? 'active' : ''}`}
                            onClick={() => onToggleFavorite(product.id)}
                            title={product.isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                        >
                            { }
                            {product.isFavorite ? <FaCheck className="check-icon" /> : <FaHeart />} 
                        </button>
                        
                        <img src={product.image} alt={product.name} />
                        
                        <div className="product-info">
                            <h3>{product.name}</h3>

                            {/* Etiquetas de Características */}
                            <div className="product-tags">
                                {product.conAzucar && <span className="tag azucar">Con Azúcar</span>}
                                {product.sinTacc && <span className="tag tacc">Sin TACC</span>}
                                {product.vegano && <span className="tag vegano">Vegano</span>}
                            </div>
                            
                            <p className="product-price">${priceDisplay}</p>
                            
                            {/* LÓGICA DE SWITCH: AGREGAR vs. CONTROL DE CANTIDAD */}
                            <div className="add-to-cart-control">
                                
                                {itemInCart ? (
                                    /* El producto YA ESTÁ en el carrito (Control de cantidad compacto) */
                                    <div className="quantity-selector in-cart">
                                        {/* Botón Restar */}
                                        <button 
                                            onClick={() => handleUpdateCartQuantity(product, -1)} 
                                        >
                                            -
                                        </button>
                                   
                                        <span className="cart-qty">
                                            <FaCheck className="check-icon" /> {currentCartQuantity} un
                                        </span>
                                        {/* Botón Sumar */}
                                        <button 
                                            onClick={() => handleUpdateCartQuantity(product, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    /* Dropdown + Botón de Añadir */
                                    <div className="pre-add-controls">
                                        {/* Dropdown de Cantidad Inicial */}
                                        <div className="quantity-dropdown-wrapper">
                                            <button 
                                                className={`quantity-dropdown-button ${isDropdownOpen ? 'open' : ''}`}
                                                onClick={() => toggleDropdown(product.id)}
                                            >
                                                <span>{initialQuantity} un</span>
                                                <IoIosArrowDown />
                                            </button>
                                            
                                            {isDropdownOpen && (
                                                <div className="quantity-dropdown-menu">
                                                    {QUANTITY_OPTIONS.map(qty => (
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