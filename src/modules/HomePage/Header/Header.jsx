import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import shoppingImg from "../../../assets/shopping-img.svg";

function Header() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-gray-50">
      {/* خلفيات دوائر ناعمة */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="container mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative z-10">
        {/* النصوص */}
        <motion.div
          className={`flex-1 space-y-6 ${isRTL ? "text-right" : "text-left"}`}
          initial={{ opacity: 0, x: isRTL ? 60 : -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-indigo-700">
            {t("home.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-xl">
            {t("home.hero.subtitle")}
          </p>
          <div className="pt-4">
            <Link
              to="/products"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              {t("home.hero.cta", "ابدا التسوق الآن")}
            </Link>
          </div>
        </motion.div>

        {/* الصورة */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <img
            src={shoppingImg}
            alt="Shopping Illustration"
            className="w-full max-w-md drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Header;
