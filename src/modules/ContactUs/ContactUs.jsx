import React from 'react'
import { useTranslation } from 'react-i18next';

function ContactUs() {

    const { t, i18n } = useTranslation();

    return (
        <div className="min-h-screen bg-gray-100 pt-16 px-4">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-indigo-700 mt-8">
                    {t("contact.title", "اتصل بنا")}
                </h1>
                <p className="text-center text-gray-600 max-w-xl mx-auto mb-8">
                    {t("contact.subtitle", "يسعدنا تواصلك معنا لأي استفسارات أو ملاحظات.")}
                </p>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Left side: Contact Form */}
                    <form className="bg-white p-6 rounded-lg shadow-md space-y-4">
                        <input
                            type="text"
                            placeholder={t("contact.name", "الاسم")}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="email"
                            placeholder={t("contact.email", "البريد الإلكتروني")}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <textarea
                            placeholder={t("contact.message", "اكتب رسالتك هنا")}
                            rows="5"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                            {t("contact.send", "إرسال")}
                        </button>
                    </form>

                    {/* Right side: Contact Info */}
                    <div className="bg-white p-6 rounded-lg shadow-md space-y-6 text-gray-700">
                        <div>
                            <h3 className="font-semibold text-lg text-indigo-600 mb-2">
                                {t("contact.address", "العنوان")}
                            </h3>
                            <p>مصر - القاهرة - تيسير فهمي</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-indigo-600 mb-2">
                                {t("contact.phone", "الهاتف")}
                            </h3>
                            <span dir='ltr'>+20 150 548 3625</span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-indigo-600 mb-2">
                                {t("contact.email", "البريد الإلكتروني")}
                            </h3>
                            <p>support@yourstore.com</p>
                        </div>
                        {/* Optional: Embed Map */}
                        <div className="mt-4">
                            <iframe
                                title="map"
                                className="w-full h-48 rounded-md"
                                src="https://maps.google.com/maps?q=Riyadh,%20Saudi%20Arabia&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
