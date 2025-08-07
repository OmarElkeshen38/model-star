import React, { useEffect, useMemo, useState } from 'react';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';
import { CATEGORIES_URLS, PRODUCTS_URLS, publicAxiosInstance } from '../../../Services/Urls/Urls';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ModalConfirm from '../../Shared/ModalConfirm/ModalConfirm';

function AdminProducts() {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name_ar: '',
        description_ar: '',
        price: '',
        category: {
            id: 2,
            name_ar: "نسائي"
        },
        discount: '',
        sizes: '',
        colors: '',
        image: '',
    });

    const navigate = useNavigate();
    const { t } = useTranslation();

    const [searchQuery, setSearchQuery] = useState("");
    const [productsList, setProductsList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const getAllCategories = async () => {
        try {
            const response = await publicAxiosInstance.get(CATEGORIES_URLS.display);
            setCategories(response?.data?.data?.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getAllProducts = async () => {
        try {
            const response = await publicAxiosInstance.get(PRODUCTS_URLS.display);
            setProductsList(response?.data?.data?.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await publicAxiosInstance.delete(PRODUCTS_URLS.delete(id));
            getAllProducts();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllCategories();
        getAllProducts();
        setCurrentPage(1);
    }, [searchQuery]);

    const filteredProducts = useMemo(() => {
        return productsList.filter((product) =>
            product.name_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id.toString().includes(searchQuery)
        );
    }, [productsList, searchQuery]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-3">
                <h1 className="text-2xl font-bold text-gray-800">إدارة المنتجات</h1>

                <div className="flex align-items-center gap-2">
                    <div className="flex items-center justify-between mb-4">
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder="بحث بالاسم أو كود المنتج..."
                                className="w-full border border-gray-300 rounded-md py-2 pr-10 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            {/* أيقونة البحث */}
                            <Search className="absolute top-2.5 right-3 text-gray-400 w-5 h-5" />

                            {/* زر إعادة التعيين */}
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute top-2.5 left-3 text-gray-400 hover:text-gray-600 transition"
                                    title="إعادة تعيين البحث"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>


                    <button
                        className="relative inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 text-sm font-medium text-white shadow transition duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => {
                            setIsEditMode(false);
                            setNewProduct({
                                name: '',
                                description: '',
                                price: '',
                                discount: '',
                                sizes: '',
                                colors: '',
                                image: '',
                            });
                            setShowModal(true);
                        }}
                    >
                        <Plus size={16} className="-ml-1" />
                        <span>إضافة منتج</span>
                    </button>
                </div>
            </div>

            <p className="text-sm text-gray-500 m-0 p-0">
                عدد المنتجات: {filteredProducts.length}
            </p>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
                <table className="min-w-full text-sm text-right border-separate border-spacing-y-2">
                    <thead className="bg-gray-100 text-gray-800 text-sm uppercase tracking-wide">
                        <tr>
                            <th className="px-4 py-3">كود المنتج</th>
                            <th className="px-4 py-3">الصورة</th>
                            <th className="px-4 py-3">الاسم</th>
                            <th className="px-4 py-3">الوصف</th>
                            <th className="px-4 py-3">السعر</th>
                            <th className="px-4 py-3">المقاسات</th>
                            <th className="px-4 py-3">الألوان</th>
                            <th className="px-4 py-3">التصنيف</th>
                            <th className="px-4 py-3">التحكم</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="8" className="text-center py-10">
                                    <i className="fa-solid fa-spinner animate-spin text-indigo-600 text-4xl" />
                                </td>
                            </tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-gray-500">لا توجد نتائج مطابقة</td>
                            </tr>
                        ) : (
                            currentProducts.map((product) => (
                                <tr key={product.id} className="bg-white hover:bg-gray-50 transition border border-gray-100 rounded-lg">
                                    <td className="px-4 py-3 font-semibold text-gray-700">{product.id}</td>
                                    <td className="px-4 py-3">
                                        <img
                                            loading="lazy"
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 rounded-md object-cover shadow-sm hover:scale-105 transition-transform duration-200"
                                        />
                                    </td>
                                    <td className="px-4 py-3 max-w-[150px] truncate">{product.name_ar}</td>
                                    <td className="px-4 py-3 max-w-[200px] truncate text-gray-600">{product.description_ar}</td>
                                    <td className="px-4 py-3 text-indigo-700 font-semibold">{product.price}</td>
                                    <td className="px-4 py-3">{Array.isArray(product.sizes) ? product.sizes.join(', ') : '—'}</td>
                                    <td className="px-4 py-3">{Array.isArray(product.colors) ? product.colors.join(', ') : '—'}</td>
                                    <td className="px-4 py-3">
                                        {product.category?.name_ar || '—'}
                                    </td>
                                    <td className="px-4 py-3 flex gap-2 items-center">
                                        <button
                                            className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition"
                                            onClick={() => {
                                                setNewProduct({
                                                    id: product.id, // مهم للتحديث
                                                    name_ar: product.name_ar,
                                                    description_ar: product.description_ar,
                                                    price: product.price,
                                                    discount: product.discount,
                                                    sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
                                                    colors: Array.isArray(product.colors) ? product.colors.join(', ') : '',
                                                    image: product.image,
                                                    images: product.images || [],
                                                    category: product.category?.id || '', // هام للتصنيف
                                                });
                                                setIsEditMode(true);
                                                setShowModal(true);
                                            }}
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                                            onClick={() => {
                                                setProductToDelete(product.id);
                                                setShowDeleteModal(true);
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded border text-sm 
        ${currentPage === i + 1
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>


            {/* Confirm Delete Modal */}
            {showDeleteModal && (
                <ModalConfirm
                    onCancel={() => {
                        setShowDeleteModal(false);
                        setProductToDelete(null);
                    }}
                    onConfirm={() => {
                        deleteProduct(productToDelete);
                        setShowDeleteModal(false);
                        setProductToDelete(null);
                    }}
                />
            )}

            {/* Add / Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
                    <div className="bg-white w-full max-w-3xl rounded-xl p-8 animate-fadeInScale shadow-xl relative">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                            {isEditMode ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                        </h2>

                        {/* FORM FIELDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">اسم المنتج</label>
                                <input
                                    type="text"
                                    value={newProduct.name_ar}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">تصنيف المنتج</label>
                                <select
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                    className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">اختر تصنيفاً</option>

                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name_ar}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">السعر</label>
                                <input
                                    type="text"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">الخصم</label>
                                <input
                                    type="text"
                                    value={newProduct.discount}
                                    onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
                                    className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">المقاسات (افصل بينها بفاصلة)</label>
                                <input
                                    type="text"
                                    value={newProduct.sizes}
                                    onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value })}
                                    className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">الألوان (افصل بينها بفاصلة)</label>
                                <input
                                    type="text"
                                    value={newProduct.colors}
                                    onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value })}
                                    className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">صور المنتج</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files);
                                        const readers = files.map(file => {
                                            return new Promise((resolve) => {
                                                const reader = new FileReader();
                                                reader.onloadend = () => resolve(reader.result);
                                                reader.readAsDataURL(file);
                                            });
                                        });

                                        Promise.all(readers).then(images => {
                                            setNewProduct({ ...newProduct, image: images });
                                        });
                                    }}
                                    className="border border-gray-300 w-full rounded-lg px-4 py-2 bg-white focus:outline-none"
                                />
                                {Array.isArray(newProduct.image) && newProduct.image.length > 0 && (
                                    <div className="mt-2 flex gap-2 flex-wrap">
                                        {newProduct.image.map((img, idx) => (
                                            <img key={idx} src={img} alt="معاينة" className="w-24 h-24 object-cover rounded border" />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm text-gray-600 mb-1">وصف المنتج</label>
                                <textarea
                                    rows="4"
                                    value={newProduct.description_ar}
                                    onChange={(e) => setNewProduct({ ...newProduct, description_ar: e.target.value })}
                                    className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        {/* FORM ACTIONS */}
                        <div className="flex justify-end mt-8 gap-4">
                            <button
                                className="px-5 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
                                onClick={() => setShowModal(false)}
                            >
                                إلغاء
                            </button>
                            <button
                                className="px-6 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition"
                                onClick={() => {
                                    console.log('تم حفظ المنتج:', newProduct);
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
