import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart } from "lucide-react";
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
      {t("home.featured.title", "الاكثر مبيعاً")}
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {featuredProducts.map((product, index) => (
        <div
          key={product.id}
          className="bg-white overflow-hidden rounded-lg flex flex-col justify-between shadow transition duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-cover rounded-t-md transition duration-300 hover:scale-105"
          />
          <div className="p-4 text-center flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-indigo-600 font-bold">{product.price}</p>

            <div className="flex justify-center gap-3">
              <Link
                to={`/product/${product.id}`}
                className="text-sm text-indigo-600 hover:underline"
              >
                {t("home.featured.details", "عرض التفاصيل")}
              </Link>

              <button
                className="text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded flex items-center gap-1 text-sm transition"
              >
                <ShoppingCart size={16} />
                {t("nav.cart", "السلة")}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-6 text-center">
      <Link
        to="/shop"
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-transform hover:scale-105"
      >
        {t("home.featured.viewAll", "عرض كل المنتجات")}
      </Link>
    </div>
  </div>
</section>

  );
}

export default FeaturedProducts;
