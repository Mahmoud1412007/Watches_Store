import { useState, useEffect } from 'react';
import axios from 'axios';

export default function OrdersManager() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/orders');
            setOrders(res.data);
        } catch (err) {
            console.error('خطأ في جلب الطلبات');
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/api/orders/${id}/status`, { status: newStatus });
            // تحديث الجدول فوراً بدون ريفريش
            setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
        } catch (err) {
            alert('حصل خطأ أثناء تحديث الحالة');
        }
    };

    // دالة لتلوين الحالة عشان تبقى واضحة للعين
    const getStatusColor = (status) => {
        switch (status) {
            case 'تم التسليم': return 'text-green-500 bg-green-500/10';
            case 'تم الشحن': return 'text-blue-500 bg-blue-500/10';
            case 'ملغي': return 'text-red-500 bg-red-500/10';
            default: return 'text-yellow-500 bg-yellow-500/10'; // قيد التجهيز
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8 border-b border-zinc-800 pb-4">إدارة الطلبات</h1>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full text-right text-zinc-300">
                    <thead className="bg-zinc-800 text-white">
                        <tr>
                            <th className="p-4">رقم الطلب</th>
                            <th className="p-4">العميل</th>
                            <th className="p-4">الموبايل / العنوان</th>
                            <th className="p-4">الإجمالي</th>
                            <th className="p-4 text-center">الحالة الحالية</th>
                            <th className="p-4 text-center">تحديث الحالة</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition">
                                <td className="p-4 font-bold text-white">#{order.id}</td>
                                <td className="p-4">{order.customer_name}</td>
                                <td className="p-4">
                                    <div className="text-white" dir="ltr">{order.customer_phone}</div>
                                    <div className="text-xs text-zinc-500 mt-1">{order.address}</div>
                                </td>
                                <td className="p-4 font-bold text-yellow-500">${order.total_amount}</td>
                                
                                <td className="p-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                
                                <td className="p-4 text-center">
                                    <select 
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="bg-black border border-zinc-700 text-white p-2 rounded-lg outline-none focus:border-yellow-500 cursor-pointer"
                                    >
                                        <option value="قيد التجهيز">قيد التجهيز</option>
                                        <option value="تم الشحن">تم الشحن</option>
                                        <option value="تم التسليم">تم التسليم</option>
                                        <option value="ملغي">إلغاء الطلب</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-zinc-500">لا توجد طلبات حتى الآن.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}