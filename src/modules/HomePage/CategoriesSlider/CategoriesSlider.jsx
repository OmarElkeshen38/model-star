import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { getCategories } from '../../Admin/AdminCategories/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CategoriesSlider() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: categories, loading } = useSelector((state) => state.categories);

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
                    rtl={i18n.dir() === 'rtl'}
                    dir={i18n.dir()}
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={2}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                    }}
                >
                    {categories.map((cat) => (
                        <SwiperSlide key={cat._id}>
                            <div
                                onClick={() => goToCategory(cat._id)}
                                className="bg-white cursor-pointer rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105 p-4 text-center animate-fade-in-up"
                            >
                                <img
                                    src={cat.icon.secure_url}
                                    alt={cat.name_ar}
                                    className="w-full h-56 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-gray-800 font-semibold text-lg">
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
