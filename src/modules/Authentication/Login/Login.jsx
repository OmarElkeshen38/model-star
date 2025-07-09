import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Login() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {t("login.login_title", "تسجيل الدخول إلى حسابك")}
        </h2>
      </div>

      <form className="space-y-4">
        <input
          type="email"
          placeholder={t("login.email", "البريد الإلكتروني")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          placeholder={t("login.password", "كلمة المرور")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="text-right">
          <Link to="/auth/forget-password" className="text-sm text-indigo-600 hover:underline">
            {t("login.forgotPassword", "هل نسيت كلمة المرور؟")}
          </Link>
          <span className="text-sm text-gray-500 mx-2">|</span>
          <Link to="/auth/register" className="text-sm text-indigo-600 hover:underline">
            {t("login.register", "إنشاء حساب جديد")}
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition"
        >
          {t("login.submit", "تسجيل الدخول")}
        </button>
      </form>
    </div>
  );
}

export default Login;
