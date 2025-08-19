import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Trash2, UserCog } from "lucide-react";
import { fetchUsers, deleteUser, updateUser, updateUserRole } from "./usersSlice";
import Loading from "../../Shared/Loading/Loading";

function AdminUsers() {
  const dispatch = useDispatch();
  const { items: users, loading } = useSelector((state) => state.users);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // 🟢 fetch users عند التحميل
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.includes(searchQuery) ||
      user.email?.includes(searchQuery) ||
      user.phone?.includes(searchQuery) ||
      user._id?.toString().includes(searchQuery)
  );

  // تغيير الدور
  const toggleRole = (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    dispatch(updateUserRole({ id: user._id, role: newRole }));
    dispatch(fetchUsers());
  };

  // حذف مستخدم
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    setConfirmDelete(null);
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">إدارة المستخدمين</h1>
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="بحث بالاسم أو البريد أو الهاتف..."
            className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        {loading ? (
          <Loading />
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-200 text-gray-700 text-center">
              <tr>
                <th className="px-4 py-3">رقم</th>
                <th className="px-4 py-3">الاسم</th>
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
                filteredUsers.map((user, index) => (
                  <tr key={user._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">{index + 1}</td>
                    <td className="px-4 py-3">{user.username}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.phone}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${user.role === "admin" ? "bg-green-700" : "bg-green-500"
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-indigo-700 font-semibold">{user.orders}</td>
                    <td className="px-4 py-3">
                      {new Date(user.createdAt).toLocaleDateString("EG")}
                    </td>
                    <td className="px-4 py-3 flex gap-3">

                      <button
                        className="text-blue-600 hover:underline flex items-center gap-1"
                        onClick={() => toggleRole(user)}
                      >
                        <UserCog size={18} /> تغيير الدور
                      </button>
                      <button
                        className="text-red-600 hover:underline flex items-center gap-1"
                        onClick={() => setConfirmDelete(user)}
                      >
                        <Trash2 size={18} /> حذف
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">تفاصيل المستخدم</h2>
            <p><strong>الاسم:</strong> {selectedUser.username}</p>
            <p><strong>البريد:</strong> {selectedUser.email}</p>
            <p><strong>الهاتف:</strong> {selectedUser.phone}</p>
            <p><strong>العنوان:</strong> {selectedUser.address}</p>
            <p><strong>الدور:</strong> {selectedUser.role}</p>
            <p><strong>عدد الطلبات:</strong> {selectedUser.orders}</p>
            <p><strong>تاريخ الانضمام:</strong> {selectedUser.joinDate}</p>
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setSelectedUser(null)}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg relative">
            <h2 className="text-lg font-bold mb-4">تأكيد الحذف</h2>
            <p>
              هل أنت متأكد من أنك تريد حذف المستخدم{" "}
              <strong>{confirmDelete.username}</strong>؟
            </p>
            <div className="flex justify-end mt-6 gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setConfirmDelete(null)}
              >
                إلغاء
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleDelete(confirmDelete._id)}
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

export default AdminUsers;
