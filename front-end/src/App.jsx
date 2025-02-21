import { useState, useRef } from "react";
import { FaCamera, FaUpload } from "react-icons/fa";
import "./App.css";
import logo from '../images/logo_inditextech.jpeg';

export default function App() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [imageConfirmed, setImageConfirmed] = useState(false); // Nuevo estado
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Función para abrir la cámara
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

  // Función para capturar la imagen desde la cámara
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
      setImageConfirmed(false); // Permitir confirmación
    } else {
      console.error("Error al generar la imagen.");
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setShowCamera(false);
  };

  // Función para subir imagen desde la galería
  const uploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageConfirmed(false); // Permitir confirmación
    }
    setShowPrompt(false);
  };

  // Función para aceptar la imagen seleccionada
  const confirmImage = () => {
    setImageConfirmed(true);
    alert("Imagen confirmada correctamente.");
  };

  // Función para cancelar la selección de imagen
  const cancelImage = () => {
    setImage(null);
    setImageConfirmed(false);
  };

  return (
    <div className="container">
      {/* Logo */}
      <img src={logo} alt="Logo" className="logo" />

      <h1>Subir Imagen 📸</h1>
      <p>Sube una imagen desde tu galería o toma una foto con tu cámara.</p>

      {/* Botón para abrir el prompt */}
      <button className="upload-btn" onClick={() => setShowPrompt(true)}>
        Subir Imagen
      </button>

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
