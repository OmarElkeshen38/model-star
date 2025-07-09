import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

function ForgetPass() {
  const { t } = useTranslation();
  let navigate = useNavigate();

  const goToResetPass = () => {
    navigate("/auth/reset-password");
  };

  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {t("forgetPass.title", "نسيت كلمة المرور؟")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("forgetPass.subtitle", "أدخل بريدك الإلكتروني لإرسال رابط إعادة التعيين.")}
          </p>
        </div>

        <form className="space-y-4">
          <input
            type="email"
            placeholder={t("forgetPass.email", "البريد الإلكتروني")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={goToResetPass}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition"
          >
            {t("forgetPass.submit", "إرسال رابط إعادة التعيين")}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          <Link to="/auth/login" className="text-indigo-600 hover:underline">
            {t("forgetPass.backToLogin", "العودة لتسجيل الدخول")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPass;
