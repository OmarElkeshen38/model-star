import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import shoiceImg from '../../../assets/shoice.jpg';

function ExclusiveOffers() {
  const { t } = useTranslation();

  const offers = [
    {
      id: 1,
      name: t("products.mensSneakers", "حذاء رياضي رجالي"),
      oldPrice: 899,
      newPrice: 599,
      image: shoiceImg,
    },
    {
      id: 2,
      name: t("products.womensCasual", "حذاء كاجوال نسائي"),
      oldPrice: 699,
      newPrice: 449,
      image: shoiceImg,
    },
    {
      id: 3,
      name: t("products.kidsComfort", "حذاء أطفال مريح"),
      oldPrice: 399,
      newPrice: 279,
      image: shoiceImg,
    },
    {
      id: 4,
      name: t("products.formalLeather", "حذاء جلدي رسمي"),
      oldPrice: 999,
      newPrice: 749,
      image: shoiceImg,
    },
  ];

  const calculateDiscount = (oldPrice, newPrice) => {
    const discount = ((oldPrice - newPrice) / oldPrice) * 100;
    return Math.round(discount);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 via-white to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
          {t("home.exclusiveOffers.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {offers.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-lg transition duration-300"
            >
              <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow z-10 font-bold">
                -{calculateDiscount(product.oldPrice, product.newPrice)}%
              </span>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 line-through">{product.oldPrice} ج.م</p>
                <p className="text-indigo-600 font-bold text-base">{product.newPrice} ج.م</p>
                <Link
                  to={`/product/${product.id}`}
                  className="inline-block mt-3 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"
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

export default ExclusiveOffers;
