// src/components/FilterSidebar/FilterSidebar.jsx
import React, { useState } from 'react';
import './FilterSidebar.css';

const FilterSidebar = () => {
  
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapseOpen(!isCollapseOpen);
  };

  return (
    <aside className="filter-sidebar">
      <h2>Categorías</h2>

      {/* Botones de Categoria */}
      <div className="category-buttons">
        <button className="category-btn active">Todos</button>
        <button className="category-btn">Tartas</button>
        <button className="category-btn">Budines</button>
        <button className="category-btn">Muffins</button>
        <button className="category-btn">Postres Fríos</button>
      </div>

      {/* /Acordeón para Filtros */}
      <div className="filter-collapse">
        <button className="collapse-header" onClick={toggleCollapse}>
          Filtros Adicionales {isCollapseOpen ? '▲' : '▼'}
        </button>
        
        {isCollapseOpen && (
          <div className="collapse-content">
            {/*checkboxes*/}
            <label><input type="checkbox" /> Con Azúcar</label>
            <label><input type="checkbox" /> Sin TACC</label>
            <label><input type="checkbox" /> Vegano</label>
          </div>
        )}
      </div>

      {/* Publicidad oculta en móvil */}
      <div className="ad-container">
        <p className="ad-title">PUBLICIDAD</p>
        <img 
          src="https://via.placeholder.com/250x400?text=Tu+Anuncio+Aqui" 
          alt="Publicidad lateral" 
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;