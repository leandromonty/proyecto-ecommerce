// src/components/FeaturedSlider/FeaturedSlider.jsx
import React, { useState } from 'react';
import './FeaturedSlider.css';

const featuredProducts = [
  { id: 1, name: 'Tarta de Limón Clásica', image: 'https://via.placeholder.com/300x200?text=Limon', price: '$850' },
  { id: 2, name: 'Budín de Naranja y Chocolate', image: 'https://via.placeholder.com/300x200?text=Naranja', price: '$620' },
  { id: 3, name: 'Muffins de Vainilla', image: 'https://via.placeholder.com/300x200?text=Muffin', price: '$400' },
  { id: 4, name: 'Postre Frío de Frutilla', image: 'https://via.placeholder.com/300x200?text=Frutilla', price: '$980' },
  { id: 5, name: 'Brownie con Nuez', image: 'https://via.placeholder.com/300x200?text=Brownie', price: '$750' },
];

const FeaturedSlider = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {

    setCurrentIndex((prevIndex) => 
      (prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1)
    );
  };

  const goToPrev = () => {
  
    setCurrentIndex((prevIndex) => 
      (prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1)
    );
  };

  return (
    <div className="slider-section">
      <h2>✨ Productos Destacados</h2>
      <div className="slider-container">
        <button className="slider-btn prev" onClick={goToPrev}>&lt;</button>
        
        {/* Mostrar el producto del indice actual */}
        <div className="slider-item">
          <img 
            src={featuredProducts[currentIndex].image} 
            alt={featuredProducts[currentIndex].name} 
          />
          <div className="item-info">
            <h3>{featuredProducts[currentIndex].name}</h3>
            <p className="price">{featuredProducts[currentIndex].price}</p>
            <button className="buy-btn">Ver Detalle</button>
          </div>
        </div>

        <button className="slider-btn next" onClick={goToNext}>&gt;</button>
      </div>
    </div>
  );
};

export default FeaturedSlider;