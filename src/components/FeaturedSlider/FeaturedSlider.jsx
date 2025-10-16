// src/components/FeaturedSlider/FeaturedSlider.jsx
import React, { useState } from 'react';
import './FeaturedSlider.css';
import { FaShoppingCart } from 'react-icons/fa'; 

// Recibe onUpdateCart desde App.jsx
const FeaturedSlider = ({ products, onUpdateCart }) => { 
    
    // 1. HOOKS: Deben declararse al inicio, antes de cualquier 'return'
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityToAdd, setQuantityToAdd] = useState(1); 
    

    // 2. RETORNO ANTICIPADO: Se ejecuta después de la declaración de Hooks
    if (!products || products.length === 0) {
        return <div className="slider-section">No hay productos destacados disponibles.</div>;
    }

    const currentProduct = products[currentIndex];

    // --- MANEJADORES DE SLIDER ---
    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex === products.length - 1 ? 0 : prevIndex + 1)
        );
        setQuantityToAdd(1); 
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex === 0 ? products.length - 1 : prevIndex - 1)
        );
        setQuantityToAdd(1); // Reiniciar cantidad al cambiar de producto
    };
    
    // --- MANEJADORES DE CANTIDAD ---
    const handleQuantityChange = (change) => {
        // Asegura que la cantidad mínima siempre sea 1
        setQuantityToAdd(prev => Math.max(1, prev + change));
    };

    const handleAddToCart = () => {
        // Llama a la función universal de App.jsx
        onUpdateCart(currentProduct, 'ADD', quantityToAdd);
        setQuantityToAdd(1); // Reiniciar la cantidad después de añadir
    };

    // --- CÁLCULO DE DISPLAY ---
    const priceDisplay = typeof currentProduct.price === 'number' 
        ? currentProduct.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })
        : 'Precio no disponible';


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
                        <p className="price">${priceDisplay}</p>
                        
                        {/* Control de Cantidad (+ / -) y Botón de Añadir */}
                        <div className="add-to-cart-control">
                            <div className="quantity-selector">
                                <button 
                                    onClick={() => handleQuantityChange(-1)} 
                                    disabled={quantityToAdd <= 1}
                                >
                                    -
                                </button>
                                <span>{quantityToAdd}</span>
                                <button 
                                    onClick={() => handleQuantityChange(1)}
                                >
                                    +
                                </button>
                            </div>
                            <button 
                                className="buy-btn"
                                onClick={handleAddToCart}
                            >
                                <FaShoppingCart /> Añadir ({quantityToAdd})
                            </button>
                        </div>
                    </div>
                </div>

                <button className="slider-btn next" onClick={goToNext}>&gt;</button>
            </div>
        </div>
    );
};

export default FeaturedSlider;