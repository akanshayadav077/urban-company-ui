import { useContext, useState } from 'react';
import { CartContext, AuthContext } from '../context/AppContexts';
import { SERVICE_CATEGORIES } from '../constants';
import './Services.css';

const DEFAULT_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23e0f2ff;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23f0f9ff;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="600" height="400" fill="url(%23grad)" rx="12"/%3E%3C/svg%3E';

export default function Services() {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [imageErrors, setImageErrors] = useState({});

  const handleBooking = (service) => {
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
    <div className="services-page">
      <div className="services-container">
        <div className="services-header">
          <h1>Our Services</h1>
          <p>Professional services at your doorstep</p>
        </div>

        <div className="services-grid">
          {SERVICE_CATEGORIES.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-image">
                <img 
                  src={getImageUrl(service)} 
                  alt={service.name}
                  onError={() => handleImageError(service.id)}
                />
                <div className="service-overlay">
                  <button
                    onClick={() => handleBooking(service)}
                    className="book-btn"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              <div className="service-content">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.name}</h3>
                <p className="service-desc">{service.description}</p>

                <div className="service-footer">
                  <span className="service-price">₹{service.price}</span>
                  <div className="service-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-count">(500+)</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
