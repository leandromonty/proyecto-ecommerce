// src/components/FeaturedSlider/FeaturedSlider.jsx
import React, { useState } from 'react';
import './FeaturedSlider.css';
import { FaShoppingCart } from 'react-icons/fa'; // Importamos el ícono

// La data se pasa desde App.jsx
// Eliminamos la lista featuredProducts y solo usamos las props.

const FeaturedSlider = ({ products, onAddToCart }) => { // Recibe products y onAddToCart

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex === products.length - 1 ? 0 : prevIndex + 1)
        );
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex === 0 ? products.length - 1 : prevIndex - 1)
        );
    };
    
    const currentProduct = products[currentIndex];

    return (
        <div className="slider-section">
            <h2>✨ Productos Destacados</h2>
            <div className="slider-container">
                <button className="slider-btn prev" onClick={goToPrev}>&lt;</button>
                
                <div className="slider-item">
                    <img 
                        src={currentProduct.image} 
                        alt={currentProduct.name} 
                    />
                    <div className="item-info">
                        <h3>{currentProduct.name}</h3>
                        {/* Formato de precio aquí */}
                        <p className="price">${currentProduct.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
                        <button 
                            className="buy-btn"
                            onClick={() => onAddToCart(currentProduct)} // Llama a la prop
                        >
                            <FaShoppingCart /> Añadir al Carrito
                        </button>
                    </div>
                </div>

                <button className="slider-btn next" onClick={goToNext}>&gt;</button>
            </div>
        </div>
    );
};

export default FeaturedSlider;