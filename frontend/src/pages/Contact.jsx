import { useState } from 'react';
import Footer from '../components/Footer';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import axios from 'axios'; // تأكد من إضافتها فوق

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://watches-store-iml4.vercel.app//api/contact', formData);
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 5000);
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            alert('حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة لاحقاً.');
        }
    };


    return (
        <div className="pt-28 min-h-screen flex flex-col">
            <div className="container mx-auto px-6 flex-grow mb-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">تواصل <span className="text-yellow-500">معنا</span></h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        نحن هنا لمساعدتك والإجابة على كافة استفساراتك. لا تتردد في مراسلتنا في أي وقت.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* توهج في الخلفية */}
                    <div className="absolute -top-20 -right-20 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>

                    {/* معلومات التواصل */}
                    <div className="w-full lg:w-1/3 space-y-8 relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">معلومات الاتصال</h3>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-yellow-500 shrink-0">
                                <FaMapMarkerAlt size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">العنوان</h4>
                                <p className="text-zinc-400">القاهرة، مصر<br />شارع المعز، مبنى 45</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-yellow-500 shrink-0">
                                <FaPhoneAlt size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">رقم الهاتف</h4>
                                <p className="text-zinc-400" dir="ltr">+20 123 456 7890</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-yellow-500 shrink-0">
                                <FaEnvelope size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">البريد الإلكتروني</h4>
                                <p className="text-zinc-400">support@watchstore.com</p>
                            </div>
                        </div>
                    </div>

                    {/* فورم المراسلة */}
                    <div className="w-full lg:w-2/3 relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">أرسل رسالة</h3>

                        {isSubmitted ? (
                            <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-6 rounded-xl text-center font-bold">
                                تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-zinc-400 text-sm font-bold">الاسم بالكامل</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-zinc-800 text-white p-4 rounded-xl border border-zinc-700 outline-none focus:border-yellow-500 transition-colors"
                                            placeholder="أحمد محمد"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-zinc-400 text-sm font-bold">البريد الإلكتروني</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-zinc-800 text-white p-4 rounded-xl border border-zinc-700 outline-none focus:border-yellow-500 transition-colors"
                                            placeholder="ahmed@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-zinc-400 text-sm font-bold">رسالتك</label>
                                    <textarea
                                        required
                                        rows="5"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-zinc-800 text-white p-4 rounded-xl border border-zinc-700 outline-none focus:border-yellow-500 transition-colors resize-none"
                                        placeholder="اكتب استفسارك هنا..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-yellow-500 text-zinc-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all shadow-[0_5px_15px_rgba(234,179,8,0.2)] hover:-tranzinc-y-1 cursor-pointer"
                                >
                                    إرسال الرسالة
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}