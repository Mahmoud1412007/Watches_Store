import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

export default function ProductsManager() {
    const [watches, setWatches] = useState([]);
    // حطينا الديفولت هنا عشان الإضافة الجديدة بس
    const [formData, setFormData] = useState({
        name: '', brand: '', price: '', image_url: '', description: '', is_displayed: true, category: 'رجالي'
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchWatches();
    }, []);

    const fetchWatches = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/watches');
            setWatches(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/api/watches/${editingId}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/watches', formData);
            }
            // تفريغ الفورم بعد الحفظ وترجيعها للديفولت
            setFormData({ name: '', brand: '', price: '', image_url: '', description: '', is_displayed: true, category: 'رجالي' });
            setEditingId(null);
            fetchWatches();
        } catch (err) {
            alert('حصل خطأ أثناء الحفظ');
        }
    };

    // الدالة دي هي اللي كانت عاملة المشكلة، دلوقتي بتسحب التصنيف الصح
    const handleEdit = (watch) => {
        setEditingId(watch.id);
        setFormData({
            name: watch.name,
            brand: watch.brand,
            price: watch.price,
            image_url: watch.image_url,
            description: watch.description,
            is_displayed: watch.is_displayed,
            category: watch.category || 'رجالي' // لو ملهاش تصنيف قديم يحطها رجالي
        });
        // سكرول لفوق عشان تشوف الفورم
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if(window.confirm('متأكد إنك عايز تحذف الساعة دي؟')) {
            try {
                await axios.delete(`http://localhost:5000/api/watches/${id}`);
                fetchWatches();
            } catch(err) {
                alert('خطأ في الحذف');
            }
        }
    };

    const toggleDisplay = async (watch) => {
        try {
            await axios.put(`http://localhost:5000/api/watches/${watch.id}`, {
                ...watch,
                is_displayed: !watch.is_displayed
            });
            fetchWatches();
        } catch(err) {
            alert('خطأ في التحديث');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8 border-b border-zinc-800 pb-4">إدارة المنتجات (الواجهة)</h1>
            
            {/* فورم الإضافة والتعديل */}
            <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg mb-10">
                <h2 className="text-xl font-bold text-yellow-500 mb-6">
                    {editingId ? 'تعديل بيانات الساعة' : 'إضافة ساعة للواجهة'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="text" placeholder="الاسم" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-zinc-800 text-white p-3 rounded-xl outline-none focus:border-yellow-500" required />
                    <input type="text" placeholder="الماركة" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="bg-zinc-800 text-white p-3 rounded-xl outline-none focus:border-yellow-500" required />
                    <input type="number" placeholder="السعر" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="bg-zinc-800 text-white p-3 rounded-xl outline-none focus:border-yellow-500" required />
                    <input type="text" placeholder="رابط الصورة" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="bg-zinc-800 text-white p-3 rounded-xl outline-none focus:border-yellow-500" required />
                    
                    {/* حقل التصنيف */}
                    <select 
                        value={formData.category} 
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="bg-zinc-800 text-white p-3 rounded-xl outline-none focus:border-yellow-500 cursor-pointer"
                    >
                        <option value="رجالي">ساعات رجالي (Men)</option>
                        <option value="حريمي">ساعات حريمي (Women)</option>
                        <option value="أوريجينال">أوريجينال (Original)</option>
                        <option value="ميرور">ميرور (Mirror)</option>
                    </select>
                </div>
                
                <textarea placeholder="الوصف" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-zinc-800 text-white p-3 rounded-xl outline-none focus:border-yellow-500 w-full mb-4 h-24" required />
                
                <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-3 rounded-xl hover:bg-yellow-400 transition cursor-pointer">
                    {editingId ? 'حفظ التعديلات' : 'إضافة المنتج'}
                </button>
                
                {/* زرار إلغاء التعديل لو حبيت ترجع في كلامك */}
                {editingId && (
                    <button type="button" onClick={() => {setEditingId(null); setFormData({ name: '', brand: '', price: '', image_url: '', description: '', is_displayed: true, category: 'رجالي' })}} className="w-full mt-2 bg-zinc-800 text-zinc-400 font-bold py-3 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
                        إلغاء التعديل
                    </button>
                )}
            </form>

            {/* جدول عرض المنتجات */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full text-right text-zinc-300">
                    <thead className="bg-zinc-800 text-white">
                        <tr>
                            <th className="p-4">الصورة</th>
                            <th className="p-4">الاسم</th>
                            <th className="p-4">السعر</th>
                            <th className="p-4 text-yellow-500">التصنيف</th>
                            <th className="p-4 text-center">حالة العرض</th>
                            <th className="p-4 text-center">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {watches.map(watch => (
                            <tr key={watch.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition">
                                <td className="p-4">
                                    <img src={watch.image_url} alt={watch.name} className="w-12 h-12 rounded-lg object-cover border border-zinc-700" />
                                </td>
                                <td className="p-4 font-bold text-white">{watch.name}</td>
                                <td className="p-4 font-bold text-yellow-500">${watch.price}</td>
                                <td className="p-4">
                                    <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold">
                                        {watch.category || 'رجالي'}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button onClick={() => toggleDisplay(watch)} className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${watch.is_displayed ? 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white' : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'}`}>
                                        {watch.is_displayed ? 'معروض' : 'مخفي'}
                                    </button>
                                </td>
                                <td className="p-4 text-center flex justify-center gap-2">
                                    <button onClick={() => handleEdit(watch)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(watch.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition cursor-pointer">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}