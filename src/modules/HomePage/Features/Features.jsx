import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart, ShieldCheck, Truck, ThumbsUp } from "lucide-react";

function Features() {

    const { t } = useTranslation();

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">
                    {t("home.features.title", "لماذا تختارنا؟")}
                </h2>

                <div className="grid md:grid-cols-4 gap-10 text-center">
                    <div>
                        <ShieldCheck className="mx-auto text-indigo-600" size={40} />
                        <h3 className="mt-4 text-lg font-semibold">
                            {t("home.features.quality", "جودة مضمونة")}
                        </h3>
                        <p className="text-gray-600 text-sm mt-2">
                            {t("home.features.qualityDesc", "منتجاتنا مختارة بعناية وتخضع لأعلى معايير الجودة.")}
                        </p>
                    </div>

                    <div>
                        <Truck className="mx-auto text-indigo-600" size={40} />
                        <h3 className="mt-4 text-lg font-semibold">
                            {t("home.features.delivery", "شحن سريع")}
                        </h3>
                        <p className="text-gray-600 text-sm mt-2">
                            {t("home.features.deliveryDesc", "نوصل طلباتك بسرعة وفي الوقت المحدد لأي مكان.")}
                        </p>
                    </div>

                    <div>
                        <ShoppingCart className="mx-auto text-indigo-600" size={40} />
                        <h3 className="mt-4 text-lg font-semibold">
                            {t("home.features.easyShopping", "تجربة تسوق سهلة")}
                        </h3>
                        <p className="text-gray-600 text-sm mt-2">
                            {t("home.features.easyShoppingDesc", "واجهة بسيطة وسلسة لتجعل التسوق ممتعاً.")}
                        </p>
                    </div>

                    <div>
                        <ThumbsUp className="mx-auto text-indigo-600" size={40} />
                        <h3 className="mt-4 text-lg font-semibold">
                            {t("home.features.trust", "ثقة العملاء")}
                        </h3>
                        <p className="text-gray-600 text-sm mt-2">
                            {t("home.features.trustDesc", "نحظى بثقة آلاف العملاء في الوطن العربي.")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
