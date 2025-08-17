import React from 'react';
import { Edit2, LogOut, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logout } from '../../Authentication/authSlice';

function UserProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // جلب بيانات اليوزر من الـ state
  const { user } = useSelector((state) => state.auth);

  function goToEditData() {
    navigate('/edit-user-data');
  }
  function goToEditPass() {
    navigate('/edit-user-password');
  }
  function handleLogout() {
    dispatch(logout());
    navigate('/auth/login');
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 mt-16 text-center">
        <p className="text-gray-600">{t("user.noUser")}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* صورة المستخدم */}
          <div className="flex-shrink-0">
            <img
              src={
                user.avatar ||
                `https://ui-avatars.com/api/?name=${user.name || "User"}&background=4f46e5&color=fff`
              }
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-indigo-600 shadow"
            />
          </div>

          {/* بيانات المستخدم */}
          <div className="flex-grow space-y-4 w-full">
            <h2 className="text-2xl font-bold text-indigo-700">{user.name}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-gray-500">{t("user.email")}:</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">{t("user.phone")}:</p>
                <p>{user.phone || t("user.noPhone")}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-semibold text-gray-500">{t("user.address")}:</p>
                <p>{user.address || t("user.noAddress")}</p>
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={goToEditData}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md transition"
              >
                <Edit2 size={18} />
                {t("user.editProfile")}
              </button>

              <button
                onClick={goToEditPass}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md transition"
              >
                <KeyRound size={18} />
                {t("user.changePassword")}
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition ml-auto"
              >
                <LogOut size={18} />
                {t("user.logout")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
