import React, { useState } from "react";
import { Search, Eye } from "lucide-react";

function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    { id: 101, customer: "أحمد علي", amount: "1200 ج.م", status: "جديد", date: "2025-07-20", items: ["حذاء رياضي", "تيشيرت قطني"], address: "القاهرة، مصر" },
    { id: 102, customer: "سارة محمد", amount: "950 ج.م", status: "مكتمل", date: "2025-07-18", items: ["فستان سهرة"], address: "الجيزة، مصر" },
    { id: 103, customer: "محمود حسن", amount: "750 ج.م", status: "قيد التنفيذ", date: "2025-07-17", items: ["جاكيت شتوي"], address: "الإسكندرية، مصر" },
  ];

  const filteredOrders = orders.filter(
    (order) =>
      (filterStatus === "all" || order.status === filterStatus) &&
      (order.customer.includes(searchQuery) || order.id.toString().includes(searchQuery))
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">إدارة الطلبات</h1>
        <div className="flex gap-2">
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="بحث بالاسم أو رقم الطلب..."
              className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
          </div>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">كل الحالات</option>
            <option value="جديد">جديد</option>
            <option value="قيد التنفيذ">قيد التنفيذ</option>
            <option value="مكتمل">مكتمل</option>
            <option value="ملغي">ملغي</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-right">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="px-4 py-3">رقم الطلب</th>
              <th className="px-4 py-3">العميل</th>
              <th className="px-4 py-3">المبلغ</th>
              <th className="px-4 py-3">الحالة</th>
              <th className="px-4 py-3">التاريخ</th>
              <th className="px-4 py-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">{order.id}</td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3 text-indigo-700 font-semibold">{order.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${order.status === "جديد"
                          ? "bg-blue-500"
                          : order.status === "قيد التنفيذ"
                            ? "bg-yellow-500"
                            : order.status === "مكتمل"
                              ? "bg-green-500"
                              : "bg-red-500"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">
                    <button
                      className="text-indigo-600 hover:underline flex items-center gap-1"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye size={18} /> عرض
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  لا توجد طلبات مطابقة.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-lg relative animate-fadeInScale">
            <h2 className="text-xl font-bold mb-4">تفاصيل الطلب #{selectedOrder.id}</h2>
            <p><strong>العميل:</strong> {selectedOrder.customer}</p>
            <p><strong>العنوان:</strong> {selectedOrder.address}</p>
            <p><strong>المبلغ:</strong> {selectedOrder.amount}</p>
            <p><strong>الحالة:</strong> {selectedOrder.status}</p>
            <p><strong>المنتجات:</strong></p>
            <ul className="list-disc list-inside">
              {selectedOrder.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setSelectedOrder(null)}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
