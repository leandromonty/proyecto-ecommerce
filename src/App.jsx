// src/App.jsx

import React, { useState, useMemo, useCallback } from 'react';
// Componentes de Estructura Principal
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

// Componentes de Contenido
import FeaturedSlider from './components/FeaturedSlider/FeaturedSlider';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import ProductGrid from './components/ProductGrid/ProductGrid';
import Pagination from './components/Pagination/Pagination'; 
import Carrito from './components/Carrito/Carrito'; 
import AdSidebar from './components/AdSidebar/AdSidebar'; // Componente de publicidad

import './App.css';

// --- DATOS INICIALES Y LÓGICA DE ESTADO CENTRAL ---

// CONSTANTE CLAVE PARA PAGINACIÓN
const ITEMS_PER_PAGE = 15; // 3 filas de 5 productos (Web)

const initialProducts = Array.from({ length: 35 }, (_, i) => ({ 
    id: i + 1,
    name: `Producto ${i + 1}`,
    image: `https://placehold.co/200?text=Producto+${i + 1}`,
    price: (i + 1) * 100, 
    category: ['Tartas', 'Budines', 'Muffins', 'Postres Fríos'][i % 4],
    conAzucar: i % 2 === 0, 
    sinTacc: i % 3 === 0,    
    vegano: i % 5 === 0,     
    isFavorite: false,
}));

const featuredProducts = initialProducts.slice(0, 5);
const allCategories = ['Todo', ...new Set(initialProducts.map(p => p.category))];


