import { useState } from 'react';
import { ShieldAlert, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Login Attempt:", { email, password });
    // هنا هنربط بالباك إند بعدين لتوجيه الآدمن للوحة التحكم
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center bg-[#0f172a] py-12 px-4">
      {/* كارت تسجيل الدخول بخلفية بيضاء جوا خلفية الموقع الغامقة */}
      <div className="bg-white p-8 md:p-10 shadow-2xl w-full max-w-md border-t-4 border-amber-600">
        
        {/* أيقونة وعنوان الآدمن */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="bg-amber-100 p-3 rounded-full mb-4">
            <ShieldAlert size={32} className="text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#0f172a] tracking-widest uppercase">Admin Portal</h2>
          <p className="text-zinc-500 mt-2 text-sm font-medium tracking-wider">AUTHORIZED PERSONNEL ONLY</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Mail size={20} />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-zinc-300 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all bg-zinc-50 placeholder-zinc-400 text-[#0f172a]"
              placeholder="Admin Email"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Lock size={20} />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-zinc-300 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all bg-zinc-50 placeholder-zinc-400 text-[#0f172a]"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0f172a] text-white py-3 uppercase tracking-widest font-bold hover:bg-amber-600 transition-colors duration-300 flex justify-center items-center gap-2"
          >
            Access Dashboard
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;