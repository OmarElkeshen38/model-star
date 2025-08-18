import React, { useEffect, useState } from "react";
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

export default function AdminCategories() {
    const dispatch = useDispatch();
    const { items: categories, loading } = useSelector((state) => state.categories);

    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
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

    // جلب الأصناف
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const totalPages = Math.ceil(categories.length / limit);
    const startIndex = (page - 1) * limit;
    const currentCategories = categories.slice(startIndex, startIndex + limit);

    if (!categories || categories.length === 0) {
        return <p>لا يوجد تصنيفات</p>;
    }

    // فتح المودال (إضافة/تعديل)
    const handleOpenModal = (category = null) => {
        if (category) {
            setIsEditMode(true);
            setEditingCategory(category);
            setValue("name_ar", category.name_ar);
            setValue("name_en", category.name_en);
        } else {
            setIsEditMode(false);
            setEditingCategory(null);
            reset();
        }
        setShowModal(true);
    };

    // حفظ الصنف
    const onSubmit = (data) => {
        if (isEditMode && editingCategory) {
            dispatch(updateCategory({ id: editingCategory._id, data }))
                .unwrap()
                .then(() => {
                    dispatch(getCategories());
                    toast.success("تم تحديث الصنف بنجاح");
                    setShowModal(false);
                })
                .catch(() => toast.error("حدث خطأ أثناء التحديث"));
        } else {
            dispatch(addCategory(data))
                .unwrap()
                .then(() => {
                    toast.success("تم إضافة الصنف بنجاح");
                    setShowModal(false);
                })
                .catch(() => toast.error("حدث خطأ أثناء الإضافة"));
        }
    };

    // حذف الصنف
    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        dispatch(deleteCategory(deleteId))
            .unwrap()
            .then(() => toast.success("تم حذف الصنف"))
            .catch(() => toast.error("حدث خطأ أثناء الحذف"));
        setShowDeleteModal(false);
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
                    📂 إدارة الأصناف
                </h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
                >
                    <FiPlus /> إضافة صنف
                </button>
            </div>

            {loading && <p className="text-gray-600">⏳ جاري التحميل...</p>}

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-gray-100 text-gray-700 text-left">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">الاسم</th>
                            <th className="p-3">الاسم (EN)</th>
                            <th className="p-3 text-center">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCategories.map((category, idx) => (
                            <tr
                                key={category._id}
                                className="border-b hover:bg-gray-50 transition text-center"
                            >
                                <td className="p-3">{startIndex + idx + 1}</td>
                                <td className="p-3 font-medium text-gray-800">
                                    {category.name_ar}
                                </td>
                                <td className="p-3 text-gray-600">{category.name_en}</td>
                                <td className="p-3 flex justify-center gap-3">
                                    <button
                                        onClick={() => handleOpenModal(category)}
                                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow transition"
                                    >
                                        <FiEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category._id)}
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
                    <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4">
                            {isEditMode ? "تعديل الصنف" : "إضافة صنف جديد"}
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="name_ar" className="mb-1 text-sm font-semibold text-indigo-600">
                                    الاسم بالعربي
                                </label>
                                <input
                                    id="name_ar"
                                    {...register("name_ar", { required: true })}
                                    placeholder="اسم الصنف بالعربي"
                                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="name_en" className="mb-1 text-sm font-semibold text-indigo-600">
                                    الاسم بالانجليزي
                                </label>
                                <input
                                    id="name_en"
                                    {...register("name_en", { required: true })}
                                    placeholder="اسم الصنف بالانجليزي"
                                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="flex justify-end mt-4 gap-3">
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
