import React, { useState, useEffect } from "react";
import { FaHeart, FaUser } from "react-icons/fa"; 
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";
import video from "../images/stradi_video.mp4";

export default function Home() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState(""); // Añadir estado para email
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: "", password: "" });
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Inicializar estados desde localStorage o location.state
  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');
    const storedUserEmail = localStorage.getItem('userEmail');

    if (location.state?.products) {
      // Si venimos de la página de productos, usar esos datos
      setIsLoggedIn(location.state.isLoggedIn);
      setUserId(location.state.userId);
      setUserName(location.state.userName);
      setUserEmail(location.state.userEmail);
      
      // Actualizar localStorage
      localStorage.setItem('isLoggedIn', location.state.isLoggedIn);
      localStorage.setItem('userId', location.state.userId);
      localStorage.setItem('userName', location.state.userName);
      localStorage.setItem('userEmail', location.state.userEmail);
    } else if (storedLogin) {
      // Si no venimos de productos pero hay datos en localStorage, usarlos
      setIsLoggedIn(storedLogin);
      setUserId(storedUserId);
      setUserName(storedUserName);
      setUserEmail(storedUserEmail);
    }
  }, [location]);

  const sendImageToBackend = async (url) => {
    try {
        console.log("Sending URL to backend:", url);
        const requestBody = { imageUrl: url }; // Send the raw URL, let backend handle encoding
        
        const response = await fetch("http://localhost:8080/api/products/saveProducts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Server error:", errorText);
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Products found:", data);
        
        if (data && data.length > 0) {
            navigate('/products', { 
              state: { 
                products: data,
                isLoggedIn: isLoggedIn,
                userId: userId,
                userName: userName,
                userEmail: userEmail
              } 
            });
        } else {
            alert("No similar products found");
        }
        
    } catch (error) {
        console.error("Error:", error);
        alert("Error processing the image. Please try another URL.");
    }
  };

  const handleURLSubmit = () => {
      if (imageURL.trim() !== "") {
          sendImageToBackend(imageURL);
          setShowPrompt(false);
          setImageURL("");
      } else {
          alert("Please enter a valid URL.");
      }
  };


  const handleHeartClick = async () => {
    if (!isLoggedIn || !userId) {
      alert("Please login to view favorites!");
      setShowLoginForm(true);
      return;
    }
  
    try {
      // Paso 1: Obtener los IDs de productos favoritos
      const favoritesResponse = await fetch(`http://localhost:8080/api/favorite/user/${userId}`);
      if (!favoritesResponse.ok) {
        throw new Error(`Error fetching favorites: ${favoritesResponse.status}`);
      }
      const favorites = await favoritesResponse.json();
      const favoriteIds = favorites.map(fav => fav.productId); // Extraer los product_ids
  
      if (favoriteIds.length === 0) {
        navigate('/favorites', { 
          state: { 
            products: [],
            isLoggedIn: isLoggedIn,
            userId: userId,
            userName: userName,
            userEmail: userEmail
          } 
        });
        return;
      }
  
      // Paso 2: Obtener los detalles de cada producto favorito
      const productsResponse = await fetch('http://localhost:8080/api/products/ids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favoriteIds)
      });
  
      if (!productsResponse.ok) {
        throw new Error(`Error fetching product details: ${productsResponse.status}`);
      }
  
      const favoriteProducts = await productsResponse.json();
      
      navigate('/favorites', { 
        state: { 
          products: favoriteProducts,
          isLoggedIn: isLoggedIn,
          userId: userId,
          userName: userName,
          userEmail: userEmail
        } 
      });
    } catch (error) {
      console.error("Error loading favorites:", error);
      alert("Error loading favorites: " + error.message);
    }
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleUserClick = () => setDrawerOpen(true);

  const handleCloseDrawer = () => {
    const drawerContent = document.querySelector('.drawer');
    if (drawerContent) drawerContent.classList.add('hide');

    setTimeout(() => {
      setDrawerOpen(false);
    }, 500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.name,
          password: userData.password
        })
      });

      if (response.ok) {
        const user = await response.json();
        setIsLoggedIn(true);
        setShowLoginForm(false);
        setUserName(user.username);
        setUserEmail(user.email);
        setUserId(user.id);

        // Guardar en localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userName', user.username);
        localStorage.setItem('userEmail', user.email);
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login error");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ name: "", password: "" });
    setUserName("");
    setUserEmail("");
    setUserId(null);
    setDrawerOpen(false);
    
    // Limpiar localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  };

  const switchTab = (tab) => setActiveTab(tab);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
          email: e.target.email.value,
        }),
      });

      if (response.ok) {
        alert("Registration successful");
        setActiveTab('login');
      } else {
        const error = await response.text();
        alert("Registration error: " + error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registration error");
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div class="app-title">
          <span class="dress2">DRESS2</span> IMPRESS
        </div>
        <div className="d-flex align-items-center">
          <FaHeart className="icon me-3" size={28} onClick={handleHeartClick} />
          {!isLoggedIn ? (
            <button className="btn btn-outline-dark btn-login" onClick={() => setShowLoginForm(true)}>
              Sign In
            </button>
          ) : (
            <button className="btn btn-outline-dark" onClick={handleUserClick}>
              <FaUser size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Background Video */}
      <video width="100%" autoPlay muted loop>
        <source src={video} type="video/mp4" />
        Your browser does not support video playback.
      </video>

      {/* Image URL upload section */}
      <div className="text-center my-4">
        <button className="btn btn-dark btn-lg" onClick={() => setShowPrompt(true)}>
          Enter Image URL
        </button>
      </div>

      {/* URL input modal */}
      {showPrompt && (
        <div className="modal">
          <div className="modal-content text-center">
            <h2>Enter Image URL</h2>
            <input 
              type="text"
              className="form-control mt-3"
              placeholder="Paste image URL here"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={handleURLSubmit}>Submit</button>
            <button className="btn btn-secondary mt-2" onClick={() => setShowPrompt(false)}>Close</button>
          </div>
        </div>
      )}

      {/* User drawer */}
      {drawerOpen && isLoggedIn && (
        <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
          <div className="drawer-content">
            <button className="btn-close" onClick={handleCloseDrawer}></button>
            <h2>User Information</h2>
            <p><strong>Name:</strong> {userName}</p>
            <p><strong>Email:</strong> {userEmail}</p>
            <button className="btn btn-warning" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
      )}

      {/* Login and registration form */}
      {showLoginForm && (
        <div className="login-bubble">
          <div className="login-bubble-content">
            <div className="tab-buttons">
              <button className={`tab-button ${activeTab === 'login' ? 'active' : ''}`} onClick={() => switchTab('login')}>
                Sign In
              </button>
              <button className={`tab-button ${activeTab === 'register' ? 'active' : ''}`} onClick={() => switchTab('register')}>
                Register
              </button>
            </div>

            {activeTab === 'login' && (
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Username" 
                    value={userData.name} 
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Password" 
                    value={userData.password} 
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
                    required 
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary me-3">Sign In</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowLoginForm(false)}>Cancel</button>
                </div>
              </form>
            )}

            {activeTab === 'register' && (
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <input 
                    type="text" 
                    name="username"
                    className="form-control" 
                    placeholder="Username" 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="password" 
                    name="password"
                    className="form-control" 
                    placeholder="Password" 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="email" 
                    name="email"
                    className="form-control" 
                    placeholder="Email" 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
