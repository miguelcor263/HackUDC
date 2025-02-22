import { useState, useRef } from "react";
import { FaCamera, FaUpload, FaHeart } from "react-icons/fa"; 
import "./App.css";
import logo from '../images/logo_inditextech.jpeg';

export default function App() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [imageConfirmed, setImageConfirmed] = useState(false);
  const [userName, setUserName] = useState("AI"); // Iniciales del usuario
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);  // Estado para controlar la visibilidad del drawer

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }
      setShowCamera(true);
      setShowPrompt(false);
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
      alert("No se pudo acceder a la cámara.");
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) {
      console.error("No se encontró el video o el canvas.");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.error("El video no está listo para capturar.");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL("image/png");

    if (imageUrl) {
      setImage(imageUrl);
      setImageConfirmed(false);
    } else {
      console.error("Error al generar la imagen.");
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setShowCamera(false);
  };

  const uploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageConfirmed(false);
    }
    setShowPrompt(false);
  };

  const confirmImage = () => {
    setImageConfirmed(true);
    alert("Imagen confirmada correctamente.");
  };

  const cancelImage = () => {
    setImage(null);
    setImageConfirmed(false);
  };

  const handleHeartClick = () => {
    alert("¡Te gusta la aplicación!");
  };

  const handleUserClick = () => {
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);  // Cerrar el drawer
  };

  const handleLogout = () => {
    alert("Has cerrado sesión");
    // Aquí podrías manejar la lógica de cierre de sesión
  };

  return (
    <div className="container">
      {/* Barra superior */}
      <div className="navbar">
        {/* Título de la aplicación */}
        <h1 className="app-title">DRESS2 IMPRESS</h1>

        {/* Logo en la izquierda */}
        <img src={logo} alt="Logo" className="logo" />
        

        {/* Iconos a la derecha */}
        <div className="icons">
          <FaHeart 
            size={24} 
            className="icon" 
            onClick={handleHeartClick} 
          />
          <div 
            className="icon user-icon" 
            onClick={handleUserClick}
          >
            {userName}
          </div>
        </div>
      </div>
      <video width="90%" autoPlay muted loop>
        <source src="images/stradi_video.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>


      <h2>Subir Imagen 📸</h2>

      <p>
        Aquí puedes subir una imagen desde tu galería o tomar una foto con tu cámara. 
        Usa el botón de abajo para elegir cómo deseas subir tu imagen.
      </p>

      {/* Botón para abrir el prompt */}
      <button className="upload-btn" onClick={() => setShowPrompt(true)}>
        Subir Imagen
      </button>
      {/* Drawer con la información del usuario */}
      {/* Drawer con la información del usuario */}
      {drawerOpen && (
        <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
          <div className="drawer-content">
            <button className="close-drawer-btn" onClick={handleCloseDrawer}>✕</button>
            <h2>Información del Usuario</h2>
            <p><strong>Nombre:</strong> {userName}</p>
            <p><strong>Email:</strong> usuario@dominio.com</p>
            <p><strong>Ubicación:</strong> Ciudad, País</p>
            <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      )}


      {/* Modal para elegir opción */}
      {showPrompt && (
        <div className="modal">
        <div className="modal-content">
          <h2>Selecciona una opción</h2>
          <div className="buttons">
            <label className="option-btn">
              <FaUpload size={20} /> Subir desde galería
              <input type="file" accept="image/*" onChange={uploadImage} hidden />
            </label>
            <button className="option-btn" onClick={openCamera}>
              <FaCamera size={20} /> Abrir cámara
            </button>
          </div>
          <button className="close-btn" onClick={() => setShowPrompt(false)}>
            Cerrar
          </button>
        </div>
      </div>
      )}

      {/* Vista previa de la cámara */}
      {showCamera && (
        <div className="camera-container">
          <video ref={videoRef} autoPlay className="video-preview"></video>
          <button className="capture-btn" onClick={captureImage}>Capturar</button>
        </div>
      )}


      {/* Vista previa de la imagen capturada o subida */}
      {image && (
        <div className="image-preview">
          <h3>Imagen seleccionada:</h3>
          <img src={image} alt="Imagen Capturada" />

          {/* Botones de aceptar y cancelar */}
          {!imageConfirmed && (
            <div className="image-actions">
              <button className="accept-btn" onClick={confirmImage}>Aceptar</button>
              <button className="cancel-btn" onClick={cancelImage}>Cancelar</button>
            </div>
          )}
        </div>
      )}

      {/* Canvas oculto para capturar la imagen */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
}
