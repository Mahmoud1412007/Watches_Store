import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const endpoint = isLogin ? 'login' : 'signup';

        try {
            const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, formData);

            if (isLogin) {
                // حفظ التوكن وبيانات اليوزر في المتصفح
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));

                // لو هو أدمن هنوجهه للداشبورد (اللي هنعملها المرة الجاية)، لو يوزر للرئيسية
                if (res.data.user.role === 'admin') {
                    window.location.href = '/admin';
                } else {
                    window.location.href = '/';
                }
            } else {
                // لو لسه مسجل، نحوله لشاشة الدخول
                setIsLogin(true);
                alert('تم إنشاء الحساب، يرجى تسجيل الدخول');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'حدث خطأ غير متوقع');
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-6">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                {/* إضاءة خفيفة في الخلفية */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>

                <h2 className="text-3xl font-black text-white mb-2 relative z-10">
                    {isLogin ? 'مرحباً بعودتك' : 'حساب جديد'}
                </h2>
                <p className="text-zinc-400 mb-8 relative z-10">
                    {isLogin ? 'سجل دخولك لمتابعة مشترياتك' : 'انضم إلينا واكتشف أرقى الساعات'}
                </p>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-6 text-sm font-bold text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    {!isLogin && (
                        <div>
                            <label className="block text-zinc-400 text-sm font-bold mb-2">الاسم</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 outline-none focus:border-yellow-500 transition"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-zinc-400 text-sm font-bold mb-2">البريد الإلكتروني</label>
                        <input
                            required
                            type="email"
                            className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 outline-none focus:border-yellow-500 transition text-left"
                            dir="ltr"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-zinc-400 text-sm font-bold mb-2">كلمة المرور</label>
                        <input
                            required
                            type="password"
                            className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 outline-none focus:border-yellow-500 transition text-left"
                            dir="ltr"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition cursor-pointer mt-4">
                        {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
                    </button>
                </form>

                <div className="mt-6 text-center text-zinc-400 relative z-10">
                    {isLogin ? 'ليس لديك حساب؟ ' : 'لديك حساب بالفعل؟ '}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-yellow-500 font-bold hover:underline">
                        {isLogin ? 'سجل الآن' : 'سجل الدخول'}
                    </button>
                </div>
            </div>
        </div>
    );
}