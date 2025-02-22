import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Products from "./Products";
import FavoriteProducts from './FavoriteProducts';
import "bootstrap/dist/css/bootstrap.min.css";

// Crear el contenedor de la aplicación
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} /> {/* Página de subir imágenes */}
        <Route path="/products" element={<Products />} /> {/* Página para visualizar productos */}
        <Route path="/favorites" element={<FavoriteProducts />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
