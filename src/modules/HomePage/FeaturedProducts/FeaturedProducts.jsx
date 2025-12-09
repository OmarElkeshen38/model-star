import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getOffersProducts } from "./offersSlice";
import Loading from "../../Shared/Loading/Loading";
import { useReducedMotion } from "framer-motion";

/**
 * FeaturedProducts - محدث للألوان (inline HEX), الوصولية، RTL، reduced motion، lazy images + fallback.
 */

function FeaturedProducts() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const { items: products = [], loading } = useSelector((state) => state.offers || {});

  useEffect(() => {
    dispatch(getOffersProducts());
  }, [dispatch]);

  // Chic Teal palette (inline)
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accent2: "#FF6B6B",
    softBg: "#F8FAFC",
    muted: "#6B7280",
  };

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const handleCardKey = (e, id) => {
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
      aria-labelledby="featured-heading"
    >
      <div className="container mx-auto px-6">
        <h2
          id="featured-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ color: COLORS.primary }}
        >
          {t("home.exclusiveOffers.title", "عروض حصرية")}
        </h2>

        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <p className="text-center" style={{ color: COLORS.muted }}>
            {t("home.exclusiveOffers.empty", "لا توجد منتجات عليها عروض حالياً")}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => {
              const image = product.images?.[0]?.secure_url || "";
              const price = product.Price;
              const discountedPrice = product.currentPrice;
              const discountPercent =
                price && discountedPrice
                  ? Math.round(((price - discountedPrice) / price) * 100)
                  : 0;

              return (
                <article
                  key={product._id}
                  role="button"
                  tabIndex={0}
                  onClick={() => goToProduct(product._id)}
                  onKeyDown={(e) => handleCardKey(e, product._id)}
                  className="group bg-white rounded-2xl shadow transition-all overflow-hidden cursor-pointer flex flex-col focus:outline-none"
                  style={{
                    border: `1px solid ${COLORS.primary}10`,
                    boxShadow: "0 10px 30px rgba(12,15,25,0.06)",
                    transform: reduceMotion ? "none" : undefined,
                  }}
                  aria-label={
                    i18n.language === "ar"
                      ? product.name_ar || product.name_en
                      : product.name_en || product.name_ar
                  }
                >
                  {/* صورة المنتج */}
                  <div
                    className="relative w-full h-60 overflow-hidden"
                    style={{
                      transition: reduceMotion ? "none" : "transform 0.5s ease",
                    }}
                  >
                    {discountPercent > 0 && (
                      <span
                        className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow-md"
                        style={{ background: COLORS.accent2, color: "#fff" }}
                        aria-hidden
                      >
                        -{discountPercent}%
                      </span>
                    )}

                    <img
                      src={image}
                      alt={
                        i18n.language === "ar"
                          ? product.name_ar || product.name_en
                          : product.name_en || product.name_ar
                      }
                      className={`w-full h-full object-cover ${reduceMotion ? "" : "group-hover:scale-110 transition-transform duration-500"
                        }`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "data:image/svg+xml;utf8," +
                          encodeURIComponent(
                            `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'><rect width='100%' height='100%' fill='${COLORS.softBg}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${COLORS.muted}' font-family='Arial, Helvetica, sans-serif' font-size='20'>No image</text></svg>`
                          );
                      }}
                    />
                  </div>

                  {/* تفاصيل المنتج */}
                  <div className="flex-1 flex flex-col justify-between p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3
                        className="text-lg font-semibold truncate"
                        style={{ color: COLORS.primary }}
                        title={
                          i18n.language === "ar"
                            ? product.name_ar || product.name_en
                            : product.name_en || product.name_ar
                        }
                      >
                        {i18n.language === "ar" ? product.name_ar : product.name_en}
                      </h3>

                      <button
                        className="relative text-center p-2 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: dispatch addToCart action here
                          console.log("Add to cart:", product._id);
                        }}
                        aria-label={t("home.addToCart", "أضف إلى السلة")}
                        title={t("home.addToCart", "أضف إلى السلة")}
                        style={{
                          background: "transparent",
                          border: `1px solid ${COLORS.primary}10`,
                        }}
                      >
                        <span
                          className={`absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300`}
                          style={{ background: `${COLORS.accent}22` }}
                          aria-hidden
                        />
                        <ShoppingCart
                          size={20}
                          className="relative z-10"
                          style={{ color: COLORS.primary }}
                        />
                      </button>
                    </div>

                    {/* السعر */}
                    <div className="flex flex-col items-start">
                      {price != null && (
                        <span className="text-sm" style={{ color: COLORS.muted, textDecoration: "line-through" }}>
                          {formatPrice(price)} ج.م
                        </span>
                      )}
                      <span className="font-bold text-xl" style={{ color: COLORS.accent }}>
                        {formatPrice(discountedPrice)} ج.م
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* زر عرض كل المنتجات */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-block px-8 py-3 rounded-xl text-lg font-medium shadow transition-transform"
            style={{
              backgroundColor: COLORS.accent,
              color: "#fff",
              boxShadow: "0 10px 30px rgba(6,182,212,0.18)",
              transform: reduceMotion ? "none" : undefined,
            }}
          >
            {t("home.featured.viewAll", "عرض كل المنتجات")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
