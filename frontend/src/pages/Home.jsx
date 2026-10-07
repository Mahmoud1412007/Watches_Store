import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WatchCard from '../components/WatchCard';
import Footer from '../components/Footer';
import logoFull from '../assets/logo-full.png';

export default function Home() {
    const [watches, setWatches] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/watches')
            .then(res => setWatches(res.data))
            .catch(err => console.log(err));
    }, []);

    const reviews = [
        { id: 1, name: "أحمد حسن", text: "جودة ممتازة وتوصيل سريع جداً. الساعة مطابقة للصور تماماً.", rate: "⭐⭐⭐⭐⭐" },
        { id: 2, name: "كريم طارق", text: "خدمة عملاء راقية وتغليف فخم جداً ينفع هدية قيمة.", rate: "⭐⭐⭐⭐⭐" },
        { id: 3, name: "ياسين عمر", text: "أسعار تنافسية مقارنة بالسوق. أكيد هشتري منكم تاني.", rate: "⭐⭐⭐⭐" }
    ];

    return (
        <div className="pt-20 bg-black min-h-screen">
            {/* الهيرو مع فيديو اليوتيوب اللي اخترته */}
            <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">

                {/* حاوية فيديو اليوتيوب */}
                <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                    <iframe
                        src="https://www.youtube.com/embed/KFqpsIm3mvc?autoplay=1&mute=1&controls=0&loop=1&playlist=KFqpsIm3mvc&rel=0&showinfo=0&modestbranding=1"
                        className="w-full h-full scale-[1.8] md:scale-[1.3]"
                        allow="autoplay; encrypted-media"
                        title="Background Video"
                    ></iframe>
                </div>

                {/* طبقة تعتيم خفيفة جداً عشان الكلام يظهر بدون ما نكتم الفيديو */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-0"></div>
                {/* طبقة تعتيم عشان الكلام يظهر بوضوح */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-0"></div>

                <div className="container mx-auto px-6 relative z-10 text-center mt-10">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                        اكتشف الفخامة في <br /> <span className="text-yellow-500">كل ثانية</span>
                    </h1>
                    <p className="text-zinc-300 text-lg md:text-2xl mb-10 max-w-2xl mx-auto font-light drop-shadow-md">
                        تشكيلة حصرية من أرقى الساعات الكلاسيكية والرياضية. ارتقِ بمظهرك الآن.
                    </p>
                    <Link to="/products" className="inline-block bg-yellow-500 text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all duration-300 transform hover:-tranzinc-y-1">
                        تسوق التشكيلة الآن
                    </Link>
                </div>
            </div>

            {/* قسم التعريف بالمتجر */}
            <div className="container mx-auto px-6 py-20 border-b border-zinc-800">
                <div className="flex flex-col md:flex-row items-center gap-12 bg-zinc-900/50 p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-2xl">
                    <div className="w-full md:w-1/2">
                        <img src={logoFull} alt="Timekeepers Heritage" className="w-full rounded-2xl shadow-lg border border-zinc-700" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <span className="text-yellow-500 font-bold tracking-widest text-sm mb-2 block">عن المتجر</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">تراث من الدقة والأناقة</h2>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                            في Timekeepers، نؤمن بأن الساعة ليست مجرد أداة لمعرفة الوقت، بل هي قطعة فنية تعكس شخصيتك وتاريخك. ننتقي لك أفضل الإصدارات العالمية لنضمن لك التفرد والفخامة التي تستحقها في كل لحظة.
                        </p>
                        <Link to="/about" className="text-white hover:text-yellow-500 font-bold text-lg transition border-b border-yellow-500 pb-1">
                            اقرأ قصتنا كاملة &larr;
                        </Link>
                    </div>
                </div>
            </div>

            {/* المنتجات */}
            <div className="container mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">تشكيلة <span className="text-yellow-500">مختارة</span></h2>
                    <p className="text-zinc-400">أفضل الساعات مبيعاً والتي تناسب ذوقك الرفيع</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {watches.slice(0, 8).map(watch => (
                        <WatchCard key={watch.id} watch={watch} />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link to="/products" className="text-yellow-500 hover:text-yellow-400 font-bold text-lg border-b border-yellow-500 pb-1 transition">
                        عرض كل المنتجات &larr;
                    </Link>
                </div>
            </div>

            {/* التقييمات */}
            <div className="bg-zinc-900/30 py-24 border-y border-zinc-800">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">آراء <span className="text-yellow-500">عملائنا</span></h2>
                        <p className="text-zinc-400">نفخر بثقة عملائنا في منتجاتنا وخدماتنا</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reviews.map(review => (
                            <div key={review.id} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-yellow-500/50 transition-colors duration-300">
                                <div className="text-yellow-500 mb-4">{review.rate}</div>
                                <p className="text-zinc-300 mb-6 leading-relaxed">"{review.text}"</p>
                                <h4 className="text-white font-bold">- {review.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}