import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Register() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {t("register.title", "إنشاء حساب جديد")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("register.subtitle", "ابدأ رحلتك معنا الآن")}
          </p>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder={t("register.fullName", "الاسم الكامل")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder={t("register.email", "البريد الإلكتروني")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder={t("register.password", "كلمة المرور")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder={t("register.confirmPassword", "تأكيد كلمة المرور")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition"
          >
            {t("register.submit", "إنشاء حساب")}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          {t("register.alreadyHaveAccount", "لديك حساب بالفعل؟")}{" "}
          <Link to="/auth/login" className="text-indigo-600 hover:underline">
            {t("register.loginNow", "تسجيل الدخول الآن")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
