import React, { useState } from "react";
import { FaHeart, FaUser } from "react-icons/fa"; 
import "./Home.css";
import logo from '../images/logo_inditextech.jpeg';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [userName, setUserName] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: "", password: "" });
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const navigate = useNavigate();

  const sendImageToBackend = async (url) => {
    try {
        const response = await fetch(`http://localhost:5000/api/products/saveProducts?imageUrl=${encodeURIComponent(url)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.text(); // El backend devuelve un mensaje en texto

        if (response.ok) {
            console.log("Productos guardados en la base de datos:", data);
            alert("Productos guardados exitosamente.");
        } else {
            console.error("Error al procesar la imagen:", data);
            alert("Hubo un error al guardar los productos.");
        }
    } catch (error) {
        console.error("Error al enviar la imagen al backend:", error);
        alert("Error en la conexión con el servidor.");
    }
  };

  const handleURLSubmit = () => {
      if (imageURL.trim() !== "") {
          sendImageToBackend(imageURL);
          setShowPrompt(false);
          setImageURL("");
      } else {
          alert("Por favor, introduce una URL válida.");
      }
  };


  const handleHeartClick = () => alert("¡Te gusta la aplicación!");

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleUserClick = () => setDrawerOpen(true);

  const handleCloseDrawer = () => {
    const drawerContent = document.querySelector('.drawer');
    if (drawerContent) drawerContent.classList.add('hide');

    setTimeout(() => {
      setDrawerOpen(false);
    }, 500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (userData.password === "123") {
      setIsLoggedIn(true);
      setShowLoginForm(false);
      setUserName(userData.name);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ name: "", password: "" });
    setUserName("");
    setDrawerOpen(false);
  };

  const switchTab = (tab) => setActiveTab(tab);

  return (
    <div className="container">
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="app-title">DRESS2 IMPRESS</h1>
        <img src={logo} alt="Logo" className="logo" style={{ width: "20%", height: "auto" }} />
        <div className="d-flex align-items-center">
          <FaHeart className="icon me-3" size={24} onClick={handleHeartClick} />
          {!isLoggedIn ? (
            <button className="btn btn-outline-dark btn-login" onClick={() => setShowLoginForm(true)}>
              Iniciar sesión
            </button>
          ) : (
            <button className="btn btn-outline-dark" onClick={handleUserClick}>
              <FaUser size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Video de fondo */}
      <video width="100%" autoPlay muted loop>
        <source src="images/stradi_video.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      {/* Sección de carga de imagen por URL */}
      <div className="text-center my-4">
        <button className="btn btn-dark btn-lg" onClick={() => setShowPrompt(true)}>
          Ingresar URL de Imagen
        </button>
      </div>

      {/* Modal para ingresar URL */}
      {showPrompt && (
        <div className="modal">
          <div className="modal-content text-center">
            <h2>Introduce la URL de la imagen</h2>
            <input 
              type="text"
              className="form-control mt-3"
              placeholder="Pega aquí la URL de la imagen"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={handleURLSubmit}>Enviar</button>
            <button className="btn btn-secondary mt-2" onClick={() => setShowPrompt(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Drawer usuario */}
      {drawerOpen && isLoggedIn && (
        <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
          <div className="drawer-content">
            <button className="btn-close" onClick={handleCloseDrawer}></button>
            <h2>Información del Usuario</h2>
            <p><strong>Nombre:</strong> {userName}</p>
            <p><strong>Email:</strong> usuario@dominio.com</p>
            <p><strong>Ubicación:</strong> Ciudad, País</p>
            <button className="btn btn-warning" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      )}

      {/* Formulario de inicio de sesión y registro */}
      {showLoginForm && (
        <div className="login-bubble">
          <div className="login-bubble-content">
            <div className="tab-buttons">
              <button className={`tab-button ${activeTab === 'login' ? 'active' : ''}`} onClick={() => switchTab('login')}>
                Iniciar sesión
              </button>
              <button className={`tab-button ${activeTab === 'register' ? 'active' : ''}`} onClick={() => switchTab('register')}>
                Registro
              </button>
            </div>

            {activeTab === 'login' && (
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Nombre de usuario" 
                    value={userData.name} 
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Contraseña" 
                    value={userData.password} 
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
                    required 
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary me-3">Iniciar sesión</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowLoginForm(false)}>Cancelar</button>
                </div>
              </form>
            )}

            {activeTab === 'register' && (
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Nombre de usuario" />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="Contraseña" />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Correo electrónico" />
                </div>
                <button className="btn btn-primary">Registrarse</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
