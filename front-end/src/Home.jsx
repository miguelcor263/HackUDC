import React, { useState, useRef } from "react";
import { FaCamera, FaUpload, FaHeart, FaTimes, FaUser } from "react-icons/fa"; 
import "./Home.css";
import logo from '../images/logo_inditextech.jpeg';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: "", password: "" });
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); // Estado para manejar la pestaña activa (login o registro)

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const navigate = useNavigate();

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setShowCamera(true);
      setShowPrompt(false);
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
      alert("No se pudo acceder a la cámara.");
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageUrl = canvas.toDataURL("image/png");
      setImage(imageUrl);
      setShowImageModal(true);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const sendImageToBackend = async (imageData) => {
    try {
      const response = await fetch('http://localhost:5000/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Productos encontrados:", data.products);
        // Aquí, agrega los productos a la base de datos local o al estado
      } else {
        console.error("Error al procesar la imagen:", data.message);
      }
    } catch (error) {
      console.error("Error al enviar la imagen al backend:", error);
    }
  };

  const uploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setShowImageModal(true);
    }
    setShowPrompt(false);
  };

  const confirmImage = () => {
    sendImageToBackend(image);
    setShowImageModal(false);
    navigate("/products");  // Redirige a productos
  };

  const cancelImage = () => {
    setImage(null);
    setShowImageModal(false);
  };

  const handleHeartClick = () => alert("¡Te gusta la aplicación!");

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleUserClick = () => {
    setDrawerOpen(true); 
  };

  const handleCloseDrawer = () => {
    const drawerContent = document.querySelector('.drawer');
  
    // Añadir la clase "hide" para aplicar el efecto de desvanecimiento
    if (drawerContent) {
      drawerContent.classList.add('hide');
    }

    // Esperar a que termine la transición (500ms) antes de cerrar el estado
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
    const loginBubble = document.querySelector('.login-bubble');
    const drawerContent = document.querySelector('.drawer');
    
    if (loginBubble) {
      loginBubble.classList.add('hide');
    }
    
    if (drawerContent) {
      drawerContent.classList.add('hide');
    }

    setTimeout(() => {
      setIsLoggedIn(false);
      setUserData({ name: "", password: "" });
      setUserName("");
      setDrawerOpen(false); // Cerrar el drawer si es necesario
    }, 500); 
  };

  const closeLoginForm = () => {
    const loginBubble = document.querySelector('.login-bubble');
    if (loginBubble) {
      loginBubble.classList.add('hide');
    }
    setTimeout(() => {
      setShowLoginForm(false);
      setUserData({ name: "", password: "" });
    }, 500); 
  };

  // Cambiar entre Login y Registro
  const switchTab = (tab) => {
    setActiveTab(tab);
  };

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
            <div>
              <button className="btn btn-outline-dark" onClick={handleUserClick}>
                <FaUser size={20}></FaUser>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Video de fondo */}
      <video width="100%" autoPlay muted loop>
        <source src="images/stradi_video.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      {/* Sección de carga de imagen */}
      <div className="text-center my-4">
        {/*<h2>Subir Imagen</h2>
        <p>Sube una imagen o usa la cámara para buscar productos similares.</p>*/}
        <button className="btn btn-dark btn-lg" onClick={() => setShowPrompt(true)}>
          Subir Imagen
        </button>
      </div>

      {/* Modal para elegir opción */}
      {showPrompt && (
        <div className="modal">
          <div className="modal-content text-center">
            <h2>Selecciona una opción</h2>
            <div className="d-flex justify-content-center">
              <label className="btn btn-outline-primary me-3">
                <FaUpload size={20} /> Subir desde galería
                <input type="file" accept="image/*" onChange={uploadImage} hidden />
              </label>
              <button className="btn btn-primary" onClick={openCamera}>
                <FaCamera size={20} /> Abrir cámara
              </button>
            </div>
            <button className="btn btn-secondary mt-3" onClick={() => setShowPrompt(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Vista previa de la cámara */}
      {showCamera && (
        <div className="camera-container">
          <video ref={videoRef} autoPlay className="video-preview"></video>
          <button className="btn btn-danger mt-3" onClick={captureImage}>Capturar</button>
        </div>
      )}

      {/* Vista previa de la imagen subida o capturada */}
      {showImageModal && image && (
        <div className="image-modal">
          <div className="image-modal-content">
            <h3>Imagen seleccionada:</h3>
            <img src={image} alt="Previsualización" className="img-fluid" />
            <div className="confirm-button mt-3">
              <button className="btn btn-outline-primary me-3" onClick={confirmImage}>Aceptar</button>
              <button className="btn btn-outline-primary" onClick={cancelImage}>Cancelar</button>
            </div>
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

      {/* Canvas oculto para capturar imagen */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {/* Formulario de inicio de sesión y registro */}
      {showLoginForm && (
        <div className="login-bubble">
          <div className="login-bubble-content">
            {/* Pestañas de login y registro */}
            <div className="tab-buttons">
              <button className={`tab-button ${activeTab === 'login' ? 'active' : ''}`} onClick={() => switchTab('login')}>
                Iniciar sesión
              </button>
              <button className={`tab-button ${activeTab === 'register' ? 'active' : ''}`} onClick={() => switchTab('register')}>
                Registro
              </button>
            </div>

            {/* Formulario de login */}
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
                  <button type="submit" className="btn btn-primary me-3" onClick={closeLoginForm}>Iniciar sesión</button>
                  <button type="button" className="btn btn-secondary" onClick={closeLoginForm}>Cancelar</button>
                </div>
              </form>
            )}

            {/* Formulario de registro */}
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
                <div className="mb-3">
                  <input type="city" className="form-control" placeholder="Ciudad" />
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
