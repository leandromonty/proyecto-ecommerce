// src/App.jsx

import React, { useState, useMemo, useCallback, useEffect } from 'react';
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

// Se eliminan las importaciones temporales de ProductPage y CartPage que estaban rompiendo la aplicación
// import ProductPage from './pages/ProductPage/ProductPage';
// import CartPage from './pages/CartPage/CartPage'; 

import './App.css';

// --- IMPORTACIÓN DE LAS 45 IMÁGENES DE PRODUCTOS ---
// NOTA: Asegúrate de que todos estos archivos .jpeg estén en la carpeta './assets/products/'

import img01 from './assets/products/Box CupCakes Floreado.jpeg';
import img02 from './assets/products/Box de 4 Galletas.jpeg';
import img03 from './assets/products/Box de CupCakes.jpeg';
import img04 from './assets/products/Box San Valentin.jpeg';
import img05 from './assets/products/Brownie con Futilla Crema y Dulce de leche.jpeg';
import img06 from './assets/products/Brownie.jpeg';
import img07 from './assets/products/Budin Clasico Glaseado.jpeg';
import img08 from './assets/products/Budin de Chocolate.jpeg';
import img09 from './assets/products/Budin de Limon.jpeg';
import img10 from './assets/products/Cake Pops.jpeg';
import img11 from './assets/products/Cheesecake.jpeg';
import img12 from './assets/products/Cookies Clasicas.jpeg';
import img13 from './assets/products/CupCakes Harry Stiles .jpeg';
import img14 from './assets/products/CupCakes Marino.jpeg';
import img15 from './assets/products/CupCakes.jpeg';
import img16 from './assets/products/Galletas de la Selva.jpeg';
import img17 from './assets/products/Galletas Love.jpeg';
import img18 from './assets/products/Galletas Mario.jpeg';
import img19 from './assets/products/Galletas navideñas.jpeg';
import img20 from './assets/products/Galletias Comunion.jpeg';
import img21 from './assets/products/Galletitas Marina.jpeg';
import img22 from './assets/products/Lemon Pie.jpeg';
import img23 from './assets/products/Mini Brownie.jpeg';
import img24 from './assets/products/Mini LemonPie.jpeg';
import img25 from './assets/products/Mini Tartas.jpeg';
import img26 from './assets/products/Mix de Masas Finas.jpeg';
import img27 from './assets/products/MixBox.jpeg';
import img28 from './assets/products/MixBox2.jpeg';
import img29 from './assets/products/Pan de Dulce de Chocolate y Nueces.jpeg';
import img30 from './assets/products/Pan Dulce Clasico.jpeg';
import img31 from './assets/products/Rosca de Pascua.jpeg';
import img32 from './assets/products/Tarta Cabsha.jpeg';
import img33 from './assets/products/Tarta de Coco.jpeg';
import img34 from './assets/products/Tarta de Frutilla.jpeg';
import img35 from './assets/products/Tarta de Manzana Invertida.jpeg';
import img36 from './assets/products/Tarta de Nutella.jpeg';
import img37 from './assets/products/Tarta Helada Oreo-Chocolina.jpeg';
import img38 from './assets/products/Torta ButterCream Forma de Corazon.jpeg';
import img39 from './assets/products/Torta ButterCream.jpeg';
import img40 from './assets/products/Torta Chocolina.jpeg';
import img41 from './assets/products/Torta de Hojaldre.jpeg';
import img42 from './assets/products/Torta Especial Chocolate.jpeg';
import img43 from './assets/products/Torta Estilo Coffler.jpeg';
import img44 from './assets/products/Torta Estilo Tailor Swift.jpeg';
import img45 from './assets/products/Torta Fondo del Mar.jpeg';


// --- DATOS INICIALES Y LÓGICA DE ESTADO CENTRAL ---

// CONSTANTE CLAVE PARA PAGINACIÓN
const ITEMS_PER_PAGE = 15; // 3 filas de 5 productos

