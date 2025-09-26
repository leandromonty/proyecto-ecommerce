// src/components/ProductGrid/ProductGrid.jsx
import React, { useState } from 'react';
import './ProductGrid.css';
import { FaCheck, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa'; 


const initialProducts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    name: `Producto ${i + 1}`,
    image: `https://via.placeholder.com/200?text=Producto+${i + 1}`,
    price: `$${(i + 1) * 100}`,
    isFavorite: false, // Nuevo estado
    isInCart: false,   // Nuevo estado
}));

const ProductGrid = () => {
    // Usamos el estado para manejar los productos y sus tildes
    const [products, setProducts] = useState(initialProducts);

    const toggleItemState = (id, field) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, [field]: !product[field] } : product
            )
        );
    };

    const handleToggleFavorite = (id) => {
        toggleItemState(id, 'isFavorite');
    };

    const handleToggleCart = (id) => {
        toggleItemState(id, 'isInCart');
    };

    return (
        <div className="product-grid-container">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    
                    {/* Botón de Favoritos con Tilde/Corazón */}
                    <div 
                        className={`fav-icon ${product.isFavorite ? 'active' : ''}`}
                        onClick={() => handleToggleFavorite(product.id)}
                    >
                        {product.isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                    </div>

                    <img src={product.image} alt={product.name} />
                    <div className="product-info">
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                        
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
            ))}
        </div>
    );
};

export default ProductGrid;