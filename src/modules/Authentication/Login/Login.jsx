import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { AUTH_URLS, publicAxiosInstance } from '../../../Services/Urls/Urls';
import logo from '../../../assets/logo.png';
import { getEmailValidation, getPasswordValidation } from '../../../Services/Validations/Validations';


function Login() {

  const { t, i18n } = useTranslation();
  let { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const emailValidation = getEmailValidation(t);
  const passwordValidation = getPasswordValidation(t);

  const [passwordEye, setPasswordEye] = useState(false)

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye)
  }

  const onSubmit = async (data) => {
    try {
      let respons = await publicAxiosInstance.post(AUTH_URLS.Login, data, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      });
      console.log(respons.data);

      Cookies.set('token', respons.data.data.token, { expires: 1 });

      toast.success(t('login.log_success'));
      navigate("/dashboard")


    } catch (error) {
      toast.error(t('login.log_error'));

    }
  }

  return (
    <div className="bg-gray-800 shadow-xl rounded-xl p-8 md:p-10 w-full max-w-md relative z-10">

      <h2 className="text-center text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2">
        {t('login.login_title')}
        <i className="fa-solid fa-right-to-bracket text-emerald-400 text-1xl"></i>
      </h2>

      <div className="flex justify-center mb-6">
        <img src={logo} alt="CODE 3 LOGISTICS" className="w-32" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            type="email"
            id="email"
            placeholder={t('login.email')}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            {...register("email", emailValidation)}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        <div className='relative'>
          <input
            id="password"
            placeholder={t('login.password')}
            type={(passwordEye === false) ? "password" : "text"}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            {...register("password", passwordValidation)}
            autoComplete="current-password"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          <span className="absolute end-2 top-6 transform -translate-y-1/2 text-gray-300 cursor-pointer">
            {(passwordEye === false) ? <i className="fa-solid fa-eye-slash" onClick={handlePasswordClick}></i> : <i className="fa-solid fa-eye" onClick={handlePasswordClick}></i>}
          </span>
        </div>

        <div className="text-end">
          <Link
            to="/forget-password"
            className="text-sm text-emerald-400 hover:underline"
          >
            {t('login.forgotPassword')}
          </Link>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-semibold transition duration-200"
        >
          {isSubmitting ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            t('login.submit')
          )}
        </button>
      </form>
    </div>

  )
}

export default Login
