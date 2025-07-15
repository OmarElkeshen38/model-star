import React from 'react'
import { useTranslation } from 'react-i18next';
import ContactUs from '../ContactUs/ContactUs';

function AboutUs() {

    const { t } = useTranslation();

    return (
        <>
            <div className="bg-gray-100 pt-16 px-4">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center text-indigo-700 my-6">
                        {t("about.title", "من نحن")}
                    </h1>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        {t(
                            "about.description",
                            "متجرنا يقدم لك أفضل تجربة تسوق إلكتروني في المملكة العربية السعودية، حيث نوفّر منتجات عالية الجودة، وخدمة عملاء مميزة، وتجربة سلسة وآمنة."
                        )}
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-indigo-600 font-semibold text-lg mb-2">
                                {t("about.quality", "منتجات مختارة بعناية")}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {t("about.qualityDesc", "نحرص على اختيار أفضل الخامات والماركات الموثوقة.")}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-indigo-600 font-semibold text-lg mb-2">
                                {t("about.shipping", "شحن سريع وآمن")}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {t("about.shippingDesc", "نوصل الطلبات لجميع مناطق مصر خلال وقت قصير.")}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-indigo-600 font-semibold text-lg mb-2">
                                {t("about.trust", "ثقة العملاء")}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {t("about.trustDesc", "نحظى بثقة آلاف العملاء منذ انطلاقنا.")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ContactUs />
        </>

    )
}

export default AboutUs
