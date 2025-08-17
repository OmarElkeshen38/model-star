import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { sendResetPassword } from "../../Authentication/authSlice"; // هنضيفها في slice
import { toast } from "react-toastify";

function ForgetPass() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // ✅ Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("validation.required"))
      .email(t("validation.email")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(sendResetPassword(data)).unwrap();
      toast.success(t("forgetPassword.success"));
      // إعادة توجيه المستخدم أو تنفيذ أي إجراء آخر بعد النجاح
      navigate("/auth/login");
    } catch (err) {
      toast.error(err?.message || t("forgetPassword.error"));
    }
  };

  return (
    <div className="p-8 w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md">

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {t("forgetPassword.title")}
          </h2>
          <p className="text-sm text-gray-500 mt-2">{t("forgetPassword.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder={t("forgetPassword.email")}
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition"
          >
            {loading ? t("forgetPassword.loading") : t("forgetPassword.submit")}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          <Link to="/auth/login" className="text-indigo-600 hover:underline">
            {t("forgetPassword.backToLogin")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPass;
