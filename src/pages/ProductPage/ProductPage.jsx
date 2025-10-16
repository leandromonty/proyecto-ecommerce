// src/pages/ProductPage/ProductPage.jsx
import React, { useState, useCallback } from 'react';
import './ProductPage.css';
import { FaShoppingCart, FaHeart, FaTruck, FaMedal, FaCheck } from 'react-icons/fa';

// Producto de Mockup (usaremos el ID 1 como ejemplo)
const mockProduct = {
    id: 1,
    name: "Tarta de Frutillas Premium",
    image: "https://placehold.co/600x400?text=Tarta+Frutillas",
    price: 1500,
    description: "Nuestra tarta estrella. Base de masa sablé, crema pastelera casera, y frutillas frescas de estación. Ideal para compartir o darte un gusto. Ingredientes 100% naturales, sin conservantes. ¡Simplemente irresistible!",
    stock: 50,
    sku: "CEL-TAR-FRU-001",
    rating: 4.8,
    reviews: 125,
    details: [
        "Apto para celíacos (Sin TACC): No",
        "Vegano: No",
        "Contiene Azúcar: Sí",
        "Conservación: Heladera (Máx. 4 días)",
        "Tamaño: 8 porciones"
    ]
};

// Componente principal ProductPage
const ProductPage = ({ onUpdateCart, onToggleFavorite }) => {
    
    // Estado local para la cantidad y el favorito (simulando estado global)
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    // Formateo de precio
    const priceDisplay = mockProduct.price.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    });

    // Manejador de Cantidad
    const handleQuantityChange = useCallback((change) => {
        setQuantity(prev => Math.max(1, prev + change));
    }, []);

    // Manejador de Carrito
    const handleAddToCart = useCallback(() => {
        // Simulación de la función de App.jsx
        // onUpdateCart(mockProduct, 'ADD', quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000); // Tilde de confirmación
        // Opcional: mostrar un Toast o Modal de confirmación
    }, [quantity]);

    // Manejador de Favorito
    const handleToggleFavoriteLocal = useCallback(() => {
        // onToggleFavorite(mockProduct);
        setIsFavorite(prev => !prev);
    }, []);

    return (
        <div className="product-page-container">
            <div className="product-card-detail">
                
                {/* -------------------- COLUMNA IZQUIERDA: IMAGEN -------------------- */}
                <div className="product-image-section">
                    <img src={mockProduct.image} alt={mockProduct.name} className="main-product-image" />
                    {/* Aquí iría una mini-galería de imágenes */}
                </div>

                {/* -------------------- COLUMNA CENTRAL: INFO PRINCIPAL -------------------- */}
                <div className="product-info-section">
                    
                    {/* Título y Precio */}
                    <h1>{mockProduct.name}</h1>
                    <div className="rating-stock">
                        <span>⭐ {mockProduct.rating} ({mockProduct.reviews} opiniones)</span>
                        <span className={`stock-status ${mockProduct.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                            {mockProduct.stock > 0 ? 'En Stock' : 'Sin Stock'} ({mockProduct.stock} unidades)
                        </span>
                    </div>
                    
                    <p className="product-description">{mockProduct.description}</p>
                    
                    <div className="price-sku">
                        <span className="current-price">{priceDisplay}</span>
                        <span className="sku-id">SKU: {mockProduct.sku}</span>
                    </div>

                    <hr />

                    {/* Controles de Compra: Cantidad y Botones */}
                    <div className="purchase-controls">
                        
                        {/* Selector de Cantidad */}
                        <div className="quantity-selector-lg">
                            <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => handleQuantityChange(1)}>+</button>
                        </div>
                        
                        {/* Botón Añadir al Carrito */}
                        <button 
                            className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
                            onClick={handleAddToCart}
                            disabled={mockProduct.stock === 0}
                        >
                            {addedToCart ? (
                                <>
                                    <FaCheck /> ¡Añadido!
                                </>
                            ) : (
                                <>
                                    <FaShoppingCart /> Añadir {quantity} {quantity === 1 ? 'unidad' : 'unidades'}
                                </>
                            )}
                        </button>

                        {/* Botón de Favorito */}
                        <button 
                            className={`favorite-btn-lg ${isFavorite ? 'active' : ''}`}
                            onClick={handleToggleFavoriteLocal}
                            title="Añadir a Favoritos"
                        >
                            <FaHeart />
                        </button>
                    </div>

                    <hr />

                    {/* Información de Garantía y Envío */}
                    <div className="shipping-guarantees">
                        <div><FaTruck /> Envío Rápido a Domicilio</div>
                        <div><FaMedal /> Calidad y Frescura Garantizada</div>
                    </div>
                </div>

                {/* -------------------- COLUMNA DERECHA: ESPECIFICACIONES (Puede ir en un sidebar) -------------------- */}
                <aside className="product-specs-sidebar">
                    <h3>Detalles y Especificaciones</h3>
                    <ul>
                        {mockProduct.details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>

                    <div className="call-to-action">
                        <h4>¿Preguntas sobre el producto?</h4>
                        <button className="contact-seller-btn">Contactar al Vendedor</button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ProductPage;