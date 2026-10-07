import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserShield, FaUserTie, FaUser } from 'react-icons/fa';

export default function UsersManager() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users');
            setUsers(res.data);
        } catch (err) {
            console.error('خطأ في جلب بيانات الحسابات');
        }
    };

    const handleRoleChange = async (id, newRole) => {
        if (window.confirm('هل أنت متأكد من تغيير صلاحية هذا الحساب؟')) {
            try {
                await axios.patch(`http://localhost:5000/api/users/${id}/role`, { role: newRole });
                // تحديث الجدول محلياً
                setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
            } catch (err) {
                alert('حصل خطأ أثناء تحديث الصلاحية');
            }
        }
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'admin': return <span className="flex items-center justify-center gap-2 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full font-bold"><FaUserShield /> مدير</span>;
            case 'accountant': return <span className="flex items-center justify-center gap-2 text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full font-bold"><FaUserTie /> محاسب</span>;
            case 'receptionist': return <span className="flex items-center justify-center gap-2 text-green-500 bg-green-500/10 px-3 py-1 rounded-full font-bold"><FaUserTie /> استقبال</span>;
            default: return <span className="flex items-center justify-center gap-2 text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full font-bold"><FaUser /> عميل</span>;
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8 border-b border-zinc-800 pb-4">إدارة الحسابات والموظفين</h1>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full text-right text-zinc-300">
                    <thead className="bg-zinc-800 text-white">
                        <tr>
                            <th className="p-4">الاسم</th>
                            <th className="p-4">البريد الإلكتروني</th>
                            <th className="p-4">تاريخ التسجيل</th>
                            <th className="p-4 text-center">الصلاحية الحالية</th>
                            <th className="p-4 text-center">ترقية / تغيير الدور</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition">
                                <td className="p-4 font-bold text-white">{user.name}</td>
                                <td className="p-4" dir="ltr">{user.email}</td>
                                <td className="p-4">{new Date(user.created_at).toLocaleDateString('ar-EG')}</td>
                                <td className="p-4 text-center">
                                    {getRoleBadge(user.role)}
                                </td>
                                <td className="p-4 text-center">
                                    <select 
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="bg-black border border-zinc-700 text-white p-2 rounded-lg outline-none focus:border-yellow-500 cursor-pointer"
                                    >
                                        <option value="user">عميل (User)</option>
                                        <option value="receptionist">موظف استقبال</option>
                                        <option value="accountant">محاسب</option>
                                        <option value="admin">مدير (Admin)</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}