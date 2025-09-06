// src/App.jsx
import React from 'react';
import Header from './components/Header/Header.jsx';
import Nav from './components/Nav/Nav.jsx';
import ProductGrid from './components/ProductGrid/ProductGrid.jsx'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <ProductGrid /> {/*  grilla de productos  */}
      {/* En proceso */}
    </div>
  );
}

export default App;