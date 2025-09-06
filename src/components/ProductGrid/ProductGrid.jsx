// src/components/ProductGrid/ProductGrid.jsx
import React from 'react';
import './ProductGrid.css';

const ProductGrid = () => {
  // Agregamos de prueba 15 productos para el ejemplo de la grilla
  const products = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    name: `Producto ${i + 1}`,
    image: 'https://via.placeholder.com/150', // Una imagen de ejemplo
  }));

  return (
    <div className="product-grid-container">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h3>{product.name}</h3>
            {/* Aquí Agregaremos el precio, el botón de comprar y el icono de favoritos */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;