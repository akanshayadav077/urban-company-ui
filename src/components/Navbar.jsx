import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, CartContext } from '../context/AppContexts';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🏢</span>
          <span className="brand-text">Urban</span>
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className="nav-link">
              Services
            </Link>
          </li>
          <li>
            <Link to="/bookings" className="nav-link">
              My Bookings
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </Link>
          </li>
        </ul>

        <div className="navbar-auth">
          {user ? (
            <div className="user-menu">
              <span className="user-name">Welcome, {user.name}!</span>
              <button onClick={handleLogout} className="auth-button logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="auth-button login-btn">
                Login
              </Link>
              <Link to="/signup" className="auth-button signup-btn">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
