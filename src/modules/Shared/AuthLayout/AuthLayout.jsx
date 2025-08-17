import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AuthLayout() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 px-6 py-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 flex-col justify-between bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-10">
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-2">ModelStar</h2>
          <p className="text-sm">{t("login.description", "أفضل تجربة تسوق إلكتروني")}</p>
        </div>

        <div className="text-xs text-gray-200 text-center mb-4 space-y-1">
          <div className="flex items-center justify-center gap-3">
            <Link to="/" className="hover:underline">{t("login.home", "الرئيسية")}</Link>
            <span>|</span>
            <Link to="/terms" className="hover:underline">{t("login.terms", "الشروط")}</Link>
            <Link to="/privacy" className="hover:underline">{t("login.privacy", "الخصوصية")}</Link>
          </div>
          <p className="mt-2">&copy; 2025 ModelStar</p>
        </div>
      </div>

    </div>
  );
}

export default AuthLayout;
