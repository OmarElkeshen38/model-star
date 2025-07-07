import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AUTH_URLS, publicAxiosInstance } from '../../../Services/Urls/Urls';
import logo from '../../../assets/logo.png';
import { getEmailValidation } from '../../../Services/Validations/Validations';

function ForgetPass() {

  const { t, i18n } = useTranslation();
  let { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const emailValidation = getEmailValidation(t);

  const onSubmit = async (data) => {
    try {
      let respons = await publicAxiosInstance.post(AUTH_URLS.Forget_Pass, data, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      });
      console.log(respons.data);

      localStorage.setItem("token", respons.data.token)

      toast.success(t('forget_pass.sent_success'));
      navigate("/reset-password")



    } catch (error) {
      toast.error(t('forget_pass.sent_error'));
    }
  }

  return (
    <div className="bg-gray-800 shadow-xl rounded-xl p-8 md:p-10 w-full max-w-md relative z-10">

      <h2 className="text-center text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2">
        {t('forget_pass.forgot_title')}
        <i className="fa-solid fa-key text-emerald-400 text-1xl"></i>
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

        <div className="text-end">
          <Link
            to="/login"
            className="text-sm text-emerald-400 hover:underline"
          >
            {t('forget_pass.back_to_login')}
          </Link>
        </div>

        <button
          disabled={isSubmitting}
          className="cursor-pointer w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-semibold transition duration-200"
        >
          {isSubmitting ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            t('forget_pass.submit')
          )}
        </button>
      </form>
    </div>
  )

}

export default ForgetPass
