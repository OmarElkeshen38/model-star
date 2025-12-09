import React, { useState, useRef, useEffect } from "react";

function AdminSettings() {
  // Chic Teal inline palette
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    muted: "#6B7280",
    softBg: "#F8FAFC",
    success: "#16A34A",
    danger: "#EF4444",
    white: "#FFFFFF",
  };

  const [settings, setSettings] = useState({
    siteName: "ModelStar",
    logoUrl: "",
    email: "support@modelstar.com",
    phone: "+201234567890",
    address: "القاهرة، مصر",
    paymentMethods: ["فيزا", "ماستر كارد", "الدفع عند الاستلام"],
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const fileRef = useRef(null);

  // RTL support (if app uses i18n you can derive dir instead)
  useEffect(() => {
    // optional: set document.dir if needed
    // document.documentElement.dir = "rtl";
    return () => { };
  }, []);

  const handleChange = (field, value) => {
    setSettings((s) => ({ ...s, [field]: value }));
    setMessage({ type: "", text: "" });
  };

  const handleLogoPick = (e) => {
    const f = e.target.files?.[0];
    if (!f) {
      setLogoFile(null);
      setLogoPreview("");
      return;
    }
    setLogoFile(f);
    const url = URL.createObjectURL(f);
    setLogoPreview(url);
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview("");
    setSettings((s) => ({ ...s, logoUrl: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const validate = () => {
    if (!settings.siteName?.trim()) {
      setMessage({ type: "error", text: "اسم الموقع مطلوب." });
      return false;
    }
    if (!settings.email?.trim()) {
      setMessage({ type: "error", text: "البريد الإلكتروني مطلوب." });
      return false;
    }
    // basic email regex
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(settings.email)) {
      setMessage({ type: "error", text: "صيغة البريد الإلكتروني غير صحيحة." });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validate()) return;

    setSaving(true);

    try {
      // مثال: لو عندك API لرفع الشعار أو حفظ الإعدادات، افعل هنا.
      // لو تريد أعدّل الكود ليستخدم axios + endpoint عندك أطبّق لك.
      // محاكاة تأخير
      await new Promise((r) => setTimeout(r, 700));

      // لو تم رفع الشعار فعلياً، سيرفر سيرد URL — هنا نستخدم preview كـ fallback
      const logoUrl = settings.logoUrl || logoPreview || "";

      setSettings((s) => ({ ...s, logoUrl }));
      setMessage({ type: "success", text: "تم حفظ الإعدادات بنجاح." });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "حدث خطأ أثناء الحفظ. حاول مرة أخرى." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="p-6 min-h-screen"
      dir="rtl"
      style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #fff)` }}
    >
      <h1 className="text-2xl font-bold mb-6" style={{ color: COLORS.primary }}>
        إعدادات الموقع
      </h1>

      <div
        className="bg-white shadow rounded-lg p-6 space-y-6 max-w-4xl"
        role="region"
        aria-labelledby="settings-heading"
      >
        <h2 id="settings-heading" className="text-lg font-semibold" style={{ color: COLORS.primary }}>
          الإعدادات العامة
        </h2>

        {/* رسالة حالة */}
        {message.text && (
          <div
            role={message.type === "error" ? "alert" : "status"}
            className={`p-3 rounded-md text-sm`}
            style={{
              background: message.type === "error" ? "#FEF2F2" : "#ECFDF5",
              color: message.type === "error" ? COLORS.danger : COLORS.success,
            }}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium" style={{ color: COLORS.muted }}>
              اسم الموقع
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange("siteName", e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none"
              aria-required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium" style={{ color: COLORS.muted }}>
              شعار الموقع (رفع)
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleLogoPick}
              className="border rounded px-3 py-2 focus:outline-none"
              aria-label="اختر شعار الموقع"
            />
            {logoPreview || settings.logoUrl ? (
              <div className="mt-2 flex items-center gap-4">
                <img
                  src={logoPreview || settings.logoUrl}
                  alt="Logo preview"
                  className="w-28 h-28 object-contain rounded border p-1 bg-white"
                />
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    إزالة الشعار
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-500 mt-2">لا يوجد شعار مرفوع بعد</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium" style={{ color: COLORS.muted }}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium" style={{ color: COLORS.muted }}>
              الهاتف
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none"
            />
          </div>

          <div className="col-span-full">
            <label className="mb-1 font-medium" style={{ color: COLORS.muted }}>
              العنوان
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none w-full"
            />
          </div>

          <div className="col-span-full">
            <label className="mb-1 font-medium" style={{ color: COLORS.muted }}>
              طرق الدفع (مفصولة بفاصلة)
            </label>
            <input
              type="text"
              value={settings.paymentMethods.join(", ")}
              onChange={(e) =>
                handleChange(
                  "paymentMethods",
                  e.target.value.split(",").map((p) => p.trim()).filter(Boolean)
                )
              }
              className="border rounded px-3 py-2 focus:outline-none w-full"
              placeholder='مثال: فيزا, ماستر كارد, الدفع عند الاستلام'
            />
          </div>

          <div className="col-span-full flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={() => {
                resetPreview: handleRemoveLogo();
                setMessage({ type: "", text: "" });
              }}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              إلغاء
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded text-white"
              style={{
                background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
                opacity: saving ? 0.8 : 1,
              }}
            >
              {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminSettings;
