import React, { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Checkout.jsx
 * - Uses inline HEX colors (Chic Teal)
 * - Simple form state + validation
 * - RTL support via i18n.dir()
 * - Accessible labels, error messages, and aria-live for feedback
 *
 * Replace the `items` array with real cart data (props or redux) as needed.
 */

function Checkout() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  // Chic Teal palette (inline)
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    muted: "#6B7280",
    softBg: "#F8FAFC",
    white: "#FFFFFF",
    danger: "#EF4444",
  };

  // Mock items (replace with real cart data)
  const [items] = useState([
    { id: 1, name: "حذاء رياضي رجالي", qty: 1, price: 699 },
    { id: 2, name: "حذاء كاجوال نسائي", qty: 2, price: 549 },
  ]);

  const subtotal = items.reduce((s, it) => s + it.qty * it.price, 0);

  // Form state
  const [form, setForm] = useState({
    fullname: "",
    address: "",
    city: "",
    phone: "",
    payment: "cod", // cod = cash on delivery
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formatPrice = (v) => {
    try {
      return Number(v).toLocaleString("ar-EG");
    } catch {
      return v;
    }
  };

  const validate = () => {
    const err = {};
    if (!form.fullname?.trim()) err.fullname = t("checkout.errors.fullname", "الاسم مطلوب");
    if (!form.address?.trim()) err.address = t("checkout.errors.address", "العنوان مطلوب");
    if (!form.city?.trim()) err.city = t("checkout.errors.city", "المدينة مطلوبة");
    if (!form.phone?.trim()) err.phone = t("checkout.errors.phone", "رقم الهاتف مطلوب");
    else if (!/^[0-9+\-\s]{6,20}$/.test(form.phone))
      err.phone = t("checkout.errors.phoneInvalid", "رقم هاتف غير صالح");
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
    setSuccessMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      // focus first error (accessibility)
      const firstKey = Object.keys(v)[0];
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el) el.focus();
      return;
    }

    // Simulate submit
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccessMessage(t("checkout.success", "تم تأكيد الطلب! شكرًا لك."));
      // reset or redirect as needed
    }, 900);
  };

  return (
    <div
      className="container mx-auto px-4 py-12 mt-4"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #FFFFFF)` }}
    >
      <h2
        className="text-3xl font-bold my-8 text-center"
        style={{ color: COLORS.primary }}
      >
        {t("checkout.title", "تأكيد الطلب")}
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: COLORS.primary }}>
            {t("checkout.shippingInfo", "معلومات الشحن")}
          </h3>

          <form onSubmit={handleSubmit} noValidate aria-describedby="form-feedback">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1" htmlFor="fullname" style={{ color: COLORS.muted }}>
                  {t("checkout.fullname", "الاسم الكامل")}
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                  aria-invalid={!!errors.fullname}
                  aria-describedby={errors.fullname ? "err-fullname" : undefined}
                />
                {errors.fullname && (
                  <p id="err-fullname" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                    {errors.fullname}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1" htmlFor="phone" style={{ color: COLORS.muted }}>
                  {t("checkout.phone", "رقم الهاتف")}
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "err-phone" : undefined}
                />
                {errors.phone && (
                  <p id="err-phone" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm mb-1" htmlFor="address" style={{ color: COLORS.muted }}>
                  {t("checkout.address", "العنوان")}
                </label>
                <input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                  aria-invalid={!!errors.address}
                  aria-describedby={errors.address ? "err-address" : undefined}
                />
                {errors.address && (
                  <p id="err-address" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm mb-1" htmlFor="city" style={{ color: COLORS.muted }}>
                  {t("checkout.city", "المدينة / المنطقة")}
                </label>
                <input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? "err-city" : undefined}
                />
                {errors.city && (
                  <p id="err-city" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                    {errors.city}
                  </p>
                )}
              </div>
            </div>

            <h4 className="text-lg font-medium mt-6" style={{ color: COLORS.primary }}>
              {t("checkout.paymentMethod", "طريقة الدفع")}
            </h4>

            <div className="space-y-2 mt-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.payment === "cod"}
                  onChange={handleChange}
                />
                <span>{t("checkout.cod", "الدفع عند الاستلام")}</span>
              </label>

              <label className="flex items-center gap-2 text-gray-400 cursor-not-allowed" title={t("checkout.comingSoon", "قريبًا")}>
                <input type="radio" name="payment" value="card" disabled />
                <span>{t("checkout.card", "بطاقة ائتمان (قريبًا)")}</span>
              </label>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={submitting}
                className="inline-block px-6 py-3 rounded-md text-lg font-semibold transition"
                style={{
                  background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
                  color: COLORS.white,
                  boxShadow: "0 10px 30px rgba(6,182,212,0.12)",
                  opacity: submitting ? 0.7 : 1,
                }}
                aria-busy={submitting}
                aria-disabled={submitting}
              >
                {submitting ? t("checkout.submitting", "جاري المعالجة...") : t("checkout.confirm", "تأكيد الطلب")}
              </button>
            </div>

            {/* feedback */}
            <div id="form-feedback" className="mt-4" aria-live="polite">
              {successMessage && (
                <div className="rounded-md p-3" style={{ background: "#ECFDF5", color: "#064E3B" }}>
                  {successMessage}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Summary */}
        <aside className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: COLORS.primary }}>
            {t("checkout.summary", "ملخص الطلب")}
          </h3>

          <ul className="space-y-3 text-sm">
            {items.map((it) => (
              <li key={it.id} className="flex justify-between">
                <span>{it.name} × {it.qty}</span>
                <span>{formatPrice(it.price * it.qty)} ج.م</span>
              </li>
            ))}

            <li className="border-t pt-3 mt-3 flex justify-between font-bold" style={{ color: COLORS.primary }}>
              <span>{t("checkout.total", "الإجمالي")}</span>
              <span>{formatPrice(subtotal)} ج.م</span>
            </li>
          </ul>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-6 w-full px-4 py-2 rounded-md font-medium"
            style={{
              background: COLORS.primary,
              color: COLORS.white,
            }}
          >
            {t("checkout.editCart", "تعديل السلة")}
          </button>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
