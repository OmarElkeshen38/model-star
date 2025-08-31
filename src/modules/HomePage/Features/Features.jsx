import React from 'react';
import { useTranslation } from "react-i18next";
import { ShoppingCart, ShieldCheck, Truck, ThumbsUp } from "lucide-react";

function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <ShieldCheck size={30} className="text-white" />,
      title: t("home.features.quality", "جودة مضمونة"),
      desc: t("home.features.qualityDesc", "منتجاتنا مختارة بعناية وتخضع لأعلى معايير الجودة.")
    },
    {
      icon: <Truck size={30} className="text-white" />,
      title: t("home.features.delivery", "شحن سريع"),
      desc: t("home.features.deliveryDesc", "نوصل طلباتك بسرعة وفي الوقت المحدد لأي مكان.")
    },
    {
      icon: <ShoppingCart size={30} className="text-white" />,
      title: t("home.features.easyShopping", "تجربة تسوق سهلة"),
      desc: t("home.features.easyShoppingDesc", "واجهة بسيطة وسلسة لتجعل التسوق ممتعاً.")
    },
    {
      icon: <ThumbsUp size={30} className="text-white" />,
      title: t("home.features.trust", "ثقة العملاء"),
      desc: t("home.features.trustDesc", "نحظى بثقة آلاف العملاء في الوطن العربي.")
    },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          {t("home.features.title", "لماذا تختارنا؟")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-8 bg-gradient-to-b from-indigo-50 via-white to-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800 group-hover:text-indigo-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
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
