// src/components/FilterSidebar/FilterSidebar.jsx
import React, { useState } from 'react';
import './FilterSidebar.css';
import { IoIosArrowDown } from 'react-icons/io';

const FilterSection = ({ title, children, initialOpen = true }) => {
    const [isOpen, setIsOpen] = useState(initialOpen);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="filter-section">
            <button className="collapse-toggle" onClick={toggleOpen}>
                <h4 className="section-title">{title}</h4>
                <IoIosArrowDown className={`toggle-icon ${isOpen ? 'open' : ''}`} />
            </button>
            <div className={`section-content ${isOpen ? 'open' : 'closed'}`}>
                {children}
            </div>
        </div>
    );
};

const FilterSidebar = ({ 
    filters, 
    onCategoryChange, 
    onCheckboxChange, 
    isSidebarOpen, 
    onToggleSidebar 
}) => {
    
 
    const categories = Object.keys(filters.categories);
    const checkboxFilters = ['conAzucar', 'sinTacc', 'vegano']; 

    return (
        <aside className={`filter-sidebar ${isSidebarOpen ? 'open' : ''}`}>
            {/* Botón de cierre para móvil */}
            <button className="close-sidebar-btn" onClick={onToggleSidebar}>×</button>
            
            <FilterSection title="Categorías" initialOpen={true}>
                {/* Botones de Categorías en Bloque */}
                <div className="category-buttons">
                    <button 
                        className={`category-btn ${filters.category === '' ? 'active' : ''}`}
                        onClick={() => onCategoryChange('')}
                    >
                        Todas
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-btn ${filters.category === category ? 'active' : ''}`}
                            onClick={() => onCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </FilterSection>
            
            {/* Separador */}
            <hr />

            <FilterSection title="Características" initialOpen={true}>
                {/* Checkboxes de Filtros */}
                <div className="checkbox-filters">
                    {checkboxFilters.map(filterKey => (
                        <div key={filterKey} className="checkbox-item">
                            <input 
                                type="checkbox"
                                id={filterKey}
                                name={filterKey}
                                checked={filters[filterKey]}
                                onChange={() => onCheckboxChange(filterKey)}
                            />
                            <label htmlFor={filterKey}>
                                {filterKey === 'conAzucar' ? 'Con Azúcar' : 
                                 filterKey === 'sinTacc' ? 'Sin TACC' : 
                                 'Vegano'}
                            </label>
                        </div>
                    ))}
                </div>
            </FilterSection>
        </aside>
    );
};

export default FilterSidebar;