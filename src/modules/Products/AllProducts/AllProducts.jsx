import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CATEGORIES_URLS,
  PRODUCTS_URLS,
  publicAxiosInstance,
} from "../../../Services/Urls/Urls";
import Pagination from "../../Shared/Pagination/Pagination";
import { ShoppingCart, Star } from "lucide-react";
import { useReducedMotion } from "framer-motion";

/**
 * AllProducts - محدث لباقة Chic Teal (inline HEX)
 * - RTL support via i18n.dir()
 * - lazy-loading + image fallback
 * - aria labels + keyboard support
 * - respects prefers-reduced-motion
 */

function AllProducts() {
  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const productsPerPage = 8;
  const reduceMotion = useReducedMotion();
  const isRTL = i18n.dir() === "rtl";

  // Chic Teal palette (inline)
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accent2: "#FF6B6B",
    softBg: "#F8FAFC",
    muted: "#6B7280",
  };

  function goToProductDetails(productId) {
    navigate(`/product/${productId}`);
  }

  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      let response = await publicAxiosInstance.get(PRODUCTS_URLS.products);
      setProductsList(response?.data?.data?.data || []);
    } catch (error) {
      console.error("getAllProducts error:", error);
      setProductsList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllCategories = async () => {
    try {
      let response = await publicAxiosInstance.get(CATEGORIES_URLS.categories);
      setCategoriesList(response?.data?.data?.data || []);
    } catch (error) {
      console.error("getAllCategories error:", error);
      setCategoriesList([]);
    }
  };

  const productsByCategory = async (categoryId) => {
    setIsLoading(true);
    try {
      if (categoryId === "all") {
        await getAllProducts();
      } else {
        let response = await publicAxiosInstance.get(
          PRODUCTS_URLS.products_by_category(categoryId)
        );
        console.log("Products by category:", response?.data);
        setProductsList(response?.data?.data?.data || []);
      }
    } catch (error) {
      console.error("productsByCategory error:", error);
      setProductsList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchParams({ category: categoryId });
    setPage(1);
    productsByCategory(categoryId);
  };

  useEffect(() => {
    getAllCategories();
    productsByCategory(initialCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory]);

  const totalPages = Math.max(1, Math.ceil(productsList.length / productsPerPage));
  const paginatedProducts = productsList.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const formatPrice = (val) => {
    if (val == null) return "-";
    try {
      return Number(val).toLocaleString("ar-EG");
    } catch {
      return val;
    }
  };

  const imageFallback = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'><rect width='100%' height='100%' fill='${COLORS.softBg}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${COLORS.muted}' font-family='Arial, Helvetica, sans-serif' font-size='18'>No image</text></svg>`
      );
  };

  return (
    <div
      className="container mx-auto px-4 py-14"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #FFFFFF)` }}
    >
      <h1 className="text-3xl font-extrabold mb-10 text-center" style={{ color: COLORS.primary }}>
        {t("nav.products")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div
            className="bg-white p-5 rounded-2xl border shadow-sm sticky"
            style={{ top: 96, borderColor: `${COLORS.primary}10` }}
            aria-label={t("sidebar.categories", "Categories")}
          >
            <h3 className="text-xl font-semibold mb-5" style={{ color: COLORS.primary }}>
              {t("nav.shop")}
            </h3>

            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`w-full text-start px-4 py-2 rounded-lg transition font-medium`}
                  style={
                    selectedCategory === "all"
                      ? { background: COLORS.accent, color: "#fff", boxShadow: "0 6px 18px rgba(6,182,212,0.12)" }
                      : { color: COLORS.primary }
                  }
                  aria-pressed={selectedCategory === "all"}
                >
                  {i18n.language === "ar" ? "الكل" : "All"}
                </button>
              </li>

              {categoriesList.map((cat) => (
                <li key={cat._id}>
                  <button
                    onClick={() => handleCategoryChange(cat._id)}
                    className="w-full text-start px-4 py-2 rounded-lg transition font-medium"
                    style={
                      selectedCategory === cat._id
                        ? { background: COLORS.accent, color: "#fff", boxShadow: "0 6px 18px rgba(6,182,212,0.12)" }
                        : { color: COLORS.primary }
                    }
                    aria-pressed={selectedCategory === cat._id}
                  >
                    {i18n.language === "ar" ? cat.name_ar : cat.name_en}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products */}
        <section className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-3 text-center py-24" style={{ color: COLORS.primary }}>
                <svg className="mx-auto mb-4 animate-spin" width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke={COLORS.accent} strokeWidth="4" strokeOpacity="0.25" />
                  <path d="M22 12a10 10 0 00-10-10" stroke={COLORS.accent} strokeWidth="4" strokeLinecap="round" />
                </svg>
                <div>{t("common.loading", "Loading...")}</div>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="col-span-3 text-center py-24" style={{ color: COLORS.muted }}>
                {i18n.language === "ar" ? "لا يوجد منتجات في هذا التصنيف" : "No products found in this category"}
              </div>
            ) : (
              paginatedProducts.map((product) => (
                <article
                  key={product._id}
                  onClick={() => goToProductDetails(product._id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") goToProductDetails(product._id);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={
                    i18n.language === "ar" ? product.name_ar || product.name_en : product.name_en || product.name_ar
                  }
                  className="group bg-white rounded-2xl border overflow-hidden transition duration-300 cursor-pointer flex flex-col"
                  style={{
                    borderColor: `${COLORS.primary}10`,
                    boxShadow: "0 8px 24px rgba(12,15,25,0.06)",
                    transform: reduceMotion ? "none" : undefined,
                  }}
                >
                  {/* Image with overlay */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images?.[0]?.secure_url || ""}
                      alt={i18n.language === "ar" ? product.name_ar : product.name_en}
                      className={`w-full h-60 object-cover ${reduceMotion ? "" : "group-hover:scale-110 transition-transform duration-500"}`}
                      loading="lazy"
                      onError={imageFallback}
                      style={{ display: "block" }}
                    />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Add to cart:", product._id);
                      }}
                      className={`absolute bottom-3 ${isRTL ? "left-3" : "right-3"} p-2 rounded-full opacity-0 group-hover:opacity-100 transition`}
                      aria-label={t("home.addToCart", "Add to cart")}
                      style={{
                        background: COLORS.accent,
                        color: "#fff",
                        boxShadow: "0 6px 18px rgba(6,182,212,0.14)",
                      }}
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex flex-col gap-2 flex-grow">
                    <h3 className="text-lg font-semibold truncate" style={{ color: COLORS.primary }}>
                      {i18n.language === "ar" ? product.name_ar : product.name_en}
                    </h3>

                    {/* Price with discount */}
                    {product.discountPercentage > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-bold text-lg">
                          {formatPrice(product.currentPrice)} ج.م
                        </span>
                        <span className="line-through text-gray-500 text-sm">
                          {formatPrice(product.Price)} ج.م
                        </span>
                        <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                          -{product.discountPercentage}%
                        </span>
                      </div>
                    ) : (
                      <p className="text-lg font-bold" style={{ color: COLORS.accent }}>
                        {formatPrice(product.currentPrice)} ج.م
                      </p>
                    )}

                    {/* Rating */}
                    <div className="flex justify-start gap-1 mt-1" aria-hidden>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < Math.round(product.ratingStats?.averageRating || 0) ? "currentColor" : "none"}
                          className={i < Math.round(product.ratingStats?.averageRating || 0) ? "text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AllProducts;
