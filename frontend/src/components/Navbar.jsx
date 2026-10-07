import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import logoTrans from '../assets/logo-trans.png';

export default function Navbar() {
    const { cartItems } = useContext(CartContext);
    const totalItems = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    
    // قراءة بيانات المستخدم من ذاكرة المتصفح
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/'; 
    };

    return (
        <nav className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 transition-all duration-300 shadow-xl py-1">
            <div className="container mx-auto px-6 flex justify-between items-center">
                
                <Link to="/" className="flex items-center">
                    <img src={logoTrans} alt="Timekeepers Logo" className="h-20 md:h-24 object-contain transform hover:scale-105 transition duration-300" />
                </Link>

                <div className="hidden md:flex gap-8 text-base font-bold text-zinc-300">
                    <Link to="/" className="hover:text-yellow-500 transition">الرئيسية</Link>
                    <Link to="/products" className="hover:text-yellow-500 transition">المنتجات</Link>
                    <Link to="/track" className="hover:text-yellow-500 transition">تتبع طلبي</Link>
                    <Link to="/about" className="hover:text-yellow-500 transition">من نحن</Link>
                    <Link to="/contact" className="hover:text-yellow-500 transition">تواصل معنا</Link>
                </div>

                <div className="flex items-center gap-8">
                    <Link to="/cart" className="relative text-zinc-300 hover:text-yellow-500 transition flex items-center">
                        <FaShoppingCart size={24} />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-3 bg-yellow-500 text-black text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-yellow-500 font-bold text-sm hidden md:block">
                                مرحباً، {user.name.split(' ')[0]}
                            </span>
                            
                            {/* التعديل هنا: الأيقونة تظهر لأي دور غير العميل العادي */}
                            {['admin', 'accountant', 'receptionist'].includes(user.role) && (
                                <Link to="/admin" className="text-zinc-300 hover:text-white transition" title="لوحة الإدارة">
                                    <FaCog size={22} />
                                </Link>
                            )}
                            
                            <button onClick={handleLogout} className="text-zinc-300 hover:text-red-500 transition flex items-center" title="تسجيل الخروج">
                                <FaSignOutAlt size={22} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-2 text-zinc-300 hover:text-white transition">
                            <FaUserCircle size={24} />
                            <span className="hidden sm:block text-sm font-bold">تسجيل الدخول</span>
                        </Link>
                    )}
                    
                </div>
            </div>
        </nav>
    );
}