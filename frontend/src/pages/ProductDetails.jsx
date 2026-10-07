import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

export default function ProductDetails() {
    const { id } = useParams();
    const [watch, setWatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        // بنستدعي الدالة اللي عملناها في الباك إند لجلب ساعة واحدة
        axios.get(`http://localhost:5000/api/watches/${id}`)
             .then(res => {
                 setWatch(res.data);
                 setLoading(false);
             })
             .catch(err => {
                 console.log(err);
                 setLoading(false);
             });
    }, [id]);

    if (loading) return <div className="text-center mt-32 text-white text-2xl font-bold min-h-screen">جاري التحميل...</div>;
    if (!watch) return <div className="text-center mt-32 text-red-500 text-2xl font-bold min-h-screen">الساعة غير موجودة</div>;

    return (
        <div className="container mx-auto px-6 py-32 min-h-screen">
            <Link to="/" className="text-zinc-400 hover:text-yellow-500 font-bold mb-8 inline-block transition">
                &rarr; العودة للرئيسية
            </Link>
            
            <div className="bg-zinc-900 rounded-3xl p-8 md:p-12 border border-zinc-800 flex flex-col md:flex-row gap-12 items-center shadow-2xl relative overflow-hidden">
                {/* تأثير إضاءة خفيف في الخلفية */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
                
                <div className="w-full md:w-1/2 relative z-10">
                    <img src={watch.image_url} alt={watch.name} className="w-full h-auto rounded-2xl shadow-lg border border-zinc-700" />
                </div>
                
                <div className="w-full md:w-1/2 relative z-10">
                    <span className="bg-yellow-500/10 text-yellow-500 px-4 py-1 rounded-full font-bold tracking-widest text-sm mb-6 inline-block border border-yellow-500/20">
                        {watch.brand}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">{watch.name}</h1>
                    <p className="text-zinc-400 text-lg mb-8 leading-relaxed border-b border-zinc-800 pb-8">
                        {watch.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-8">
                        <div className="text-5xl font-black text-white">${watch.price}</div>
                        <button onClick={() => addToCart(watch)} className="bg-yellow-500 text-zinc-900 px-10 py-4 rounded-xl font-bold text-xl hover:bg-yellow-400 transition-all duration-300 transform hover:-tranzinc-y-1 shadow-[0_10px_20px_rgba(234,179,8,0.2)]">
                            أضف إلى السلة
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}