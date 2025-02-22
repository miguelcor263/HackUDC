import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
    /*
    if (username === "admin" && password === "1234") {
      navigate("/home"); // Redirige a Home
    } else {
      setError("Usuario o contraseña incorrectos");
    }*/
  };

  return (
    <div className="container text-center mt-5">
      <h2>Bienvenido a Dress2Impress</h2>
      <button className="btn btn-primary mt-3" onClick={() => setShowModal(true)}>
        Iniciar Sesión
      </button>

      {showModal && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content p-4">
              <h2>Iniciar Sesión</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-success me-2">Entrar</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
