// src/components/ProductGrid/ProductGrid.jsx
import React from 'react';
import './ProductGrid.css';

// Componente para la grilla de productos
const ProductGrid = () => {
  // Por ahora, simularemos 15 productos para que la grilla tenga contenido
  const products = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    name: `Producto ${i + 1}`,
    image: `https://via.placeholder.com/200?text=Producto+${i + 1}`,
    price: `$${(i + 1) * 100}`,
  }));

  return (
    <div className="product-grid-container">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            {/* Aquí agregaremos el boton de "favoritos" y el botón de "comprar" */}
            <button>Comprar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;