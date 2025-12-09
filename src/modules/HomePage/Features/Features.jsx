import React from 'react';
import { useTranslation } from "react-i18next";
import { ShoppingCart, ShieldCheck, Truck, ThumbsUp } from "lucide-react";
import { useReducedMotion } from "framer-motion";

function Features() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const reduceMotion = useReducedMotion();

  // Chic Teal palette (inline HEX - no tailwind.config needed)
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accent2: "#FF6B6B",
    softBg: "#F8FAFC",
    muted: "#6B7280",
  };

  const features = [
    {
      icon: <ShieldCheck size={30} />,
      title: t("home.features.quality", "جودة مضمونة"),
      desc: t("home.features.qualityDesc", "منتجاتنا مختارة بعناية وتخضع لأعلى معايير الجودة.")
    },
    {
      icon: <Truck size={30} />,
      title: t("home.features.delivery", "شحن سريع"),
      desc: t("home.features.deliveryDesc", "نوصل طلباتك بسرعة وفي الوقت المحدد لأي مكان.")
    },
    {
      icon: <ShoppingCart size={30} />,
      title: t("home.features.easyShopping", "تجربة تسوق سهلة"),
      desc: t("home.features.easyShoppingDesc", "واجهة بسيطة وسلسة لتجعل التسوق ممتعاً.")
    },
    {
      icon: <ThumbsUp size={30} />,
      title: t("home.features.trust", "ثقة العملاء"),
      desc: t("home.features.trustDesc", "نحظى بثقة آلاف العملاء في الوطن العربي.")
    },
  ];

  // conditional classes to respect reduced motion
  const cardHoverClasses = reduceMotion
    ? "transition-colors duration-200"
    : "hover:shadow-xl transition-all duration-500 hover:-translate-y-2";

  const iconEffectClasses = reduceMotion
    ? "transition-colors duration-200"
    : "group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500";

  return (
    <section
      className="py-20 relative"
      style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #FFFFFF)` }}
      aria-labelledby="features-heading"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6">
        <h2
          id="features-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          style={{ color: COLORS.primary }}
        >
          {t("home.features.title", "لماذا تختارنا؟")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group text-center p-8 rounded-2xl bg-white shadow-md ${cardHoverClasses}`}
              role="article"
              aria-label={feature.title}
              tabIndex={0}
              style={{
                border: `1px solid ${COLORS.primary}10`,
                boxShadow: "0 8px 24px rgba(12,15,25,0.06)",
              }}
            >
              <div className="mb-6 flex justify-center">
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg ${iconEffectClasses}`}
                  style={{
                    background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`,
                    boxShadow: "0 8px 20px rgba(6,22,43,0.08)",
                  }}
                  aria-hidden
                >
                  {/*
                    override lucide icons color via inline style (ensures they stay visible on gradient)
                  */}
                  {React.cloneElement(feature.icon, { color: "#FFFFFF", size: 28 })}
                </div>
              </div>

              <h3
                className="text-lg font-semibold mb-3 transition-colors"
                style={{ color: COLORS.primary }}
              >
                {feature.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: COLORS.muted }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
