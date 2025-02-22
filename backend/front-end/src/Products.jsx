import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; 
import logo from '../images/logo_inditextech.jpeg';
import "./Products.css";

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    // If products were passed through navigation
    if (location.state?.products) {
      setProducts(location.state.products);
    } else {
      // Fallback: fetch all products
      fetchProducts();
    }
  }, [location]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Productos Similares</h1>
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">{product.price}€</p>
              <p className="brand">{product.brand}</p>
              <div className="actions">
                <a href={product.url} target="_blank" rel="noopener noreferrer" 
                   className="btn btn-primary">Ver en tienda</a>
                <button onClick={() => toggleFavorite(product.id)} className="favorite-btn">
                  <FaHeart color={favorites.has(product.id) ? "red" : "gray"} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-secondary mt-3" onClick={() => navigate('/home')}>
        Volver al inicio
      </button>
    </div>
  );
}

