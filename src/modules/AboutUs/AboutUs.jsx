import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Package, Truck, ShieldCheck } from "lucide-react";
import ContactUs from "../ContactUs/ContactUs";
import aboutImg from "../../assets/about-illustration.jpg";

function AboutUs() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-gray-50 pt-24 pb-16 overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 leading-snug mb-6">
              {t("about.title", "من نحن")}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {t(
                "about.description",
                "متجرنا يقدم لك أفضل تجربة تسوق إلكتروني، حيث نوفّر منتجات عالية الجودة، وخدمة عملاء مميزة، وتجربة سلسة وآمنة."
              )}
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src={aboutImg}
              alt="About us illustration"
              className="max-w-md w-full drop-shadow-lg"
            />
          </motion.div>
        </div>

        {/* خلفية ديكورية */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10"
          >
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition text-center">
              <div className="flex justify-center mb-4">
                <Package className="text-indigo-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t("about.quality", "منتجات مختارة بعناية")}
              </h3>
              <p className="text-gray-600">
                {t(
                  "about.qualityDesc",
                  "نحرص على اختيار أفضل الخامات والماركات الموثوقة."
                )}
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition text-center">
              <div className="flex justify-center mb-4">
                <Truck className="text-indigo-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t("about.shipping", "شحن سريع وآمن")}
              </h3>
              <p className="text-gray-600">
                {t(
                  "about.shippingDesc",
                  "نوصل الطلبات لجميع المناطق خلال وقت قصير."
                )}
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition text-center">
              <div className="flex justify-center mb-4">
                <ShieldCheck className="text-indigo-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t("about.trust", "ثقة العملاء")}
              </h3>
              <p className="text-gray-600">
                {t(
                  "about.trustDesc",
                  "نحظى بثقة آلاف العملاء منذ انطلاقنا."
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactUs />
    </>
  );
}

export default AboutUs;
