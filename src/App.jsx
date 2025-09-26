// src/App.jsx

import React, { useState, useMemo } from 'react';
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

// Productos Destacados (usamos IDs altos para evitar colisiones con initialProducts)
const featuredProducts = [
    { id: 101, name: 'Tarta de Limón Clásica', image: 'https://placehold.co/300x200?text=Limon', price: 850, category: 'Tartas' },
    { id: 102, name: 'Budín de Naranja y Chocolate', image: 'https://placehold.co/300x200?text=Naranja', price: 620, category: 'Budines' },
    { id: 103, name: 'Muffins de Vainilla y Arándanos', image: 'https://placehold.co/300x200?text=Muffin', price: 400, category: 'Muffins' },
];


function App() {
    // --- ESTADOS PRINCIPALES ---
    const [products, setProducts] = useState(initialProducts);
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    // ESTADO DE FILTROS Y BÚSQUEDA
    const [filters, setFilters] = useState({
        category: 'Todos',
        conAzucar: false,
        sinTacc: false,
        vegano: false,
    });
    const [searchTerm, setSearchTerm] = useState(''); // <--- NUEVO ESTADO DE BÚSQUEDA

    // --- MANEJADORES DE ESTADO GENERAL ---

    // Maneja el cambio en el input de búsqueda
    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    // Maneja el toggle de favorito/carrito en la grilla
    const toggleItemState = (id, field) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, [field]: !product[field] } : product
            )
        );
    };

    const handleToggleFavorite = (id) => toggleItemState(id, 'isFavorite');
    const handleToggleCart = (id) => {
        const product = products.find(p => p.id === id);
        if (product.isInCart) {
            handleRemoveFromCart(id);
        } else {
            handleAddToCart(product);
        }
        toggleItemState(id, 'isInCart');
    };

    // --- LÓGICA DE CARRITO ---

    const toggleCartModal = () => setIsCartOpen(!isCartOpen);

    const handleAddToCart = (product) => {
        // Formatear el precio para el carrito (asumiendo que Carrito.jsx maneja el string)
        const priceString = `$${product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
        
        setCartItems(prevItems => [
            ...prevItems,
            { 
                id: product.id, 
                name: product.name, 
                image: product.image, 
                price: priceString 
            }
        ]);
    };

    const handleAddFeaturedToCart = (featuredProduct) => {
        // Para productos destacados, los agregamos directamente al carrito
        const priceString = `$${featuredProduct.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
        setCartItems(prevItems => [
            ...prevItems,
            { 
                id: featuredProduct.id, 
                name: featuredProduct.name, 
                image: featuredProduct.image, 
                price: priceString 
            }
        ]);
        // No actualizamos el estado 'isInCart' de 'products' para los destacados 
        // ya que no están en la lista principal de la grilla.
    };

    const handleRemoveFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Manejador de remoción para el modal de carrito (para productos de la grilla principal)
    const handleRemoveFromCartModal = (id) => {
        // Remover del modal
        handleRemoveFromCart(id);
        
        // Actualizar el tilde de "Agregado" si el producto estaba en la grilla principal
        if (products.some(p => p.id === id)) {
            toggleItemState(id, 'isInCart');
        }
    }


    // Contadores para el Nav
    const cartItemCount = cartItems.length;
    const favoriteItemCount = products.filter(p => p.isFavorite).length;

    // --- LÓGICA DE FILTROS ---

    const handleCategoryChange = (category) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            category: category,
        }));
    };

    const handleCheckboxChange = (name, checked) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: checked,
        }));
    };


    // --- LÓGICA DE FILTRADO Y BÚSQUEDA (USEMEMO) ---

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // 1. Filtro de Categoría
            const categoryMatch = filters.category === 'Todos' || product.category === filters.category;

            // 2. Filtros de Checkbox (todos deben coincidir si están activados)
            const conAzucarMatch = filters.conAzucar ? product.conAzucar : true;
            const sinTaccMatch = filters.sinTacc ? product.sinTacc : true;
            const veganoMatch = filters.vegano ? product.vegano : true;
            
            const checkboxMatch = conAzucarMatch && sinTaccMatch && veganoMatch;
            
            // 3. Filtro de Búsqueda (NUEVO)
            const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            
            return categoryMatch && checkboxMatch && searchMatch;
        });
    }, [products, filters, searchTerm]); // Dependencia del nuevo estado de búsqueda


    // --- RENDERIZADO ---
    return (
        <div className="App">
            
            {/* Header ahora recibe el manejador de búsqueda */}
            <Header onSearchChange={handleSearchChange} /> 
            
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