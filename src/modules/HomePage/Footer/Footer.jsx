import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  // Chic Teal palette (inline HEX)
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    accent2: "#FF6B6B",
    softBg: "#F8FAFC",
    muted: "#6B7280",
    lightGray: "#E6EEF2",
    white: "#FFFFFF",
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: dispatch subscription action / api call
    // يمكنك استبدال هذا الجزء بمناداة API للاشتراك
    const form = e.currentTarget;
    const email = form.elements?.email?.value;
    console.log("Subscribe email:", email);
  };

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        background: `linear-gradient(120deg, ${COLORS.primary}, #061022)`,
        color: COLORS.lightGray,
      }}
      className="pt-14 pb-8 mt-20 relative"
      aria-labelledby="footer-heading"
    >
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 text-sm">
        {/* Logo + Description */}
        <div>
          <h2
            id="footer-heading"
            className="text-3xl font-extrabold mb-3 tracking-wide"
            style={{ color: COLORS.white }}
          >
            ModelStar
          </h2>

          <p style={{ color: COLORS.lightGray }} className="text-sm leading-relaxed">
            {i18n.language === "ar"
              ? "أفضل مكان للتسوق عبر الإنترنت بمنتجات مميزة وأسعار تنافسية."
              : "The best place to shop online with unique products and competitive prices."}
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-5" role="navigation" aria-label={t("footer.social", "Social links")}>
            <a
              href="#"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition focus:outline-none focus-visible:ring-4"
              style={{ background: `${COLORS.white}10` }}
            >
              <Facebook size={18} color={COLORS.white} />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition focus:outline-none focus-visible:ring-4"
              style={{ background: `${COLORS.white}10` }}
            >
              <Instagram size={18} color={COLORS.white} />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition focus:outline-none focus-visible:ring-4"
              style={{ background: `${COLORS.white}10` }}
            >
              <Twitter size={18} color={COLORS.white} />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition focus:outline-none focus-visible:ring-4"
              style={{ background: `${COLORS.white}10` }}
            >
              <Youtube size={18} color={COLORS.white} />
            </a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4 pb-2" style={{ color: COLORS.white }}>
            {t("nav.shop")}
          </h3>
          <ul className="space-y-3">
            <li>
              <Link to="/products" className="hover:underline transition" style={{ color: COLORS.lightGray }}>
                {t("nav.shop")}
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:underline transition" style={{ color: COLORS.lightGray }}>
                {t("nav.cart")}
              </Link>
            </li>
            <li>
              <Link to="/my-orders" className="hover:underline transition" style={{ color: COLORS.lightGray }}>
                {t("nav.orders")}
              </Link>
            </li>
          </ul>
        </div>

        {/* About Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4 pb-2" style={{ color: COLORS.white }}>
            {t("nav.about")}
          </h3>
          <ul className="space-y-3">
            <li>
              <Link to="/about" className="hover:underline transition" style={{ color: COLORS.lightGray }}>
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline transition" style={{ color: COLORS.lightGray }}>
                {t("nav.contact")}
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline transition" style={{ color: COLORS.lightGray }}>
                {i18n.language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:underline transition" style={{ color: COLORS.lightGray }}>
                {i18n.language === "ar" ? "سياسة الاسترجاع" : "Return Policy"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-4 pb-2" style={{ color: COLORS.white }}>
            {i18n.language === "ar" ? "سجل الان وابدا التسوق" : "Register & Start Shopping"}
          </h3>

          <form className="flex flex-col space-y-4" onSubmit={handleNewsletterSubmit} aria-label={t("footer.newsletter", "Newsletter form")}>
            <label htmlFor="footer-email" className="sr-only">
              {i18n.language === "ar" ? "البريد الإلكتروني" : "Email address"}
            </label>

            <input
              id="footer-email"
              name="email"
              type="email"
              required
              placeholder={i18n.language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
              className="px-4 py-3 rounded-lg bg-transparent border placeholder-gray-400"
              style={{
                borderColor: `${COLORS.white}30`,
                color: COLORS.white,
              }}
              aria-label={i18n.language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
            />

            <button
              type="submit"
              className="py-3 rounded-lg font-medium transition focus:outline-none focus-visible:ring-4"
              style={{
                background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
                color: COLORS.white,
              }}
              aria-label={i18n.language === "ar" ? "اشترك" : "Subscribe"}
            >
              {i18n.language === "ar" ? "اشترك" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t pt-6 text-center text-xs" style={{ borderColor: `${COLORS.white}10`, color: COLORS.lightGray }}>
        &copy; {new Date().getFullYear()}{" "}
        <span style={{ color: COLORS.white, fontWeight: 600 }}>ModelStar</span>.{" "}
        {i18n.language === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}.
      </div>
    </footer>
  );
}

export default Footer;
