import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Contact from './pages/Contact';
import About from './pages/About';
import TrackOrder from './pages/TrackOrder';
import Auth from './pages/Auth';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          {/* مسار تفاصيل المنتج بياخد الـ ID */}
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}