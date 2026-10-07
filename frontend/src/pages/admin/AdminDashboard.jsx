import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaBoxOpen, FaWarehouse, FaShoppingCart, FaUsers, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import ProductsManager from './ProductsManager';
import InventoryManager from './InventoryManager';
import OrdersManager from './OrdersManager';
import UsersManager from './UsersManager';
import AccountsManager from './AccountsManager'; 
import MessagesManager from './MessagesManager';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser || storedUser.role === 'user') {
            navigate('/login');
        } else {
            setAdmin(storedUser);
            if (storedUser.role === 'receptionist') {
                setActiveTab('orders');
            }
        }
    }, [navigate]);

    if (!admin) return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'products': 
                return admin.role === 'admin' ? <ProductsManager /> : <h1 className="text-white text-2xl">غير مصرح لك</h1>;
            case 'inventory': 
                return ['admin', 'accountant'].includes(admin.role) ? <InventoryManager /> : <h1 className="text-white text-2xl">غير مصرح لك</h1>;
            case 'orders': 
                return <OrdersManager />; 
            case 'users': 
                return admin.role === 'admin' ? <UsersManager /> : <h1 className="text-white text-2xl">غير مصرح لك</h1>;
            case 'messages': 
                return ['admin', 'receptionist'].includes(admin.role) ? <MessagesManager /> : <h1 className="text-white text-2xl">غير مصرح لك</h1>;
            case 'overview': 
            default: 
                // التعديل هنا: استدعاء ملف الحسابات بدلاً من الأرقام الثابتة
                return ['admin', 'accountant'].includes(admin.role) ? <AccountsManager /> : <OrdersManager />;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-black flex" dir="rtl">
            <aside className="w-64 bg-zinc-900 border-l border-zinc-800 flex flex-col sticky top-0 h-screen">
                <div className="p-6 border-b border-zinc-800 text-center">
                    <h2 className="text-2xl font-black text-white">لوحة <span className="text-yellow-500">الإدارة</span></h2>
                    <p className="text-zinc-400 text-xs mt-2 font-bold bg-zinc-800 py-1 rounded-full">{
                        admin.role === 'admin' ? 'مدير النظام' : 
                        admin.role === 'accountant' ? 'محاسب' : 'الاستقبال'
                    }</p>
                </div>
                
                <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                    {['admin', 'accountant'].includes(admin.role) && (
                        <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition cursor-pointer ${activeTab === 'overview' ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:bg-zinc-800'}`}>
                            <FaChartLine size={20} /> الحسابات والإحصائيات
                        </button>
                    )}

                    {admin.role === 'admin' && (
                        <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition cursor-pointer ${activeTab === 'products' ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:bg-zinc-800'}`}>
                            <FaBoxOpen size={20} /> المنتجات (الواجهة)
                        </button>
                    )}

                    {['admin', 'accountant'].includes(admin.role) && (
                        <button onClick={() => setActiveTab('inventory')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition cursor-pointer ${activeTab === 'inventory' ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:bg-zinc-800'}`}>
                            <FaWarehouse size={20} /> المخزن (الجرد)
                        </button>
                    )}

                    <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition cursor-pointer ${activeTab === 'orders' ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:bg-zinc-800'}`}>
                        <FaShoppingCart size={20} /> الطلبات
                    </button>

                    {admin.role === 'admin' && (
                        <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition cursor-pointer ${activeTab === 'users' ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:bg-zinc-800'}`}>
                            <FaUsers size={20} /> الحسابات والموظفين
                        </button>
                    )}

                    {['admin', 'receptionist'].includes(admin.role) && (
                        <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition cursor-pointer ${activeTab === 'messages' ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:bg-zinc-800'}`}>
                            <FaEnvelope size={20} /> رسائل الدعم
                        </button>
                    )}
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-3 rounded-xl font-bold transition cursor-pointer">
                        <FaSignOutAlt size={20} /> تسجيل الخروج
                    </button>
                </div>
            </aside>

            <main className="flex-grow p-8 overflow-y-auto h-screen">
                {renderContent()}
            </main>
        </div>
    );
}