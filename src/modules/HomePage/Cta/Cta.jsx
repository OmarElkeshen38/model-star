import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import subscriberImg from "../../../assets/subscriber.svg";

function Cta() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const reduceMotion = useReducedMotion();

  // Chic Teal palette (inline HEX)
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    accent2: "#FF6B6B",
    softBg: "#F8FAFC",
    muted: "#6B7280",
    white: "#FFFFFF",
  };

  const textInitial = { opacity: 0, x: isRTL ? -60 : 60 };
  const imageInitial = { opacity: 0, y: 50 };
  const animateTo = { opacity: 1, x: 0, y: 0 };
  const transitionBase = { duration: reduceMotion ? 0.01 : 0.7, ease: "easeOut" };

  return (
    <section
      aria-labelledby="cta-heading"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative py-24 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${COLORS.softBg}, ${COLORS.white})` }}
    >
      {/* زخارف دائرية */}
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full mix-blend-multiply blur-3xl opacity-30 pointer-events-none"
        style={{ background: `${COLORS.primary}20` }}
      />
      <div
        aria-hidden
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full mix-blend-multiply blur-3xl opacity-30 pointer-events-none"
        style={{ background: `${COLORS.accent}20` }}
      />

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        {/* صورة مع حركة */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={imageInitial}
          whileInView={animateTo}
          transition={transitionBase}
          viewport={{ once: true }}
        >
          <img
            src={subscriberImg}
            alt={t("home.cta.imageAlt", "انضم إلينا")}
            className="w-full max-w-sm drop-shadow-xl rounded-lg"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "data:image/svg+xml;utf8," +
                encodeURIComponent(
                  `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='none'><rect width='100%' height='100%' fill='${COLORS.softBg}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${COLORS.muted}' font-family='Arial, Helvetica, sans-serif' font-size='16'>No image</text></svg>`
                );
            }}
            role="img"
          />
        </motion.div>

        {/* النصوص */}
        <motion.div
          className="flex-1 space-y-6 text-center md:text-left"
          initial={textInitial}
          whileInView={animateTo}
          transition={{ ...transitionBase, delay: reduceMotion ? 0.0 : 0.15 }}
          viewport={{ once: true }}
        >
          <h2
            id="cta-heading"
            className="text-4xl md:text-5xl font-extrabold leading-snug"
            style={{ color: COLORS.primary }}
          >
            {t("home.cta.title", "جاهز للانطلاق؟")}
          </h2>

          <p
            className="text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0"
            style={{ color: COLORS.muted }}
          >
            {t(
              "home.cta.subtitle",
              "انضم إلينا الآن وابدأ رحلتك في عالم التسوق الإلكتروني."
            )}
          </p>

          <div>
            <Link
              to="/auth/register"
              role="button"
              aria-label={t("home.cta.button", "إنشاء حساب")}
              className="inline-block px-8 py-3 rounded-xl font-semibold text-lg shadow-md focus:outline-none focus-visible:ring-4"
              style={{
                background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
                color: COLORS.white,
                boxShadow: "0 10px 30px rgba(6,182,212,0.18)",
              }}
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
