import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 pt-14 pb-8 mt-20 relative">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 text-sm">
        {/* Logo + Description */}
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-3 tracking-wide">
            ModelStar
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            {i18n.language === "ar"
              ? "أفضل مكان للتسوق عبر الإنترنت بمنتجات مميزة وأسعار تنافسية."
              : "The best place to shop online with unique products and competitive prices."}
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-indigo-600 transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-pink-500 transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-sky-500 transition"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-red-600 transition"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
            {t("nav.shop")}
          </h3>
          <ul className="space-y-3">
            <li>
              <Link to="/products" className="hover:text-indigo-400 transition">
                {t("nav.shop")}
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-indigo-400 transition">
                {t("nav.cart")}
              </Link>
            </li>
            <li>
              <Link to="/my-orders" className="hover:text-indigo-400 transition">
                {t("nav.orders")}
              </Link>
            </li>
          </ul>
        </div>

        {/* About Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
            {t("nav.about")}
          </h3>
          <ul className="space-y-3">
            <li>
              <Link to="/about" className="hover:text-indigo-400 transition">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-400 transition">
                {t("nav.contact")}
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-indigo-400 transition">
                {i18n.language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-indigo-400 transition">
                {i18n.language === "ar" ? "سياسة الاسترجاع" : "Return Policy"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
            {i18n.language === "ar"
              ? "سجل الان وابدا التسوق"
              : "Register & Start Shopping"}
          </h3>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder={
                i18n.language === "ar"
                  ? "أدخل بريدك الإلكتروني"
                  : "Enter your email"
              }
              className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition font-medium">
              {i18n.language === "ar" ? "اشترك" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-300">ModelStar</span>.{" "}
        {i18n.language === "ar"
          ? "جميع الحقوق محفوظة"
          : "All rights reserved"}
        .
      </div>
    </footer>
  );
}

export default Footer;
