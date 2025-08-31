import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import subscriberImg from "../../../assets/subscriber.svg";

function Cta() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 bg-gradient-to-br from-indigo-50 via-white to-gray-50 overflow-hidden">
      {/* خلفية دوائر متحركة */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        {/* صورة مع حركة */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={subscriberImg}
            alt="Join Illustration"
            className="w-full max-w-sm drop-shadow-xl"
          />
        </motion.div>

        {/* النصوص */}
        <motion.div
          className="flex-1 space-y-6 text-center"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 leading-snug">
            {t("home.cta.title", "جاهز للانطلاق؟")}
          </h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
            {t(
              "home.cta.subtitle",
              "انضم إلينا الآن وابدأ رحلتك في عالم التسوق الإلكتروني."
            )}
          </p>
          <div>
            <Link
              to="/auth/register"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              {t("home.cta.button", "إنشاء حساب")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Cta;
