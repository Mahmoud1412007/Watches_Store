import logoTrans from '../assets/logo-trans.png';

export default function Footer() {
    return (
        <footer className="bg-black py-12 border-t border-zinc-800 mt-20">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
                <div className="flex flex-col items-center md:items-start">
                    <img src={logoTrans} alt="Timekeepers Logo" className="h-16 mb-4 object-contain" />
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        الوجهة الأولى لاقتناء أرقى الساعات العالمية. نضمن لك الجودة، الفخامة، والتميز في كل ثانية.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-4">روابط سريعة</h4>
                    <ul className="text-zinc-400 text-sm space-y-2">
                        <li><a href="#" className="hover:text-yellow-500 transition">الشروط والأحكام</a></li>
                        <li><a href="#" className="hover:text-yellow-500 transition">سياسة الاسترجاع</a></li>
                        <li><a href="#" className="hover:text-yellow-500 transition">خدمة العملاء</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-4">اشترك في نشرتنا</h4>
                    <div className="flex gap-2">
                        <input type="email" placeholder="بريدك الإلكتروني" className="w-full bg-zinc-900 text-white px-4 py-2 rounded-lg outline-none focus:border-yellow-500 border border-zinc-700" />
                        <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition">اشترك</button>
                    </div>
                </div>
            </div>
            <div className="text-center text-zinc-600 text-sm mt-12 border-t border-zinc-800 pt-6">
                © 2026 جميع الحقوق محفوظة لـ Timekeepers.
            </div>
        </footer>
    );
}