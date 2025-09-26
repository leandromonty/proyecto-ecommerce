// src/components/Carrito/Carrito.jsx
import React from 'react';
import './Carrito.css'; 


const CLOSE_ICON = '✕';
const TRASH_ICON = '🗑️';


const Carrito = ({ isOpen, onClose, cartItems, onRemoveFromCart }) => {
    if (!isOpen) return null;


    const total = cartItems.reduce((sum, item) => {
        const priceString = item.price.replace(/[^\d.,]/g, '');
        const priceNumber = parseFloat(priceString.replace('.', '').replace(',', '.')); 
        
        return sum + (isNaN(priceNumber) ? 0 : priceNumber);
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
                    <h2>Tu Carrito de Compras</h2>
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
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="item-image" />
                                <div className="item-details">
                                    <h3 className="item-name">{item.name}</h3>
                                    <p className="item-price">{item.price}</p>
                                </div>
                                <button 
                                    className="remove-btn" 
                                    onClick={() => onRemoveFromCart(item.id)}
                                    title="Eliminar producto"
                                >
                                    {TRASH_ICON}
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <footer className="modal-footer">
                        <div className="cart-total">
                            <span>TOTAL:</span>
                            <span className="total-amount">{formattedTotal}</span>
                        </div>
                        <button className="checkout-btn">
                            Finalizar Compra
                        </button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default Carrito;