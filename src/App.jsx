// src/App.jsx

import React, { useState, useMemo } from 'react';
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

// Datos de productos iniciales
const initialProducts = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Producto ${i + 1}`,
    image: `https://placehold.co/200?text=Producto+${i + 1}`,
    price: (i + 1) * 100, // Precio como número
    category: ['Tartas', 'Budines', 'Muffins', 'Postres Fríos'][i % 4],
    conAzucar: i % 2 === 0, 
    sinTacc: i % 3 === 0,    
    vegano: i % 5 === 0,    
    isFavorite: false,
    isInCart: false,
}));

// Productos Destacados 
const featuredProducts = [
    { id: 101, name: 'Tarta de Limón Clásica', image: 'https://placehold.co/300x200?text=Limon', price: 850, category: 'Tartas' },
    { id: 102, name: 'Budín de Naranja y Chocolate', image: 'https://placehold.co/300x200?text=Naranja', price: 620, category: 'Budines' },
    { id: 103, name: 'Muffins de Vainilla y Arándanos', image: 'https://placehold.co/300x200?text=Muffin', price: 400, category: 'Muffins' },
];


function App() {
    
    const [products, setProducts] = useState(initialProducts);
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
   
    const [filters, setFilters] = useState({
        category: 'Todos',
        conAzucar: false,
        sinTacc: false,
        vegano: false,
    });
    const [searchTerm, setSearchTerm] = useState(''); 

  

    
    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    
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
  
    };

    const handleRemoveFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    
    const handleRemoveFromCartModal = (id) => {
        // Remover del modal
        handleRemoveFromCart(id);
        
        
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


    // LÓGICA DE FILTRADO Y BÚSQUEDA 

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            
            const categoryMatch = filters.category === 'Todos' || product.category === filters.category;
            const conAzucarMatch = filters.conAzucar ? product.conAzucar : true;
            const sinTaccMatch = filters.sinTacc ? product.sinTacc : true;
            const veganoMatch = filters.vegano ? product.vegano : true;
            
            const checkboxMatch = conAzucarMatch && sinTaccMatch && veganoMatch;
            
          
            const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            
            return categoryMatch && checkboxMatch && searchMatch;
        });
    }, [products, filters, searchTerm]); // Dependencia del nuevo estado de búsqueda



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
                { }
                <FilterSidebar 
                    filters={filters}
                    onCategoryChange={handleCategoryChange}
                    onCheckboxChange={handleCheckboxChange}
                />
                
                <main className="product-area">
                    { }
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