import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginUser } from "../authSlice";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  function goToHome() {
    navigate("/");
  }

  // Schema validation
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("validation.required"))
      .email(t("validation.email")),
    password: Yup.string()
      .required(t("validation.required"))
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

  const onSubmit = async (data) => {
    try {
      let res = await dispatch(loginUser(data)).unwrap();
      toast.success(t("login.success"));
      reset();

      if (res.data.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user-profile");
      }

    } catch (err) {
      toast.error(err?.message || t("login.error"));
    }
  };


  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {t("login.login_title", "تسجيل الدخول إلى حسابك")}
        </h2>
        <p className="text-sm text-gray-500 mt-2">{t("login.subtitle")}</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder={t("login.email")}
            {...register("email")}
            className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder={t("login.password")}
            {...register("password")}
            className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50"
        >
          {loading ? t("login.loading") : t("login.submit")}
        </button>
      </form>

      <div className="text-sm text-center text-gray-600 mt-4 space-y-2">
        <p>
          {t("login.noAccount")}{" "}
          <Link to="/auth/register" className="text-indigo-600 hover:underline">
            {t("login.registerLink")}
          </Link>
        </p>
        <p>
          <Link to="/auth/forgot-password" className="text-indigo-600 hover:underline">
            {t("login.forgotPassword")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
