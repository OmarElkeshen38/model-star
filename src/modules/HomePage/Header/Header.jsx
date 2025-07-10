import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import shoppingImg from '../../../assets/shopping-img.svg';

function Header() {
  const { t } = useTranslation();
  const isRTL = document.documentElement.dir === 'rtl';

  return (
    <div className={`text-gray-900 ${isRTL ? 'bg-gradient-to-bl' : 'bg-gradient-to-br'} from-indigo-500 via-white to-gray-100`}>
      <section className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between container mx-auto px-6 py-20 gap-10">

        <div className="flex-1 space-y-6 ">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-indigo-700">
            {t("home.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            {t("home.hero.subtitle")}
          </p>
          <div className="mt-6">
                <Link
                  to="/shop"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-transform hover:scale-105"
                >
                  {t("home.hero.cta", "ابدا التسوق الآن")}
                </Link>
              </div>
        </div>

        <div className="flex-1 animate-float">
          <img
            src={shoppingImg}
            alt="Shopping Illustration"
            className="w-full max-w-md mx-auto drop-shadow-md animate-float animate-fade-in"
          />
        </div>
      </section>
    </div>
  );
}

export default Header;
