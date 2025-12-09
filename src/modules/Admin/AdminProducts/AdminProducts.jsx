import React, { useEffect, useState, useRef } from "react";
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
import Loading from "../../Shared/Loading/Loading";

/**
 * AdminProducts (updated)
 * - Chic Teal inline palette (no tailwind.config)
 * - Accessible modals, file preview, basic validation
 * - Prevent background scroll while modal open
 * - RTL-safe layout
 */

export default function AdminProducts() {
  const dispatch = useDispatch();
  const { items: products = [], loading } = useSelector((state) => state.products || {});

  // Chic Teal palette
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    danger: "#EF4444",
    softBg: "#F8FAFC",
    muted: "#6B7280",
  };

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 8;

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name_ar: "",
      name_en: "",
      price: "",
      category: "",
      sizes: "",
      description_ar: "",
      description_en: "",
      image: null,
    },
  });

  // جلب المنتجات
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // prevent background scroll when modal open
  useEffect(() => {
    if (showModal || showDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal, showDeleteModal]);

  const totalPages = Math.max(1, Math.ceil(products.length / limit));
  const startIndex = (page - 1) * limit;
  const currentProducts = products.slice(startIndex, startIndex + limit);

  // فتح المودال (إضافة/تعديل)
  const handleOpenModal = (product = null) => {
    setImagePreview(null);
    if (product) {
      setIsEditMode(true);
      setEditingProduct(product);
      setValue("name_ar", product.name_ar || "");
      setValue("name_en", product.name_en || "");
      setValue("description_ar", product.description_ar || "");
      setValue("description_en", product.description_en || "");
      setValue("price", product.price || "");
      setValue("category", product.category?._id || "");
      setValue("sizes", (product.sizes || []).join(", "));
      // preview first image if present
      const firstImg = product.images?.[0]?.url || product.images?.[0]?.secure_url;
      if (firstImg) setImagePreview(firstImg);
    } else {
      setIsEditMode(false);
      setEditingProduct(null);
      reset();
    }
    setShowModal(true);
  };

  // معالجة اختيار صورة (معاينة)
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    // keep file in form's value (we'll read from watch if needed)
    setValue("image", file);
  };

  // حفظ المنتج (إضافة أو تعديل)
  const onSubmit = async (data) => {
    // Basic validations
    if (!data.name_ar || !data.name_en || !data.price) {
      toast.error("الرجاء ملء الحقول الإلزامية (الاسم والسعر)");
      return;
    }

    // Prepare payload
    const payload = {
      name_ar: data.name_ar,
      name_en: data.name_en,
      description_ar: data.description_ar,
      description_en: data.description_en,
      price: Number(data.price),
      category: data.category || null,
      sizes: data.sizes ? data.sizes.split(",").map((s) => s.trim()) : [],
      // images: handle uploading files separately; here we pass a placeholder or file
    };

    try {
      if (isEditMode && editingProduct) {
        // if image file provided, attach it to data (implement upload in slice/backend)
        if (data.image instanceof File) payload.imageFile = data.image;
        await dispatch(updateProduct({ id: editingProduct._id, data: payload })).unwrap();
        toast.success("تم تحديث المنتج بنجاح");
        // refresh list
        dispatch(getProducts());
      } else {
        if (data.image instanceof File) payload.imageFile = data.image;
        await dispatch(addProduct(payload)).unwrap();
        toast.success("تم إضافة المنتج بنجاح");
        dispatch(getProducts());
      }
      setShowModal(false);
      reset();
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء حفظ المنتج");
    }
  };

  // حذف المنتج
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteProduct(deleteId)).unwrap();
      toast.success("تم حذف المنتج");
      dispatch(getProducts());
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء الحذف");
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="p-6 min-h-screen" dir="rtl" style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #FFFFFF)` }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold flex items-center gap-3" style={{ color: COLORS.primary }}>
          <span>🛍️</span> <span>إدارة المنتجات</span>
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 rounded-md shadow"
            style={{
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
              color: "#fff",
            }}
            aria-label="إضافة منتج"
          >
            <FiPlus />
            إضافة منتج
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        {loading ? (
          <div className="p-8"><Loading /></div>
        ) : (
          <>
            <table className="w-full border-collapse text-sm" role="table" aria-label="قائمة المنتجات">
              <thead className="bg-gray-100 text-gray-700 text-center">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">الصورة</th>
                  <th className="p-3 text-right">الاسم</th>
                  <th className="p-3">السعر</th>
                  <th className="p-3">الفئة</th>
                  <th className="p-3">المقاسات</th>
                  <th className="p-3 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, idx) => (
                  <tr key={product._id} className="border-t hover:bg-gray-50 transition" role="row">
                    <td className="p-3 text-center">{startIndex + idx + 1}</td>
                    <td className="p-3 flex justify-center">
                      <img
                        src={product.images?.[0]?.url || product.images?.[0]?.secure_url || "/placeholder.png"}
                        alt={product.name_en || product.name_ar}
                        className="w-14 h-14 object-cover rounded-md shadow-sm"
                      />
                    </td>
                    <td className="p-3 text-right">
                      <div className="font-semibold" style={{ color: COLORS.primary }}>{product.name_ar}</div>
                      <div className="text-xs text-gray-500">{product.name_en}</div>
                    </td>
                    <td className="p-3 text-center font-bold" style={{ color: "#16A34A" }}>
                      {product.price} ج.م
                    </td>
                    <td className="p-3 text-center">{product.category?.name_ar || "-"}</td>
                    <td className="p-3 text-center">{(product.sizes || []).join(", ")}</td>
                    <td className="p-3 flex justify-center gap-3">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="p-2 rounded-md shadow"
                        style={{ background: "#EEF2FF", color: COLORS.primary }}
                        aria-label={`تعديل ${product.name_ar}`}
                        title="تعديل"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 rounded-md shadow"
                        style={{ background: "#FEF2F2", color: COLORS.danger }}
                        aria-label={`حذف ${product.name_ar}`}
                        title="حذف"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-4">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
            </div>
          </>
        )}
      </div>

      {/* Overlay */}
      {(showModal || showDeleteModal) && <div className="fixed inset-0 bg-black/30 z-40"></div>}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 shadow-lg relative">
            <header className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: COLORS.primary }}>
                {isEditMode ? "تعديل المنتج" : "إضافة منتج جديد"}
              </h2>
              <button
                onClick={() => { setShowModal(false); setEditingProduct(null); setImagePreview(null); }}
                aria-label="إغلاق"
                className="p-1 rounded-md"
              >
                ✕
              </button>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4" noValidate>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold" style={{ color: COLORS.primary }}>اسم المنتج (عربي) *</label>
                <input
                  {...register("name_ar", { required: "مطلوب" })}
                  placeholder="اسم المنتج (عربي)"
                  className="border rounded px-3 py-2 focus:outline-none"
                />
                {errors.name_ar && <span className="text-sm text-red-500 mt-1">{errors.name_ar.message}</span>}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold" style={{ color: COLORS.primary }}>اسم المنتج (انجليزي) *</label>
                <input
                  {...register("name_en", { required: "مطلوب" })}
                  placeholder="اسم المنتج (انجليزي)"
                  className="border rounded px-3 py-2 focus:outline-none"
                />
                {errors.name_en && <span className="text-sm text-red-500 mt-1">{errors.name_en.message}</span>}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold" style={{ color: COLORS.primary }}>السعر *</label>
                <input
                  type="number"
                  {...register("price", { required: "مطلوب", valueAsNumber: true })}
                  placeholder="السعر"
                  className="border rounded px-3 py-2 focus:outline-none"
                />
                {errors.price && <span className="text-sm text-red-500 mt-1">{errors.price.message || "مطلوب"}</span>}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold" style={{ color: COLORS.primary }}>الفئة (ID)</label>
                <input
                  {...register("category")}
                  placeholder="الفئة (ID)"
                  className="border rounded px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold" style={{ color: COLORS.primary }}>المقاسات (مفصولة بفاصلة)</label>
                <input
                  {...register("sizes")}
                  placeholder="مثال: S, M, L"
                  className="border rounded px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="flex flex-col col-span-full">
                <label className="mb-1 text-sm font-semibold" style={{ color: COLORS.primary }}>صور المنتج</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border rounded px-3 py-2 focus:outline-none"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">معاينة:</p>
                    <img src={imagePreview} alt="preview" className="w-32 h-32 object-cover rounded" />
                  </div>
                )}
              </div>

              <div className="flex flex-col col-span-full">
                <label className="mb-1 text-sm font-semibold" style={{ color: COLORS.primary }}>الوصف بالعربي</label>
                <textarea
                  {...register("description_ar")}
                  placeholder="الوصف بالعربي"
                  className="border rounded px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="flex flex-col col-span-full">
                <label className="mb-1 text-sm font-semibold" style={{ color: COLORS.primary }}>الوصف بالانجليزي</label>
                <textarea
                  {...register("description_en")}
                  placeholder="الوصف بالانجليزي"
                  className="border rounded px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="flex justify-end mt-3 gap-3 col-span-full">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditingProduct(null); setImagePreview(null); reset(); }}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded text-white"
                  style={{
                    background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
                    opacity: isSubmitting ? 0.8 : 1,
                  }}
                >
                  {isEditMode ? "تحديث" : "حفظ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteModal && (
        <ModalConfirm
          title="تأكيد الحذف"
          description="هل أنت متأكد أنك تريد حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء."
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
