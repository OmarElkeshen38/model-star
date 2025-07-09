import React from 'react';
import { useTranslation } from "react-i18next";
import { ShoppingCart, ShieldCheck, Truck, ThumbsUp } from "lucide-react";

function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <ShieldCheck size={40} className="text-indigo-600 group-hover:scale-110 transition" />,
      title: t("home.features.quality", "جودة مضمونة"),
      desc: t("home.features.qualityDesc", "منتجاتنا مختارة بعناية وتخضع لأعلى معايير الجودة.")
    },
    {
      icon: <Truck size={40} className="text-indigo-600 group-hover:scale-110 transition" />,
      title: t("home.features.delivery", "شحن سريع"),
      desc: t("home.features.deliveryDesc", "نوصل طلباتك بسرعة وفي الوقت المحدد لأي مكان.")
    },
    {
      icon: <ShoppingCart size={40} className="text-indigo-600 group-hover:scale-110 transition" />,
      title: t("home.features.easyShopping", "تجربة تسوق سهلة"),
      desc: t("home.features.easyShoppingDesc", "واجهة بسيطة وسلسة لتجعل التسوق ممتعاً.")
    },
    {
      icon: <ThumbsUp size={40} className="text-indigo-600 group-hover:scale-110 transition" />,
      title: t("home.features.trust", "ثقة العملاء"),
      desc: t("home.features.trustDesc", "نحظى بثقة آلاف العملاء في الوطن العربي.")
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-indigo-50 to-gray-100 text-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">
          {t("home.features.title", "لماذا تختارنا؟")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 animate-fade-in-up"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
