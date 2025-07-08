import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart, ShieldCheck, Truck, ThumbsUp } from "lucide-react";
import subscriberImg from '../../../assets/subscriber.svg';


function Cta() {

    const { t } = useTranslation();

    return (
        <section className="py-16 bg-indigo-600 text-white">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">

                <div className="flex-1">
                    <img
                        src={subscriberImg}
                        alt="Join Illustration"
                        className="w-full max-w-sm mx-auto"
                    />
                </div>

                <div className="flex-1 space-y-4">
                    <h2 className="text-3xl font-bold">
                        {t("home.cta.title", "جاهز للانطلاق؟")}
                    </h2>
                    <p className='my-6'>
                        {t("home.cta.subtitle", "انضم إلينا الآن وابدأ رحلتك في عالم التسوق الإلكتروني.")}
                    </p>
                    <Link
                        to="/register"
                        className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                        {t("home.cta.button", "إنشاء حساب")}
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default Cta
