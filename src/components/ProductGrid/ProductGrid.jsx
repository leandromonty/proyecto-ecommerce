// src/components/ProductGrid/ProductGrid.jsx
import React from 'react';
import './ProductGrid.css';
import { FaHeart, FaShoppingCart } from 'react-icons/fa'; 

// Recibe la lista filtrada de productos y los manejadores de eventos 
const ProductGrid = ({ products, onToggleFavorite, onToggleCart }) => {
    
    // Si no hay productos 
    if (products.length === 0) {
        return (
            <div className="no-products-message">
                <p>😔 Lo sentimos, no se encontraron productos que coincidan con la búsqueda o filtros.</p>
                <p>Intenta ajustar tus criterios.</p>
            </div>
        );
    }

   
    const formatPrice = (price) => {
       
        const priceNumber = typeof price === 'number' ? price : 0; 
        return priceNumber.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
        });
    };


    return (
        <section className="product-grid-container">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    
                    {/* Imagen del Producto */}
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-image" 
                    />

                    {/* Contenido de la Tarjeta */}
                    <div className="card-content">
                        
                        <h3 className="product-name">{product.name}</h3>
                        
                        {/* Indicadores de dieta */}
                        <div className="product-tags">
                            {product.conAzucar && <span className="tag sugar">Con Azúcar</span>}
                            {product.sinTacc && <span className="tag tacc">Sin TACC</span>}
                            {product.vegano && <span className="tag vegan">Vegano</span>}
                        </div>

                        {/* Precio */}
                        <p className="product-price">{formatPrice(product.price)}</p>
                        
                        {/* Botones de Acción */}
                        <div className="card-actions">
                            
                            {/* Botón de Favorito */}
                            <button 
                                className={`icon-btn favorite-btn ${product.isFavorite ? 'active' : ''}`}
                                onClick={() => onToggleFavorite(product.id)}
                                title={product.isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos"}
                            >
                                <FaHeart />
                            </button>
                            
                            {/* Botón de Carrito */}
                            <button 
                                className="main-action-btn"
                                onClick={() => onToggleCart(product.id)}
                                title={product.isInCart ? "Producto añadido al carrito" : "Añadir al Carrito"}
                                disabled={product.isInCart} // Deshabilitar si ya está en el carrito
                            >
                                {product.isInCart ? '🛒 Añadido' : <><FaShoppingCart /> Comprar</>}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default ProductGrid;