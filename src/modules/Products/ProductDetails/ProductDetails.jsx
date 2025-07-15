import React from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

function ProductDetails() {

    const { id } = useParams();

    const product = {
        id,
        name: "حذاء رياضي مميز",
        price: "749 ج.م",
        description: "حذاء رياضي عصري بتصميم مريح وجودة عالية، مناسب لجميع المناسبات.",
        image: "https://via.placeholder.com/600x400", // غيّر دي بصورتك
    };

    return (
        <div className="container mx-auto px-4 py-16 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8">
                {/* صورة المنتج */}
                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto rounded-lg shadow"
                    />
                </div>

                {/* تفاصيل المنتج */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    <p className="text-indigo-600 text-xl font-semibold">{product.price}</p>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>

                    <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition text-sm">
                        <ShoppingCart size={18} />
                        أضف إلى السلة
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
