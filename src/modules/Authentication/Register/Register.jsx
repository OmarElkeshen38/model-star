import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { registerUser } from "../authSlice";
import { Eye, EyeOff } from "lucide-react";

/**
 * Register (Chic Teal)
 * - Inline palette (no tailwind.config)
 * - Show/Hide password
 * - RTL support via i18n.dir()
 * - Better accessibility + validation messages
 */

function Register() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth || {});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Chic Teal palette
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    muted: "#6B7280",
    danger: "#EF4444",
    softBg: "#F8FAFC",
  };

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n]);

  // Validation schema (kept your rules, localized messages)
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t("validation.required", "هذا الحقل مطلوب"))
      .min(3, t("validation.minLength", { min: 3 })),
    email: Yup.string()
      .required(t("validation.required", "هذا الحقل مطلوب"))
      .email(t("validation.email", "البريد الإلكتروني غير صحيح")),
    phone: Yup.string()
      .required(t("validation.required", "هذا الحقل مطلوب"))
      .matches(
        /^(01[0-2|5]\d{8})$/,
        t("validation.invalidPhone", "رقم هاتف غير صحيح")
      ),
    password: Yup.string()
      .required(t("validation.required", "هذا الحقل مطلوب"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        t("validation.passwordStrong", "يجب أن تحتوي كلمة المرور على أحرف كبيرة وصغيرة وأرقام وبحد أدنى 8 أحرف")
      ),
    confirmPassword: Yup.string()
      .required(t("validation.required", "هذا الحقل مطلوب"))
      .oneOf([Yup.ref("password"), null], t("validation.passwordMatch", "كلمتا المرور غير متطابقتين")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const goToLogin = () => navigate("/auth/login");

  const onSubmit = async (data) => {
    try {
      await dispatch(
        registerUser({
          username: data.username.trim(),
          email: data.email.trim(),
          password: data.password,
          confirmPassword: data.confirmPassword,
          phone: data.phone.trim(),
        })
      ).unwrap();

      toast.success(t("register.success", "تم إنشاء الحساب بنجاح"));
      reset();
      goToLogin();
    } catch (err) {
      const apiErr = err?.message || t("register.error", "حدث خطأ أثناء التسجيل");
      toast.error(apiErr);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md" dir={i18n.dir()}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            {t("register.title", "إنشاء حساب جديد")}
          </h2>
          <p className="text-sm mt-2" style={{ color: COLORS.muted }}>
            {t("register.subtitle", "سجّل الآن وابدأ التسوق")}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Username */}
          <div>
            <label htmlFor="username" className="sr-only">
              {t("register.fullName", "الاسم الكامل")}
            </label>
            <input
              id="username"
              type="text"
              placeholder={t("register.fullName", "الاسم الكامل")}
              {...register("username")}
              aria-invalid={errors.username ? "true" : "false"}
              aria-describedby={errors.username ? "username-error" : undefined}
              className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 ${errors.username ? "border-red-500 ring-red-100" : "border-gray-300"}`}
              style={{ boxShadow: "inset 0 0 0 1px rgba(11,19,43,0.03)" }}
            />
            {errors.username && (
              <p id="username-error" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              {t("register.email", "البريد الإلكتروني")}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t("register.email", "البريد الإلكتروني")}
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 ring-red-100" : "border-gray-300"}`}
            />
            {errors.email && (
              <p id="email-error" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="sr-only">
              {t("register.phone", "الهاتف")}
            </label>
            <input
              id="phone"
              type="tel"
              placeholder={t("register.phone", "01012345678")}
              {...register("phone")}
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 ${errors.phone ? "border-red-500 ring-red-100" : "border-gray-300"}`}
            />
            {errors.phone && (
              <p id="phone-error" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              {t("register.password", "كلمة المرور")}
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("register.password", "كلمة المرور")}
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
              aria-label={showPassword ? t("register.hidePassword", "اخفاء كلمة المرور") : t("register.showPassword", "اظهار كلمة المرور")}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p id="password-error" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                {errors.password.message}
              </p>
            )}
            <p className="text-xs mt-1" style={{ color: COLORS.muted }}>
              {t("register.passwordHint", "كلمة المرور يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام وطولها 8 أحرف على الأقل")}
            </p>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="sr-only">
              {t("register.confirmPassword", "تأكيد كلمة المرور")}
            </label>
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder={t("register.confirmPassword", "تأكيد كلمة المرور")}
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
              aria-label={showConfirm ? t("register.hidePassword", "اخفاء كلمة المرور") : t("register.showPassword", "اظهار كلمة المرور")}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && (
              <p id="confirm-error" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md font-semibold text-white shadow-md transition disabled:opacity-60"
            style={{ background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})` }}
          >
            {loading ? t("register.loading", "جاري...") : t("register.submit", "إنشاء حساب")}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          {t("register.haveAccount", "لديك حساب؟")}{" "}
          <Link to="/auth/login" style={{ color: COLORS.accentDark }} className="font-medium">
            {t("register.loginLink", "تسجيل الدخول")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
