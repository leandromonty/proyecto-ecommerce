// src/components/Pagination/Pagination.jsx
import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePrev = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  // No mostrar paginación si solo hay una página o si no hay productos
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button 
        onClick={handlePrev} 
        disabled={!canGoPrevious}
      >
        &laquo; Anterior
      </button>
      
      <span>Página {currentPage} de {totalPages}</span>
      
      <button 
        onClick={handleNext} 
        disabled={!canGoNext}
      >
        Siguiente &raquo;
      </button>
    </div>
  );
};

export default Pagination;