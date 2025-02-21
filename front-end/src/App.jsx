import { useState } from "react";
import { FaCamera, FaUpload } from "react-icons/fa";
import "./App.css";
import logo from '../images/logo_inditextech.jpeg'; // Asegúrate de importar el logo aquí

export default function App() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [image, setImage] = useState(null);

  // Función para abrir la cámara
  const openCamera = () => {
    alert("Aquí puedes integrar la cámara con getUserMedia()");
    setShowPrompt(false);
  };

  // Función para subir imagen desde el explorador
  const uploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
    setShowPrompt(false);
  };

  return (
    <div className="container">
      {/* Logo en la parte superior derecha */}
      <img src={logo} alt="Logo" className="logo" />

      <h1>Subir Imagen 📸</h1>

      <p>
        Aquí puedes subir una imagen desde tu galería o tomar una foto con tu cámara. 
        Usa el botón de abajo para elegir cómo deseas subir tu imagen.
      </p>

      {/* Botón para abrir el prompt */}
      <button className="upload-btn" onClick={() => setShowPrompt(true)}>
        Subir Imagen
      </button>

      {/* Modal (Prompt) */}
      {showPrompt && (
        <div className="modal">
          <div className="modal-content">
            <h2>Selecciona una opción</h2>
            <div className="buttons">
              <button className="option-btn" onClick={openCamera}>
                <FaCamera size={20} /> Abrir cámara
              </button>
              <label className="option-btn">
                <FaUpload size={20} /> Subir desde galería
                <input type="file" accept="image/*" onChange={uploadImage} hidden />
              </label>
            </div>
            <button className="close-btn" onClick={() => setShowPrompt(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Vista previa de la imagen */}
      {image && (
        <div className="image-preview">
          <h3>Imagen seleccionada:</h3>
          <img src={image} alt="Subida" />
        </div>
      )}
    </div>
  );
}
