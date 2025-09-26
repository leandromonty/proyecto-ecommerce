// src/components/ProductGrid/ProductGrid.jsx
import React from 'react';
import './ProductGrid.css';
// Importamos los íconos necesarios para los botones
import { FaCheck, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa'; 

// ProductGrid ahora solo recibe la lista de productos filtrada y los handlers
const ProductGrid = ({ products, onToggleFavorite, onToggleCart }) => {
    
    const handleToggleFavorite = onToggleFavorite;
    const handleToggleCart = onToggleCart;

    return (
        <div className="product-grid-container">
            {products.length === 0 ? (
                <p className="no-results-message">
                    No se encontraron productos que coincidan con los filtros seleccionados.
                </p>
            ) : (
                products.map(product => (
                    <div key={product.id} className="product-card">
                        
                        {/* Botón de Favoritos con Tilde/Corazón */}
                        <div 
                            className={`fav-icon ${product.isFavorite ? 'active' : ''}`}
                            onClick={() => handleToggleFavorite(product.id)}
                        >
                            {/* Mostramos el corazón relleno si es favorito, sino el contorno */}
                            {product.isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                        </div>

                        <img src={product.image} alt={product.name} />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="product-price">${product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
                            <p className="product-category">Categoría: {product.category}</p>
                            
                            {/* Botón de Comprar con Tilde/Carrito */}
                            <button 
                                className={`buy-btn ${product.isInCart ? 'checked' : ''}`}
                                onClick={() => handleToggleCart(product.id)}
                            >
                                {product.isInCart ? (
                                    <>
                                        <FaCheck /> Agregado
                                    </>
                                ) : (
                                    <>
                                        <FaShoppingCart /> Comprar
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductGrid;