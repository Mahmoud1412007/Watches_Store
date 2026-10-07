export default function Hero() {
    return (
        <div className="bg-zinc-900 text-white py-24 px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wide">
                اكتشف الفخامة في كل <span className="text-yellow-500">ثانية</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                تشكيلة حصرية من أرقى الساعات العالمية بأسعار لا تقبل المنافسة. ارتقِ بمظهرك الآن.
            </p>
            <button className="bg-yellow-500 text-zinc-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transition transform hover:scale-105">
                تسوق التشكيلة
            </button>
        </div>
    );
}