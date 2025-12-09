import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
} from "./categorySlice";
import Pagination from "../../Shared/Pagination/Pagination";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import ModalConfirm from "../../Shared/ModalConfirm/ModalConfirm";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../../Shared/Loading/Loading";

/**
 * AdminCategories — Updated to Chic Teal palette (inline)
 * - RTL support
 * - Accessible modal + aria attributes
 * - Icon/image preview
 * - Prevent background scroll while modal open
 * - Hooks to add/update/delete categories (dispatch)
 */

export default function AdminCategories() {
    const dispatch = useDispatch();
    const { items: categories = [], loading } = useSelector(
        (state) => state.categories || {}
    );

    // Chic Teal palette
    const COLORS = {
        primary: "#0B132B",
        accent: "#06B6D4",
        accentDark: "#0585A3",
        muted: "#6B7280",
        danger: "#EF4444",
        softBg: "#F8FAFC",
    };

    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [page, setPage] = useState(1);
    const limit = 8;

    const fileRef = useRef(null);
    const [iconPreview, setIconPreview] = useState(null);

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
            icon: null,
        },
    });

    // fetch categories on mount
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    // prevent background scroll while modals open
    useEffect(() => {
        if (showModal || showDeleteModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => (document.body.style.overflow = "");
    }, [showModal, showDeleteModal]);

    const totalPages = Math.max(1, Math.ceil(categories.length / limit));
    const startIndex = (page - 1) * limit;
    const currentCategories = categories.slice(startIndex, startIndex + limit);

    // open modal for add or edit
    const handleOpenModal = (category = null) => {
        setIconPreview(null);
        if (category) {
            setIsEditMode(true);
            setEditingCategory(category);
            setValue("name_ar", category.name_ar || "");
            setValue("name_en", category.name_en || "");
            // preview icon if exists
            const url = category.icon?.secure_url || category.icon?.url || null;
            if (url) setIconPreview(url);
        } else {
            setIsEditMode(false);
            setEditingCategory(null);
            reset();
        }
        setShowModal(true);
    };

    // preview icon file
    const handleIconChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            setIconPreview(null);
            setValue("icon", null);
            return;
        }
        const url = URL.createObjectURL(file);
        setIconPreview(url);
        setValue("icon", file); // keep file in form state
    };

    // submit add/update
    const onSubmit = async (data) => {
        // basic validation
        if (!data.name_ar?.trim() || !data.name_en?.trim()) {
            toast.error("الرجاء إدخال اسم الصنف بالعربي والإنجليزي");
            return;
        }

        // prepare payload: if icon is File => send as FormData in slice/backend
        try {
            if (isEditMode && editingCategory) {
                const payload = {
                    id: editingCategory._id,
                    data: {
                        name_ar: data.name_ar,
                        name_en: data.name_en,
                    },
                };
                // attach file if present
                if (data.icon instanceof File) payload.data.iconFile = data.icon;
                await dispatch(updateCategory(payload)).unwrap();
                toast.success("تم تحديث الصنف بنجاح");
            } else {
                const payload = {
                    name_ar: data.name_ar,
                    name_en: data.name_en,
                };
                if (data.icon instanceof File) payload.iconFile = data.icon;
                await dispatch(addCategory(payload)).unwrap();
                toast.success("تم إضافة الصنف بنجاح");
            }

            // refresh and close
            dispatch(getCategories());
            setShowModal(false);
            reset();
            setIconPreview(null);
        } catch (err) {
            console.error("category submit error:", err);
            toast.error("حدث خطأ أثناء الحفظ");
        }
    };

    // delete flow
    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await dispatch(deleteCategory(deleteId)).unwrap();
            toast.success("تم حذف الصنف");
            dispatch(getCategories());
        } catch (err) {
            console.error("delete error:", err);
            toast.error("حدث خطأ أثناء الحذف");
        } finally {
            setShowDeleteModal(false);
        }
    };

    return (
        <div
            className="p-6 min-h-screen"
            dir="rtl"
            style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #FFFFFF)` }}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold flex items-center gap-3" style={{ color: COLORS.primary }}>
                    <span>📂</span> <span>إدارة الأصناف</span>
                </h1>

                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 rounded-md shadow"
                    style={{ background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`, color: "#fff" }}
                    aria-label="إضافة صنف"
                >
                    <FiPlus />
                    إضافة صنف
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                {loading ? (
                    <div className="p-8">
                        <Loading />
                    </div>
                ) : (
                    <>
                        <table className="w-full border-collapse text-sm" role="table" aria-label="قائمة الأصناف">
                            <thead className="bg-gray-100 text-gray-700 text-center">
                                <tr>
                                    <th className="p-3">#</th>
                                    <th className="p-3">الأيقونة</th>
                                    <th className="p-3 text-right">الاسم (AR)</th>
                                    <th className="p-3">الاسم (EN)</th>
                                    <th className="p-3">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCategories.map((cat, idx) => (
                                    <tr key={cat._id} className="border-t hover:bg-gray-50 transition" role="row">
                                        <td className="p-3 text-center">{startIndex + idx + 1}</td>
                                        <td className="p-3 flex justify-center">
                                            <img
                                                src={cat.icon?.secure_url || cat.icon?.url || "/placeholder.png"}
                                                alt={cat.name_en || cat.name_ar}
                                                className="w-14 h-14 object-cover rounded-md shadow-sm"
                                            />
                                        </td>
                                        <td className="p-3 text-right font-semibold" style={{ color: COLORS.primary }}>{cat.name_ar}</td>
                                        <td className="p-3 text-center" style={{ color: COLORS.muted }}>{cat.name_en}</td>
                                        <td className="p-3 flex justify-center gap-3">
                                            <button
                                                onClick={() => handleOpenModal(cat)}
                                                className="p-2 rounded-md shadow"
                                                style={{ background: "#EEF2FF", color: COLORS.primary }}
                                                aria-label={`تعديل ${cat.name_ar}`}
                                                title="تعديل"
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cat._id)}
                                                className="p-2 rounded-md shadow"
                                                style={{ background: "#FEF2F2", color: COLORS.danger }}
                                                aria-label={`حذف ${cat.name_ar}`}
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

            {/* Add / Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
                    <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg relative">
                        <header className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold" style={{ color: COLORS.primary }}>
                                {isEditMode ? "تعديل الصنف" : "إضافة صنف جديد"}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setEditingCategory(null);
                                    setIconPreview(null);
                                    reset();
                                }}
                                aria-label="إغلاق"
                                className="p-1 rounded-md"
                            >
                                ✕
                            </button>
                        </header>

                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
                            <div>
                                <label className="mb-1 text-sm font-semibold" style={{ color: COLORS.primary }}>
                                    الاسم بالعربي *
                                </label>
                                <input
                                    {...register("name_ar", { required: "الاسم بالعربي مطلوب" })}
                                    placeholder="مثال: عباية"
                                    className="w-full border rounded px-3 py-2 focus:outline-none"
                                />
                                {errors.name_ar && <p className="text-sm mt-1" style={{ color: COLORS.danger }}>{errors.name_ar.message}</p>}
                            </div>

                            <div>
                                <label className="mb-1 text-sm font-semibold" style={{ color: COLORS.primary }}>
                                    الاسم بالانجليزي *
                                </label>
                                <input
                                    {...register("name_en", { required: "الاسم بالانجليزي مطلوب" })}
                                    placeholder="Example: Abaya"
                                    className="w-full border rounded px-3 py-2 focus:outline-none"
                                />
                                {errors.name_en && <p className="text-sm mt-1" style={{ color: COLORS.danger }}>{errors.name_en.message}</p>}
                            </div>

                            <div>
                                <label className="mb-1 text-sm font-semibold" style={{ color: COLORS.primary }}>
                                    أيقونة / صورة الصنف
                                </label>
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleIconChange}
                                    className="w-full border rounded px-3 py-2 focus:outline-none"
                                />
                                {iconPreview && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500 mb-1">معاينة:</p>
                                        <img src={iconPreview} alt="preview" className="w-20 h-20 object-cover rounded" />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 mt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingCategory(null);
                                        setIconPreview(null);
                                        reset();
                                    }}
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

            {/* Delete Confirm */}
            {showDeleteModal && (
                <ModalConfirm
                    title="تأكيد الحذف"
                    description="هل أنت متأكد أنّك تريد حذف هذا الصنف؟ لن يمكن التراجع عن ذلك."
                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
}
