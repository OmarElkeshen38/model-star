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
        { id: 1, name: i18n.language === "ar" ? "أحذية" : "Shoes", image: shoesImg },
        { id: 3, name: i18n.language === "ar" ? "ساعات" : "Watches", image: watchsImg },
        { id: 4, name: i18n.language === "ar" ? "نظارات" : "Sunglasses", image: sunglasessImg },
        { id: 5, name: i18n.language === "ar" ? "إلكترونيات" : "Electronics", image: shoiceImg },
        { id: 6, name: i18n.language === "ar" ? "ملابس رجالي" : "Men's Clothing", image: mennImg },
        { id: 7, name: i18n.language === "ar" ? "ملابس حريمي" : "Women's Clothing", image: womenImg },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">
                    {i18n.language === "ar" ? "تصفح الفئات" : "Browse Categories"}
                </h2>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={15}
                    slidesPerView={2}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
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
                            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 text-center">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-60 object-cover rounded-md mb-3"
                                />
                                <h3 className="font-semibold text-gray-800">{cat.name}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default CategoriesSlider
