import React from 'react';
import { Edit2, LogOut, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function UserProfile() {

    const navigate = useNavigate();
    function goToEditData() {
        navigate('/edit-user-data')
    }
    function goToEditPass() {
        navigate('/edit-user-password')
    }
    function goToEditLogin() {
        navigate('/auth/login')
    }
    const user = {
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        phone: '01123456789',
        address: 'الرياض، السعودية',
        avatar: `https://ui-avatars.com/api/?name=Ahmed+Mohamed&background=4f46e5&color=fff`,
    };

    return (
        <div className="container mx-auto px-4 py-16 mt-16">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* صورة المستخدم */}
                    <div className="flex-shrink-0">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-32 h-32 rounded-full border-4 border-indigo-600 shadow"
                        />
                    </div>

                    {/* بيانات المستخدم */}
                    <div className="flex-grow space-y-4 w-full">
                        <h2 className="text-2xl font-bold text-indigo-700">{user.name}</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                            <div>
                                <p className="font-semibold text-gray-500">البريد الإلكتروني:</p>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-500">رقم الهاتف:</p>
                                <p>{user.phone}</p>
                            </div>
                            <div className="sm:col-span-2">
                                <p className="font-semibold text-gray-500">العنوان:</p>
                                <p>{user.address}</p>
                            </div>
                        </div>

                        {/* الأزرار */}
                        <div className="flex flex-wrap gap-4 mt-6">
                            <button onClick={goToEditData} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md transition">
                                <Edit2 size={18} />
                                تعديل الملف الشخصي
                            </button>

                            <button onClick={goToEditPass} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md transition">
                                <KeyRound size={18} />
                                تغيير كلمة المرور
                            </button>

                            <button onClick={goToEditLogin} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition ml-auto">
                                <LogOut size={18} />
                                تسجيل الخروج
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
