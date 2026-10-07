import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMoneyBillWave, FaChartLine, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';

export default function AccountsManager() {
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        collected: 0,
        pending: 0,
        canceled: 0
    });

    useEffect(() => {
        fetchFinances();
    }, []);

    const fetchFinances = async () => {
        try {
            // بنستخدم نفس مسار الطلبات عشان نحسب منه الفلوس
            const res = await axios.get('http://localhost:5000/api/orders');
            const allOrders = res.data;
            setOrders(allOrders);

            let total = 0, collected = 0, pending = 0, canceled = 0;

            allOrders.forEach(order => {
                const amount = parseFloat(order.total_amount) || 0;
                
                if (order.status === 'تم التسليم') {
                    collected += amount;
                    total += amount;
                } else if (order.status === 'ملغي') {
                    canceled += amount;
                } else {
                    // قيد التجهيز أو تم الشحن (فلوس لسه هتدخل)
                    pending += amount; 
                    total += amount;
                }
            });

            setStats({ total, collected, pending, canceled });
        } catch (err) {
            console.error('خطأ في جلب البيانات المالية');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8 border-b border-zinc-800 pb-4">الحسابات والماليات</h1>

            {/* كروت الإحصائيات المالية */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full flex items-start justify-end p-3"><FaChartLine className="text-blue-500" size={24} /></div>
                    <div className="text-zinc-400 mb-2 font-bold">إجمالي المبيعات (المتوقعة)</div>
                    <div className="text-3xl font-black text-white">${stats.total.toFixed(2)}</div>
                </div>
                
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-bl-full flex items-start justify-end p-3"><FaMoneyBillWave className="text-green-500" size={24} /></div>
                    <div className="text-zinc-400 mb-2 font-bold">أرباح مُحصلة (تم التسليم)</div>
                    <div className="text-3xl font-black text-green-500">${stats.collected.toFixed(2)}</div>
                </div>
                
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-bl-full flex items-start justify-end p-3"><FaHourglassHalf className="text-yellow-500" size={24} /></div>
                    <div className="text-zinc-400 mb-2 font-bold">أموال قيد التحصيل</div>
                    <div className="text-3xl font-black text-yellow-500">${stats.pending.toFixed(2)}</div>
                </div>
                
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full flex items-start justify-end p-3"><FaTimesCircle className="text-red-500" size={24} /></div>
                    <div className="text-zinc-400 mb-2 font-bold">خسائر (طلبات ملغية)</div>
                    <div className="text-3xl font-black text-red-500">${stats.canceled.toFixed(2)}</div>
                </div>
            </div>

            {/* جدول السجل المالي */}
            <h2 className="text-xl font-bold text-white mb-4">السجل المالي للطلبات</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full text-right text-zinc-300">
                    <thead className="bg-zinc-800 text-white">
                        <tr>
                            <th className="p-4">رقم الطلب</th>
                            <th className="p-4">التاريخ</th>
                            <th className="p-4">المبلغ</th>
                            <th className="p-4">طريقة الدفع</th>
                            <th className="p-4 text-center">حالة التحصيل</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition">
                                <td className="p-4 font-bold text-white">#{order.id}</td>
                                <td className="p-4 text-sm">{new Date(order.created_at).toLocaleDateString('ar-EG')}</td>
                                <td className="p-4 font-bold text-yellow-500">${order.total_amount}</td>
                                <td className="p-4 text-sm">{order.payment_method || 'الدفع عند الاستلام'}</td>
                                <td className="p-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        order.status === 'تم التسليم' ? 'bg-green-500/10 text-green-500' :
                                        order.status === 'ملغي' ? 'bg-red-500/10 text-red-500' :
                                        'bg-yellow-500/10 text-yellow-500'
                                    }`}>
                                        {order.status === 'تم التسليم' ? 'تم التحصيل' : 
                                         order.status === 'ملغي' ? 'ملغي' : 'قيد الانتظار'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}