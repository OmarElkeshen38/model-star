import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart } from "lucide-react";
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
          {t("home.exclusiveOffers.title", "عروض حصرية")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {offers.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow z-10 font-bold">
                -{calculateDiscount(product.oldPrice, product.newPrice)}%
              </span>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 text-center flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>

                <div className="flex justify-center gap-2 text-sm">
                  <p className="text-gray-500 line-through">{product.oldPrice} ج.م</p>
                  <p className="text-indigo-600 font-bold">{product.newPrice} ج.م</p>
                </div>

                <div className="flex justify-center gap-3 mt-3">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"
                  >
                    {t("home.featured.details", "عرض التفاصيل")}
                  </Link>

                  <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition"
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

export default ExclusiveOffers;
