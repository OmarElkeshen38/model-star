import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "framer-motion";

function ChangePassword() {
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
        watch,
        formState: { errors, isSubmitting },
        setFocus,
    } = useForm();

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [formError, setFormError] = useState("");

    const onSubmit = async (data) => {
        setFormError("");
        setSuccessMessage("");
        // simulate API call — replace with real request
        try {
            // basic client-side check: new password different from current
            if (data.currentPassword === data.newPassword) {
                setFormError(t("changePassword.errors.sameAsCurrent", "كلمة المرور الجديدة يجب أن تختلف عن الحالية"));
                setFocus("newPassword");
                return;
            }

            // simulate network delay
            await new Promise((r) => setTimeout(r, 800));
            // TODO: call API here (e.g., dispatch action or axios)
            console.log("Password change payload:", { current: data.currentPassword, new: data.newPassword });
            setSuccessMessage(t("changePassword.success", "تم تغيير كلمة المرور بنجاح"));
        } catch (err) {
            console.error(err);
            setFormError(t("changePassword.errors.submit", "حدث خطأ أثناء تغيير كلمة المرور. حاول مرة أخرى"));
        }
    };

    const handleInvalid = (errs) => {
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
                className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8"
                role="region"
                aria-labelledby="change-password-heading"
                style={{ border: `1px solid ${COLORS.primary}10` }}
            >
                <h2
                    id="change-password-heading"
                    className="text-2xl font-bold text-center mb-6"
                    style={{ color: COLORS.primary }}
                >
                    {t("changePassword.title", "تغيير كلمة المرور")}
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit, handleInvalid)}
                    className="space-y-5"
                    noValidate
                    aria-live="polite"
                >
                    {/* Current Password */}
                    <div>
                        <label htmlFor="currentPassword" className="block mb-1 font-medium" style={{ color: COLORS.muted }}>
                            {t("changePassword.current", "كلمة المرور الحالية")}
                        </label>

                        <div className="relative">
                            <input
                                id="currentPassword"
                                type={showCurrent ? "text" : "password"}
                                {...register("currentPassword", { required: t("changePassword.errors.currentRequired", "هذا الحقل مطلوب") })}
                                className="w-full border rounded-md px-4 py-2 focus:outline-none"
                                style={{ borderColor: `${COLORS.primary}20`, color: COLORS.primary }}
                                aria-invalid={!!errors.currentPassword}
                                aria-describedby={errors.currentPassword ? "err-current" : undefined}
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrent((s) => !s)}
                                aria-label={showCurrent ? t("changePassword.hide", "إخفاء") : t("changePassword.show", "عرض")}
                                className="absolute inset-y-0 end-3 flex items-center p-1"
                            >
                                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {errors.currentPassword && (
                            <p id="err-current" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                                {errors.currentPassword.message}
                            </p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label htmlFor="newPassword" className="block mb-1 font-medium" style={{ color: COLORS.muted }}>
                            {t("changePassword.new", "كلمة المرور الجديدة")}
                        </label>

                        <div className="relative">
                            <input
                                id="newPassword"
                                type={showNew ? "text" : "password"}
                                {...register("newPassword", {
                                    required: t("changePassword.errors.newRequired", "يرجى إدخال كلمة المرور الجديدة"),
                                    minLength: { value: 6, message: t("changePassword.errors.minLength", "يجب أن تكون 6 أحرف على الأقل") },
                                    validate: (val) =>
                                        /[A-Za-z]/.test(val) && /[0-9]/.test(val) ? true : t("changePassword.errors.weak", "اجمع بين أحرف وأرقام لزيادة الأمان"),
                                })}
                                className="w-full border rounded-md px-4 py-2 focus:outline-none"
                                style={{ borderColor: `${COLORS.primary}20`, color: COLORS.primary }}
                                aria-invalid={!!errors.newPassword}
                                aria-describedby={errors.newPassword ? "err-new" : undefined}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew((s) => !s)}
                                aria-label={showNew ? t("changePassword.hide", "إخفاء") : t("changePassword.show", "عرض")}
                                className="absolute inset-y-0 end-3 flex items-center p-1"
                            >
                                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {errors.newPassword && (
                            <p id="err-new" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-1 font-medium" style={{ color: COLORS.muted }}>
                            {t("changePassword.confirm", "تأكيد كلمة المرور")}
                        </label>

                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirm ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: t("changePassword.errors.confirmRequired", "يرجى تأكيد كلمة المرور"),
                                    validate: (val) => val === watch("newPassword") || t("changePassword.errors.match", "كلمة المرور غير متطابقة"),
                                })}
                                className="w-full border rounded-md px-4 py-2 focus:outline-none"
                                style={{ borderColor: `${COLORS.primary}20`, color: COLORS.primary }}
                                aria-invalid={!!errors.confirmPassword}
                                aria-describedby={errors.confirmPassword ? "err-confirm" : undefined}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((s) => !s)}
                                aria-label={showConfirm ? t("changePassword.hide", "إخفاء") : t("changePassword.show", "عرض")}
                                className="absolute inset-y-0 end-3 flex items-center p-1"
                            >
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {errors.confirmPassword && (
                            <p id="err-confirm" className="text-sm mt-1" style={{ color: COLORS.danger }}>
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Form-level messages */}
                    {formError && (
                        <div className="text-sm" role="alert" style={{ color: COLORS.danger }}>
                            {formError}
                        </div>
                    )}
                    {successMessage && (
                        <div className="text-sm" role="status" style={{ color: COLORS.accentDark }}>
                            {successMessage}
                        </div>
                    )}

                    {/* Submit */}
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-md font-semibold transition-transform"
                            style={{
                                background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
                                color: COLORS.white,
                                boxShadow: isSubmitting && !reduceMotion ? "0 8px 24px rgba(6,182,212,0.12)" : undefined,
                                transform: reduceMotion ? "none" : undefined,
                                opacity: isSubmitting ? 0.8 : 1,
                            }}
                        >
                            <Lock size={16} />
                            {t("changePassword.button", "تغيير كلمة المرور")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
