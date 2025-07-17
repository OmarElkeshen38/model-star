import React from 'react';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';

function EditProfile() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: 'أحمد محمد',
            email: 'ahmed@example.com',
            phone: '01123456789',
            address: 'الرياض، السعودية'
        }
    });

    const onSubmit = (data) => {
        console.log('بيانات جديدة:', data);
        // هنا تقدر تبعت البيانات للسيرفر لو في API
    };

    return (
        <div className="container mx-auto px-4 py-12 mt-16">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
                <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
                    تعديل الملف الشخصي
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">الاسم الكامل</label>
                        <input
                            {...register("name", { required: "الاسم مطلوب" })}
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">البريد الإلكتروني</label>
                        <input
                            {...register("email", {
                                required: "البريد الإلكتروني مطلوب",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "صيغة البريد غير صحيحة"
                                }
                            })}
                            type="email"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">رقم الهاتف</label>
                        <input
                            {...register("phone", { required: "رقم الهاتف مطلوب" })}
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">العنوان</label>
                        <textarea
                            {...register("address", { required: "العنوان مطلوب" })}
                            rows={3}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md flex items-center gap-2 mx-auto"
                    >
                        <Save size={18} />
                        حفظ التغييرات
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
