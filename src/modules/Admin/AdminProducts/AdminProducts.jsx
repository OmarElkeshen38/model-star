import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./productSlice";
import Pagination from "../../Shared/Pagination/Pagination";
// import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    price: "",
    category: "",
    sizes: "",
    images: "",
  });

  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(getProducts({ page: 1, limit: 20 }));
  }, [dispatch]);

  const totalPages = Math.ceil(products.length / limit);
  const startIndex = (page - 1) * limit;
  const currentProducts = products.slice(startIndex, startIndex + limit);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name_ar: product.name_ar,
        name_en: product.name_en,
        description_ar: product.description_ar,
        description_en: product.description_en,
        price: product.price,
        category: product.category?._id || "",
        sizes: product.sizes.join(", "),
        images: product.images?.map((img) => img.url).join(", "),
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name_ar: "",
        name_en: "",
        description_ar: "",
        description_en: "",
        price: "",
        category: "",
        sizes: "",
        images: "",
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    const payload = {
      ...formData,
      price: Number(formData.price),
      sizes: formData.sizes.split(",").map((s) => s.trim()),
      images: formData.images.split(",").map((url) => ({ url })),
    };

    if (editingProduct) {
      setShowUpdateConfirm(true); // أولاً يظهر كونفرميشن
    } else {
      dispatch(addProduct(payload));
      setShowModal(false);
    }
  };

  const confirmUpdate = () => {
    const payload = {
      ...formData,
      price: Number(formData.price),
      sizes: formData.sizes.split(",").map((s) => s.trim()),
      images: formData.images.split(",").map((url) => ({ url })),
    };

    dispatch(updateProduct({ id: editingProduct.id, data: payload }));
    setShowUpdateConfirm(false);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(deleteId));
    setShowDeleteModal(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          🛍️ إدارة المنتجات
        </h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
        >
          {/* <FiPlus /> إضافة منتج */}
        </button>
      </div>

      {loading && <p className="text-gray-600">⏳ جاري التحميل...</p>}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">الصورة</th>
              <th className="p-3">الاسم</th>
              <th className="p-3">السعر</th>
              <th className="p-3">الفئة</th>
              <th className="p-3">المقاسات</th>
              <th className="p-3 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, idx) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 transition text-center"
              >
                <td className="p-3">{startIndex + idx + 1}</td>
                <td className="p-3 flex justify-center">
                  <img
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={product.name_en}
                    className="w-14 h-14 object-cover rounded-md shadow-sm"
                  />
                </td>
                <td className="p-3 font-medium text-gray-800">
                  {product.name_ar} <br />
                  <span className="text-xs text-gray-500">
                    {product.name_en}
                  </span>
                </td>
                <td className="p-3 font-semibold text-green-600">
                  {product.price} ج.م
                </td>
                <td className="p-3 text-gray-600">
                  {product.category?.name_ar}
                </td>
                <td className="p-3 text-gray-600">
                  {product.sizes.join(", ")}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow transition"
                  >
                    {/* <FiEdit /> */}
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition"
                  >
                    {/* <FiTrash2 /> */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </div>

      {/* Overlay */}
      {(showModal || showDeleteModal || showUpdateConfirm) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 animate-fade-in-up w-[420px]">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editingProduct ? "✏️ تعديل منتج" : "➕ إضافة منتج"}
            </h2>
            <div className="space-y-3">
              {[
                { name: "name_ar", label: "الاسم (عربي)" },
                { name: "name_en", label: "الاسم (English)" },
                { name: "description_ar", label: "الوصف (عربي)" },
                { name: "description_en", label: "الوصف (English)" },
                { name: "price", label: "السعر" },
                { name: "category", label: "الفئة (ID)" },
                { name: "sizes", label: "المقاسات (مفصولة بفواصل)" },
                { name: "images", label: "الصور (روابط مفصولة بفواصل)" },
              ].map((field) => (
                <input
                  key={field.name}
                  type="text"
                  placeholder={field.label}
                  value={formData[field.name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                />
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 animate-fade-in-up w-[400px]">
            <p className="text-gray-800 font-medium mb-4">
              ⚠️ هل أنت متأكد من حذف هذا المنتج؟
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition"
              >
                نعم
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Confirm Modal */}
      {showUpdateConfirm && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 animate-fade-in-up w-[400px]">
            <p className="text-gray-800 font-medium mb-4">
              ⚠️ هل تريد حفظ التعديلات على هذا المنتج؟
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmUpdate}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
              >
                نعم، احفظ
              </button>
              <button
                onClick={() => setShowUpdateConfirm(false)}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
