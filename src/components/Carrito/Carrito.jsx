// src/components/Carrito/Carrito.jsx
import React from 'react';
import './Carrito.css'; 
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa'; 

const CLOSE_ICON = '✕';
const TRASH_ICON = <FaTrashAlt />; 

const Carrito = ({ isOpen, onClose, cartItems, onUpdateCart, onRemoveFromCart }) => {
    if (!isOpen) return null;

    // CÁLCULO 
    const total = cartItems.reduce((sum, item) => {
        const price = typeof item.price === 'number' ? item.price : 0;
        const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
        
        return sum + (price * quantity);
    }, 0);

    const formattedTotal = total.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    });

    return (
        <div className="cart-modal-overlay" onClick={onClose}>
            <div className="cart-modal-content" onClick={e => e.stopPropagation()}>
                
                <header className="modal-header">
                    <h2>🛒 Tu Carrito de Compras</h2>
                    <button className="close-btn" onClick={onClose}>
                        {CLOSE_ICON}
                    </button>
                </header>

                <div className="cart-item-list">
                    {cartItems.length === 0 ? (
                        <p className="empty-cart-message">
                            🛒 Tu carrito está vacío. ¡Añade algunos productos!
                        </p>
                    ) : (
                        cartItems.map(item => {
                            const price = typeof item.price === 'number' ? item.price : 0;
                            const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
                    
                            if (price === 0) {
                                return null; 
                            }
                            
                            return (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} className="item-image" />
                                    
                                    <div className="item-details">
                                        <h3 className="item-name">{item.name}</h3>
                                        <p className="item-price-unit">{`Precio Unitario: $${price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`}</p>
                                        <p className="item-price-subtotal">{`Subtotal: $${(price * quantity).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`}</p>
                                    </div>
                                    
                                    {/* Control de Cantidad (+ / -) */}
                                    <div className="item-quantity-control">
                                        <button 
                                            className="quantity-btn minus" 
                                            onClick={() => onUpdateCart(item, 'UPDATE', -1)} 
                                            title="Disminuir cantidad"
                                        >
                                            -
                                        </button>
                                        <span className="quantity-count">{quantity}</span>
                                        <button 
                                            className="quantity-btn plus" 
                                            onClick={() => onUpdateCart(item, 'UPDATE', 1)} 
                                            title="Aumentar cantidad"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Botón de basura */}
                                    <button 
                                        className="remove-btn" 
                                        onClick={() => onRemoveFromCart(item.id)} 
                                        title="Eliminar producto"
                                    >
                                        {TRASH_ICON}
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {cartItems.length > 0 && (
                    <footer className="modal-footer">
                        <div className="cart-total">
                            <span>TOTAL:</span>
                            <span className="total-amount">{formattedTotal}</span>
                        </div>
                        <button className="checkout-btn">
                            <FaShoppingCart /> Finalizar Compra
                        </button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default Carrito;