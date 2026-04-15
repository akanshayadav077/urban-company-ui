import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContexts } from './context/AppContexts';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

export default function App() {
  return (
    <Router>
      <AppContexts>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
<Route path="/bookings" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AppContexts>
    </Router>
  );
}
