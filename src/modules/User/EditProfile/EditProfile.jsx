import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "framer-motion";

function EditProfile() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";
    const reduceMotion = useReducedMotion();

    // Chic Teal palette (inline HEX)
    const COLORS = {
        primary: "#0B132B",
        accent: "#06B6D4",
        accentDark: "#0585A3",
        muted: "#6B7280",
        danger: "#EF4444",
        white: "#FFFFFF",
        softBg: "#F8FAFC",
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setFocus,
    } = useForm({
        defaultValues: {
            name: "أحمد محمد",
            email: "ahmed@example.com",
            phone: "01123456789",
            address: "الرياض، السعودية",
        },
    });

    const [success, setSuccess] = useState("");

    const onSubmit = async (data) => {
        setSuccess("");
        try {
            // محاكاة طلب للحفظ — استبدل هذا بالـ API الفعلي
            await new Promise((r) => setTimeout(r, 700));
            console.log("بيانات جديدة:", data);
            setSuccess(t("editProfile.success", "تم حفظ التغييرات بنجاح"));
        } catch (err) {
            console.error(err);
            setSuccess(t("editProfile.error", "حدث خطأ أثناء الحفظ"));
        }
    };

    const handleInvalid = (errs) => {
        // ركّز أول حقل به خطأ لتحسين الوصول
        const firstKey = Object.keys(errs)[0];
        if (firstKey) setFocus(firstKey);
    };

    return (
        <div
            className="container mx-auto px-4 py-12 mt-16"
            dir={isRTL ? "rtl" : "ltr"}
            style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #FFFFFF)` }}
        >
            <div
                className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10"
                role="region"
                aria-labelledby="edit-profile-heading"
                style={{ border: `1px solid ${COLORS.primary}10` }}
            >
                <h2
                    id="edit-profile-heading"
                    className="text-2xl font-bold mb-6 text-center"
                    style={{ color: COLORS.primary }}
                >
                    {t("editProfile.title", "تعديل الملف الشخصي")}
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit, handleInvalid)}
                    className="space-y-6"
                    noValidate
                    aria-live="polite"
                >
                    <div>
                        <label htmlFor="name" className="block mb-1 font-medium" style={{ color: COLORS.muted }}>
                            {t("form.name", "الاسم الكامل")}
                        </label>
                        <input
                            id="name"
                            {...register("name", { required: t("form.errors.name", "الاسم مطلوب") })}
                            type="text"
                            className="w-full border rounded-md px-4 py-2 focus:outline-none"
                            style={{
                                borderColor: `${COLORS.primary}20`,
                                boxShadow: isSubmitting && !reduceMotion ? "0 6px 18px rgba(6,182,212,0.06)" : undefined,
                                color: COLORS.primary,
                            }}
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "err-name" : undefined}
                        />
                        {errors.name && (
                            <p id="err-name" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium" style={{ color: COLORS.muted }}>
                            {t("form.email", "البريد الإلكتروني")}
                        </label>
                        <input
                            id="email"
                            {...register("email", {
                                required: t("form.errors.email", "البريد الإلكتروني مطلوب"),
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: t("form.errors.emailInvalid", "صيغة البريد غير صحيحة"),
                                },
                            })}
                            type="email"
                            className="w-full border rounded-md px-4 py-2 focus:outline-none"
                            style={{ borderColor: `${COLORS.primary}20`, color: COLORS.primary }}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "err-email" : undefined}
                        />
                        {errors.email && (
                            <p id="err-email" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="phone" className="block mb-1 font-medium" style={{ color: COLORS.muted }}>
                            {t("form.phone", "رقم الهاتف")}
                        </label>
                        <input
                            id="phone"
                            {...register("phone", { required: t("form.errors.phone", "رقم الهاتف مطلوب") })}
                            type="text"
                            className="w-full border rounded-md px-4 py-2 focus:outline-none"
                            style={{ borderColor: `${COLORS.primary}20`, color: COLORS.primary }}
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "err-phone" : undefined}
                        />
                        {errors.phone && (
                            <p id="err-phone" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="address" className="block mb-1 font-medium" style={{ color: COLORS.muted }}>
                            {t("form.address", "العنوان")}
                        </label>
                        <textarea
                            id="address"
                            {...register("address", { required: t("form.errors.address", "العنوان مطلوب") })}
                            rows={3}
                            className="w-full border rounded-md px-4 py-2 focus:outline-none"
                            style={{ borderColor: `${COLORS.primary}20`, color: COLORS.primary }}
                            aria-invalid={!!errors.address}
                            aria-describedby={errors.address ? "err-address" : undefined}
                        />
                        {errors.address && (
                            <p id="err-address" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-md font-semibold transition-transform"
                            style={{
                                background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
                                color: COLORS.white,
                                boxShadow: isSubmitting ? "0 8px 24px rgba(6,182,212,0.12)" : undefined,
                                transform: reduceMotion ? "none" : undefined,
                                opacity: isSubmitting ? 0.8 : 1,
                            }}
                            aria-busy={isSubmitting}
                        >
                            <Save size={16} />
                            {t("form.save", "حفظ التغييرات")}
                        </button>

                        {success && (
                            <div className="mt-4 text-sm" role="status" aria-live="polite" style={{ color: COLORS.accentDark }}>
                                {success}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
