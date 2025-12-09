import React from "react";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { Package, Truck, ShieldCheck } from "lucide-react";
import ContactUs from "../ContactUs/ContactUs";
import aboutImg from "../../assets/about-illustration.jpg";

function AboutUs() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const reduceMotion = useReducedMotion();

  // Chic Teal palette (inline HEX — no tailwind.config needed)
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    accent2: "#FF6B6B",
    softBg: "#F8FAFC",
    muted: "#6B7280",
    white: "#FFFFFF",
  };

  const transition = reduceMotion ? { duration: 0.01 } : { duration: 0.7, ease: "easeOut" };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative pt-24 pb-16 overflow-hidden"
        dir={isRTL ? "rtl" : "ltr"}
        style={{ background: `linear-gradient(135deg, ${COLORS.softBg}, ${COLORS.white})` }}
        aria-labelledby="about-hero-heading"
      >
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={transition}
            viewport={{ once: true }}
          >
            <h1
              id="about-hero-heading"
              className="text-4xl md:text-5xl font-extrabold leading-snug mb-6"
              style={{ color: COLORS.primary }}
            >
              {t("about.title", "من نحن")}
            </h1>

            <p className="text-lg leading-relaxed mb-6" style={{ color: COLORS.muted }}>
              {t(
                "about.description",
                "متجرنا يقدم لك أفضل تجربة تسوق إلكتروني، حيث نوفّر منتجات عالية الجودة، وخدمة عملاء مميزة، وتجربة سلسة وآمنة."
              )}
            </p>

            {/* CTA (optional) */}
            <div className="mt-4">
              <a
                href="/products"
                className="inline-block px-6 py-3 rounded-xl font-semibold transition"
                style={{
                  background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
                  color: COLORS.white,
                  boxShadow: "0 10px 30px rgba(6,182,212,0.14)",
                }}
                aria-label={t("about.cta", "تصفح المنتجات")}
              >
                {t("about.cta", "تصفح المنتجات")}
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true }}
            className="flex justify-center"
            aria-hidden
          >
            <img
              src={aboutImg}
              alt={t("about.imageAlt", "صورة من نحن")}
              className="max-w-md w-full drop-shadow-lg rounded-lg"
              loading="lazy"
              style={{ display: "block" }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "data:image/svg+xml;utf8," +
                  encodeURIComponent(
                    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><rect width='100%' height='100%' fill='${COLORS.softBg}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${COLORS.muted}' font-family='Arial, Helvetica, sans-serif' font-size='16'>No image</text></svg>`
                  );
              }}
            />
          </motion.div>
        </div>

        {/* decorative background circles */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"
          style={{ background: `${COLORS.primary}20` }}
        />
        <div
          aria-hidden
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"
          style={{ background: `${COLORS.accent}20` }}
        />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" aria-labelledby="about-features-heading">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10"
          >
            <div
              className="p-8 rounded-2xl shadow-sm hover:shadow-lg transition text-center"
              role="article"
              aria-label={t("about.quality", "منتجات مختارة بعناية")}
              style={{ background: "#FAFBFC" }}
            >
              <div className="flex justify-center mb-4">
                <Package size={40} color={COLORS.accent} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>
                {t("about.quality", "منتجات مختارة بعناية")}
              </h3>
              <p style={{ color: COLORS.muted }}>
                {t("about.qualityDesc", "نحرص على اختيار أفضل الخامات والماركات الموثوقة.")}
              </p>
            </div>

            <div
              className="p-8 rounded-2xl shadow-sm hover:shadow-lg transition text-center"
              role="article"
              aria-label={t("about.shipping", "شحن سريع وآمن")}
              style={{ background: "#FAFBFC" }}
            >
              <div className="flex justify-center mb-4">
                <Truck size={40} color={COLORS.accent} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>
                {t("about.shipping", "شحن سريع وآمن")}
              </h3>
              <p style={{ color: COLORS.muted }}>
                {t("about.shippingDesc", "نوصل الطلبات لجميع المناطق خلال وقت قصير.")}
              </p>
            </div>

            <div
              className="p-8 rounded-2xl shadow-sm hover:shadow-lg transition text-center"
              role="article"
              aria-label={t("about.trust", "ثقة العملاء")}
              style={{ background: "#FAFBFC" }}
            >
              <div className="flex justify-center mb-4">
                <ShieldCheck size={40} color={COLORS.accent} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: COLORS.primary }}>
                {t("about.trust", "ثقة العملاء")}
              </h3>
              <p style={{ color: COLORS.muted }}>
                {t("about.trustDesc", "نحظى بثقة آلاف العملاء منذ انطلاقنا.")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section (reuses ContactUs component which is already updated) */}
      <ContactUs />
    </>
  );
}

export default AboutUs;