const initialProducts = Array.from({ length: 45 }, (_, i) => ({ 
    id: i + 1,
    name: `Producto ${i + 1} de La Celestina`,
    // Usamos el índice para mapear con la imagen
    image: [
        img01, img02, img03, img04, img05, img06, img07, img08, img09, img10,
        img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
        img21, img22, img23, img24, img25, img26, img27, img28, img29, img30,
        img31, img32, img33, img34, img35, img36, img37, img38, img39, img40,
        img41, img42, img43, img44, img45
    ][i],
    price: parseFloat((1000 + (i * 150) + (i % 5) * 50).toFixed(2)), // Precios dinámicos
    category: ['Tartas', 'Budines', 'Muffins', 'Postres Fríos', 'Tartas', 'Budines', 'Muffins', 'Postres Fríos', 'Tartas'][i % 4], // 4 categorías
    isFavorite: false,
    conAzucar: i % 3 !== 0, // Aprox. 2/3 con azúcar
    sinTacc: i % 4 === 1, // Aprox. 1/4 sin TACC
    vegano: i % 5 === 0 // Aprox. 1/5 vegano
}));

const App = () => {
    // --- ESTADO CENTRAL ---
    const [products, setProducts] = useState(initialProducts); // Lista principal de productos (incluye favoritos)
    const [cartItems, setCartItems] = useState([]); // Lista de productos en el carrito: [{ id, name, price, quantity, image }]
    const [isCartOpen, setIsCartOpen] = useState(false); // Modal del carrito
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar de filtros para móvil/tablet
    const [searchQuery, setSearchQuery] = useState(''); // Estado de la búsqueda
    const [sortBy, setSortBy] = useState('default'); // Estado del ordenamiento: 'default', 'price-asc', 'price-desc'

    // Estado de Filtros (Category y Checkboxes)
    const [filters, setFilters] = useState({
        category: 'Todos', // 'Todos', 'Tartas', 'Budines', 'Muffins', 'Postres Fríos'
        conAzucar: false,
        sinTacc: false,
        vegano: false
    });

    // --- MANEJADORES DE ESTADO (Callbacks para evitar re-renderizados innecesarios) ---

    // 1. Manejador de Favoritos (Tanto para ProductGrid como para FeaturedSlider)
    const handleToggleFavorite = useCallback((productId) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId
                    ? { ...product, isFavorite: !product.isFavorite }
                    : product
            )
        );
    }, []);
    
    // 2. Manejador del Carrito (Añadir, Quitar, Actualizar Cantidad)
    const handleUpdateCart = useCallback((product, action, quantity) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (action === 'ADD' || action === 'UPDATE') {
                const qty = quantity || 1; // Por defecto 1 si no se especifica

                if (existingItem) {
                    // Actualizar cantidad del existente
                    return prevItems.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: Math.max(0, item.quantity + qty) }
                            : item
                    ).filter(item => item.quantity > 0); // Quitar si la cantidad baja a 0
                } else if (action === 'ADD') {
                    // Añadir nuevo
                    return [...prevItems, { 
                        id: product.id, 
                        name: product.name, 
                        price: product.price, 
                        image: product.image,
                        quantity: qty 
                    }];
                }
            }
            // Para el modal Carrito, el botón de 'x' llama a onRemoveFromCart, no a este.
            return prevItems;
        });
    }, []);

    // 3. Manejador para Quitar Producto del Modal Carrito (Específico para el botón 'x' del modal)
    const handleRemoveFromCartModal = useCallback((productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    }, []);

    // 4. Toggle del Modal Carrito
    const toggleCartModal = useCallback(() => {
        setIsCartOpen(prev => !prev);
    }, []);
    
    // 5. Toggle del Sidebar de Filtros (para Móvil/Tablet)
    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    // 6. Manejador de la Búsqueda
    const handleSearchChange = useCallback((query) => {
        setSearchQuery(query.toLowerCase().trim());
        setCurrentPage(1); // Resetear paginación al buscar
    }, []);

    // 7. Manejador de Ordenamiento
    const handleSortChange = useCallback((event) => {
        setSortBy(event.target.value);
    }, []);

    // 8. Manejador de Filtro por Categoría
    const handleCategoryChange = useCallback((category) => {
        setFilters(prev => ({ ...prev, category }));
        setCurrentPage(1); // Resetear paginación al filtrar
    }, []);

    // 9. Manejador de Filtros por Checkbox
    const handleCheckboxChange = useCallback((key) => {
        setFilters(prev => ({ ...prev, [key]: !prev[key] }));
        setCurrentPage(1); // Resetear paginación al filtrar
    }, []);

    // 10. Lógica de Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
        // Desplazar la vista al inicio de la grilla
        const productGridElement = document.querySelector('.product-area');
        if (productGridElement) {
            productGridElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // --- LÓGICA DE FILTRADO, BÚSQUEDA Y ORDENAMIENTO (useMemo) ---

    const filteredProducts = useMemo(() => {
        let result = products;

        // 1. Filtrar por Búsqueda (Search)
        if (searchQuery) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchQuery)
            );
        }
        

        // 2. Filtrar por Categoría
        if (filters.category && filters.category !== 'Todos') {
            result = result.filter(product => product.category === filters.category);
        }

        // 3. Filtrar por Checkboxes
        if (filters.conAzucar) {
            result = result.filter(product => product.conAzucar);
        }
        if (filters.sinTacc) {
            result = result.filter(product => product.sinTacc);
        }
        if (filters.vegano) {
            result = result.filter(product => product.vegano);
        }

        // 4. Ordenar
        if (sortBy !== 'default') {
            result = [...result].sort((a, b) => {
                if (sortBy === 'price-asc') {
                    return a.price - b.price;
                }
                if (sortBy === 'price-desc') {
                    return b.price - a.price;
                }
                // Si el ordenamiento fuera por nombre, podría ser:
                // return a.name.localeCompare(b.name);
                return 0;
            });
        }

        return result;
    }, [products, searchQuery, filters, sortBy]);

    // --- LÓGICA DE PAGINACIÓN (Basada en los productos filtrados) ---
    
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    // Ajustar la página actual si el filtro o búsqueda la dejó fuera de rango
    // Se ejecuta cada vez que filteredProducts o totalPages cambian
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        } else if (totalPages === 0) {
            setCurrentPage(1); // Si no hay productos, la página es 1 (aunque no se muestre)
        }
    }, [filteredProducts.length, totalPages, currentPage]);


    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const finalProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Contadores para el Nav
    const favoriteItemCount = products.filter(p => p.isFavorite).length;
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);


    // --- RENDERIZADO PRINCIPAL ---

    return (
        <div id="root">
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
            
            {/* Slider de Destacados (usa los primeros 4 productos, sin paginar/filtrar) */}
            <FeaturedSlider 
                products={initialProducts.slice(0, 4)} 
                onUpdateCart={handleUpdateCart} 
            />

            {/* Contenedor Principal con el GRID (Desktop) o layout vertical (Mobile) */}
            <div className="main-content-wrapper">
                
                {/* ✅ COLUMNA 1: FILTROS - Se muestra como Sidebar en Mobile/Tablet */}
                <FilterSidebar 
                    filters={filters}
                    onCategoryChange={handleCategoryChange}
                    onCheckboxChange={handleCheckboxChange}
                    isSidebarOpen={isSidebarOpen} // Para controlar el estado del sidebar en mobile
                    onToggleSidebar={toggleSidebar} // Para cerrarlo en mobile
                    
                />
             

                {/* ✅ COLUMNA 2: PRODUCTOS Y PAGINACIÓN */}
                <main className="product-area">
                    <div className="sort-bar">
                        <label htmlFor="sort-by">Ordenar por:</label>
                        <select 
                            id="sort-by"
                            value={sortBy}
                            onChange={handleSortChange}
                        >
                            <option value="default">Por Defecto</option>
                            <option value="price-asc">Precio: Menor a Mayor</option>
                            <option value="price-desc">Precio: Mayor a Menor</option>
                        </select>
                    </div>
 
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