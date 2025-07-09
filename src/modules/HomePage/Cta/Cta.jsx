import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import subscriberImg from '../../../assets/subscriber.svg';

function Cta() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-100 via-white to-gray-100 text-gray-900">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        
        <div className="flex-1 animate-float">
          <img
            src={subscriberImg}
            alt="Join Illustration"
            className="w-full max-w-sm mx-auto"
          />
        </div>

        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 leading-snug">
            {t("home.cta.title", "جاهز للانطلاق؟")}
          </h2>
          <p className="text-gray-700 text-lg">
            {t("home.cta.subtitle", "انضم إلينا الآن وابدأ رحلتك في عالم التسوق الإلكتروني.")}
          </p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            {t("home.cta.button", "إنشاء حساب")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cta;
