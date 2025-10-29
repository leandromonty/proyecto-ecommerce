// src/pages/CartPage/CartPage.jsx
import React from 'react';
import './CartPage.css';
import { FaTrashAlt, FaLock, FaCreditCard, FaShippingFast, FaMapMarkerAlt } from 'react-icons/fa';


const mockCartItems = [
    { id: 1, name: "Tarta de Frutillas Premium", price: 1500, quantity: 2, image: "https://placehold.co/100x70?text=Frutillas" },
    { id: 2, name: "Budín de Limón Glaseado", price: 850, quantity: 1, image: "https://placehold.co/100x70?text=Limon" },
    { id: 3, name: "Muffins de Chocolate (x6)", price: 1200, quantity: 1, image: "https://placehold.co/100x70?text=Muffins" },
];

const CartPage = ({ cartItems = mockCartItems, onUpdateCart, onRemoveFromCart }) => {
    
    // Función para calcular el total
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = 350; // Costo de envío de ejemplo
    const total = subtotal + shippingCost;
    
    // Formato de moneda
    const formatCurrency = (amount) => amount.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    });

    if (cartItems.length === 0) {
        return (
            <div className="cart-page-container empty-cart">
                <h2>🛒 Tu Carrito está vacío</h2>
                <p>Parece que aún no has agregado productos. ¡Explora nuestras delicias!</p>
                <button className="back-to-shop-btn">Ir a la Tienda</button>
            </div>
        );
    }

    return (
        <div className="cart-page-container">
            
            {/* -------------------- COLUMNA IZQUIERDA: LISTA DE PRODUCTOS -------------------- */}
            <div className="cart-items-list-section">
                <h2>Mi Carrito ({cartItems.length} productos)</h2>

                {cartItems.map(item => (
                    <div key={item.id} className="cart-item-full">
                        <img src={item.image} alt={item.name} className="item-image" />
                        
                        <div className="item-details">
                            <h3 className="item-name">{item.name}</h3>
                            <span className="item-price-unit">{formatCurrency(item.price)} c/u</span>
                        </div>

                        <div className="item-controls">
                            
                            {/* Selector de Cantidad */}
                            <div className="quantity-selector-cart">
                                <button onClick={() => onUpdateCart && onUpdateCart(item, 'REMOVE', 1)} disabled={item.quantity <= 1}>-</button>
                                <span className="item-quantity-display">{item.quantity}</span>
                                <button onClick={() => onUpdateCart && onUpdateCart(item, 'ADD', 1)}>+</button>
                            </div>
                            
                            {/* Subtotal */}
                            <span className="item-subtotal-price">{formatCurrency(item.price * item.quantity)}</span>
                            
                            {/* Botón Eliminar */}
                            <button 
                                className="remove-item-btn" 
                                onClick={() => onRemoveFromCart && onRemoveFromCart(item.id)}
                                title="Eliminar producto"
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* -------------------- COLUMNA DERECHA: RESUMEN Y CHECKOUT -------------------- */}
            <div className="checkout-sidebar">
                
                {/* 1. Resumen de Pedido */}
                <div className="summary-box order-summary">
                    <h3>Resumen del Pedido</h3>
                    <div className="summary-row">
                        <span>Subtotal ({cartItems.length} items)</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="summary-row">
                        <span><FaShippingFast /> Costo de Envío</span>
                        <span className="shipping-cost">{formatCurrency(shippingCost)}</span>
                    </div>
                    <hr/>
                    <div className="summary-row total-row">
                        <span>Total Final</span>
                        <span className="final-total-amount">{formatCurrency(total)}</span>
                    </div>
                </div>

                {/* 2. Opciones de Envío/Dirección */}
                <div className="summary-box shipping-options">
                    <h3><FaMapMarkerAlt /> Dirección de Envío</h3>
                    <p className="address-placeholder">Av. Siempre Viva 742, Tucumán.</p>
                    <button className="change-address-btn">Modificar Dirección</button>
                </div>

                {/* 3. Métodos de Pago (Simulación de MercadoLibre/Tarjeta) */}
                <div className="summary-box payment-section">
                    <h3><FaCreditCard /> Opciones de Pago</h3>
                    <div className="payment-placeholder">
                        <p>Simulación de Formulario de Tarjeta o Link de Pago (MercadoLibre)</p>
                        <input type="text" placeholder="Número de Tarjeta" disabled />
                        <input type="text" placeholder="Fecha Venc." disabled />
                    </div>
                </div>

                {/* 4. Botón Finalizar Compra */}
                <button className="checkout-final-btn">
                    <FaLock /> Finalizar Compra Segura ({formatCurrency(total)})
                </button>

                <p className="security-text">
                    Transacción cifrada y segura.
                </p>
            </div>
        </div>
    );
};

export default CartPage;