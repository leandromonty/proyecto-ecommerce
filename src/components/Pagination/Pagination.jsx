// src/components/Pagination/Pagination.jsx
import React from 'react';
import './Pagination.css';

const Pagination = () => {
  return (
    <div className="pagination">
      <button>&laquo; Anterior</button>
      <span>Página 1 de 10</span>
      <button>Siguiente &raquo;</button>
    </div>
  );
};

export default Pagination;