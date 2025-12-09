import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../authSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";

/**
 * ResetPass (Chic Teal)
 * - Improved validation (Yup)
 * - Show/Hide password
 * - aria-live status messages
 * - RTL support via i18n.dir()
 */

function ResetPass() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth || {});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Chic Teal palette (inline)
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    muted: "#6B7280",
    danger: "#EF4444",
    success: "#16A34A",
    softBg: "#F8FAFC",
  };

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n]);

  // Validation schema with helpful messages (localized)
  const schema = Yup.object().shape({
    email: Yup.string()
      .required(t("validation.required", "هذا الحقل مطلوب"))
      .email(t("validation.email", "البريد الإلكتروني غير صالح")),
    otp: Yup.string()
      .required(t("validation.required", "هذا الحقل مطلوب"))
      .min(4, t("validation.otpShort", "رمز التحقق قصير")) // adjust length to your OTP logic
      .max(10, t("validation.otpLong", "رمز التحقق غير صالح")),
    password: Yup.string()
      .required(t("validation.required", "هذا الحقل مطلوب"))
      .min(6, t("validation.minLength", { min: 6 })),
    confirmPassword: Yup.string()
      .required(t("validation.required", "هذا الحقل مطلوب"))
      .oneOf([Yup.ref("password"), null], t("validation.passwordMatch", "كلمتا المرور غير متطابقتين")),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", otp: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data) => {
    if (loading) return;
    setStatusMsg(null);

    try {
      const res = await dispatch(resetPassword(data)).unwrap();
      const okText = t("resetPass.success", "تم تحديث كلمة المرور بنجاح");
      toast.success(okText);
      setStatusMsg({ type: "success", text: okText });
      // redirect to login after short delay
      setTimeout(() => navigate("/auth/login"), 900);
    } catch (err) {
      console.error("reset password error:", err);
      const msg = err?.message || t("resetPass.error", "فشل إعادة تعيين كلمة المرور، تحقق من البيانات وحاول مرة أخرى");
      toast.error(msg);
      setStatusMsg({ type: "error", text: msg });
    }
  };

  return (
    <div
      className="p-8 w-full min-h-[70vh] flex items-center justify-center"
      style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #fff)` }}
      dir={i18n.dir()}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            {t("resetPass.title", "إعادة تعيين كلمة المرور")}
          </h2>
          <p className="text-sm mt-2" style={{ color: COLORS.muted }}>
            {t("resetPass.subtitle", "أدخل بريدك الإلكتروني، رمز التحقق وكلمة المرور الجديدة")}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate aria-live="polite">
          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              {t("resetPass.email", "البريد الإلكتروني")}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t("resetPass.emailPlaceholder", "example@domain.com")}
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 ring-red-100" : "border-gray-300"}`}
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* OTP */}
          <div>
            <label htmlFor="otp" className="sr-only">{t("resetPass.otp", "رمز التحقق")}</label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              placeholder={t("resetPass.otpPlaceholder", "أدخل رمز التحقق")}
              {...register("otp")}
              aria-invalid={errors.otp ? "true" : "false"}
              aria-describedby={errors.otp ? "otp-error" : undefined}
              className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 ${errors.otp ? "border-red-500 ring-red-100" : "border-gray-300"}`}
            />
            {errors.otp && (
              <p id="otp-error" className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="sr-only">{t("resetPass.password", "كلمة المرور")}</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("resetPass.passwordPlaceholder", "كلمة المرور الجديدة")}
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 ring-red-100" : "border-gray-300"}`}
              style={{ paddingRight: 44 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 p-1"
              aria-label={showPassword ? t("resetPass.hidePassword", "إخفاء كلمة المرور") : t("resetPass.showPassword", "إظهار كلمة المرور")}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p id="password-error" className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="sr-only">{t("resetPass.confirmPassword", "تأكيد كلمة المرور")}</label>
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder={t("resetPass.confirmPlaceholder", "أعد إدخال كلمة المرور")}
              {...register("confirmPassword")}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
              className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 ${errors.confirmPassword ? "border-red-500 ring-red-100" : "border-gray-300"}`}
              style={{ paddingRight: 44 }}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 p-1"
              aria-label={showConfirm ? t("resetPass.hidePassword", "إخفاء كلمة المرور") : t("resetPass.showPassword", "إظهار كلمة المرور")}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && (
              <p id="confirm-error" className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md font-semibold text-white shadow-md transition disabled:opacity-60"
            style={{ background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})` }}
            aria-disabled={loading}
          >
            {loading ? t("resetPass.loading", "جاري...") : t("resetPass.submit", "تعيين كلمة المرور")}
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

        <p className="text-sm text-center text-gray-600 mt-4">
          <Link to="/auth/login" className="text-indigo-600 hover:underline">
            {t("resetPass.backToLogin", "العودة لتسجيل الدخول")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPass;
