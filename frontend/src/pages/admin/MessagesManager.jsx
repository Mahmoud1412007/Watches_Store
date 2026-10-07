import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaEnvelopeOpen, FaCheck } from 'react-icons/fa';

export default function MessagesManager() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/contact');
            setMessages(res.data);
        } catch (err) {
            console.error('خطأ في جلب الرسائل');
        }
    };

    const markAsRead = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/api/contact/${id}/read`);
            setMessages(messages.map(msg => msg.id === id ? { ...msg, is_read: 1 } : msg));
        } catch (err) {
            alert('حدث خطأ');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8 border-b border-zinc-800 pb-4">رسائل الدعم الفني</h1>

            <div className="space-y-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`p-6 rounded-2xl border transition-all ${msg.is_read ? 'bg-zinc-900 border-zinc-800 opacity-70' : 'bg-black border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                {msg.is_read ? <FaEnvelopeOpen className="text-zinc-500" size={24} /> : <FaEnvelope className="text-yellow-500" size={24} />}
                                <div>
                                    <h3 className={`font-bold text-lg ${msg.is_read ? 'text-zinc-400' : 'text-white'}`}>{msg.name}</h3>
                                    <p className="text-sm text-zinc-500" dir="ltr">{msg.email}</p>
                                </div>
                            </div>
                            <div className="text-xs text-zinc-500">
                                {new Date(msg.created_at).toLocaleDateString('ar-EG')}
                            </div>
                        </div>
                        
                        <p className={`mt-4 whitespace-pre-wrap ${msg.is_read ? 'text-zinc-400' : 'text-zinc-200'}`}>
                            {msg.message}
                        </p>

                        {!msg.is_read && (
                            <button 
                                onClick={() => markAsRead(msg.id)}
                                className="mt-6 flex items-center gap-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black px-4 py-2 rounded-xl font-bold transition cursor-pointer"
                            >
                                <FaCheck /> تحديد كمقروءة
                            </button>
                        )}
                    </div>
                ))}
                {messages.length === 0 && (
                    <div className="text-center text-zinc-500 p-10 bg-zinc-900 rounded-2xl border border-zinc-800">
                        لا توجد رسائل حالياً.
                    </div>
                )}
            </div>
        </div>
    );
}