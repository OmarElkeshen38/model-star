import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ShoppingCart, Star } from 'lucide-react';
import shoseImg from '../../../assets/shoice.jpg';

function ProductDetails() {
    const { id } = useParams();
    const { i18n } = useTranslation();

    const product = {
        id,
        name: "حذاء رياضي مميز",
        price: "749 ج.م",
        rating: 4.5,
        reviewsCount: 12,
        description: "حذاء رياضي عصري بتصميم مريح وجودة عالية، مناسب لجميع المناسبات.",
        image: shoseImg,
    };

    const reviews = [
        { user: "أحمد", comment: "منتج رائع وجودته ممتازة!" },
        { user: "سارة", comment: "التوصيل كان سريع والخدمة ممتازة." },
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        console.log("New Comment:", data.comment);
        reset();
    };

    const renderStars = (rating) => {
        const stars = Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={18}
                className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
                fill={i < Math.floor(rating) ? "currentColor" : "none"}
            />
        ));
        return (
            <div className="flex items-center gap-1">
                {stars}
                <span className="text-sm text-gray-600 ml-2">{product.reviewsCount} تقييم</span>
            </div>
        );
    };

    const relatedProducts = Array(6).fill().map((_, index) => ({
        id: index + 101,
        name: "حذاء رياضي",
        price: "699 ج.م",
        image: shoseImg
    }));

    return (
        <div className="container mx-auto px-4 pt-16 ">
            {/* تفاصيل المنتج */}
            <div className="my-16">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="w-full md:w-auto max-w-md mx-auto">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full rounded-lg shadow object-cover"
                        />
                    </div>

                    <div className="flex-1 space-y-5">
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-indigo-600 text-2xl font-semibold">{product.price}</p>
                        {renderStars(product.rating)}
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition">
                            <ShoppingCart size={18} className="inline mr-2" />
                            أضف إلى السلة
                        </button>
                    </div>
                </div>
            </div>

            <div className='bg-white grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-6 rounded-lg shadow'>
                {/* نموذج التعليق */}
                <div className="bg-white p-6 rounded-lg shadow mb-12">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">أضف تعليقك</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <textarea
                            {...register("comment", { required: "يرجى كتابة تعليقك" })}
                            placeholder="اكتب تعليقك هنا..."
                            rows={4}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.comment && (
                            <p className="text-red-500 text-sm">{errors.comment.message}</p>
                        )}
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                            إرسال التعليق
                        </button>
                    </form>
                </div>

                {/* التقييمات */}
                <div className="bg-white p-6 rounded-lg shadow mb-12">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">التقييمات</h2>
                    <ul className="space-y-4">
                        {reviews.map((rev, i) => (
                            <li key={i} className="border-b pb-3">
                                <p className="font-bold text-indigo-700">{rev.user}</p>
                                <p className="text-gray-700">{rev.comment}</p>
                            </li>
                        ))}
                    </ul>
                </div>


            </div>

            {/* سلايدر المنتجات المشابهة */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">منتجات مشابهة</h2>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={15}
                    slidesPerView={1}
                    navigation
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {relatedProducts.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 text-center h-full">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-48 object-cover rounded-md mb-3"
                                />
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                                <p className="text-indigo-600 font-bold">{item.price}</p>
                                <Link
                                    to={`/product/${item.id}`}
                                    className="inline-block mt-2 text-sm text-indigo-600 hover:underline"
                                >
                                    عرض التفاصيل
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default ProductDetails;
