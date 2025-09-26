// src/App.jsx

import React, { useState } from 'react';
// Componentes de Estructura Principal (Rutas corregidas)
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

// Componentes de Contenido (Rutas corregidas)
import FeaturedSlider from './components/FeaturedSlider/FeaturedSlider';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import ProductGrid from './components/ProductGrid/ProductGrid';
import Pagination from './components/Pagination/Pagination';
import Carrito from './components/Carrito/Carrito'; 

import './App.css';

// Datos de productos iniciales
const initialProducts = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Producto ${i + 1}`,
    image: `https://placehold.co/200?text=Producto+${i + 1}`,
    price: (i + 1) * 100, // Precio como número
    category: ['Tartas', 'Budines', 'Muffins', 'Postres Fríos'][i % 4], // Añadimos categoría
    conAzucar: i % 2 === 0, // 50% con azúcar
    sinTacc: i % 3 === 0,    // 33% sin tacc
    vegano: i % 5 === 0,     // 20% vegano
    isFavorite: false,
    isInCart: false,
}));

// Productos Destacados
const featuredProducts = [
    { id: 101, name: 'Tarta de Limón Clásica', image: 'https://placehold.co/300x200?text=Limon', price: 850, rawPrice: 850 },
    { id: 102, name: 'Budín de Naranja y Chocolate', image: 'https://placehold.co/300x200?text=Naranja', price: 620, rawPrice: 620 },
    { id: 103, name: 'Muffins de Vainilla', image: 'https://placehold.co/300x200?text=Muffin', price: 400, rawPrice: 400 },
];


function App() {
    
    // ESTADO CENTRALIZADO
    const [products, setProducts] = useState(initialProducts); // Lista principal de productos
    const [cartItems, setCartItems] = useState([]);           // Items en el carrito
    const [isCartOpen, setIsCartOpen] = useState(false);      // Modal del carrito

    // ESTADO PARA FILTROS
    const [filters, setFilters] = useState({
        category: 'Todos',
        conAzucar: false,
        sinTacc: false,
        vegano: false,
    });


    // --- MANEJADORES DE FILTROS ---
    const handleCategoryChange = (newCategory) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            category: newCategory
        }));
    };

    const handleCheckboxChange = (filterName, isChecked) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: isChecked
        }));
    };

    // --- LÓGICA DE FILTRADO ---
    
    const filteredProducts = products.filter(product => {
        // 1. Filtrado por Categoría
        if (filters.category !== 'Todos' && product.category !== filters.category) {
            return false;
        }

        // 2. Filtrado por Checkboxes (Adicionales)
        // Solo incluye el producto si el filtro está activo Y el producto cumple la condición
        if (filters.conAzucar && !product.conAzucar) {
            return false;
        }
        if (filters.sinTacc && !product.sinTacc) {
            return false;
        }
        if (filters.vegano && !product.vegano) {
            return false;
        }
        
        // Si pasa todos los filtros
        return true;
    });


    // --- CÁLCULO DE CONTADORES ---
    const favoriteItemCount = products.filter(p => p.isFavorite).length; 
    const cartItemCount = cartItems.length;

    // --- MANEJADORES DE CARRITO Y FAVORITOS ---
    
    const handleToggleFavorite = (productId) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, isFavorite: !product.isFavorite } : product
            )
        );
    };

    const toggleCartModal = () => {
        setIsCartOpen(prev => !prev);
    };
    
    const handleToggleCart = (productId) => {
        let productData = products.find(p => p.id === productId);
        if (!productData) return;

        const newIsInCart = !productData.isInCart;
        
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, isInCart: newIsInCart } : product
            )
        );

        setCartItems(prevCartItems => {
            if (newIsInCart) {
                const price = productData.price;
                const formattedPrice = `$${price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
                
                return [
                    ...prevCartItems,
                    {
                        id: productData.id,
                        name: productData.name,
                        image: productData.image,
                        price: formattedPrice,
                        rawPrice: price, 
                    }
                ];
            } else {
                return prevCartItems.filter(item => item.id !== productId);
            }
        });
    };
    
    const handleRemoveFromCartModal = (productId) => {
        setCartItems(prevCartItems =>
            prevCartItems.filter(item => item.id !== productId)
        );

        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, isInCart: false } : product
            )
        );
    };

    const handleAddFeaturedToCart = (productData) => {
        const price = productData.price;
        const formattedPrice = `$${price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;

        setCartItems(prevCartItems => {
            if (prevCartItems.some(item => item.id === productData.id)) {
                return prevCartItems;
            }
            return [
                ...prevCartItems,
                {
                    id: productData.id,
                    name: productData.name,
                    image: productData.image,
                    price: formattedPrice,
                    rawPrice: price,
                }
            ];
        });
    };

    // --- RENDERIZADO ---
    return (
        <div className="App">
            
            <Header /> 
            
            <Nav 
                onToggleCart={toggleCartModal} 
                cartItemCount={cartItemCount}
                favoriteItemCount={favoriteItemCount} 
            />
            
            <FeaturedSlider products={featuredProducts} onAddToCart={handleAddFeaturedToCart} /> 

            <div className="main-content-wrapper">
                {/* FilterSidebar recibe el estado y los handlers del filtro */}
                <FilterSidebar 
                    filters={filters}
                    onCategoryChange={handleCategoryChange}
                    onCheckboxChange={handleCheckboxChange}
                />
                
                <main className="product-area">
                    {/* ProductGrid recibe la lista de productos FILTRADA */}
                    <ProductGrid 
                        products={filteredProducts} 
                        onToggleFavorite={handleToggleFavorite}
                        onToggleCart={handleToggleCart} 
                    />
                    <Pagination />
                </main>
            </div>

            <Footer />
            
            <Carrito 
                isOpen={isCartOpen} 
                onClose={toggleCartModal} 
                cartItems={cartItems} 
                onRemoveFromCart={handleRemoveFromCartModal}
            />
        </div>
    );
}

export default App;