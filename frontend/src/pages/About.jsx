import Footer from '../components/Footer';
import { FaGem, FaShippingFast, FaHeadset } from 'react-icons/fa';
import logoFull from '../assets/logo-full.png';

export default function About() {
    const features = [
        {
            id: 1,
            icon: <FaGem size={32} />,
            title: "جودة لا تُضاهى",
            description: "ننتقي ساعاتنا من أفضل الماركات العالمية لضمان الدقة والفخامة التي تستحقها."
        },
        {
            id: 2,
            icon: <FaShippingFast size={32} />,
            title: "شحن سريع وآمن",
            description: "نوفر خدمة توصيل احترافية تضمن وصول ساعتك إليك بأمان تام وفي أسرع وقت."
        },
        {
            id: 3,
            icon: <FaHeadset size={32} />,
            title: "خدمة عملاء استثنائية",
            description: "فريقنا متواجد على مدار الساعة للرد على استفساراتك ومساعدتك في اختيار ساعتك المثالية."
        }
    ];

    return (
        <div className="pt-28 min-h-screen flex flex-col">
            <div className="container mx-auto px-6 flex-grow mb-20">
                
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">قصة <span className="text-yellow-500">متجرنا</span></h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        شغفنا بالوقت والفخامة قادنا لنقدم لك تشكيلة من أرقى الساعات.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
                    <div className="w-full lg:w-1/2 relative">
                        <div className="absolute -top-10 -left-10 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl z-0"></div>
                        <img 
                            src={logoFull} 
                            alt="Timekeepers Logo" 
                            className="rounded-3xl shadow-2xl relative z-10 border border-zinc-800 w-full"
                        />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-3xl font-bold text-white mb-6">نحن نقدر قيمة <span className="text-yellow-500">كل ثانية</span> في حياتك</h2>
                        <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                            بدأت رحلتنا من شغف عميق بالتفاصيل الدقيقة والآليات المعقدة التي تصنع الوقت. لم نرد فقط أن نكون مجرد متجر لبيع الساعات، بل أردنا أن نكون الوجهة الأولى لكل من يبحث عن قطعة فنية تزين معصمه وتعبر عن شخصيته.
                        </p>
                        <p className="text-zinc-300 text-lg leading-relaxed">
                            اليوم، نفتخر بتقديم مجموعة مختارة بعناية من أفضل العلامات التجارية، مع التزامنا التام بتقديم تجربة تسوق تليق بعملائنا المتميزين، من لحظة تصفح الموقع وحتى استلام الساعة.
                        </p>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 md:p-16 shadow-2xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white">لماذا تختار <span className="text-yellow-500">Timekeepers؟</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {features.map((feature) => (
                            <div key={feature.id} className="text-center p-6 rounded-2xl bg-zinc-800/50 hover:bg-zinc-800 transition duration-300 border border-zinc-700/50 hover:border-yellow-500/30">
                                <div className="w-20 h-20 mx-auto bg-zinc-900 rounded-full flex items-center justify-center text-yellow-500 mb-6 shadow-inner">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}