import logoTrans from '../assets/logo-trans.png';

export default function Footer() {
    return (
        <footer className="bg-black py-12 border-t border-zinc-800 mt-20" dir="rtl">
            {/* تم إزالة تعارض flex و grid للحفاظ على تقسيم الأعمدة الثلاثة */}
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right w-full">

                {/* العمود الأول: الشعار ونبذة */}
                <div className="flex flex-col items-center md:items-start">
                    <img src={logoTrans} alt="Timekeepers Logo" className="h-16 mb-4 object-contain" />
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        الوجهة الأولى لاقتناء أرقى الساعات العالمية. نضمن لك الجودة، الفخامة، والتميز في كل ثانية.
                    </p>
                </div>

                {/* العمود الثاني: روابط سريعة */}
                <div>
                    <h4 className="text-lg font-bold text-white mb-4">روابط سريعة</h4>
                    <ul className="text-zinc-400 text-sm space-y-2">
                        <li><a href="#" className="hover:text-yellow-500 transition">الشروط والأحكام</a></li>
                        <li><a href="#" className="hover:text-yellow-500 transition">سياسة الاسترجاع</a></li>
                        <li><a href="#" className="hover:text-yellow-500 transition">خدمة العملاء</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold text-white mb-4">تواصل معنا</h4>
                    <ul className="text-zinc-400 text-sm space-y-2">
                        <li><span className="block mb-1">البريد: info@timekeepers.com</span></li>
                        <li><span className="block mb-1">الهاتف: 010000000
                            20+</span></li>
                        <li><span className="block">أوقات العمل: من 9 صباحاً حتى 10 مساءً</span></li>
                    </ul>
                </div>

            </div>
            <div className="text-center text-zinc-600 text-sm mt-12 border-t border-zinc-800 pt-6">
                © 2026 جميع الحقوق محفوظة لـ Timekeepers.
            </div>
        </footer>
    );
}