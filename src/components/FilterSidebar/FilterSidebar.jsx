// src/components/FilterSidebar/FilterSidebar.jsx
import React, { useState } from 'react';
import './FilterSidebar.css';
import { FaChevronDown, FaChevronUp, FaFilter } from 'react-icons/fa'; 

// Lista fija de categorías 
const CATEGORIES = ['Todos', 'Tartas', 'Budines', 'Muffins', 'Postres Fríos'];

//  MANEJA SU VISIBILIDAD MÓVIL
const FilterSidebar = ({ filters, onCategoryChange, onCheckboxChange }) => {
  
  // Estado para la visibilidad del acordeón de filtros adicionales
  const [isCollapseOpen, setIsCollapseOpen] = useState(true); 
  
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Alterna la visibilidad del acordeón
  const toggleCollapse = () => {
    setIsCollapseOpen(!isCollapseOpen);
  };
  
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  // Maneja el clic en los checkboxes 
  const handleCheckboxClick = (e) => {
      onCheckboxChange(e.target.name, e.target.checked);
  };
  

  return (
    <aside className={`filter-sidebar ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
      
      {/* Botón para Abrir/Cerrar el Sidebar en Móvil */}
      {/* Este botón solo es visible en móvil  */}
      <button className="mobile-filter-toggle" onClick={toggleMobileSidebar}>
          <FaFilter /> 
          {isMobileSidebarOpen ? ' Ocultar Filtros' : ' Mostrar Filtros'}
      </button>

      
      <div className="sidebar-content">
        <h2>Filtros</h2>

        {/* --- 1. Botones de Categoria --- */}
        <section className="category-section">
            <h3 className="section-title">Categorías</h3>
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
        </section>


        {/* --- Acordeón para Filtros Adicionales --- */}
        <section className="filter-collapse">
            <button className="collapse-header" onClick={toggleCollapse}>
            <span className="collapse-title">Dietas y Extras</span>
            {isCollapseOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            {isCollapseOpen && (
            <div className="collapse-content">
                {/* Checkbox para Con Azúcar */}
                <label className="checkbox-label">
                    <input 
                        type="checkbox" 
                        name="conAzucar" 
                        checked={filters.conAzucar}
                        onChange={handleCheckboxClick}
                    /> 
                    Con Azúcar
                </label>
                
                {/* Checkbox para Sin TACC */}
                <label className="checkbox-label">
                    <input 
                        type="checkbox" 
                        name="sinTacc" 
                        checked={filters.sinTacc}
                        onChange={handleCheckboxClick}
                    /> 
                    Sin TACC
                </label>
                
                {/* Checkbox para Vegano */}
                <label className="checkbox-label">
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
        </section>


        {/* --- Publicidad (Oculta en móvil) --- */}
        <div className="ad-container">
            <p className="ad-title">PUBLICIDAD</p>
            <img 
            src="https://via.placeholder.com/250x400/e0f2f7/007bff?text=Tu+Anuncio+Aqui" 
            alt="Publicidad de La Celestina" 
            />
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;