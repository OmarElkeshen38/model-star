import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import shoiceImg from '../../../assets/shoice.jpg';

function FeaturedProducts() {
  const { t, i18n } = useTranslation();

  const featuredProducts = [
    {
      id: 1,
      name: t("products.mensSportShoes", "حذاء رياضي رجالي"),
      price: "699 ج.م",
      image: shoiceImg,
    },
    {
      id: 2,
      name: t("products.womensCasualShoes", "حذاء كاجوال نسائي"),
      price: "549 ج.م",
      image: shoiceImg,
    },
    {
      id: 3,
      name: t("products.kidsComfortShoes", "حذاء أطفال مريح"),
      price: "299 ج.م",
      image: shoiceImg,
    },
    {
      id: 4,
      name: t("products.formalLeatherShoes", "حذاء جلدي رسمي"),
      price: "799 ج.م",
      image: shoiceImg,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
          {t("home.featured.title", "منتجات مميزة")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 duration-300 overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-indigo-600 font-bold mb-3">{product.price}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="inline-block text-sm font-medium text-indigo-600 hover:text-indigo-800 transition duration-200"
                >
                  {t("home.featured.details", "عرض التفاصيل")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
