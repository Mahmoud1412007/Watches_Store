import { useState, useEffect } from 'react';
import axios from 'axios';
import WatchCard from '../components/WatchCard';
import Footer from '../components/Footer';

export default function Products() {
    const [watches, setWatches] = useState([]);
    const [activeCategory, setActiveCategory] = useState('الكل'); // بقت بتشيل اسم التصنيف

    useEffect(() => {
        axios.get('https://watches-store-iml4.vercel.app/api/watches')
             .then(res => setWatches(res.data))
             .catch(err => console.log(err));
    }, []);

    // قائمة التصنيفات شاملة العروض بتاعتك
    const categories = ['الكل', 'عروض', 'رجالي', 'حريمي', 'أوريجينال', 'ميرور'];

    // فلترة المنتجات بناءً على الزرار اللي العميل داس عليه
    const displayedWatches = watches.filter(w => {
        if (activeCategory === 'الكل') return true;
        if (activeCategory === 'عروض') return w.price < 6000; // شرط العروض بتاعك
        return w.category === activeCategory; // شرط التصنيفات الجديدة
    });

    return (
        <div className="pt-28 min-h-screen flex flex-col bg-black" dir="rtl">
            <div className="container mx-auto px-6 flex-grow">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">مجموعتنا <span className="text-yellow-500">الكاملة</span></h1>
                    <p className="text-zinc-400 text-lg">تصفح تشكيلتنا الواسعة واختر ما يناسب ذوقك.</p>
                </div>

                {/* شريط التصنيفات (الكريزة) */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${
                                activeCategory === cat 
                                ? 'bg-yellow-500 text-zinc-900 shadow-[0_0_15px_rgba(234,179,8,0.4)]' 
                                : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                            }`}
                        >
                            {/* لو التصنيف اسمه عروض، نحط جنبه نار 🔥 */}
                            {cat === 'عروض' ? '🔥 عروض حصرية' : cat}
                        </button>
                    ))}
                </div>

                {/* عرض المنتجات */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
                    {displayedWatches.length > 0 ? (
                        displayedWatches.map(watch => (
                            <WatchCard key={watch.id} watch={watch} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-zinc-500 text-xl mt-10 p-10 bg-zinc-900 rounded-2xl border border-zinc-800">
                            لا توجد منتجات حالياً في هذا القسم.
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}