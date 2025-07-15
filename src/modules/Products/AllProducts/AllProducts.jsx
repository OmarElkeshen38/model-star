import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import shoseIng from '../../../assets/shoice.jpg';


const allProductsData = [
    { id: 1, name: 'حذاء رياضي', price: 599, category: 'shoes', image: shoseIng },
    { id: 2, name: 'حذاء رياضي', price: 599, category: 'shoes', image: shoseIng },
    { id: 4, name: 'ساعة رجالي', price: 399, category: 'watches', image: shoseIng },
    { id: 5, name: 'ساعة رجالي', price: 399, category: 'watches', image: shoseIng },
    { id: 6, name: 'ساعة رجالي', price: 399, category: 'watches', image: shoseIng },
    { id: 7, name: 'نظارات شمس', price: 199, category: 'sunglasses', image: shoseIng },
    { id: 8, name: 'نظارات شمس', price: 199, category: 'sunglasses', image: shoseIng },
    { id: 9, name: 'نظارات شمس', price: 199, category: 'sunglasses', image: shoseIng },
    { id: 10, name: 'نظارات شمس', price: 199, category: 'sunglasses', image: shoseIng },
    { id: 11, name: 'قميص رجالي', price: 349, category: 'mens-clothing', image: shoseIng },
    { id: 12, name: 'قميص رجالي', price: 349, category: 'mens-clothing', image: shoseIng },
    { id: 13, name: 'قميص رجالي', price: 349, category: 'mens-clothing', image: shoseIng },
    { id: 14, name: 'قميص رجالي', price: 349, category: 'mens-clothing', image: shoseIng },
    { id: 15, name: 'قميص رجالي', price: 349, category: 'mens-clothing', image: shoseIng },
];

const categories = [
    { key: 'all', labelAr: 'الكل', labelEn: 'All' },
    { key: 'shoes', labelAr: 'أحذية', labelEn: 'Shoes' },
    { key: 'watches', labelAr: 'ساعات', labelEn: 'Watches' },
    { key: 'sunglasses', labelAr: 'نظارات', labelEn: 'Sunglasses' },
    { key: 'mens-clothing', labelAr: 'ملابس رجالي', labelEn: "Men's Clothing" },
];

function AllProducts() {
    const { t, i18n } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts =
        selectedCategory === 'all'
            ? allProductsData
            : allProductsData.filter((p) => p.category === selectedCategory);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-indigo-700 my-10 text-center">
                {t('nav.products')}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Filter Sidebar */}
                <aside className="md:col-span-1">
                    <div className="bg-white p-5 shadow-lg rounded-xl border border-gray-100">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('nav.shop')}</h3>
                        <ul className="space-y-2">
                            {categories.map((cat) => (
                                <li key={cat.key}>
                                    <button
                                        onClick={() => setSelectedCategory(cat.key)}
                                        className={`w-full text-start px-4 py-2 rounded-md transition font-medium ${selectedCategory === cat.key
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-800 hover:bg-gray-100'
                                            }`}
                                    >
                                        {i18n.language === 'ar' ? cat.labelAr : cat.labelEn}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Products Grid */}
                <section className="md:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-52 object-cover"
                                />
                                <div className="p-5 text-center flex flex-col justify-between gap-2 flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-indigo-600 font-bold text-base">{product.price} ج.م</p>

                                    <div className="flex justify-center gap-3 mt-3">
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="text-sm text-indigo-600 hover:underline"
                                        >
                                            {t('home.featured.details')}
                                        </Link>

                                        <button
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
                                        >
                                            {t('nav.cart', 'أضف إلى السلة')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>

    );
}

export default AllProducts;
