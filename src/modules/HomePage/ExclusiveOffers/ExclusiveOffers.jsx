import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loading from "../../Shared/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Admin/AdminProducts/productSlice";
import { useReducedMotion } from "framer-motion";

function LatestProducts() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const { items: products = [], loading } = useSelector((state) => state.products || {});

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Chic Teal palette (inline HEX)
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accent2: "#FF6B6B",
    softBg: "#F8FAFC",
    muted: "#6B7280",
  };

  // sort by newest
  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const goToProduct = (id) => navigate(`/product/${id}`);

  const handleKey = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToProduct(id);
    }
  };

  const formatPrice = (val) => {
    if (val == null) return "-";
    try {
      return Number(val).toLocaleString("ar-EG");
    } catch {
      return val;
    }
  };

  return (
    <section
      className="py-20"
      style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #FFFFFF)` }}
      aria-labelledby="latest-products-heading"
    >
      <div className="container mx-auto px-6">
        <h2
          id="latest-products-heading"
          className="text-3xl font-bold text-center mb-12"
          style={{ color: COLORS.primary }}
        >
          {t("home.latestProducts.title", "أحدث المنتجات")}
        </h2>

        {loading ? (
          <Loading />
        ) : sortedProducts.length === 0 ? (
          <p className="text-center" style={{ color: COLORS.muted }}>
            {t("home.latestProducts.noProducts", "لا توجد منتجات حالياً")}
          </p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y, Keyboard]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            dir={i18n.dir()}
            autoplay={reduceMotion ? false : { delay: 4000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            a11y={{
              containerMessage: t("swiper.a11yContainer", "Latest products carousel"),
              slideRole: "group",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {sortedProducts.map((product) => {
              const image = product.images?.[0]?.secure_url || "";
              const name = i18n.language === "ar" ? product.name_ar : product.name_en;
              const price = product.Price;
              const discounted = product.currentPrice;
              const hasDiscount = product.discountPercentage > 0;

              return (
                <SwiperSlide key={product._id}>
                  <article
                    role="button"
                    tabIndex={0}
                    onClick={() => goToProduct(product._id)}
                    onKeyDown={(e) => handleKey(e, product._id)}
                    className="group relative bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col"
                    style={{
                      border: `1px solid ${COLORS.primary}10`,
                      boxShadow: "0 10px 30px rgba(12,15,25,0.06)",
                    }}
                    aria-label={name}
                  >
                    {/* Badge الخصم */}
                    {hasDiscount && (
                      <span
                        className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-bold z-20"
                        style={{ background: COLORS.accent2, color: "#fff" }}
                        aria-hidden
                      >
                        -{product.discountPercentage}%
                      </span>
                    )}

                    {/* صورة + overlay */}
                    <div className="relative overflow-hidden">
                      <img
                        src={image}
                        alt={name}
                        className={`w-full h-64 object-cover ${reduceMotion ? "" : "group-hover:scale-110 transition-transform duration-700"}`}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "data:image/svg+xml;utf8," +
                            encodeURIComponent(
                              `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'><rect width='100%' height='100%' fill='${COLORS.softBg}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${COLORS.muted}' font-family='Arial, Helvetica, sans-serif' font-size='18'>No image</text></svg>`
                            );
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: dispatch addToCart action
                          console.log("Add to cart:", product._id);
                        }}
                        className={`absolute bottom-4 right-4 text-white p-3 rounded-full shadow-lg ${reduceMotion ? "" : "opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500"}`}
                        style={{ background: COLORS.accent }}
                        aria-label={t("home.addToCart", "أضف إلى السلة")}
                        title={t("home.addToCart", "أضف إلى السلة")}
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>

                    {/* المحتوى */}
                    <div className="p-4 flex flex-col gap-2 flex-grow">
                      <h3
                        className="text-lg font-semibold line-clamp-1"
                        style={{ color: COLORS.primary }}
                        title={name}
                      >
                        {name}
                      </h3>

                      {/* السعر */}
                      <div className="flex items-center gap-2">
                        {hasDiscount && (
                          <span className="text-sm" style={{ color: COLORS.muted, textDecoration: "line-through" }}>
                            {formatPrice(price)} ج.م
                          </span>
                        )}
                        <span className="font-bold text-xl" style={{ color: COLORS.accent }}>
                          {formatPrice(discounted)} ج.م
                        </span>
                      </div>

                      {/* التقييم */}
                      {product.ratingStats?.averageRating > 0 ? (
                        <div className="flex items-center gap-1 text-yellow-500" aria-hidden>
                          {Array.from(
                            { length: Math.round(product.ratingStats.averageRating) },
                            (_, i) => <Star key={i} size={16} fill="currentColor" />
                          )}
                          <span className="text-gray-500 text-sm" style={{ marginInlineStart: 8 }}>
                            ({product.ratingStats.totalRatings})
                          </span>
                        </div>
                      ) : (
                        <div className="h-5" />
                      )}
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {/* زر عرض كل المنتجات */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-block px-8 py-3 rounded-xl text-lg font-medium shadow transition-transform"
            style={{
              backgroundColor: COLORS.accent,
              color: "#fff",
              boxShadow: `0 10px 30px ${COLORS.accent}29`,
            }}
          >
            {t("home.featured.viewAll", "عرض كل المنتجات")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestProducts;
