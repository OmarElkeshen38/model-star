import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

/**
 * ContactUs (updated)
 * - Chic Teal inline palette (no tailwind.config)
 * - RTL support via i18n.dir()
 * - prefers-reduced-motion respect
 * - Accessible form: labels, aria-invalid, aria-live, focus handling
 * - Prevent default submit and show success message (replace with real API call)
 */

function ContactUs() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const reduceMotion = useReducedMotion();

  // Chic Teal palette
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    muted: "#6B7280",
    softBg: "#F8FAFC",
    white: "#FFFFFF",
    danger: "#EF4444",
  };

  // form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const transition = reduceMotion ? { duration: 0.01 } : { duration: 0.6, ease: "easeOut" };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t("contact.errors.name", "الاسم مطلوب");
    if (!form.email.trim()) e.email = t("contact.errors.email", "البريد الإلكتروني مطلوب");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t("contact.errors.emailInvalid", "البريد الإلكتروني غير صالح");
    if (!form.message.trim()) e.message = t("contact.errors.message", "الرسالة مطلوبة");
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      const first = Object.keys(v)[0];
      const el = document.querySelector(`[name="${first}"]`);
      if (el) el.focus();
      return;
    }

    // Simulate submit — replace with API call
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      setSuccess(t("contact.success", "تم إرسال الرسالة! سنرد عليك قريبًا."));
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setErrors({ form: t("contact.errors.submit", "حدث خطأ أثناء الإرسال") });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: `linear-gradient(135deg, ${COLORS.softBg}, #FFFFFF)` }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Hero */}
      <section className="text-center pt-20 pb-8">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          viewport={{ once: true }}
          className="text-4xl font-extrabold mb-4"
          style={{ color: COLORS.primary }}
        >
          {t("contact.title", "اتصل بنا")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.15 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-gray-700"
          style={{ color: COLORS.muted }}
        >
          {t("contact.subtitle", "يسعدنا تواصلك معنا لأي استفسارات أو ملاحظات.")}
        </motion.p>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 pb-20 grid md:grid-cols-2 gap-10">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={transition}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-md p-6 space-y-4"
          aria-labelledby="contact-form-heading"
        >
          <h2 id="contact-form-heading" className="sr-only">
            {t("contact.formHeading", "Contact form")}
          </h2>

          {/* Name */}
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium" style={{ color: COLORS.primary }}>
              {t("contact.name", "الاسم")}
            </label>
            <input
              id="contact-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{ borderColor: `${COLORS.primary}20`, color: COLORS.primary }}
              placeholder={t("contact.namePlaceholder", "الاسم الكامل")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "err-name" : undefined}
            />
            {errors.name && (
              <p id="err-name" className="mt-1 text-sm" style={{ color: COLORS.danger }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium" style={{ color: COLORS.primary }}>
              {t("contact.email", "البريد الإلكتروني")}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{ borderColor: `${COLORS.primary}20`, color: COLORS.primary }}
              placeholder={t("contact.emailPlaceholder", "example@mail.com")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
            />
            {errors.email && (
              <p id="err-email" className="mt-1 text-sm" style={{ color: COLORS.danger }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium" style={{ color: COLORS.primary }}>
              {t("contact.message", "الرسالة")}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{ borderColor: `${COLORS.primary}20`, color: COLORS.primary }}
              placeholder={t("contact.messagePlaceholder", "اكتب رسالتك هنا")}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "err-message" : undefined}
            />
            {errors.message && (
              <p id="err-message" className="mt-1 text-sm" style={{ color: COLORS.danger }}>
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-lg font-semibold"
              style={{
                background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
                color: "#fff",
                boxShadow: "0 8px 24px rgba(6,182,212,0.12)",
                opacity: submitting ? 0.75 : 1,
              }}
              aria-busy={submitting}
            >
              {submitting ? t("contact.sending", "جاري الإرسال...") : t("contact.send", "إرسال")}
            </button>

            <div className="text-sm text-gray-600" style={{ color: COLORS.muted }} aria-live="polite">
              {success && <span className="text-green-600">{success}</span>}
              {errors.form && <span style={{ color: COLORS.danger }}>{errors.form}</span>}
            </div>
          </div>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={transition}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-md p-6 space-y-6"
        >
          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2" style={{ color: COLORS.primary }}>
              <MapPin size={18} /> {t("contact.address", "العنوان")}
            </h3>
            <p className="text-sm" style={{ color: COLORS.muted }}>
              {t("contact.addressValue", "مصر - القاهرة - تيسير فهمي")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2" style={{ color: COLORS.primary }}>
              <Phone size={18} /> {t("contact.phone", "الهاتف")}
            </h3>
            <p className="text-sm" style={{ color: COLORS.muted }}>
              <a href="tel:+201505483625" className="hover:underline" style={{ color: COLORS.primary }}>
                +20 150 548 3625
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2" style={{ color: COLORS.primary }}>
              <Mail size={18} /> {t("contact.email", "البريد الإلكتروني")}
            </h3>
            <p className="text-sm" style={{ color: COLORS.muted }}>
              <a href="mailto:support@yourstore.com" className="hover:underline" style={{ color: COLORS.primary }}>
                support@yourstore.com
              </a>
            </p>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-xl mt-4 shadow" role="region" aria-label={t("contact.map", "Map")}>
            <iframe
              title="map"
              className="w-full h-56"
              src="https://maps.google.com/maps?q=Cairo,%20Egypt&t=&z=13&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              style={{ border: "0" }}
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default ContactUs;
