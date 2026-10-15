import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
    const [showCheckout, setShowCheckout] = useState(false);
    const [formData, setFormData] = useState({ customer_name: '', customer_phone: '', address: '' });
    const [orderSuccess, setOrderSuccess] = useState(false);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

const [expectedDate, setExpectedDate] = useState(''); // ضيف المتغير ده فوق مع الـ States

    const handleCheckout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://watches-store-iml4.vercel.app//api/orders', {
                ...formData,
                total_amount: total,
                items: cartItems
            });
            setExpectedDate(res.data.expectedDelivery); // حفظ تاريخ التوصيل الجاي من الباك إند
            setOrderSuccess(true);
            clearCart();
        } catch (err) {
            alert('حصلت مشكلة أثناء تسجيل الطلب!');
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen pt-32 px-4 flex flex-col items-center">
                <div className="bg-zinc-900 border border-zinc-800 p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full">
                    <div className="text-6xl mb-6">🎉</div>
                    <h2 className="text-3xl font-bold text-yellow-500 mb-4">تم استلام طلبك بنجاح!</h2>
                    <p className="text-zinc-300 mb-4">طريقة الدفع: <span className="font-bold text-white">الدفع عند الاستلام</span></p>
                    <p className="text-zinc-400 mb-8">متوقع وصول الطلب يوم: <span className="text-yellow-500 font-bold">{expectedDate}</span></p>
                    <Link to="/products" className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition inline-block">
                        العودة للمتجر
                    </Link>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-40 px-4 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-white mb-6">سلتك فارغة!</h2>
                <Link to="/products" className="bg-yellow-500 text-zinc-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition">
                    ابدأ التسوق الآن
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 pt-32 pb-16 max-w-5xl min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-8 border-b border-zinc-800 pb-4">سلة المشتريات</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* قائمة المنتجات */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg hover:border-zinc-700 transition">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-xl border border-zinc-700" />
                                <div>
                                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                    <p className="text-yellow-500 text-sm">{item.brand}</p>
                                </div>
                            </div>
                            
                            <div className="flex w-full sm:w-auto items-center justify-between sm:gap-8 bg-zinc-800 sm:bg-transparent p-3 rounded-xl sm:p-0">
                                <div className="text-center">
                                    <p className="font-bold text-lg text-white">{item.quantity}x</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-black text-lg text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-zinc-500 hover:text-red-500 transition font-bold text-sm bg-zinc-800/50 px-3 py-1 rounded-lg">
                                    حذف
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ملخص الدفع والفورم */}
                <div className="lg:col-span-1">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl sticky top-28">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">ملخص الطلب</h3>
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-zinc-400">الإجمالي:</p>
                            <p className="text-3xl font-black text-yellow-500">${total.toFixed(2)}</p>
                        </div>

                        {!showCheckout ? (
                            <button onClick={() => setShowCheckout(true)} className="w-full bg-yellow-500 text-zinc-900 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition cursor-pointer">
                                إتمام الطلب
                            </button>
                        ) : (
                            <form onSubmit={handleCheckout} className="mt-4 space-y-4 animate-fade-in">
                                <input required type="text" placeholder="الاسم بالكامل" className="w-full bg-zinc-800 text-white p-3 rounded-lg border border-zinc-700 outline-none focus:border-yellow-500 transition" onChange={e => setFormData({...formData, customer_name: e.target.value})} />
                                <input required type="text" placeholder="رقم الموبايل" className="w-full bg-zinc-800 text-white p-3 rounded-lg border border-zinc-700 outline-none focus:border-yellow-500 transition" onChange={e => setFormData({...formData, customer_phone: e.target.value})} />
                                <textarea required placeholder="عنوان التوصيل بالتفصيل" className="w-full bg-zinc-800 text-white p-3 rounded-lg border border-zinc-700 outline-none focus:border-yellow-500 transition" rows="3" onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
                                <button type="submit" className="w-full bg-white text-zinc-900 py-3 rounded-xl font-bold hover:bg-zinc-200 transition">
                                    تأكيد الشراء
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}