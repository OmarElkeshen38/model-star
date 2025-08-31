import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { getCategories } from '../../Admin/AdminCategories/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function CategoriesSlider() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: categories } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const goToCategory = (catId) => {
        navigate(`/products?category=${catId}&page=1`);
    };

    return (
        <section className="py-20 bg-gradient-to-b from-indigo-50 via-white to-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-12">
                    {t("home.browseCategories", "Browse Categories")}
                </h2>

                <Swiper
                    key={i18n.language}
                    dir={i18n.dir()}
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={2}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    navigation
                    // pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 6 },
                    }}
                >
                    {categories.map((cat) => (
                        <SwiperSlide key={cat._id}>
                            <div
                                onClick={() => goToCategory(cat._id)}
                                className="cursor-pointer group p-6 rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 text-center"
                            >
                                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-indigo-100 shadow-md group-hover:scale-105 transition-transform duration-500">
                                    <img
                                        src={cat.icon.secure_url}
                                        alt={cat.name_ar}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />
                                </div>
                                <h3 className="mt-5 text-gray-800 font-semibold text-lg group-hover:text-indigo-700 transition-colors">
                                    {i18n.language === "ar" ? cat.name_ar : cat.name_en}
                                </h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default CategoriesSlider;
