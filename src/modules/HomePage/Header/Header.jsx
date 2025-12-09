import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import shoppingImg from "../../../assets/shopping-img.svg";

function Header() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const reduceMotion = useReducedMotion();

  const textInitial = { opacity: 0, x: isRTL ? 60 : -60 };
  const imageInitial = { opacity: 0, y: 80 };
  const animateTo = { opacity: 1, x: 0, y: 0 };
  const transitionText = { duration: reduceMotion ? 0.01 : 0.8, ease: "easeOut" };
  const transitionImage = { duration: reduceMotion ? 0.01 : 0.9, ease: "easeOut" };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F8FAFC, #FFFFFF)" }}
      aria-labelledby="hero-heading"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* زخارف */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-pulse pointer-events-none"
        style={{ background: "#0B132B20" }} />

      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full mix-blend-multiply blur-3xl opacity-35 animate-pulse pointer-events-none"
        style={{ background: "#06B6D420" }} />

      <div className="container mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative z-10">

        {/* النصوص */}
        <motion.div
          className={`flex-1 space-y-6 ${isRTL ? "text-right" : "text-left"}`}
          initial={textInitial}
          animate={animateTo}
          transition={transitionText}
        >
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
            style={{ color: "#0B132B" }}
          >
            {t("home.hero.title")}
          </h1>

          <p className="text-lg md:text-xl max-w-xl"
            style={{ color: "#6B7280" }}>
            {t("home.hero.subtitle")}
          </p>

          {/* الأزرار */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-3 rounded-2xl text-lg font-semibold shadow-lg transform transition duration-300 hover:scale-105"
              style={{
                backgroundColor: "#06B6D4",
                color: "white",
              }}
            >
              {t("home.hero.cta", "ابدأ التسوق الآن")}
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-2xl text-md font-medium border transition"
              style={{
                borderColor: "#0B132B30",
                color: "#0B132B",
                backgroundColor: "white",
              }}
            >
              {t("home.hero.learnMore", "المزيد")}
            </Link>
          </div>

          {/* مميزات */}
          <div className="mt-4 flex flex-wrap gap-3 text-sm"
            style={{ color: "#6B7280" }}>
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl shadow-sm"
              style={{ background: "#FFFFFF90", backdropFilter: "blur(6px)", color: "#0B132B" }}>
              ✔ {t("home.hero.benefit1", "شحن سريع")}
            </span>

            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl shadow-sm"
              style={{ background: "#FFFFFF90", backdropFilter: "blur(6px)", color: "#0B132B" }}>
              ⟳ {t("home.hero.benefit2", "إرجاع خلال 30 يوم")}
            </span>
          </div>
        </motion.div>

        {/* الصورة */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={imageInitial}
          animate={animateTo}
          transition={transitionImage}
        >
          <img
            src={shoppingImg}
            alt={t("home.hero.imageAlt", "صورة للتسوق")}
            className="w-full max-w-md drop-shadow-xl rounded-2xl"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Header;
