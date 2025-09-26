// src/App.jsx

import React from 'react';
// Componentes de Estructura Principal
import Header from './components/Header/Header.jsx';
import Nav from './components/Nav/Nav.jsx';
import Footer from './components/Footer/Footer.jsx';

// Componentes de Contenido
import FeaturedSlider from './components/FeaturedSlider/FeaturedSlider.jsx';
import FilterSidebar from './components/FilterSidebar/FilterSidebar.jsx';
import ProductGrid from './components/ProductGrid/ProductGrid.jsx';
import Pagination from './components/Pagination/Pagination.jsx';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      
      {/* 1. SLIDER DE PRODUCTOS DESTACADOS */}
      <FeaturedSlider /> 

      {/* 2. CONTENIDO PRINCIPAL: Filtros/Publicidad + Grilla de Productos */}
      <div className="main-content-wrapper">
        
        {/* Columna de Filtros y Publicidad */}
        <FilterSidebar />
        
        {/* Columna de Grilla de Productos y Paginación */}
        <main className="product-area">
          <ProductGrid />
          <Pagination />
        </main>
      </div>

      {/* 3. FOOTER */}
      <Footer />
    </div>
  );
}

export default App;