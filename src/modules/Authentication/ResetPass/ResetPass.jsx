import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../authSlice";
import { toast } from "react-toastify";

function ResetPass() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success, resetEmail } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { email: resetEmail || "" } });

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error(t("resetPass.passwordMismatch"));
      return;
    }

    dispatch(resetPassword(data)).then((res) => {
      if (res.type === "auth/resetPassword/fulfilled") {
        toast.success(t("resetPass.success"));
        navigate("/auth/login");
      }
    });
  };

  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {t("resetPass.title")}
          </h2>
          <p className="text-sm text-gray-500 mt-2">{t("resetPass.subtitle")}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <input
            type="email"
            {...register("email", { required: true })}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{t("resetPass.email")} *</p>
          )}

          {/* OTP */}
          <input
            type="text"
            placeholder={t("resetPass.otp")}
            {...register("otp", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.otp && (
            <p className="text-red-500 text-sm">{t("resetPass.otp")} *</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder={t("resetPass.password")}
            {...register("password", { required: true, minLength: 6 })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {t("resetPass.password")} (min 6)
            </p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            placeholder={t("resetPass.confirmPassword")}
            {...register("confirmPassword", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {t("resetPass.confirmPassword")} *
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50"
          >
            {loading ? t("resetPass.loading") : t("resetPass.submit")}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center text-sm mt-2">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-center text-sm mt-2">{success}</p>
        )}

        <p className="text-sm text-center text-gray-600 mt-4">
          <Link to="/auth/login" className="text-indigo-600 hover:underline">
            {t("resetPass.backToLogin")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPass;
