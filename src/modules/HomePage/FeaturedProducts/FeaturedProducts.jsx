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
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
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
            {products.map((product, index) => {
              const image = product.images?.[0]?.secure_url;
              const price = product.Price;
              const discountedPrice = product.currentPrice;

              return (
                <div
                  key={product._id}
                  className="overflow-hidden rounded-lg shadow transition duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col items-center p-6"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {/* صورة دائرية مع hover effect */}
                  <div className="w-56 h-56 rounded-full overflow-hidden mb-4 transition-transform duration-300 hover:scale-110">
                    <img
                      src={image}
                      alt={i18n.language === "ar" ? product.name_ar : product.name_en}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* اسم المنتج و أيقونة السلة */}
                  <div className="flex items-center justify-between w-full px-8 mb-3 mt-2">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {i18n.language === "ar" ? product.name_ar : product.name_en}
                    </h3>
                    <button
                      className="text-indigo-600 hover:text-indigo-800 transition"
                      onClick={(e) => {
                        e.stopPropagation(); // عشان ما يروحش لصفحة التفاصيل عند الضغط
                        console.log("Add to cart:", product._id);
                      }}
                    >
                      <ShoppingCart size={22} />
                    </button>
                  </div>

                  {/* السعر */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-gray-500 line-through text-sm">
                      {price} ج.م
                    </span>
                    <span className="text-indigo-600 font-bold text-lg">
                      {discountedPrice} ج.م
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* زر عرض كل المنتجات */}
        <div className="mt-10 text-center">
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
