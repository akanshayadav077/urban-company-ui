import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext, AuthContext } from '../context/AppContexts';
import './Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  
  const [newAddress, setNewAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [upiId, setUpiId] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [savedAddresses, setSavedAddresses] = useState([
    { id: 1, label: 'Home', full: '123 Main St, City 12345' },
    { id: 2, label: 'Office', full: '456 Work Ave, Business District' }
  ]);
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]?.id || '');

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = Math.floor(subtotal * 0.18);
  const total = subtotal + tax;

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/bookings');
    }
  }, [cart.length, navigate]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const isFormValid = selectedAddress !== '' && date && time && paymentMethod;

  const handleSaveAddress = () => {
    if (!newAddress.trim()) return;
    
    const newAddr = {
      id: Date.now(),
      label: newAddress.split(',')[0].trim(),
      full: newAddress.trim()
    };
    
    setSavedAddresses(prev => [newAddr, ...prev]);
    setSelectedAddress(newAddr.id);
    setNewAddress('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const selectedAddrObj = savedAddresses.find(a => a.id === selectedAddress);
    const bookingData = {
      id: Date.now(),
      address: selectedAddrObj?.full,
      date,
      time,
      cart,
      subtotal,
      tax,
      total,
      paymentMethod,
      timestamp: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existing, bookingData]));
    
    clearCart();
    navigate('/bookings?success=true');
  };

  const formatCardNumber = (value) => {
    return value.replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="page-header">
          <h1>Checkout</h1>
          <p>Review your booking details and complete payment</p>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-card">
            <div className="form-section">
              <h3 className="section-title">📍 Delivery Address</h3>
              <div className="radio-group">
                {savedAddresses.map(addr => (
                  <label key={addr.id} className="radio-label">
                    <input
                      type="radio"
                      name="address"
                      value={addr.id}
                      checked={selectedAddress === addr.id}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="radio-input"
                    />
                    <div className="radio-content">
                      <div className="addr-label">{addr.label}</div>
                      <div className="addr-full">{addr.full}</div>
                    </div>
                  </label>
                ))}
                <div className="add-new-addr">
                  <input
                    type="radio"
                    id="new-address"
                    name="address"
                    checked={selectedAddress === ''}
                    onChange={() => setSelectedAddress('')}
                    className="radio-input"
                  />
                  <label htmlFor="new-address" className="radio-label">
                    ➕ Add new address
                  </label>
                  {selectedAddress === '' && (
                    <div className="new-address-input-container">
                      <input
                        type="text"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        placeholder="Enter full address (Street, City, PIN)"
                        className="new-address-input"
                      />
                      <button
                        type="button"
                        onClick={handleSaveAddress}
                        className="save-address-btn"
                        disabled={!newAddress.trim()}
                      >
                        Save Address
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">📅 Booking Details</h3>
              <div className="form-grid">
                <div>
                  <label>Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label>Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">💳 Payment Method</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-icon">💰 COD</div>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-icon">📱 UPI</div>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-icon">💳 Card</div>
                </label>
              </div>

              {paymentMethod === 'upi' && (
                <div className="dynamic-field">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourid@paytm / gpay"
                    className="form-input"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="card-fields">
                  <div className="dynamic-field">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="form-input"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div className="dynamic-field">
                    <label>Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="form-input"
                      value={formatCardNumber(cardNumber)}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ''))}
                    />
                  </div>
                  <div className="form-grid">
                    <div className="dynamic-field">
                      <label>Expiry</label>
                      <input
                        type="month"
                        className="form-input"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div className="dynamic-field">
                      <label>CVV</label>
                      <input
                        type="text"
                        maxLength="4"
                        className="form-input"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className={`confirm-checkout-btn ${isFormValid && !isSubmitting ? '' : 'disabled'}`}
            >
              {isSubmitting ? 'Processing...' : `Confirm Booking (₹${total})`}
            </button>
          </div>

          <div className="checkout-summary-card">
            <h3>Booking Summary</h3>
            {cart.map(item => (
              <div key={item.cartId} className="summary-item">
                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-qty">1 service</div>
                </div>
                <div className="item-price">₹{item.price}</div>
              </div>
            ))}
            <div className="summary-divider"></div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Tax (18%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="summary-total">
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>
            <div className="security-note">
              <span>🔒 Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

