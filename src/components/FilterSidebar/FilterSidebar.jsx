// src/components/FilterSidebar/FilterSidebar.jsx
import React, { useState } from 'react';
import './FilterSidebar.css';

// Lista fija de categorías (debe coincidir con las usadas en App.jsx)
const CATEGORIES = ['Todos', 'Tartas', 'Budines', 'Muffins', 'Postres Fríos'];

const FilterSidebar = ({ filters, onCategoryChange, onCheckboxChange }) => {
  
  // El estado interno solo maneja la visibilidad del acordeón
  const [isCollapseOpen, setIsCollapseOpen] = useState(true); // Lo dejamos abierto por defecto para mejor visualización

  const toggleCollapse = () => {
    setIsCollapseOpen(!isCollapseOpen);
  };
  
  // Maneja el clic en los checkboxes y notifica a App.jsx
  const handleCheckboxClick = (e) => {
      onCheckboxChange(e.target.name, e.target.checked);
  };
  

  return (
    <aside className="filter-sidebar">
      <h2>Categorías</h2>

      {/* Botones de Categoria */}
      <div className="category-buttons">
        {CATEGORIES.map(category => (
            <button 
                key={category}
                className={`category-btn ${filters.category === category ? 'active' : ''}`}
                onClick={() => onCategoryChange(category)}
            >
                {category}
            </button>
        ))}
      </div>

      {/* Acordeón para Filtros Adicionales */}
      <div className="filter-collapse">
        <button className="collapse-header" onClick={toggleCollapse}>
          Filtros Adicionales {isCollapseOpen ? '▲' : '▼'}
        </button>
        
        {isCollapseOpen && (
          <div className="collapse-content">
            {/* Checkbox para Con Azúcar */}
            <label>
                <input 
                    type="checkbox" 
                    name="conAzucar" 
                    checked={filters.conAzucar}
                    onChange={handleCheckboxClick}
                /> 
                Con Azúcar
            </label>
            
            {/* Checkbox para Sin TACC */}
            <label>
                <input 
                    type="checkbox" 
                    name="sinTacc" 
                    checked={filters.sinTacc}
                    onChange={handleCheckboxClick}
                /> 
                Sin TACC
            </label>
            
            {/* Checkbox para Vegano */}
            <label>
                <input 
                    type="checkbox" 
                    name="vegano" 
                    checked={filters.vegano}
                    onChange={handleCheckboxClick}
                /> 
                Vegano
            </label>
          </div>
        )}
      </div>

      {/* Publicidad oculta en móvil */}
      <div className="ad-container">
        <p className="ad-title">PUBLICIDAD</p>
        <img 
          src="https://via.placeholder.com/250x400?text=Tu+Anuncio+Aqui" 
          alt="Publicidad" 
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;