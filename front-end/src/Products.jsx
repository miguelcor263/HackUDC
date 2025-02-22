import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa"; 
import logo from '../images/logo_inditextech.jpeg';
import "./Products.css"; // Archivo de estilos

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    fetch("https://fakestoreapi.com/products") // Reemplázalo con tu API real
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
        setError("Error al cargar los productos.");
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
      return newFavorites;
    });
  };

  return (
    <div className="products-container">
      {/* Encabezado con Logo e Icono de Favoritos */}
      <div className="products-header">
        <h1 className="app-title">DRESS2 IMPRESS</h1>
        {/*<h2 className="products-title">Lista de Productos</h2>*/}
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {loading && <p className="loading">Cargando productos...</p>}
      {error && <p className="error">{error}</p>}

      {/* Grilla de Productos */}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            
            {/* Botón de Favorito */}
            <button className="favorite-btn" onClick={() => toggleFavorite(product.id)}>
              <FaHeart size={20} color={favorites.has(product.id) ? "red" : "gray"} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
