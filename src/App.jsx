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
import AdSidebar from './components/AdSidebar/AdSidebar'; 

import './App.css';

// --- DATOS INICIALES Y LÓGICA DE ESTADO CENTRAL ---

// CONSTANTE CLAVE PARA PAGINACIÓN
const ITEMS_PER_PAGE = 15; // 3 filas de 5 productos

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

const featuredProducts = [
    { id: 101, name: 'Tarta de Frutilla', image: 'https://placehold.co/300?text=Tarta+Frutilla', price: 1500 },
    { id: 102, name: 'Budín de Limón', image: 'https://placehold.co/300?text=Budin+Limon', price: 900 },
    { id: 103, name: 'Muffin de Chocolate', image: 'https://placehold.co/300?text=Muffin+Choco', price: 400 },
];

const initialFilters = {
    category: 'Todos',
    categories: { 'Todos': true, 'Tartas': false, 'Budines': false, 'Muffins': false, 'Postres Fríos': false },
    conAzucar: false,
    sinTacc: false,
    vegano: false,
};

function App() {
    const [products, setProducts] = useState(initialProducts);
    const [cartItems, setCartItems] = useState([]);
    const [filters, setFilters] = useState(initialFilters);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // ESTADO CLAVE PARA PAGINACIÓN
    const [currentPage, setCurrentPage] = useState(1); 

    // --- MANEJADORES DE ESTADO ---

    const toggleCartModal = useCallback(() => {
        setIsCartOpen(prev => !prev);
    }, []);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    const handleSearchChange = useCallback((query) => {
        setSearchQuery(query.toLowerCase());
        setCurrentPage(1); // Resetear a la página 1 en cada búsqueda
    }, []);

    const handleCategoryChange = useCallback((category) => {
        setFilters(prev => ({
            ...prev,
            category,
            categories: Object.keys(prev.categories).reduce((acc, cat) => {
                acc[cat] = cat === category;
                return acc;
            }, {}),
        }));
        setCurrentPage(1); // Resetear a la página 1 al cambiar filtro
    }, []);

    const handleCheckboxChange = useCallback((key) => {
        setFilters(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
        setCurrentPage(1); // Resetear a la página 1 al cambiar filtro
    }, []);

    // --- MANEJADORES DE CARRITO Y FAVORITOS ---

    const handleUpdateCart = useCallback((product, action, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (action === 'ADD' || action === 'UPDATE') {
                if (existingItem) {
                    return prevItems.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: (action === 'ADD' ? item.quantity + quantity : quantity) }
                            : item
                    );
                } else {
                    return [...prevItems, { ...product, quantity: quantity }];
                }
            } else if (action === 'REMOVE') {
                if (existingItem) {
                    const newQuantity = existingItem.quantity - quantity;
                    if (newQuantity <= 0) {
                        return prevItems.filter(item => item.id !== product.id);
                    }
                    return prevItems.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: newQuantity }
                            : item
                    );
                }
            }
            return prevItems;
        });
    }, []);

    const handleRemoveFromCartModal = useCallback((productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    }, []);

    const handleToggleFavorite = useCallback((productId) => {
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
            )
        );
    }, []);

    // --- PAGINACIÓN: MANEJADOR CLAVE ---
    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
        // Opcional: scroll al inicio de la página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // --- LÓGICA DE FILTRADO, BÚSQUEDA Y PAGINACIÓN ---
    const { filteredProducts, totalPages } = useMemo(() => {
        // 1. Aplicar Búsqueda
        let result = products.filter(p =>
            p.name.toLowerCase().includes(searchQuery)
        );

        // 2. Aplicar Filtro de Categoría
        if (filters.category !== 'Todos') {
            result = result.filter(p => p.category === filters.category);
        }

        // 3. Aplicar Filtros Checkbox
        if (filters.conAzucar) {
            result = result.filter(p => p.conAzucar);
        }
        if (filters.sinTacc) {
            result = result.filter(p => p.sinTacc);
        }
        if (filters.vegano) {
            result = result.filter(p => p.vegano);
        }
        
        // 4. Calcular Paginación
        const totalItems = result.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        
        // 5. Aplicar Slice para la página actual
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedProducts = result.slice(startIndex, endIndex);

        return { filteredProducts: paginatedProducts, totalPages };
    }, [products, searchQuery, filters, currentPage]);

    // --- CONTADORES ---
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    const favoriteItemCount = products.filter(p => p.isFavorite).length;


    // --- RENDERIZADO ---
    return (
        <div className="app-container">
            <Header onSearchChange={handleSearchChange} />
            <Nav 
                onToggleCart={toggleCartModal} 
                cartItemCount={cartItemCount} 
                favoriteItemCount={favoriteItemCount} 
                onToggleSidebar={toggleSidebar} 
            />
            
            <FeaturedSlider 
                products={featuredProducts} 
                onUpdateCart={handleUpdateCart} 
            /> 
            
            {/* PUBLICIDAD: DEJAMOS SU UBICACIÓN AQUÍ, FUERA DEL GRID, COMO LO NECESITAS */}
            <AdSidebar />
            
            {/* CONTENEDOR PRINCIPAL CON EL LAYOUT DE FILTROS Y PRODUCTOS (2 COLUMNAS) */}
            <div className="main-content-wrapper">
                
                {/* COLUMNA 1: Filtros */}
                <FilterSidebar 
                    filters={filters}
                    onCategoryChange={handleCategoryChange}
                    onCheckboxChange={handleCheckboxChange}
                    isSidebarOpen={isSidebarOpen} 
                    onToggleSidebar={toggleSidebar} 
                />
                
                {/* COLUMNA 2: Área Principal de Productos */}
                <main className="product-area">
                    <ProductGrid 
                        products={filteredProducts} 
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