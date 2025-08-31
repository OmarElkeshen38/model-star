import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

function ContactUs() {
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="text-center pt-20 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-indigo-700 mb-4"
        >
          {t("contact.title", "اتصل بنا")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-xl mx-auto"
        >
          {t("contact.subtitle", "يسعدنا تواصلك معنا لأي استفسارات أو ملاحظات.")}
        </motion.p>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 pb-20 grid md:grid-cols-2 gap-12">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-md p-8 space-y-5"
        >
          <input
            type="text"
            placeholder={t("contact.name", "الاسم")}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="email"
            placeholder={t("contact.email", "البريد الإلكتروني")}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <textarea
            placeholder={t("contact.message", "اكتب رسالتك هنا")}
            rows="5"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-transform hover:scale-105"
          >
            {t("contact.send", "إرسال")}
          </button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-md p-8 space-y-6"
        >
          <div>
            <h3 className="font-semibold text-lg text-indigo-600 mb-2 flex items-center gap-2">
              <MapPin size={20} /> {t("contact.address", "العنوان")}
            </h3>
            <p className="text-gray-700">مصر - القاهرة - تيسير فهمي</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-indigo-600 mb-2 flex items-center gap-2">
              <Phone size={20} /> {t("contact.phone", "الهاتف")}
            </h3>
            <p dir="ltr" className="text-gray-700">
              +20 150 548 3625
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-indigo-600 mb-2 flex items-center gap-2">
              <Mail size={20} /> {t("contact.email", "البريد الإلكتروني")}
            </h3>
            <p className="text-gray-700">support@yourstore.com</p>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-xl mt-6 shadow">
            <iframe
              title="map"
              className="w-full h-56"
              src="https://maps.google.com/maps?q=Cairo,%20Egypt&t=&z=13&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default ContactUs;
