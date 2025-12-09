import React from "react";
import { useTranslation } from "react-i18next";
import notFoundImg from "../../../assets/not-found.svg";
import { Link } from "react-router-dom";

function NotFound() {
  const { t } = useTranslation();
  const isRTL = document.documentElement.dir === "rtl";

  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    softBg: "#F8FAFC",
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6`}
      style={{
        background: `linear-gradient(${isRTL ? "135deg" : "45deg"}, ${COLORS.softBg}, #ffffff, ${COLORS.accent}20)`,
      }}
    >
      <section className="text-center flex flex-col items-center gap-6 max-w-2xl mx-auto py-16">

        <img
          src={notFoundImg}
          alt="404 Not Found Illustration"
          className="w-full max-w-md mx-auto drop-shadow-lg animate-[float_3s_ease-in-out_infinite]"
          style={{
            animation: "float 3s ease-in-out infinite",
          }}
        />

        <h1
          className="text-4xl md:text-5xl font-extrabold"
          style={{ color: COLORS.accentDark }}
        >
          {t("notFound.title", "الصفحة غير موجودة")}
        </h1>

        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          {t("notFound.subtitle", "عذرًا، الصفحة التي تحاول الوصول إليها غير متاحة.")}
        </p>

        <Link
          to="/"
          className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition shadow-md"
          style={{ background: COLORS.accentDark }}
        >
          {t("notFound.backToHome", "العودة للصفحة الرئيسية")}
        </Link>

      </section>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}

export default NotFound;
