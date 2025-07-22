import React, { useState } from 'react';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';
import shoseImg from '../../../assets/shoice.jpg';

function AdminProducts() {

    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        discount: '',
        sizes: '',
        colors: '',
        image: '',
    });

    const initialProducts = [
        {
            id: 1,
            name: 'حذاء رياضي أبيض',
            description: 'حذاء مريح مناسب للرياضة والمشي اليومي.',
            price: '749 ج.م',
            discount: '10%',
            sizes: ['39', '40', '41', '42'],
            colors: ['أبيض', 'رمادي'],
            image: shoseImg,
        },
        {
            id: 2,
            name: 'عباية خليجية سوداء',
            description: 'عباية أنيقة بتصميم واسع ونسيج فاخر.',
            price: '950 ج.م',
            discount: '15%',
            sizes: ['S', 'M', 'L'],
            colors: ['أسود'],
            image: shoseImg,
        },
        {
            id: 3,
            name: 'حقيبة يد جلدية',
            description: 'حقيبة يد مصنوعة من الجلد الطبيعي بتصميم عصري.',
            price: '620 ج.م',
            discount: '5%',
            sizes: [],
            colors: ['بني', 'أسود'],
            image: shoseImg,
        },
        {
            id: 4,
            name: 'فستان سهرة أحمر',
            description: 'فستان أنيق مثالي للمناسبات والسهرات.',
            price: '1200 ج.م',
            discount: '20%',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['أحمر'],
            image: shoseImg,
        },
        {
            id: 5,
            name: 'تيشيرت قطني أبيض',
            description: 'تيشيرت مريح مصنوع من القطن 100%.',
            price: '199 ج.م',
            discount: '10%',
            sizes: ['M', 'L', 'XL'],
            colors: ['أبيض'],
            image: shoseImg,
        },
        {
            id: 6,
            name: 'بنطلون جينز رجالي',
            description: 'بنطلون جينز بقصة ضيقة وعصرية.',
            price: '349 ج.م',
            discount: '12%',
            sizes: ['32', '34', '36'],
            colors: ['أزرق'],
            image: shoseImg,
        },
        {
            id: 7,
            name: 'عباية رمادية بكم واسع',
            description: 'عباية ناعمة بتصميم مريح وأنيق.',
            price: '890 ج.م',
            discount: '18%',
            sizes: ['M', 'L', 'XL'],
            colors: ['رمادي'],
            image: shoseImg,
        },
        {
            id: 8,
            name: 'جاكيت شتوي مبطن',
            description: 'جاكيت دافئ مناسب لأيام الشتاء الباردة.',
            price: '670 ج.م',
            discount: '25%',
            sizes: ['M', 'L', 'XL', 'XXL'],
            colors: ['أسود', 'زيتي'],
            image: shoseImg,
        },
        {
            id: 9,
            name: 'شال نسائي مطرز',
            description: 'شال أنيق بتطريز يدوي.',
            price: '150 ج.م',
            discount: '8%',
            sizes: [],
            colors: ['كحلي', 'بيج'],
            image: shoseImg,
        },
        {
            id: 10,
            name: 'قميص كلاسيك رجالي',
            description: 'قميص بأكمام طويلة مناسب للعمل والمناسبات الرسمية.',
            price: '320 ج.م',
            discount: '10%',
            sizes: ['M', 'L', 'XL'],
            colors: ['أبيض', 'رمادي'],
            image: shoseImg,
        },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const filteredProducts = initialProducts.filter(
        (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id.toString().includes(searchQuery)
    );

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">إدارة المنتجات</h1>

                <div className="flex gap-2">
                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="بحث بالاسم أو كود المنتج..."
                            className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center hover:bg-indigo-700 transition"
                        onClick={() => {
                            setIsEditMode(false);
                            setNewProduct({ name: '', description: '', price: '', discount: '', sizes: '', colors: '', image: '' });
                            setShowModal(true);
                        }}>
                        <Plus size={18} className="mr-2" />
                        إضافة منتج
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full text-sm text-right">
                    <thead className="bg-gray-100 text-gray-800">
                        <tr>
                            <th className="px-4 py-3">كود المنتج</th>
                            <th className="px-4 py-3">الصورة</th>
                            <th className="px-4 py-3">الاسم</th>
                            <th className="px-4 py-3">الوصف</th>
                            <th className="px-4 py-3">السعر</th>
                            <th className="px-4 py-3">الخصم</th>
                            <th className="px-4 py-3">المقاسات</th>
                            <th className="px-4 py-3">الألوان</th>
                            <th className="px-4 py-3">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <tr key={product.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-3 font-semibold text-gray-700">{product.id}</td>
                                    <td className="px-4 py-3">
                                        <img src={product.image} alt={product.name} className="w-16 h-16 rounded object-cover" />
                                    </td>
                                    <td className="px-4 py-3">{product.name}</td>
                                    <td className="px-4 py-3">{product.description}</td>
                                    <td className="px-4 py-3 text-indigo-700 font-semibold">{product.price}</td>
                                    <td className="px-4 py-3 text-green-600 font-semibold">{product.discount}</td>
                                    <td className="px-4 py-3">{product.sizes.join(', ')}</td>
                                    <td className="px-4 py-3">{product.colors.join(', ')}</td>

                                    <td className="px-4 py-6 flex gap-3">
                                        <button
                                            className="text-blue-600 hover:underline flex items-center gap-1"
                                            onClick={() => {
                                                setNewProduct({
                                                    name: product.name,
                                                    description: product.description,
                                                    price: product.price,
                                                    discount: product.discount,
                                                    sizes: product.sizes.join(', '),
                                                    colors: product.colors.join(', '),
                                                    image: product.image,
                                                });
                                                setIsEditMode(true);
                                                setShowModal(true);
                                            }}
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button className="text-red-600 hover:underline">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-6 text-gray-500">
                                    لا توجد منتجات مطابقة للبحث.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all">
                    <div
                        className="bg-white w-full max-w-2xl rounded-lg p-6 transform animate-fadeInScale shadow-lg relative"
                    >
                        <h2 className="text-xl font-bold mb-4">
                            {isEditMode ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                        </h2>

                        {/* Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="اسم المنتج"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="السعر"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="الخصم"
                                value={newProduct.discount}
                                onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="المقاسات (مفصولة بفاصلة)"
                                value={newProduct.sizes}
                                onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="الألوان (مفصولة بفاصلة)"
                                value={newProduct.colors}
                                onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="رابط صورة المنتج"
                                value={newProduct.image}
                                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <textarea
                                placeholder="وصف المنتج"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                className="border p-2 rounded col-span-full"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end mt-6 gap-3">
                            <button
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                onClick={() => setShowModal(false)}
                            >
                                إلغاء
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
                                onClick={() => {
                                    // هنا ممكن تضيف منطق الحفظ في قاعدة البيانات أو تحديث القائمة
                                    console.log('المنتج الجديد:', newProduct);
                                    setShowModal(false);
                                }}
                            >
                                {isEditMode ? 'تحديث' : 'حفظ'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminProducts;
