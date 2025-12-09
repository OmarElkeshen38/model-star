import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, Keyboard } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { getCategories } from '../../Admin/AdminCategories/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Updated CategoriesSlider
 * - Palette: Chic Teal (inline HEXs, no tailwind.config)
 * - Accessibility: keyboard (Enter), aria labels, role, focus states
 * - Images: lazy loading + onError fallback
 * - RTL support via i18n.dir()
 * - Reduced motion respects user preference (disables autoplay)
 */

function CategoriesSlider() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: categories = [] } = useSelector((state) => state.categories || {});
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const goToCategory = (catId) => {
        navigate(`/products?category=${catId}&page=1`);
    };

    // Chic Teal palette (inline)
    const COLORS = {
        primary: "#0B132B",
        accent: "#06B6D4",
        accent2: "#FF6B6B",
        softBg: "#F8FAFC",
        muted: "#6B7280",
    };

    const handleKeyDown = (e, catId) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goToCategory(catId);
        }
    };

    return (
        <section
            className="py-20"
            style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #FFFFFF)` }}
            aria-label={t("home.browseCategories", "Browse Categories")}
        >
            <div className="container mx-auto px-4">
                <h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12"
                    style={{ color: COLORS.primary }}
                >
                    {t("home.browseCategories", "Browse Categories")}
                </h2>

                <Swiper
                    key={i18n.language}
                    dir={i18n.dir()}
                    modules={[Navigation, Pagination, Autoplay, A11y, Keyboard]}
                    spaceBetween={20}
                    slidesPerView={2}
                    loop={true}
                    autoplay={reduceMotion ? false : { delay: 4000, disableOnInteraction: false }}
                    navigation
                    pagination={{ clickable: true }}
                    keyboard={{ enabled: true }}
                    a11y={{
                        containerMessage: t("swiper.a11yContainer", "Categories carousel"),
                        slideRole: "group",
                    }}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 6 },
                    }}
                >
                    {categories.length === 0 ? (
                        // simple empty state (can be replaced with skeletons)
                        <div className="w-full text-center py-20" style={{ color: COLORS.muted }}>
                            {t("home.categoriesLoading", "Loading categories...")}
                        </div>
                    ) : (
                        categories.map((cat) => (
                            <SwiperSlide key={cat._id}>
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => goToCategory(cat._id)}
                                    onKeyDown={(e) => handleKeyDown(e, cat._id)}
                                    className="cursor-pointer group p-6 rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 text-center focus:outline-none"
                                    style={{
                                        border: `1px solid ${COLORS.primary}10`,
                                        boxShadow: "0 8px 24px rgba(12,15,25,0.06)",
                                    }}
                                    aria-label={
                                        i18n.language === "ar"
                                            ? `${cat.name_ar || t("home.category", "Category")}`
                                            : `${cat.name_en || t("home.category", "Category")}`
                                    }
                                >
                                    <div
                                        className="relative w-40 h-40 mx-auto rounded-full overflow-hidden flex items-center justify-center transition-transform duration-300"
                                        style={{
                                            border: `4px solid ${COLORS.primary}10`,
                                            transform: "translateZ(0)",
                                        }}
                                    >
                                        <img
                                            src={cat?.icon?.secure_url || ""}
                                            alt={i18n.language === "ar" ? (cat.name_ar || "") : (cat.name_en || "")}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                            onError={(e) => {
                                                // fallback: simple SVG placeholder
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src =
                                                    "data:image/svg+xml;utf8," +
                                                    encodeURIComponent(
                                                        `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 24 24' fill='none'><rect width='100%' height='100%' fill='${COLORS.softBg}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${COLORS.muted}' font-family='Arial, Helvetica, sans-serif' font-size='10'>No image</text></svg>`
                                                    );
                                            }}
                                            style={{ borderRadius: "9999px" }}
                                        />

                                        {/* overlay on hover */}
                                        <div
                                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                                            style={{ background: COLORS.accent }}
                                            aria-hidden
                                        />
                                    </div>

                                    <h3
                                        className="mt-5 font-semibold text-lg transition-colors"
                                        style={{ color: COLORS.primary }}
                                    >
                                        {i18n.language === "ar" ? cat.name_ar || cat.name_en : cat.name_en || cat.name_ar}
                                    </h3>
                                </div>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>
        </section>
    );
}

export default CategoriesSlider;
