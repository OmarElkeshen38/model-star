import { useTranslation } from 'react-i18next';
import React from 'react';
import styles from './Header.module.css';
import shoppingImg from '../../../assets/shopping-img.svg';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

function Header() {

  const { t, i18n } = useTranslation();

  return (
    <div className="bg-gray-100 text-gray-800">
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between container mx-auto px-6 py-16 gap-10">
        <div className="flex-1 space-y-6 text- ">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-indigo-700">
            {t("home.hero.title", "اكتشف أفضل المنتجات بأسعار منافسة")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("home.hero.subtitle", "تسوّق الآن من مجموعة واسعة من المنتجات بجودة عالية وخدمة مميزة.")}
          </p>
          <Link
            to="/shop"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
          >
            {t("home.hero.cta", "ابدأ التسوق")}
          </Link>
        </div>

        <div className="flex-1">
          <img
            src={shoppingImg}
            alt="Shopping Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>
      </div>

  )
}

export default Header
