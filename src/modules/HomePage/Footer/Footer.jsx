import React from 'react';
import logo from '../../../assets/logo.png';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Footer() {

  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-200 py-10 t-16">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">

        {/* Logo & About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">ModelStar</h2>
          <p className="text-gray-400">
            {i18n.language === "ar"
              ? "متجرك المفضل لكل ما هو عصري وأنيق"
              : "Your favorite store for all things stylish."}
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">{t("nav.shop")}</h3>
          <ul className="space-y-2">
            <li><Link to="/shop" className="hover:underline">{t("nav.shop")}</Link></li>
            <li><Link to="/cart" className="hover:underline">{t("nav.cart")}</Link></li>
            <li><Link to="/my-orders" className="hover:underline">{t("nav.orders")}</Link></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">{t("nav.about")}</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:underline">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:underline">{t("nav.contact")}</Link></li>
            <li><Link to="/privacy" className="hover:underline"> {i18n.language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}</Link></li>
            <li><Link to="/returns" className="hover:underline"> {i18n.language === "ar" ? "سياسة الاسترجاع" : "Return Policy"}</Link></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            {i18n.language === "ar" ? "سجل الان وابدا التسوق" : "Register now and start shopping"}
          </h3>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder={i18n.language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
              className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition">
              {i18n.language === "ar" ? "اشترك" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} ModelStar. {i18n.language === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}.
      </div>
    </footer>
  )
}

export default Footer
