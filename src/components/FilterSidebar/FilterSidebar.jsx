// src/components/FilterSidebar/FilterSidebar.jsx
import React, { useState } from 'react';
import './FilterSidebar.css';

const CATEGORIES = ['Todos', 'Tartas', 'Budines', 'Muffins', 'Postres Fríos'];

const FilterSidebar = ({ filters, onCategoryChange, onCheckboxChange }) => {
  

  const [isCollapseOpen, setIsCollapseOpen] = useState(true); 

  const toggleCollapse = () => {
    setIsCollapseOpen(!isCollapseOpen);
  };
  
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

      {/* Filtros Adicionales */}
      <div className="filter-collapse">
        <button className="collapse-header" onClick={toggleCollapse}>
          Filtros Adicionales {isCollapseOpen ? '▲' : '▼'}
        </button>
        
        {isCollapseOpen && (
          <div className="collapse-content">
            { }
            <label>
                <input 
                    type="checkbox" 
                    name="conAzucar" 
                    checked={filters.conAzucar}
                    onChange={handleCheckboxClick}
                /> 
                Con Azúcar
            </label>
            
            { }
            <label>
                <input 
                    type="checkbox" 
                    name="sinTacc" 
                    checked={filters.sinTacc}
                    onChange={handleCheckboxClick}
                /> 
                Sin TACC
            </label>
            
            { }
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