import React, { useEffect, useMemo, useState } from "react";
import { Search, Eye, Trash2, UserCog, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, updateUserRole } from "./usersSlice";
import Loading from "../../Shared/Loading/Loading";
import { toast } from "react-toastify";

/**
 * AdminUsers (Chic Teal)
 * - Inline palette (no tailwind.config)
 * - RTL support
 * - Accessible modals + aria attributes
 * - Debounced search (simple)
 * - Prevent background scroll while modal open
 */

const COLORS = {
  primary: "#0B132B",
  accent: "#06B6D4",
  accentDark: "#0585A3",
  muted: "#6B7280",
  danger: "#EF4444",
  softBg: "#F8FAFC",
};

export default function AdminUsers() {
  const dispatch = useDispatch();
  const { items: users = [], loading } = useSelector((state) => state.users || {});

  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // fetch users on mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // simple debounce for search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);

  // prevent background scroll when modal(s) open
  useEffect(() => {
    if (selectedUser || confirmDelete) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [selectedUser, confirmDelete]);

  const filteredUsers = useMemo(() => {
    if (!debouncedQ) return users;
    const lower = debouncedQ.toLowerCase();
    return users.filter(
      (u) =>
        (u.name && u.name.toLowerCase().includes(lower)) ||
        (u.username && u.username.toLowerCase().includes(lower)) ||
        (u.email && u.email.toLowerCase().includes(lower)) ||
        (u.phone && u.phone.toLowerCase().includes(lower)) ||
        (u._id && u._id.toString().includes(lower))
    );
  }, [users, debouncedQ]);

  const handleToggleRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    try {
      await dispatch(updateUserRole({ id: user._id, role: newRole })).unwrap();
      toast.success(`تم تغيير الدور إلى ${newRole}`);
      dispatch(fetchUsers());
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء تغيير الدور");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      toast.success("تم حذف المستخدم");
      dispatch(fetchUsers());
      setConfirmDelete(null);
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء الحذف");
    }
  };

  return (
    <div
      className="p-6 min-h-screen"
      dir="rtl"
      style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #ffffff)` }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            إدارة المستخدمين
          </h1>
          <p className="text-sm mt-1" style={{ color: COLORS.muted }}>
            عرض، بحث، وتعديل أدوار المستخدمين — استخدم الـ actions لربط الـ backend
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="بحث بالاسم أو البريد أو الهاتف..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="بحث المستخدمين"
            className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2"
            style={{ boxShadow: "inset 0 0 0 1px rgba(11,19,43,0.02)" }}
          />
          <Search className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" aria-hidden />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        {loading ? (
          <div className="p-6">
            <Loading />
          </div>
        ) : (
          <table className="w-full border-collapse text-sm" role="table" aria-label="قائمة المستخدمين">
            <thead className="bg-gray-100 text-gray-700 text-center">
              <tr>
                <th className="px-4 py-3">رقم</th>
                <th className="px-4 py-3 text-right">الاسم</th>
                <th className="px-4 py-3">البريد</th>
                <th className="px-4 py-3">الهاتف</th>
                <th className="px-4 py-3">الدور</th>
                <th className="px-4 py-3">عدد الطلبات</th>
                <th className="px-4 py-3">تاريخ الانضمام</th>
                <th className="px-4 py-3">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, idx) => (
                  <tr key={user._id} className="border-t hover:bg-gray-50" role="row">
                    <td className="px-4 py-3 font-semibold text-center">{idx + 1}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="font-semibold" style={{ color: COLORS.primary }}>
                        {user.username || user.name || "-"}
                      </div>
                      <div className="text-xs" style={{ color: COLORS.muted }}>
                        {user._id}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">{user.email || "-"}</td>
                    <td className="px-4 py-3 text-center">{user.phone || "-"}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          background: user.role === "admin" ? "#ECFDF5" : "#EEF2FF",
                          color: user.role === "admin" ? "#065F46" : "#1E3A8A",
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center" style={{ color: COLORS.accent }}>
                      {user.orders ?? 0}
                    </td>
                    <td className="px-4 py-3 text-center" style={{ color: COLORS.muted }}>
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString("ar-EG") : "-"}
                    </td>
                    <td className="px-4 py-3 text-center flex items-center justify-center gap-3">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-indigo-600 hover:underline inline-flex items-center gap-1"
                        aria-label={`عرض ${user.username || user._id}`}
                        title="عرض"
                      >
                        <Eye size={16} /> عرض
                      </button>

                      <button
                        onClick={() => handleToggleRole(user)}
                        className="text-blue-600 hover:underline inline-flex items-center gap-1"
                        aria-label={`تغيير الدور لـ ${user.username || user._id}`}
                        title="تغيير الدور"
                      >
                        <UserCog size={16} /> دور
                      </button>

                      <button
                        onClick={() => setConfirmDelete(user)}
                        className="text-red-600 hover:underline inline-flex items-center gap-1"
                        aria-label={`حذف ${user.username || user._id}`}
                        title="حذف"
                      >
                        <Trash2 size={16} /> حذف
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-500">
                    لا يوجد مستخدمون.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="user-details-title"
        >
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedUser(null)} aria-hidden />
          <div className="relative bg-white w-full max-w-lg rounded-lg p-6 shadow-lg z-10">
            <div className="flex items-start justify-between mb-4">
              <h2 id="user-details-title" className="text-xl font-bold" style={{ color: COLORS.primary }}>
                تفاصيل المستخدم
              </h2>
              <button onClick={() => setSelectedUser(null)} aria-label="إغلاق" className="p-1 rounded-md">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 text-sm" style={{ color: COLORS.muted }}>
              <p><strong style={{ color: COLORS.primary }}>الاسم:</strong> {selectedUser.username || "-"}</p>
              <p><strong style={{ color: COLORS.primary }}>البريد:</strong> {selectedUser.email || "-"}</p>
              <p><strong style={{ color: COLORS.primary }}>الهاتف:</strong> {selectedUser.phone || "-"}</p>
              <p><strong style={{ color: COLORS.primary }}>العنوان:</strong> {selectedUser.address || "-"}</p>
              <p><strong style={{ color: COLORS.primary }}>الدور:</strong> {selectedUser.role || "-"}</p>
              <p><strong style={{ color: COLORS.primary }}>عدد الطلبات:</strong> {selectedUser.orders ?? 0}</p>
              <p><strong style={{ color: COLORS.primary }}>تاريخ الانضمام:</strong> {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString("ar-EG") : "-"}</p>
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                إغلاق
              </button>
              <button
                onClick={() => { handleToggleRole(selectedUser); setSelectedUser(null); }}
                className="px-4 py-2 rounded text-white"
                style={{ background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})` }}
              >
                تبديل الدور
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
        >
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirmDelete(null)} aria-hidden />
          <div className="relative bg-white w-full max-w-md rounded-lg p-6 shadow-lg z-10">
            <h2 id="confirm-delete-title" className="text-lg font-bold mb-2" style={{ color: COLORS.primary }}>
              تأكيد الحذف
            </h2>
            <p className="text-sm" style={{ color: COLORS.muted }}>
              هل أنت متأكد من أنك تريد حذف المستخدم{" "}
              <strong>{confirmDelete.username || confirmDelete._id}</strong>؟ هذا الإجراء لا يمكن التراجع عنه.
            </p>

            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleDelete(confirmDelete._id)}
                className="px-4 py-2 rounded text-white"
                style={{ background: COLORS.danger }}
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
