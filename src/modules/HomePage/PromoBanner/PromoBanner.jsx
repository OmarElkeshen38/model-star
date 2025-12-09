import React from 'react';
import { useTranslation } from 'react-i18next';
import { Truck, Percent } from 'lucide-react';
import { useReducedMotion } from "framer-motion";

function PromoBanner() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const reduceMotion = useReducedMotion();

  // Chic Teal palette (inline HEX)
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    white: "#FFFFFF"
  };

  return (
    <div
      className="overflow-hidden"
      style={{
        background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
        color: COLORS.white,
      }}
    >
      <div
        className={`flex whitespace-nowrap ${reduceMotion ? "" : "animate-marquee"}`}
        style={{
          flexDirection: isRTL ? "row-reverse" : "row",
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-8 px-8 text-sm md:text-base font-medium"
          >
            {/* Free Shipping */}
            <div className="flex items-center gap-2">
              <Truck size={20} color="#FFFFFF" />
              {t("promo.freeShipping")}
            </div>

            {/* Discount */}
            <div className="flex items-center gap-2">
              <Percent size={20} color="#FFFFFF" />
              {t("promo.discount")}
            </div>
          </div>
        ))}
      </div>

      {/* Animation Styles */}
      {!reduceMotion && (
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(${isRTL ? "-50%" : "0%"}); }
              100% { transform: translateX(${isRTL ? "0%" : "-50%"}); }
            }

            .animate-marquee {
              display: flex;
              width: max-content;
              animation: marquee 22s linear infinite;
            }
          `}
        </style>
      )}
    </div>
  );
}

export default PromoBanner;
