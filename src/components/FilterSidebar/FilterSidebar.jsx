import React, { useState } from 'react';
import './FilterSidebar.css';
import { IoIosArrowDown } from 'react-icons/io';

// --- LISTA DE CATEGORÍAS (Debe coincidir con App.jsx) ---
const CATEGORY_LIST = ['Tartas', 'Budines', 'Muffins', 'Postres Fríos'];


// --- COMPONENTE COLAPSIBLE REUTILIZABLE (FilterSection) ---
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


// --- COMPONENTE PRINCIPAL (FilterSidebar) ---
const FilterSidebar = ({ 
    filters, // { category: 'Tartas', conAzucar: false, ... }
    onCategoryChange, 
    onCheckboxChange, 
    isSidebarOpen, 
    onToggleSidebar 
}) => {
    
 
    // Lista de las claves de los filtros checkbox
    const checkboxFilters = ['conAzucar', 'sinTacc', 'vegano']; 

    return (
        <aside className={`filter-sidebar ${isSidebarOpen ? 'open' : ''}`}>
            {/* Botón de cierre para móvil */}
            <button className="close-sidebar-btn" onClick={onToggleSidebar}>×</button>

            {/* Filtro por Categorías */}
            <FilterSection title="Categorías" initialOpen={true}>
                <div className="category-buttons">
                    {CATEGORY_LIST.map(category => ( 
                        <button
                            key={category}
                            // 'filters.category' es el filtro activo, lo comparamos con el botón
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

            {/* Filtro de Checkboxes */}
            <FilterSection title="Características" initialOpen={true}>
                <div className="checkbox-filters">
                    {checkboxFilters.map(filterKey => (
                        <div key={filterKey} className="checkbox-item">
                            <input 
                                type="checkbox"
                                id={filterKey}
                                name={filterKey}
                                checked={filters[filterKey]} // Lee el valor booleano del estado 'filters'
                                onChange={() => onCheckboxChange(filterKey)} // Envía la clave para cambiar el estado
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