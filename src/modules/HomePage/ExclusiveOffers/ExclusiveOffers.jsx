import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import shoiceImg from '../../../assets/shoice.jpg';


function ExclusiveOffers() {

    const { t, i18n } = useTranslation();

    const offers = [
        {
            id: 1,
            name: i18n.language === "ar" ? "حذاء رياضي رجالي" : "Men's Sneakers",
            oldPrice: "899 ج.م",
            newPrice: "599 ج.م",
            image: shoiceImg,
        },
        {
            id: 2,
            name: i18n.language === "ar" ? "حذاء كاجوال نسائي" : "Women's Casual Shoes",
            oldPrice: "699 ج.م",
            newPrice: "449 ج.م",
            image: shoiceImg,
        },
        {
            id: 3,
            name: i18n.language === "ar" ? "حذاء أطفال مريح" : "Comfort Kids Shoes",
            oldPrice: "399 ج.م",
            newPrice: "279 ج.م",
            image: shoiceImg,
        },
        {
            id: 4,
            name: i18n.language === "ar" ? "حذاء جلدي رسمي" : "Formal Leather Shoes",
            oldPrice: "999 ج.م",
            newPrice: "749 ج.م",
            image: shoiceImg,
        },
    ];


    return (
        <section className="py-20 bg-indigo-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
                    {i18n.language === "ar" ? "عروض حصرية" : "Exclusive Offers"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {offers.map((product) => (
                        <div
                            key={product.id}
                            className="relative bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition"
                        >
                            {/* شارة خصم */}
                            <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full z-10">
                                {i18n.language === "ar" ? "خصم" : "SALE"}
                            </span>

                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-4 text-center">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                                <p className="text-sm text-gray-500 line-through">{product.oldPrice}</p>
                                <p className="text-indigo-600 font-bold">{product.newPrice}</p>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="inline-block mt-3 text-sm text-indigo-600 hover:underline"
                                >
                                    {i18n.language === "ar" ? "عرض التفاصيل" : "View Details"}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ExclusiveOffers
