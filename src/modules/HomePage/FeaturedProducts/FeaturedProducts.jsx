import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart, ShieldCheck, Truck, ThumbsUp } from "lucide-react";
import shoiceImg from '../../../assets/shoice.jpg';

function FeaturedProducts() {

    const { t } = useTranslation();

    const featuredProducts = [
        {
            id: 1,
            name: "حذاء رياضي رجالي",
            price: "699 ج.م",
            image: shoiceImg,
        },
        {
            id: 2,
            name: "حذاء كاجوال نسائي",
            price: "549 ج.م",
            image: shoiceImg,
        },
        {
            id: 3,
            name: "حذاء أطفال مريح",
            price: "299 ج.م",
            image: shoiceImg,
        },
        {
            id: 4,
            name: "حذاء جلدي رسمي",
            price: "799 ج.م",
            image: shoiceImg,
        },
    ];

    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
                    {t("home.featured.title", "منتجات مميزة")}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-70 object-cover"
                            />
                            <div className="p-4 text-center">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-indigo-600 font-bold mb-2">{product.price}</p>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="inline-block mt-2 text-sm text-indigo-600 hover:underline"
                                >
                                    {t("home.featured.details", "عرض التفاصيل")}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts
