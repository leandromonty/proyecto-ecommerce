import React from 'react';
import './AdSidebar.css';

const AdSidebar = () => {
    return (
        <aside className="ad-sidebar">
            <div className="ad-content">
                <h4>¡Oferta Especial!</h4>
                <p>Postres Fríos 2x1 esta semana. ¡No te lo pierdas!</p>
                <a href="/ofertas" className="ad-link">Ver Ofertas</a>
            </div>
            <div className="ad-placeholder">
                <p>PUBLICIDAD ADICIONAL</p>
                <img 
                    src="/publicidad-la-celestina.png" 
                    alt="Publicidad de La Celestina" 
                    style={{ maxWidth: '100%', display: 'block' }} 
                />
            </div>
        </aside>
    );
};

export default AdSidebar;