function App() {
    // --- ESTADO GLOBAL ---
    const [products, setProducts] = useState(initialProducts);
    const [filters, setFilters] = useState({ 
        category: 'Todo', 
        conAzucar: false, 
        sinTacc: false, 
        vegano: false,
        search: '' 
    });
    const [sortOrder, setSortOrder] = useState('default'); // 'default', 'price-asc', 'price-desc'
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Para el sidebar de filtros en móvil
    
    // --- ESTADO DE PAGINACIÓN ---
    const [currentPage, setCurrentPage] = useState(1);
    
    // --- MANEJADORES DE ESTADO ---

    const toggleCartModal = useCallback(() => {
        setIsCartOpen(prev => !prev);
    }, []);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    const handleSearchChange = useCallback((newSearchTerm) => {
        setFilters(prev => ({ ...prev, search: newSearchTerm }));
        setCurrentPage(1); // Resetear a la primera página
    }, []);

    const handleCategoryChange = useCallback((newCategory) => {
        setFilters(prev => ({ ...prev, category: newCategory }));
        setCurrentPage(1); // Resetear a la primera página
    }, []);

    const handleCheckboxChange = useCallback((filterKey) => {
        setFilters(prev => ({ ...prev, [filterKey]: !prev[filterKey] }));
        setCurrentPage(1); // Resetear a la primera página
    }, []);
    
    const handleSortChange = useCallback((newOrder) => {
        setSortOrder(newOrder);
        setCurrentPage(1); // Resetear a la primera página
    }, []);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    // Lógica para añadir/actualizar productos en el carrito
    const handleUpdateCart = useCallback((product, action, quantity) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                const newQuantity = action === 'ADD' || action === 'UPDATE' 
                    ? existingItem.quantity + quantity 
                    : existingItem.quantity - quantity;

                if (newQuantity <= 0) {
                    return prevItems.filter(item => item.id !== product.id);
                }
                return prevItems.map(item => 
                    item.id === product.id ? { ...item, quantity: newQuantity } : item
                );
            } else if (action === 'ADD' && quantity > 0) {
                return [...prevItems, { ...product, quantity }];
            }
            return prevItems;
        });
    }, []);
    
    // Lógica para eliminar completamente del carrito (usado en el modal)
    const handleRemoveFromCartModal = useCallback((productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    }, []);


    // Lógica de Favoritos (Afecta el estado de `products`)
    const handleToggleFavorite = useCallback((productId) => {
        setProducts(prevProducts => prevProducts.map(p => 
            p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
        ));
    }, []);

    // --- LÓGICA DE FILTRADO Y ORDENAMIENTO (useMemo) ---

    const filteredAndSortedProducts = useMemo(() => {
        // 1. Filtrado por Búsqueda (Search)
        const filteredBySearch = products.filter(product => 
            product.name.toLowerCase().includes(filters.search.toLowerCase())
        );

        // 2. Filtrado por Criterios (Categoría y Checkboxes)
        const filteredByCriteria = filteredBySearch.filter(product => {
            const categoryMatch = filters.category === 'Todo' || product.category === filters.category;
            const conAzucarMatch = !filters.conAzucar || product.conAzucar;
            const sinTaccMatch = !filters.sinTacc || product.sinTacc;
            const veganoMatch = !filters.vegano || product.vegano;

            return categoryMatch && conAzucarMatch && sinTaccMatch && veganoMatch;
        });

        // 3. Ordenamiento
        const sortedProducts = [...filteredByCriteria].sort((a, b) => {
            if (sortOrder === 'price-asc') {
                return a.price - b.price;
            }
            if (sortOrder === 'price-desc') {
                return b.price - a.price;
            }
            return a.id - b.id; // Orden por defecto
        });
        
        return sortedProducts;
    }, [products, filters, sortOrder]);

    // --- LÓGICA DE PAGINACIÓN (useMemo) ---
    const totalProducts = filteredAndSortedProducts.length;
    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    // Productos a mostrar en la página actual
    const finalProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

    // --- CONTADORES PARA BADGES ---
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const favoriteItemCount = products.filter(p => p.isFavorite).length;

    return (
        <div className="app-container">
            {/* Header y Nav (Sticky) */}
            <Header 
                onSearchChange={handleSearchChange} 
                onToggleCart={toggleCartModal} 
                onToggleSidebar={toggleSidebar} 
                cartItemCount={cartItemCount} 
            /> 
            <Nav 
                onToggleCart={toggleCartModal} 
                cartItemCount={cartItemCount} 
                favoriteItemCount={favoriteItemCount} 
                onToggleSidebar={toggleSidebar} 
            />
            
            {/* Slider de Destacados */}
            <FeaturedSlider 
                products={featuredProducts} 
                onUpdateCart={handleUpdateCart} 
            />
            
            {/* ✅ CONTENEDOR PRINCIPAL: Grid de 2 COLUMNAS (Web) */}
            <div className="main-content-wrapper">
                
                {/* ⬅️ CLAVE 1: Nuevo contenedor para apilar Filtros y Publicidad */}
                <div className="filter-ad-stack"> 
                    
                    {/* Filtros: Se apilarán primero */}
                    <FilterSidebar 
                        categories={allCategories} // Paso todas las categorías disponibles
                        filters={filters}
                        onCategoryChange={handleCategoryChange}
                        onCheckboxChange={handleCheckboxChange}
                        isSidebarOpen={isSidebarOpen} 
                        onToggleSidebar={toggleSidebar} 
                    />
                    
                    {/* Publicidad: Se apilará ABAJO (gracias al CSS de .filter-ad-stack) */}
                    <AdSidebar /> 
                </div>
                
                {/* COLUMNA 2: Área Principal de Productos */}
                <main className="product-area">
                    {/* Controles de Ordenamiento */}
                    <div className="sort-controls">
                        <label htmlFor="sort-select">Ordenar por:</label>
                        <select 
                            id="sort-select" 
                            value={sortOrder} 
                            onChange={(e) => handleSortChange(e.target.value)}
                        >
                            <option value="default">Por Defecto</option>
                            <option value="price-asc">Precio: Menor a Mayor</option>
                            <option value="price-desc">Precio: Mayor a Menor</option>
                        </select>
                    </div>

                    {/* Grilla de Productos */}
                    <ProductGrid 
                        products={finalProducts} // Productos paginados, filtrados y ordenados
                        onToggleFavorite={handleToggleFavorite}
                        onUpdateCart={handleUpdateCart} 
                        cartItems={cartItems} 
                    />
                    
                    {/* Componente de paginación con props dinámicos */}
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </main>
            </div>

            {/* Footer y Carrito Modal */}
            <Footer />
            
            <Carrito 
                isOpen={isCartOpen} 
                onClose={toggleCartModal} 
                cartItems={cartItems} 
                onUpdateCart={handleUpdateCart} 
                onRemoveFromCart={handleRemoveFromCartModal} 
            />
        </div>
    );
}

export default App;