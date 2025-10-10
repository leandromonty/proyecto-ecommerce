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

import './App.css';

// --- DATOS INICIALES Y LÓGICA DE ESTADO CENTRAL ---
const initialProducts = Array.from({ length: 15 }, (_, i) => ({
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
    { id: 101, name: 'Tarta de Limón Clásica', image: 'https://placehold.co/300x200?text=Limon+Clasico', price: 950, category: 'Tartas', conAzucar: true, sinTacc: false, vegano: false },
    { id: 102, name: 'Budín de Vainilla y Nuez', image: 'https://placehold.co/300x200?text=Vainilla+Nuez', price: 780, category: 'Budines', conAzucar: true, sinTacc: false, vegano: false },
    { id: 103, name: 'Muffins de Chocolate Veganos', image: 'https://placehold.co/300x200?text=Muffins+Veganos', price: 1200, category: 'Muffins', conAzucar: true, sinTacc: false, vegano: true },
];


function App() {
    // 1. Estado de Productos y Carrito
    const [products, setProducts] = useState(initialProducts);
    const [cartItems, setCartItems] = useState([]); 
    const [isCartOpen, setIsCartOpen] = useState(false);

    // 2. Estado de Filtros y Búsqueda
    const [filters, setFilters] = useState({
        category: 'Todos',
        conAzucar: false,
        sinTacc: false,
        vegano: false,
        searchTerm: '',
    });

    // 3. Visibilidad del Sidebar Móvil
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

    //  visibilidad del Sidebar
    const toggleSidebar = useCallback(() => { 
        setIsSidebarOpen(prev => !prev);
    }, []);


    // --- MANEJADORES DE ESTADO (CARRITO) ---

    // Función universal para añadir/modificar/eliminar por cantidad
       const handleUpdateCart = useCallback((productToModify, action = 'ADD', quantityChange = 1) => {
        
        if (!productToModify || typeof productToModify.price !== 'number' || productToModify.price <= 0) {
            console.error("Error al añadir al carrito: Producto sin precio numérico válido.", productToModify);
            return; 
        }

        const productKey = productToModify.id; 

        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === productKey);

            if (action === 'ADD') {
                const newQuantity = existingItem ? existingItem.quantity + quantityChange : quantityChange;
                
                if (existingItem) {
                    return prevItems.map(item =>
                        item.id === productKey
                            ? { ...item, quantity: newQuantity }
                            : item
                    );
                } else {
                    return [...prevItems, { ...productToModify, id: productKey, quantity: quantityChange }];
                }
                
            } else if (action === 'REMOVE' && existingItem) {
 
                const newQuantity = existingItem.quantity - quantityChange; 

                if (newQuantity <= 0) {

                    return prevItems.filter(item => item.id !== productKey);
                } else {
                    return prevItems.map(item =>
                        item.id === productKey
                            ? { ...item, quantity: newQuantity }
                            : item
                    );
                }
            } else if (action === 'DELETE') {

                return prevItems.filter(item => item.id !== productKey);
            }

            return prevItems;
        });
        
    }, []);


    // botón de basura para eliminar completamente un producto 
    const handleRemoveFromCartModal = useCallback((id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }, []);


    // --- MANEJADORES DE ESTADO  ---

    // A. Manejo de Favoritos
    const handleToggleFavorite = useCallback((id) => {
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
            )
        );
    }, []);
    
    // B. Manejo del Modal de Carrito 
    const toggleCartModal = useCallback(() => {
        setIsCartOpen(prev => !prev);
    }, []);

    // C. Manejo de filtros
    const handleCategoryChange = useCallback((category) => {
        setFilters(prevFilters => ({ ...prevFilters, category }));
        if (window.innerWidth <= 768) toggleSidebar(); 
    }, [toggleSidebar]);

    const handleCheckboxChange = useCallback((name, checked) => {
        setFilters(prevFilters => ({ ...prevFilters, [name]: checked }));
    }, []);
    
    // D. Manejo de búsqueda
    const handleSearchChange = useCallback((searchTerm) => {
        setFilters(prevFilters => ({ ...prevFilters, searchTerm: searchTerm.toLowerCase() }));
    }, []);

    
    // --- LÓGICA DE FILTRADO ---
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const categoryMatch = filters.category === 'Todos' || product.category === filters.category;
            const conAzucarMatch = !filters.conAzucar || product.conAzucar;
            const sinTaccMatch = !filters.sinTacc || product.sinTacc;
            const veganoMatch = !filters.vegano || product.vegano;
            const searchMatch = product.name.toLowerCase().includes(filters.searchTerm);

            return categoryMatch && conAzucarMatch && sinTaccMatch && veganoMatch && searchMatch;
        });
    }, [products, filters]);


    // --- CÁLCULOS ---
    const favoriteItemCount = products.filter(p => p.isFavorite).length;
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0); 

    return (
        <div className="App">
            
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

            <div className="main-content-wrapper">
                <FilterSidebar 
                    filters={filters}
                    onCategoryChange={handleCategoryChange}
                    onCheckboxChange={handleCheckboxChange}
                    isSidebarOpen={isSidebarOpen} 
                    onToggleSidebar={toggleSidebar} 
                />
                
                <main className="product-area">
                    <ProductGrid 
                        products={filteredProducts} 
                        onToggleFavorite={handleToggleFavorite}
                        onUpdateCart={handleUpdateCart} 
                        cartItems={cartItems} 
                    />
                    <Pagination />
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