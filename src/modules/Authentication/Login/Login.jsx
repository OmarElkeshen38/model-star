import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginUser } from "../authSlice";
import { Eye, EyeOff } from "lucide-react";

/**
 * Login (Chic Teal)
 * - Inline color palette (no tailwind.config)
 * - Show/Hide password
 * - Remember me checkbox
 * - Accessible labels / aria attributes
 */

function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth || {});

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  // Chic Teal palette
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    muted: "#6B7280",
    softBg: "#F8FAFC",
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("validation.required", "هذا الحقل مطلوب"))
      .email(t("validation.email", "البريد الإلكتروني غير صحيح")),
    password: Yup.string()
      .required(t("validation.required", "هذا الحقل مطلوب"))
      .min(6, t("validation.minLength", { min: 6 })),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    // set direction for accessibility (optional)
    document.documentElement.dir = i18n.dir();
  }, [i18n]);

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(loginUser(data)).unwrap();
      toast.success(t("login.success", "تم تسجيل الدخول بنجاح"));
      reset();

      // Save token/session if remember checked (example)
      if (remember && res?.data?.token) {
        localStorage.setItem("auth_token", res.data.token);
      }

      const role = res?.data?.data?.user?.role;
      if (role === "admin") navigate("/admin");
      else navigate("/user-profile");
    } catch (err) {
      // err could be string or object - handle gracefully
      const message = err?.message || err?.data?.message || t("login.error", "فشل تسجيل الدخول");
      toast.error(message);
    }
  };

  return (
    <div className="w-full max-w-md" aria-live="polite">
      <div className="text-center mb-6">
        <h2
          className="text-2xl font-bold"
          style={{ color: COLORS.primary }}
        >
          {t("login.login_title", "تسجيل الدخول إلى حسابك")}
        </h2>
        <p className="text-sm mt-2" style={{ color: COLORS.muted }}>
          {t("login.subtitle", "أدخل بياناتك للمتابعة")}
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email */}
        <div>
          <label htmlFor="email" className="sr-only">
            {t("login.email", "البريد الإلكتروني")}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t("login.email", "البريد الإلكتروني")}
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 ring-red-100" : "border-gray-300 ring-0"
              }`}
            style={{ boxShadow: "inset 0 0 0 1px rgba(11,19,43,0.03)" }}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label htmlFor="password" className="sr-only">
            {t("login.password", "كلمة المرور")}
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={t("login.password", "كلمة المرور")}
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
            className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 ring-red-100" : "border-gray-300 ring-0"
              }`}
            style={{ paddingRight: 44 }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 p-1"
            aria-label={showPassword ? t("login.hidePassword", "اخفاء كلمة المرور") : t("login.showPassword", "اظهار كلمة المرور")}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          {errors.password && (
            <p id="password-error" className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember + forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="form-checkbox w-4 h-4 rounded border-gray-300"
              aria-checked={remember}
            />
            <span style={{ color: COLORS.muted }}>{t("login.remember", "تذكرني")}</span>
          </label>

          <Link to="/auth/forget-password" className="text-sm" style={{ color: COLORS.accentDark }}>
            {t("login.forgotPassword", "نسيت كلمة المرور؟")}
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-md font-semibold text-white shadow-md transition disabled:opacity-60"
          style={{
            background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
          }}
        >
          {loading ? (
            <span className="inline-flex items-center justify-center gap-2">
              <svg
                className="animate-spin w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              {t("login.loading", "جاري...")}
            </span>
          ) : (
            t("login.submit", "تسجيل الدخول")
          )}
        </button>
      </form>

      {/* Footer links */}
      <div className="text-sm text-center text-gray-600 mt-4 space-y-2">
        <p>
          {t("login.noAccount", "ليس لديك حساب؟")}{" "}
          <Link to="/auth/register" style={{ color: COLORS.accentDark }} className="font-medium">
            {t("login.registerLink", "إنشاء حساب")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
