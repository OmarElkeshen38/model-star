import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { registerUser } from "../authSlice";

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  function goToLogin() {
    navigate("/login");
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t("validation.required"))
      .min(3, t("validation.minLength", { min: 3 })),
    email: Yup.string()
      .required(t("validation.required"))
      .email(t("validation.email")),
    phone: Yup.string()
      .required(t("validation.required"))
      .matches(
        /^(01[0-2,5]{1}[0-9]{8})$/,
        t("validation.invalidPhone")
      ),
    password: Yup.string()
      .required(t("validation.required"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        t("validation.passwordStrong")
      ),
    confirmPassword: Yup.string()
      .required(t("validation.required"))
      .oneOf([Yup.ref("password"), null], t("validation.passwordMatch")),
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
      await dispatch(
        registerUser({
          username: data.username.trim(),
          email: data.email.trim(),
          password: data.password,
          phone: data.phone.trim(),
        })
      ).unwrap();

      toast.success(t("register.success"));
      reset();
      goToLogin();
    } catch (err) {
      const apiError = err?.message || t("register.error");
      toast.error(apiError);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {t("register.title")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("register.subtitle")}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder={t("register.fullName")}
              {...register("username")}
              className={`w-full px-4 py-2 border ${errors.username ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder={t("register.email")}
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

          <div>
            <input
              type="number"
              placeholder={t("register.phone")}
              {...register("phone")}
              className={`w-full px-4 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder={t("register.password")}
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
          <div>
            <input
              type="password"
              placeholder={t("register.confirmPassword")}
              {...register("confirmPassword")}
              className={`w-full px-4 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50"
          >
            {loading ? t("register.loading") : t("register.submit")}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          {t("register.haveAccount")}{" "}
          <Link to="/auth/login" className="text-indigo-600 hover:underline">
            {t("register.loginLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
