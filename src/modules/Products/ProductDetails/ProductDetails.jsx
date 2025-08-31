import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { ShoppingCart, Star, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
    PRODUCTS_URLS,
    publicAxiosInstance,
} from "../../../Services/Urls/Urls";

function ProductDetails() {
    const { id } = useParams();
    const { i18n } = useTranslation();
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

    const getProductDetails = async () => {
        try {
            const res = await publicAxiosInstance.get(
                PRODUCTS_URLS.product_details(id)
            );
            const prod = res?.data?.data?.data || null;
            setProduct(prod);

            // جلب منتجات مشابهة (نفس التصنيف مثلًا)
            if (prod?.category?._id) {
                const relatedRes = await publicAxiosInstance.get(
                    PRODUCTS_URLS.products_by_category(prod.category._id)
                );
                setRelatedProducts(
                    relatedRes?.data?.data?.data?.filter((p) => p._id !== prod._id) || []
                );
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProductDetails();
    }, [id]);

    const renderStars = (rating, total) => (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    size={18}
                    className={
                        i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
                    }
                    fill={i < Math.round(rating) ? "currentColor" : "none"}
                />
            ))}
            <span className="text-sm text-gray-600 ml-2">
                {total} {i18n.language === "ar" ? "تقييم" : "reviews"}
            </span>
        </div>
    );

    const onSubmit = (data) => {
        console.log("New Comment:", data.comment);
        reset();
    };

    if (isLoading) {
        return (
            <div className="h-[60vh] flex justify-center items-center">
                <i className="fa-solid fa-spinner animate-spin text-indigo-600 text-4xl"></i>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-20 text-gray-500">
                {i18n.language === "ar"
                    ? "لم يتم العثور على المنتج"
                    : "Product not found"}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-14">
            {/* تفاصيل المنتج */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
                {/* الصور */}
                <div>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation
                        loop={true}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        className="rounded-xl overflow-hidden"
                    >
                        {product.images?.map((img, i) => (
                            <SwiperSlide key={i}>
                                <img
                                    src={img.secure_url}
                                    alt={product.name_ar}
                                    className="w-full h-[400px] object-cover transform hover:scale-105 transition duration-300"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* التفاصيل */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        {i18n.language === "ar" ? product.name_ar : product.name_en}
                    </h2>

                    {/* السعر */}
                    <div className="flex items-center gap-3">
                        {product.discountPercentage > 0 ? (
                            <>
                                <span className="text-red-600 font-bold text-3xl">
                                    {product.currentPrice} ج.م
                                </span>
                                <span className="line-through text-gray-500">
                                    {product.Price} ج.م
                                </span>
                                <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
                                    -{product.discountPercentage}%
                                </span>
                            </>
                        ) : (
                            <span className="text-indigo-600 font-bold text-3xl">
                                {product.currentPrice} ج.م
                            </span>
                        )}
                    </div>

                    {/* العروض */}
                    {product.offers?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {product.offers.map((offer) => (
                                <span
                                    key={offer._id}
                                    className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    <Tag size={14} />
                                    {i18n.language === "ar" ? offer.name_ar : offer.name_en}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* الوصف */}
                    <p className="text-gray-700 leading-relaxed">
                        {i18n.language === "ar"
                            ? product.description_ar
                            : product.description_en}
                    </p>

                    {/* المقاسات */}
                    {product.sizes?.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2 text-gray-800">
                                {i18n.language === "ar" ? "المقاسات" : "Sizes"}
                            </h4>
                            <div className="flex gap-2 flex-wrap">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-lg border transition ${selectedSize === size
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "border-gray-300 hover:border-indigo-600"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* التقييم */}
                    {renderStars(
                        product.ratingStats?.averageRating || 0,
                        product.ratingStats?.totalRatings || 0
                    )}

                    {/* زر الإضافة للسلة */}
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition flex items-center gap-2 w-full md:w-auto">
                        <ShoppingCart size={18} />
                        {i18n.language === "ar" ? "أضف إلى السلة" : "Add to Cart"}
                    </button>
                </div>
            </div>

            {/* التعليقات */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
                {/* نموذج */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        {i18n.language === "ar" ? "أضف تعليقك" : "Add your review"}
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <textarea
                            {...register("comment", { required: "يرجى كتابة تعليقك" })}
                            placeholder={
                                i18n.language === "ar"
                                    ? "اكتب تعليقك هنا..."
                                    : "Write your review..."
                            }
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.comment && (
                            <p className="text-red-500 text-sm">{errors.comment.message}</p>
                        )}
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            {i18n.language === "ar" ? "إرسال" : "Submit"}
                        </button>
                    </form>
                </div>

                {/* التعليقات */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        {i18n.language === "ar" ? "التقييمات" : "Reviews"}
                    </h3>
                    {product.reviews?.length > 0 ? (
                        <ul className="space-y-4">
                            {product.reviews.map((rev, i) => (
                                <li
                                    key={i}
                                    className="border-b pb-3 flex flex-col gap-1 last:border-none"
                                >
                                    <p className="font-bold text-indigo-700">
                                        {rev.user || "مستخدم"}
                                    </p>
                                    <p className="text-gray-700">{rev.comment || "..."}</p>
                                    <span className="text-xs text-gray-400">
                                        {new Date(rev.createdAt).toLocaleDateString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-sm">
                            {i18n.language === "ar"
                                ? "لا توجد تعليقات بعد"
                                : "No reviews yet"}
                        </p>
                    )}
                </div>
            </div>

            {/* المنتجات المشابهة */}
            {relatedProducts.length > 0 && (
                <div className="mt-16">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">
                        {i18n.language === "ar" ? "منتجات مشابهة" : "Related Products"}
                    </h3>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={16}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 2 }, // sm
                            768: { slidesPerView: 3 }, // md
                            1024: { slidesPerView: 4 }, // lg
                        }}
                        navigation
                        // pagination={{ clickable: true }}
                        className="pb-10"
                    >
                        {relatedProducts.map((item) => (
                            <SwiperSlide key={item._id}>
                                <Link
                                    to={`/product/${item._id}`}
                                    className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={item.images?.[0]?.secure_url}
                                            alt={i18n.language === "ar" ? item.name_ar : item.name_en}
                                            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                                    </div>

                                    <div className="p-4 flex flex-col gap-2 flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                            {item.name_ar}
                                        </h3>

                                        {/* السعر */}
                                        <div className="flex items-center gap-3">
                                            {item.discountPercentage > 0 ? (
                                                <>
                                                    <span className="text-red-600 font-bold text-3xl">
                                                        {item.currentPrice} ج.م
                                                    </span>
                                                    <span className="line-through text-gray-500">
                                                        {item.Price} ج.م
                                                    </span>
                                                    <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
                                                        -{item.discountPercentage}%
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-indigo-600 font-bold text-3xl">
                                                    {item.currentPrice} ج.م
                                                </span>
                                            )}
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
