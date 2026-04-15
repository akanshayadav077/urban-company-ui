import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext, AuthContext } from '../context/AppContexts';
import { SERVICE_CATEGORIES } from '../constants';
import './Home.css';

const DEFAULT_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23e0f2ff;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23f0f9ff;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="600" height="400" fill="url(%23grad)" rx="12"/%3E%3C/svg%3E';

export default function Home() {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [imageErrors, setImageErrors] = useState({});

  const handleQuickBook = (service) => {
    if (!user) {
      alert('Please sign in to book a service');
      return;
    }
    addToCart(service);
    alert(`${service.name} added to bookings!`);
  };

  const handleImageError = (serviceId) => {
    setImageErrors(prev => ({ ...prev, [serviceId]: true }));
  };

  const getImageUrl = (service) => {
    if (imageErrors[service.id]) {
      return DEFAULT_IMAGE;
    }
    return service.image || DEFAULT_IMAGE;
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Services at Your Doorstep</h1>
          <p className="hero-subtitle">
            Professional services, trusted professionals
          </p>
          <Link to="/services" className="cta-button">
            Explore Services
          </Link>
        </div>
        <div className="hero-image">
          <div className="hero-illustration">✨🏠</div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="featured-services">
        <div className="section-title-wrapper">
          <h2>Popular Services</h2>
          <p>From cleaning to repairs, we've got everything you need</p>
        </div>

        <div className="featured-grid">
          {SERVICE_CATEGORIES.slice(0, 4).map((service) => (
            <div key={service.id} className="featured-card">
              <div className="featured-image">
                <img 
                  src={getImageUrl(service)} 
                  alt={service.name}
                  onError={() => handleImageError(service.id)}
                />
              </div>
              <div className="featured-body">
                <div className="featured-icon">{service.icon}</div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="featured-footer">
                  <span className="featured-price">₹{service.price}</span>
                  <button
                    onClick={() => handleQuickBook(service)}
                    className="featured-btn"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all">
          <Link to="/services" className="view-all-btn">
            View All Services →
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-item">
          <div className="stat-number">50K+</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">10K+</div>
          <div className="stat-label">Services Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">4.8★</div>
          <div className="stat-label">Average Rating</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Available</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to book a service?</h2>
        <p>Browse our complete range of professional services</p>
        {!user ? (
          <div className="cta-buttons">
            <Link to="/signup" className="cta-btn primary">
              Sign Up Free
            </Link>
            <Link to="/login" className="cta-btn secondary">
              Already a member? Login
            </Link>
          </div>
        ) : (
          <Link to="/services" className="cta-btn primary">
            Browse Services
          </Link>
        )}
      </section>
    </div>
  );
}
