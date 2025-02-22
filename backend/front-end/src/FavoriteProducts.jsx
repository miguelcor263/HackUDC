import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Products.css';

function FavoriteProducts() {
    const location = useLocation();
    const navigate = useNavigate();
    const products = location.state?.products || [];
    const userState = {
        isLoggedIn: location.state?.isLoggedIn,
        userId: location.state?.userId,
        userName: location.state?.userName,
        userEmail: location.state?.userEmail
    };

    const handleBack = () => {
        navigate('/', { 
            state: userState,
            replace: true 
        });
    };

    return (
        <div className="products-container">
            <button className="btn btn-secondary mb-3" onClick={handleBack}>
                Back to Home
            </button>
            
            <h2 className="mb-4">My Favorite Products</h2>
            
            {products.length === 0 ? (
                <p>No favorite products found.</p>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <div className="product-details">
                                <h3>{product.name}</h3>
                                <p className="price">{product.price}€</p>
                                <a href={product.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    View Product
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FavoriteProducts;
