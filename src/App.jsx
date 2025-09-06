// src/App.jsx
import React from 'react';
import Header from './components/Header/Header.jsx';
import Nav from './components/Nav/Nav.jsx';
import ProductGrid from './components/ProductGrid/ProductGrid.jsx';
import Pagination from './components/Pagination/Pagination.jsx';
import Footer from './components/Footer/Footer.jsx'; // Importa el componente Footer
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <main>
        <ProductGrid />
        <Pagination />
      </main>
      <Footer /> {/* en proceso*/}
    </div>
  );
}

export default App;