import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart, ShieldCheck, Truck, ThumbsUp } from "lucide-react";

function Cta() {
    
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          {t("home.cta.title", "جاهز للانطلاق؟")}
        </h2>
        <p className="mb-6">
          {t("home.cta.subtitle", "انضم إلينا الآن وابدأ رحلتك في عالم التسوق الإلكتروني.")}
        </p>
        <Link
          to="/register"
          className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          {t("home.cta.button", "إنشاء حساب")}
        </Link>
      </section>
  )
}

export default Cta
