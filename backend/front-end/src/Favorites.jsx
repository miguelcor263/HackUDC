import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Favorites.css';

export default function Favorites() {
  const location = useLocation();
  const navigate = useNavigate();
  const products = location.state?.products || [];

  const handleBack = () => {
    navigate('/', {
      state: {
        isLoggedIn: location.state?.isLoggedIn,
        userId: location.state?.userId,
        userName: location.state?.userName,
        userEmail: location.state?.userEmail
      }
    });
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <button className="btn-back" onClick={handleBack}>
          <FaArrowLeft /> Back
        </button>
        <h1>My Favorites</h1>
      </div>

      {products.length === 0 ? (
        <div className="no-favorites">
          <p>No favorites added yet</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {products.map((product) => (
            <div key={product.id} className="favorite-item">
              <img src={product.imageUrl} alt={product.name} />
              <div className="favorite-info">
                <h3>{product.name}</h3>
                <p className="price">{product.price}€</p>
                <a href={product.productUrl} target="_blank" rel="noopener noreferrer" className="btn-visit">
                  Visit Store
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
