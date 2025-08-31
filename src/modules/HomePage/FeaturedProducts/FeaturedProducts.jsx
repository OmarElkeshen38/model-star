import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getOffersProducts } from "./offersSlice";
import Loading from "../../Shared/Loading/Loading";

function FeaturedProducts() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: products, loading } = useSelector((state) => state.offers);

  useEffect(() => {
    dispatch(getOffersProducts());
  }, [dispatch]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          {t("home.exclusiveOffers.title", "عروض حصرية")}
        </h2>

        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">
            لا توجد منتجات عليها عروض حالياً
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product, index) => {
              const image = product.images?.[0]?.secure_url;
              const price = product.Price;
              const discountedPrice = product.currentPrice;
              const discountPercent = price && discountedPrice ? Math.round(((price - discountedPrice) / price) * 100) : 0;

              return (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer flex flex-col"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {/* صورة المنتج */}
                  <div className="relative w-full h-60 overflow-hidden">
                    {discountPercent > 0 && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        -{discountPercent}%
                      </span>
                    )}
                    <img
                      src={image}
                      alt={i18n.language === "ar" ? product.name_ar : product.name_en}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* تفاصيل المنتج */}
                  <div className="flex-1 flex flex-col justify-between p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {i18n.language === "ar" ? product.name_ar : product.name_en}
                      </h3>

                      <button
                        className="relative text-indigo-600 transition group"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Add to cart:", product._id);
                        }}
                      >
                        <span className="absolute -inset-2 rounded-full bg-indigo-100 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                        <ShoppingCart
                          size={22}
                          className="relative z-10 group-hover:scale-125 group-hover:rotate-6 group-hover:text-indigo-700 transition-transform duration-300"
                        />
                      </button>
                    </div>

                    {/* السعر */}
                    <div className="flex flex-col items-start">
                      {price && (
                        <span className="text-gray-400 line-through text-sm">
                          {price} ج.م
                        </span>
                      )}
                      <span className="text-indigo-600 font-bold text-xl">
                        {discountedPrice} ج.م
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* زر عرض كل المنتجات */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-md hover:shadow-lg transition-transform hover:scale-105"
          >
            {t("home.featured.viewAll", "عرض كل المنتجات")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
