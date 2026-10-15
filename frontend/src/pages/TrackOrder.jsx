import { useState } from 'react';
import axios from 'axios';

export default function TrackOrder() {
    const [phone, setPhone] = useState('');
    const [orders, setOrders] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleTrack = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`https://watches-store-iml4.vercel.app//api/orders/track/${phone}`);
            setOrders(res.data);
            setSearched(true);
        } catch (err) {
            alert('حصلت مشكلة أثناء البحث عن الطلبات');
        }
    };

    return (
        <div className="pt-32 min-h-screen container mx-auto px-6 max-w-3xl">
            <h1 className="text-3xl font-bold text-white mb-8 border-b border-zinc-800 pb-4">تتبع طلباتك</h1>
            
            <form onSubmit={handleTrack} className="flex gap-4 mb-10">
                <input 
                    type="text" 
                    required 
                    placeholder="أدخل رقم الموبايل اللي طلبت بيه..." 
                    className="flex-grow bg-zinc-900 text-white p-4 rounded-xl border border-zinc-800 outline-none focus:border-yellow-500 transition"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button type="submit" className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition cursor-pointer">
                    بحث
                </button>
            </form>

            {searched && orders.length === 0 && (
                <div className="text-center text-zinc-400 mt-10 text-lg">
                    مفيش أي طلبات متسجلة برقم الموبايل ده.
                </div>
            )}

            <div className="space-y-6">
                {orders.map(order => (
                    <div key={order.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg">
                        <div className="flex justify-between items-start mb-4 border-b border-zinc-800 pb-4">
                            <div>
                                <h3 className="text-yellow-500 font-bold mb-1">طلب رقم #{order.id}</h3>
                                <p className="text-zinc-400 text-sm">تاريخ الطلب: {new Date(order.created_at).toLocaleDateString('ar-EG')}</p>
                            </div>
                            <div className="text-left">
                                <span className="bg-zinc-800 text-white px-4 py-1 rounded-full text-sm font-bold border border-zinc-700">
                                    {order.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-zinc-300">الإجمالي: <span className="font-bold text-white">${order.total_amount}</span></p>
                            <p className="text-zinc-300">متوقع التوصيل: <span className="text-yellow-500 font-bold">{new Date(order.delivery_date).toLocaleDateString('ar-EG')}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}