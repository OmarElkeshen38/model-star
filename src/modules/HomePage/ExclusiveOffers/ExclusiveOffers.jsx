import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Loading from "../../Shared/Loading/Loading";
import { getProducts } from "../../Admin/AdminProducts/productSlice";

function LatestProducts() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // ترتيب المنتجات حسب الأحدث
  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
          {t("home.latestProducts.title", "أحدث المنتجات")}
        </h2>

        {loading ? (
          <Loading />
        ) : sortedProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            {t("home.latestProducts.noProducts", "لا توجد منتجات حالياً")}
          </p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation
            // pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {sortedProducts.map((product) => {
              const image = product.images?.[0]?.secure_url;
              const name =
                i18n.language === "ar" ? product.name_ar : product.name_en;
              const price = product.Price;
              const discounted = product.currentPrice;
              const hasDiscount = product.discountPercentage > 0;

              return (
                <SwiperSlide key={product._id}>
                  <div
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col"
                  >
                    {/* Badge الخصم */}
                    {hasDiscount && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow font-bold z-20">
                        -{product.discountPercentage}%
                      </span>
                    )}

                    {/* صورة + overlay */}
                    <div className="relative overflow-hidden">
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                      {/* زر السلة العائم */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Add to cart:", product._id);
                        }}
                        className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>

                    {/* المحتوى */}
                    <div className="p-4 flex flex-col gap-2 flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {name}
                      </h3>

                      {/* السعر */}
                      <div className="flex items-center gap-2">
                        {hasDiscount && (
                          <span className="text-gray-400 line-through text-sm">
                            {price} ج.م
                          </span>
                        )}
                        <span className="text-indigo-600 font-bold text-xl">
                          {discounted} ج.م
                        </span>
                      </div>

                      {/* التقييم */}
                      {product.ratingStats?.averageRating > 0 ? (
                        <div className="flex items-center gap-1 text-yellow-500">
                          {Array.from(
                            { length: Math.round(product.ratingStats.averageRating) },
                            (_, i) => (
                              <Star key={i} size={16} fill="currentColor" />
                            )
                          )}
                          <span className="text-gray-500 text-sm ml-1">
                            ({product.ratingStats.totalRatings})
                          </span>
                        </div>
                      ) : (
                        <div className="h-5"></div> // placeholder يحافظ على نفس الارتفاع
                      )}
                    </div>
                  </div>
                </SwiperSlide>

              );
            })}
          </Swiper>
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

export default LatestProducts;
