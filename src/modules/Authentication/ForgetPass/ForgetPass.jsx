import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { sendResetPassword } from "../../Authentication/authSlice";
import { toast } from "react-toastify";

/**
 * ForgetPass (Chic Teal)
 * - Inline palette (no tailwind.config)
 * - RTL support via i18n.dir()
 * - aria-live status messages
 * - disabled submit while loading / prevent double submit
 */

function ForgetPass() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading: reduxLoading } = useSelector((state) => state.auth || {});
  const [localLoading, setLocalLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Chic Teal palette
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    muted: "#6B7280",
    softBg: "#F8FAFC",
  };

  // set document direction (for pages that need it)
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n]);

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("validation.required", "هذا الحقل مطلوب"))
      .email(t("validation.email", "البريد الإلكتروني غير صحيح")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    if (localLoading || reduxLoading) return; // prevent double submit
    setLocalLoading(true);
    setStatusMsg(null);

    try {
      await dispatch(sendResetPassword(data)).unwrap();
      const successText = t("forgetPassword.success", "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك.");
      toast.success(successText);
      setStatusMsg({ type: "success", text: successText });
      // توجيه المستخدم لصفحة إعادة تعيين (أو عرض رسالة تأكيد)
      navigate("/auth/reset-password");
    } catch (err) {
      console.error("forget password error:", err);
      const errMsg = err?.message || t("forgetPassword.error", "حدث خطأ أثناء إرسال الرابط. حاول مرة أخرى.");
      toast.error(errMsg);
      setStatusMsg({ type: "error", text: errMsg });
    } finally {
      setLocalLoading(false);
    }
  };

  const isSubmitting = localLoading || reduxLoading;

  return (
    <div
      className="p-8 w-full min-h-[60vh] flex items-center justify-center"
      dir={i18n.dir()}
      style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #ffffff)` }}
    >
      <div className="w-full max-w-md">
        <header className="text-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            {t("forgetPassword.title", "استعادة كلمة المرور")}
          </h2>
          <p className="text-sm mt-2" style={{ color: COLORS.muted }}>
            {t("forgetPassword.subtitle", "أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور.")}
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate aria-live="polite">
          <div>
            <label htmlFor="email" className="sr-only">
              {t("forgetPassword.email", "البريد الإلكتروني")}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t("forgetPassword.email", "example@domain.com")}
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 ring-red-100" : "border-gray-300"
                }`}
              style={{ boxShadow: "inset 0 0 0 1px rgba(11,19,43,0.03)" }}
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-md font-semibold text-white shadow-md transition disabled:opacity-60"
            style={{ background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})` }}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? t("forgetPassword.loading", "جاري الإرسال...") : t("forgetPassword.submit", "إرسال رابط إعادة التعيين")}
          </button>
        </form>

        {/* status message for screen readers & visual users */}
        <div className="mt-4" aria-live="polite">
          {statusMsg && (
            <div
              role={statusMsg.type === "error" ? "alert" : "status"}
              className={`p-3 rounded-md text-sm ${statusMsg.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
            >
              {statusMsg.text}
            </div>
          )}
        </div>

        <p className="text-sm text-center text-gray-600 mt-6">
          <Link to="/auth/login" className="text-indigo-600 hover:underline">
            {t("forgetPassword.backToLogin", "العودة لتسجيل الدخول")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPass;
