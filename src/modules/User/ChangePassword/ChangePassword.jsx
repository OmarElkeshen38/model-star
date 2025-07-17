import React from 'react';
import { useForm } from 'react-hook-form';
import { Lock } from 'lucide-react';

function ChangePassword() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log("تم تغيير كلمة المرور:", data);
        // هنا ترسل الطلب للـ API لو عندك
    };

    return (
        <div className="container mx-auto px-4 py-12 mt-16">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
                    تغيير كلمة المرور
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">كلمة المرور الحالية</label>
                        <input
                            type="password"
                            {...register("currentPassword", { required: "هذا الحقل مطلوب" })}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.currentPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">كلمة المرور الجديدة</label>
                        <input
                            type="password"
                            {...register("newPassword", {
                                required: "يرجى إدخال كلمة المرور الجديدة",
                                minLength: {
                                    value: 6,
                                    message: "يجب أن تكون 6 أحرف على الأقل"
                                }
                            })}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">تأكيد كلمة المرور</label>
                        <input
                            type="password"
                            {...register("confirmPassword", {
                                required: "يرجى تأكيد كلمة المرور",
                                validate: (value) =>
                                    value === watch("newPassword") || "كلمة المرور غير متطابقة"
                            })}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md flex items-center gap-2 mx-auto"
                    >
                        <Lock size={18} />
                        تغيير كلمة المرور
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
