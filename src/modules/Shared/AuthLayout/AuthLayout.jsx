import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * AuthLayout (Chic Teal)
 * - RTL support
 * - Inline Chic Teal palette (no tailwind.config)
 * - Modern split layout (form / branding)
 * - Accessibility: lang/dir, landmarks, headings
 * - No external logo file — brand uses styled text + accent mark
 */

function AuthLayout() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language || "ar";
  }, [i18n.language]);

  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    softBg: "#F8FAFC",
    muted: "#6B7280",
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" dir={i18n.dir()}>
      {/* LEFT: form area */}
      <main
        className="w-full md:w-1/2 flex items-center justify-center px-6 py-12"
        style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #FFFFFF)` }}
        aria-labelledby="auth-heading"
      >
        <div className="w-full max-w-md">
          {/* small header for mobile */}
          <div className="mb-6 md:hidden text-center">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontWeight: 800,
                color: COLORS.primary,
                fontSize: 22,
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background: `linear-gradient(180deg, ${COLORS.accent}, ${COLORS.accentDark})`,
                  display: "inline-block",
                  boxShadow: "0 4px 14px rgba(6,182,212,0.14)",
                }}
                aria-hidden
              />
              OmarMarket
            </span>
          </div>

          <section
            className="bg-white rounded-2xl shadow-md p-6 md:p-10"
            role="region"
            aria-labelledby="auth-heading"
          >
            <h1
              id="auth-heading"
              className="text-2xl md:text-3xl font-extrabold mb-3"
              style={{ color: COLORS.primary }}
            >
              {t("auth.title", "مرحباً بك")}
            </h1>
            <p className="text-sm mb-6" style={{ color: COLORS.muted }}>
              {t("auth.subtitle", "سجّل الدخول إلى حسابك أو أنشئ حساب جديد للبدء بالتسوق")}
            </p>

            {/* Outlet for login/register forms */}
            <div>
              <Outlet />
            </div>

            {/* small footer links inside form card */}
            <div className="mt-6 text-xs text-gray-500 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link to="/" className="hover:underline" style={{ color: COLORS.muted }}>
                {t("auth.home", "الصفحة الرئيسية")}
              </Link>
              <span aria-hidden>·</span>
              <Link to="/terms" className="hover:underline" style={{ color: COLORS.muted }}>
                {t("auth.terms", "الشروط")}
              </Link>
              <span aria-hidden>·</span>
              <Link to="/privacy" className="hover:underline" style={{ color: COLORS.muted }}>
                {t("auth.privacy", "الخصوصية")}
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* RIGHT: branding panel (hidden under md) */}
      <aside
        className="hidden md:flex md:w-1/2 flex-col justify-between p-12 text-white relative overflow-hidden"
        aria-hidden={false}
        role="complementary"
        style={{
          background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
        }}
      >
        {/* decorative shapes */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: "-6%",
            top: "-12%",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            filter: "blur(30px)",
            transform: "rotate(12deg)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "-8%",
            bottom: "-8%",
            width: 260,
            height: 260,
            borderRadius: "24%",
            background: "rgba(255,255,255,0.04)",
            filter: "blur(24px)",
            transform: "rotate(-10deg)",
          }}
        />

        <div className="z-10">
          <div className="flex items-center gap-4 mb-6">
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: "rgba(255,255,255,0.18)",
                display: "inline-block",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              }}
              aria-hidden
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: 0.5 }}>
                OmarMarket
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>تسوّق بثقة وأناقة</div>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold mb-3" style={{ color: "rgba(255,255,255,0.98)" }}>
            {t("auth.brandTitle", "أفضل تجربة تسوّق")}.
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.9)", maxWidth: 520 }}>
            {t(
              "auth.brandDesc",
              "منتجات مُختارة بعناية، توصيل سريع، وخدمة عملاء متميزة — كل ذلك في مكان واحد."
            )}
          </p>

        </div>

        <footer className="text-xs text-white/80 z-10">
          <div className="flex items-center gap-3 mb-2">
            <span style={{ width: 8, height: 8, borderRadius: 4, background: "#fff", opacity: 0.9 }} />
            <span>{t("auth.trustBadge", "آمن وسهل")}</span>
          </div>

          <div className="text-xs opacity-90">
            &copy; {new Date().getFullYear()} OmarMarket — {t("auth.rights", "جميع الحقوق محفوظة")}
          </div>
        </footer>
      </aside>
    </div>
  );
}

export default AuthLayout;
