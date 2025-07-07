import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AUTH_URLS, publicAxiosInstance } from '../../../Services/Urls/Urls';
import logo from '../../../assets/logo.png';

function ResetPass() {

    const { t, i18n } = useTranslation();

    let { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({ mode: "onChange" });
    const navigate = useNavigate();
    const [passwordEye, setPasswordEye] = useState(false)
    const [confirmPasswordEye, setConfirmPasswordEye] = useState(false)

    const handlePasswordClick = () => {
        setPasswordEye(!passwordEye)
    }
    const handleConfirmPasswordClick = () => {
        setConfirmPasswordEye(!confirmPasswordEye)
    }


    const onSubmit = async (data) => {
        try {
            let respons = await publicAxiosInstance.post(AUTH_URLS.Reset_Pass, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            });
            console.log(respons.data);

            localStorage.setItem("token", respons.data.token)

            toast.success(t('reset_pass.password_updated'));
            navigate("/login")

        } catch (error) {
            toast.error(t('reset_pass.updated_error'));
        }
    }

    return (
        <div className="bg-gray-800 shadow-xl rounded-xl p-8 md:p-10 w-full max-w-md relative z-10">

            <h2 className="text-center text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2">
                {t('reset_pass.reset_title')}
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
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>

                <div>
                    <input
                        type="number"
                        id="token"
                        placeholder={t('reset_pass.otp_placeholder')}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        {...register("token", { required: true })}
                        required
                    />
                    {errors.token && <span className="text-red-500 text-sm">{errors.token.message}</span>}
                </div>

                <div className='relative'>
                    <input
                        id="password"
                        placeholder={t('reset_pass.newPass_placeholder')}
                        type={(passwordEye === false) ? "password" : "text"}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        {...register("password", { required: true })}
                        autoComplete="current-password"
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    <span className="absolute end-2 top-1/2 transform -translate-y-1/2 text-gray-300 cursor-pointer">
                        {(passwordEye === false) ? <i className="fa-solid fa-eye-slash" onClick={handlePasswordClick}></i> : <i className="fa-solid fa-eye" onClick={handlePasswordClick}></i>}
                    </span>
                </div>

                <div className='relative'>
                    <input
                        id="password_confirmation"
                        placeholder={t('reset_pass.confirmNewPass_placeholder')}
                        type={(passwordEye === false) ? "password" : "text"}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        {...register("password_confirmation", { required: true })}
                        autoComplete="current-password"
                    />
                    {errors.password_confirmation && <span className="text-red-500 text-sm">{errors.password_confirmation.message}</span>}
                    <span className="absolute end-2 top-1/2 transform -translate-y-1/2 text-gray-300 cursor-pointer">
                        {(passwordEye === false) ? <i className="fa-solid fa-eye-slash" onClick={handleConfirmPasswordClick}></i> : <i className="fa-solid fa-eye" onClick={handleConfirmPasswordClick}></i>}
                    </span>
                </div>



                <div className="text-end">
                    <Link
                        to="/login"
                        className="text-sm text-emerald-400 hover:underline"
                    >
                        {t('reset_pass.back_to_login')}
                    </Link>
                </div>

                <button
                    disabled={isSubmitting}
                    className="cursor-pointer w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-semibold transition duration-200"
                >
                    {isSubmitting ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                        t('reset_pass.submit')
                    )}
                </button>
            </form>
        </div>
    )
}

export default ResetPass
