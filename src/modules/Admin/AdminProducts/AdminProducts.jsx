import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./productSlice";
import Pagination from "../../Shared/Pagination/Pagination";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import ModalConfirm from "../../Shared/ModalConfirm/ModalConfirm";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // جلب المنتجات
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const totalPages = Math.ceil(products.length / limit);
  const startIndex = (page - 1) * limit;
  const currentProducts = products.slice(startIndex, startIndex + limit);

  // فتح المودال (إضافة/تعديل)
  const handleOpenModal = (product = null) => {
    if (product) {
      setIsEditMode(true);
      setEditingProduct(product);
      setValue("name_ar", product.name_ar);
      setValue("name_en", product.name_en);
      setValue("description_ar", product.description_ar);
      setValue("description_en", product.description_en);
      setValue("price", product.price);
      setValue("category", product.category?._id || "");
      setValue("sizes", product.sizes.join(", "));
      setValue("image", product.image?.map((img) => img.url).join(", "));
    } else {
      setIsEditMode(false);
      setEditingProduct(null);
      reset();
    }
    setShowModal(true);
  };

  // حفظ المنتج (إضافة أو تعديل)
  const onSubmit = (data) => {
    const payload = {
      ...data,
      price: Number(data.price),
      image: data.image && data.image.length > 0 ? Array.from(data.image) : [],
    };

    if (isEditMode && editingProduct) {
      dispatch(updateProduct({ id: editingProduct._id, data }))
        .unwrap()
        .then(() => {
          dispatch(getProducts({ page: 1, limit: 20 }));
          toast.success("تم تحديث المنتج بنجاح");
          setShowModal(false);
        })
        .catch(() => toast.error("حدث خطأ أثناء التحديث"));
    } else {
      dispatch(addProduct(payload))
        .unwrap()
        .then(() => {
          toast.success("تم إضافة المنتج بنجاح");
          setShowModal(false);
        })
        .catch(() => toast.error("حدث خطأ أثناء الإضافة"));
    }
  };

  // حذف المنتج
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(deleteId))
      .unwrap()
      .then(() => toast.success("تم حذف المنتج"))
      .catch(() => toast.error("حدث خطأ أثناء الحذف"));
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
          <FiPlus /> إضافة منتج
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
                key={product._id}
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
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition"
                  >
                    <FiTrash2 />
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
      {(showModal || showDeleteModal) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "تعديل المنتج" : "إضافة منتج جديد"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="name_ar" className="mb-1 text-sm font-semibold text-indigo-600">اسم المنتج (عربي)</label>
                <input
                  id="name_ar"
                  {...register("name_ar", { required: true })}
                  placeholder="اسم المنتج (عربي)"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="name_en" className="mb-1 text-sm font-semibold text-indigo-600">اسم المنتج (انجليزي)</label>
                <input
                  id="name_en"
                  {...register("name_en", { required: true })}
                  placeholder="اسم المنتج (انجليزي)"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="price" className="mb-1 text-sm font-semibold text-indigo-600">السعر</label>
                <input
                  id="price"
                  type="number"
                  {...register("price", { required: true })}
                  placeholder="السعر"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="category" className="mb-1 text-sm font-semibold text-indigo-600">الفئة (ID)</label>
                <input
                  id="category"
                  {...register("category")}
                  placeholder="الفئة (ID)"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="sizes" className="mb-1 text-sm font-semibold text-indigo-600">المقاسات (مفصولة بفاصلة)</label>
                <input
                  id="sizes"
                  {...register("sizes")}
                  placeholder="المقاسات (مفصولة بفاصلة)"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col col-span-full">
                <label htmlFor="image" className="mb-1 text-sm font-semibold text-indigo-600">صور المنتج</label>
                <input
                  type="file"
                  id="image"
                  {...register("image")}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col col-span-full">
                <label htmlFor="description_ar" className="mb-1 text-sm font-semibold text-indigo-600">الوصف بالعربي</label>
                <textarea
                  id="description_ar"
                  {...register("description_ar")}
                  placeholder="الوصف بالعربي"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col col-span-full">
                <label htmlFor="description_en" className="mb-1 text-sm font-semibold text-indigo-600">الوصف بالانجليزي</label>
                <textarea
                  id="description_en"
                  {...register("description_en")}
                  placeholder="الوصف بالانجليزي"
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end mt-4 gap-3 col-span-full">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                >
                  {isEditMode ? "تحديث" : "حفظ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <ModalConfirm
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
