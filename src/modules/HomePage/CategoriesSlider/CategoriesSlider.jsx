import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";

import shoiceImg from '../../../assets/categories/menn.jpg';
import mennImg from '../../../assets/categories/menn.jpg';
import womenImg from '../../../assets/categories/women.jpg';
import sunglasessImg from '../../../assets/categories/sunglasess.jpg';
import watchsImg from '../../../assets/categories/watchs.png';
import shoesImg from '../../../assets/categories/shoes.png';

function CategoriesSlider() {
    const { t, i18n } = useTranslation();

    const categories = [
        { id: 1, name: t("categories.shoes"), image: shoesImg },
        { id: 3, name: t("categories.watches"), image: watchsImg },
        { id: 4, name: t("categories.sunglasses"), image: sunglasessImg },
        { id: 5, name: t("categories.electronics"), image: shoiceImg },
        { id: 6, name: t("categories.mens-clothing"), image: mennImg },
        { id: 7, name: t("categories.womens-clothing"), image: womenImg },
    ];

    return (
        <section className="py-20 bg-gray-50">
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
                        <SwiperSlide key={cat.id}>
                            <div className="bg-white cursor-pointer rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105 p-4 text-center animate-fade-in-up">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-56 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-gray-800 font-semibold text-lg">{cat.name}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default CategoriesSlider;
