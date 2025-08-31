import React from 'react';
import { useTranslation } from 'react-i18next';
import { Truck, Percent } from 'lucide-react';

function PromoBanner() {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-8 px-8 text-sm md:text-base font-medium"
          >
            <div className="flex items-center gap-2">
              <Truck size={20} />
              {t("promo.freeShipping")}
            </div>
            <div className="flex items-center gap-2">
              <Percent size={20} />
              {t("promo.discount")}
            </div>
          </div>
        ))}
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 20s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

export default PromoBanner;
