import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { ShoppingCart, Star, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { useReducedMotion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
    PRODUCTS_URLS,
    publicAxiosInstance,
} from "../../../Services/Urls/Urls";

function ProductDetails() {
    const { id } = useParams();
    const { i18n, t } = useTranslation();
    const isRTL = i18n.dir() === "rtl";
    const reduceMotion = useReducedMotion();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // Chic Teal inline palette (no tailwind.config)
    const COLORS = {
        primary: "#0B132B",
        accent: "#06B6D4",
        accentDark: "#0585A3",
        accent2: "#FF6B6B",
        softBg: "#F8FAFC",
        muted: "#6B7280",
    };

    const formatPrice = (v) => {
        if (v == null) return "-";
        try {
            return Number(v).toLocaleString("ar-EG");
        } catch {
            return v;
        }
    };

    const imageFallback = (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src =
            "data:image/svg+xml;utf8," +
            encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600' fill='none'><rect width='100%' height='100%' fill='${COLORS.softBg}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${COLORS.muted}' font-family='Arial, Helvetica, sans-serif' font-size='20'>No image</text></svg>`
            );
    };

    const getProductDetails = async () => {
        setIsLoading(true);
        try {
            const res = await publicAxiosInstance.get(PRODUCTS_URLS.product_details(id));
            const prod = res?.data?.data?.data || null;
            setProduct(prod);

            if (prod?.category?._id) {
                const relatedRes = await publicAxiosInstance.get(
                    PRODUCTS_URLS.products_by_category(prod.category._id)
                );
                setRelatedProducts(
                    relatedRes?.data?.data?.data?.filter((p) => p._id !== prod._id) || []
                );
            } else {
                setRelatedProducts([]);
            }
        } catch (err) {
            console.error("getProductDetails:", err);
            setProduct(null);
            setRelatedProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProductDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const renderStars = (rating = 0, total = 0) => (
        <div className="flex items-center gap-2" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    size={18}
                    className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}
                    fill={i < Math.round(rating) ? "currentColor" : "none"}
                />
            ))}
            <span style={{ color: COLORS.muted, marginInlineStart: 8 }} className="text-sm">
                {total} {i18n.language === "ar" ? "تقييم" : "reviews"}
            </span>
        </div>
    );

    const onSubmit = (data) => {
        console.log("New Comment:", data.comment);
        reset();
    };

    const addToCart = () => {
        // Replace with real addToCart logic (dispatch / API)
        console.log("Add to cart:", product?._id, { size: selectedSize || null });
        alert(t("product.addedToCart", "تمت إضافة المنتج إلى السلة"));
    };

    if (isLoading) {
        return (
            <div className="h-[60vh] flex justify-center items-center" aria-busy="true">
                <svg className="animate-spin" width="44" height="44" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke={COLORS.accent} strokeWidth="4" strokeOpacity="0.25" />
                    <path d="M22 12a10 10 0 00-10-10" stroke={COLORS.accent} strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-20" style={{ color: COLORS.muted }}>
                {i18n.language === "ar" ? "لم يتم العثور على المنتج" : "Product not found"}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-14" dir={isRTL ? "rtl" : "ltr"}>
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-6 transition"
                style={{ borderColor: `${COLORS.primary}10` }}
            >
                {/* Images */}
                <div>
                    <Swiper
                        modules={[Navigation, Autoplay, Pagination]}
                        navigation
                        pagination={!reduceMotion ? { clickable: true } : false}
                        loop={true}
                        autoplay={reduceMotion ? false : { delay: 4000, disableOnInteraction: false }}
                        className="rounded-xl overflow-hidden"
                        dir={isRTL ? "rtl" : "ltr"}
                    >
                        {(product.images && product.images.length > 0 ? product.images : [{ secure_url: "" }]).map(
                            (img, i) => (
                                <SwiperSlide key={i}>
                                    <img
                                        src={img?.secure_url || ""}
                                        alt={i18n.language === "ar" ? product.name_ar : product.name_en}
                                        className="w-full h-[420px] object-cover"
                                        onError={imageFallback}
                                        loading="lazy"
                                        style={{ display: "block" }}
                                    />
                                </SwiperSlide>
                            )
                        )}
                    </Swiper>
                </div>

                {/* Details */}
                <div className="space-y-5">
                    <h2 className="text-3xl font-extrabold" style={{ color: COLORS.primary }}>
                        {i18n.language === "ar" ? product.name_ar : product.name_en}
                    </h2>

                    {/* Price */}
                    <div className="flex items-center gap-3 flex-wrap">
                        {product.discountPercentage > 0 ? (
                            <>
                                <span className="font-bold" style={{ color: COLORS.accent, fontSize: 28 }}>
                                    {formatPrice(product.currentPrice)} ج.م
                                </span>
                                <span className="line-through" style={{ color: COLORS.muted }}>
                                    {formatPrice(product.Price)} ج.م
                                </span>
                                <span
                                    className="text-sm font-semibold px-3 py-1 rounded-full"
                                    style={{ background: "#FFECEF", color: COLORS.accent2 }}
                                >
                                    -{product.discountPercentage}%
                                </span>
                            </>
                        ) : (
                            <span className="font-bold" style={{ color: COLORS.accent, fontSize: 28 }}>
                                {formatPrice(product.currentPrice)} ج.م
                            </span>
                        )}
                    </div>

                    {/* Offers */}
                    {product.offers?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {product.offers.map((offer) => (
                                <span
                                    key={offer._id}
                                    className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
                                    style={{ background: "#ECFDF5", color: "#065F46" }}
                                >
                                    <Tag size={14} />
                                    {i18n.language === "ar" ? offer.name_ar : offer.name_en}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Description */}
                    <p style={{ color: COLORS.muted }}>{i18n.language === "ar" ? product.description_ar : product.description_en}</p>

                    {/* Sizes */}
                    {product.sizes?.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2" style={{ color: COLORS.primary }}>
                                {i18n.language === "ar" ? "المقاسات" : "Sizes"}
                            </h4>
                            <div className="flex gap-2 flex-wrap">
                                {product.sizes.map((size) => {
                                    const active = selectedSize === size;
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className="px-4 py-2 rounded-lg border transition"
                                            style={
                                                active
                                                    ? { background: COLORS.accent, color: "#fff", borderColor: COLORS.accent }
                                                    : { borderColor: "#E5E7EB", color: COLORS.primary, background: "#fff" }
                                            }
                                            aria-pressed={active}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Rating */}
                    {renderStars(product.ratingStats?.averageRating || 0, product.ratingStats?.totalRatings || 0)}

                    {/* Add to cart */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
                        <button
                            onClick={addToCart}
                            className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 justify-center"
                            style={{
                                background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
                                color: "#fff",
                                boxShadow: "0 10px 30px rgba(6,182,212,0.14)",
                            }}
                            aria-label={i18n.language === "ar" ? "أضف إلى السلة" : "Add to Cart"}
                        >
                            <ShoppingCart size={18} />
                            {i18n.language === "ar" ? "أضف إلى السلة" : "Add to Cart"}
                        </button>

                        <Link
                            to={`/checkout`}
                            className="px-6 py-3 rounded-xl font-medium text-center"
                            style={{
                                background: "#fff",
                                border: `1px solid ${COLORS.primary}10`,
                                color: COLORS.primary,
                            }}
                            aria-label={i18n.language === "ar" ? "إتمام الشراء" : "Checkout"}
                        >
                            {i18n.language === "ar" ? "إتمام الشراء" : "Checkout"}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Reviews & Add review */}
            <div className="grid md:grid-cols-2 gap-6 mt-10">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.primary }}>
                        {i18n.language === "ar" ? "أضف تعليقك" : "Add your review"}
                    </h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" aria-label="review-form">
                        <textarea
                            {...register("comment", { required: i18n.language === "ar" ? "يرجى كتابة تعليقك" : "Comment is required" })}
                            placeholder={i18n.language === "ar" ? "اكتب تعليقك هنا..." : "Write your review..."}
                            rows={4}
                            className="w-full border px-4 py-2 rounded-md focus:outline-none"
                        />
                        {errors.comment && <p className="text-sm" style={{ color: COLORS.accent2 }}>{errors.comment.message}</p>}
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-md"
                            style={{
                                background: COLORS.accent,
                                color: "#fff",
                            }}
                        >
                            {i18n.language === "ar" ? "إرسال" : "Submit"}
                        </button>
                    </form>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.primary }}>
                        {i18n.language === "ar" ? "التقييمات" : "Reviews"}
                    </h3>

                    {product.reviews?.length > 0 ? (
                        <ul className="space-y-4">
                            {product.reviews.map((rev, i) => (
                                <li key={i} className="border-b pb-3 flex flex-col gap-1">
                                    <p className="font-bold" style={{ color: COLORS.accent }}>
                                        {rev.user || (i18n.language === "ar" ? "مستخدم" : "User")}
                                    </p>
                                    <p style={{ color: COLORS.muted }}>{rev.comment || "..."}</p>
                                    <span className="text-xs" style={{ color: COLORS.muted }}>
                                        {new Date(rev.createdAt).toLocaleDateString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ color: COLORS.muted }}>{i18n.language === "ar" ? "لا توجد تعليقات بعد" : "No reviews yet"}</p>
                    )}
                </div>
            </div>

            {/* Related products */}
            {relatedProducts.length > 0 && (
                <div className="mt-12">
                    <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.primary }}>
                        {i18n.language === "ar" ? "منتجات مشابهة" : "Related Products"}
                    </h3>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={16}
                        slidesPerView={1}
                        loop={true}
                        autoplay={reduceMotion ? false : { delay: 4000, disableOnInteraction: false }}
                        navigation
                        pagination={!reduceMotion ? { clickable: true } : false}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="pb-6"
                        dir={isRTL ? "rtl" : "ltr"}
                    >
                        {relatedProducts.map((item) => (
                            <SwiperSlide key={item._id}>
                                <Link
                                    to={`/product/${item._id}`}
                                    className="group relative bg-white rounded-2xl border overflow-hidden transition cursor-pointer flex flex-col"
                                    style={{
                                        borderColor: `${COLORS.primary}10`,
                                        boxShadow: "0 8px 24px rgba(12,15,25,0.06)",
                                    }}
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={item.images?.[0]?.secure_url || ""}
                                            alt={i18n.language === "ar" ? item.name_ar : item.name_en}
                                            className={`w-full h-56 object-cover ${reduceMotion ? "" : "group-hover:scale-110 transition-transform duration-700"}`}
                                            onError={imageFallback}
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                                    </div>

                                    <div className="p-4 flex flex-col gap-2">
                                        <h4 className="font-semibold" style={{ color: COLORS.primary }}>
                                            {i18n.language === "ar" ? item.name_ar : item.name_en}
                                        </h4>

                                        {item.discountPercentage > 0 ? (
                                            <div className="flex items-center gap-2">
                                                <span style={{ color: COLORS.accent }} className="font-bold">
                                                    {formatPrice(item.currentPrice)} ج.م
                                                </span>
                                                <span className="line-through" style={{ color: COLORS.muted }}>
                                                    {formatPrice(item.Price)} ج.م
                                                </span>
                                            </div>
                                        ) : (
                                            <div style={{ color: COLORS.accent }} className="font-bold">
                                                {formatPrice(item.currentPrice)} ج.م
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
}

export default ProductDetails;
