import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaMinus, FaSave } from 'react-icons/fa';

export default function InventoryManager() {
    const [watches, setWatches] = useState([]);
    const [editStock, setEditStock] = useState({}); // عشان نحفظ القيم اللي بتتعدل قبل ما تتبعت للباك إند

    useEffect(() => {
        fetchWatches();
    }, []);

    const fetchWatches = async () => {
        try {
            const res = await axios.get('https://watches-store-iml4.vercel.app//api/watches');
            setWatches(res.data);
            // تجهيز حالة التعديل لكل منتج
            const stockData = {};
            res.data.forEach(w => {
                stockData[w.id] = w.stock || 0;
            });
            setEditStock(stockData);
        } catch (err) {
            console.error('خطأ في جلب بيانات المخزن');
        }
    };

    const handleStockChange = (id, value) => {
        const newValue = Math.max(0, value); // عشان الكمية متقلش عن صفر
        setEditStock(prev => ({ ...prev, [id]: newValue }));
    };

    const saveStock = async (id) => {
        try {
            await axios.patch(`https://watches-store-iml4.vercel.app//api/watches/${id}/stock`, { stock: editStock[id] });
            // تحديث الجدول المحلي بعد الحفظ
            setWatches(watches.map(w => w.id === id ? { ...w, stock: editStock[id] } : w));
            alert('تم حفظ الكمية بنجاح');
        } catch (err) {
            alert('حصل خطأ أثناء الحفظ');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8 border-b border-zinc-800 pb-4">إدارة المخزن والجرد</h1>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full text-right text-zinc-300">
                    <thead className="bg-zinc-800 text-white">
                        <tr>
                            <th className="p-4">المنتج</th>
                            <th className="p-4">الكمية الحالية</th>
                            <th className="p-4 text-center">تعديل الجرد</th>
                            <th className="p-4 text-center">حفظ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {watches.map(w => {
                            // لو الكمية أقل من 3، نعلم السطر بأحمر خفيف كتنبيه
                            const isLowStock = editStock[w.id] <= 3;
                            
                            return (
                                <tr key={w.id} className={`border-b border-zinc-800 transition ${isLowStock ? 'bg-red-900/20' : 'hover:bg-zinc-800/50'}`}>
                                    <td className="p-4 flex items-center gap-4">
                                        <img src={w.image_url} alt={w.name} className="w-12 h-12 object-cover rounded-lg border border-zinc-700" />
                                        <div>
                                            <div className="font-bold text-white">{w.name}</div>
                                            <div className="text-xs text-yellow-500">{w.brand}</div>
                                        </div>
                                    </td>
                                    
                                    <td className={`p-4 font-black text-xl ${isLowStock ? 'text-red-500' : 'text-white'}`}>
                                        {w.stock || 0}
                                    </td>
                                    
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <button 
                                                onClick={() => handleStockChange(w.id, editStock[w.id] - 1)}
                                                className="bg-zinc-700 hover:bg-zinc-600 text-white p-2 rounded-lg transition cursor-pointer"
                                            >
                                                <FaMinus size={12} />
                                            </button>
                                            
                                            <input 
                                                type="number" 
                                                value={editStock[w.id]} 
                                                onChange={(e) => handleStockChange(w.id, parseInt(e.target.value) || 0)}
                                                className="w-16 bg-black border border-zinc-700 text-white text-center p-2 rounded-lg outline-none focus:border-yellow-500 font-bold"
                                            />
                                            
                                            <button 
                                                onClick={() => handleStockChange(w.id, editStock[w.id] + 1)}
                                                className="bg-zinc-700 hover:bg-zinc-600 text-white p-2 rounded-lg transition cursor-pointer"
                                            >
                                                <FaPlus size={12} />
                                            </button>
                                        </div>
                                    </td>
                                    
                                    <td className="p-4 text-center">
                                        <button 
                                            onClick={() => saveStock(w.id)}
                                            className={`px-4 py-2 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 mx-auto ${
                                                w.stock !== editStock[w.id] 
                                                ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                                                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                            }`}
                                            disabled={w.stock === editStock[w.id]}
                                        >
                                            <FaSave /> {w.stock !== editStock[w.id] ? 'تحديث' : 'محدث'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}