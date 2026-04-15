import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext, AuthContext } from '../context/AppContexts';
import './Cart.css';

const DEFAULT_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23e0f2ff;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23f0f9ff;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="600" height="400" fill="url(%23grad)" rx="12"/%3E%3C/svg%3E';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [imageErrors, setImageErrors] = useState({});
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleImageError = (cartId) => {
    setImageErrors(prev => ({ ...prev, [cartId]: true }));
  };

  const getImageUrl = (item) => {
    if (imageErrors[item.cartId]) {
      return DEFAULT_IMAGE;
    }
    return item.image || DEFAULT_IMAGE;
  };

  if (!user) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="empty-icon">🔒</div>
          <h2>Sign in to continue</h2>
          <p>You need to be logged in to view and manage your bookings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>My Bookings</h1>
          <p>{cart.length} service{cart.length !== 1 ? 's' : ''} selected</p>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">📋</div>
            <h2>No bookings yet</h2>
            <p>Explore our services and book one to get started.</p>
          </div>
        ) : (
          <>
            <div className="cart-content">
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.cartId} className="cart-item">
                    <div className="cart-item-image">
                      <img 
                        src={getImageUrl(item)} 
                        alt={item.name}
                        onError={() => handleImageError(item.cartId)}
                      />
                    </div>
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p className="item-description">Premium service</p>
                    </div>
                    <div className="cart-item-price">
                      <span className="price">₹{item.price}</span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="remove-btn"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-card">
                  <h3>Booking Summary</h3>
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax & Fees</span>
                    <span>₹{Math.floor(total * 0.18)}</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row total">
                    <span>Total Amount</span>
                    <span>₹{total + Math.floor(total * 0.18)}</span>
                  </div>
                  <button 
                    className="confirm-btn" 
                    onClick={() => navigate('/checkout')}
                  >
                    Confirm Booking
                  </button>
                  <button className="clear-btn" onClick={clearCart}>
                    Clear Bookings
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

