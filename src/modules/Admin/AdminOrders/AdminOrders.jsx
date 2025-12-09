import React, { useEffect, useMemo, useState } from "react";
import { Search, Eye, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";

/**
 * AdminOrders (Chic Teal)
 * - Inline palette (no tailwind.config)
 * - RTL support
 * - Accessible modal (aria attributes)
 * - Improved badges, search & filter UX
 */

const COLORS = {
  primary: "#0B132B",
  accent: "#06B6D4",
  accentDark: "#0585A3",
  success: "#16A34A",
  warn: "#D97706",
  danger: "#DC2626",
  muted: "#6B7280",
  softBg: "#F8FAFC",
  cardBg: "#FFFFFF",
};

function formatStatusColor(status) {
  if (status === "جديد") return { bg: "#EFF6FF", color: "#1E3A8A" };
  if (status === "قيد التنفيذ") return { bg: "#FFF7ED", color: "#92400E" };
  if (status === "مكتمل") return { bg: "#ECFDF5", color: "#065F46" };
  return { bg: "#FEF2F2", color: "#7F1D1D" }; // ملغي / افتراضي
}

export default function AdminOrders() {
  const reduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Demo data (replace with real API/Redux)
  const orders = useMemo(
    () => [
      {
        id: 101,
        customer: "أحمد علي",
        amount: "1200 ج.م",
        status: "جديد",
        date: "2025-07-20",
        items: ["حذاء رياضي", "تيشيرت قطني"],
        address: "القاهرة، مصر",
      },
      {
        id: 102,
        customer: "سارة محمد",
        amount: "950 ج.م",
        status: "مكتمل",
        date: "2025-07-18",
        items: ["فستان سهرة"],
        address: "الجيزة، مصر",
      },
      {
        id: 103,
        customer: "محمود حسن",
        amount: "750 ج.م",
        status: "قيد التنفيذ",
        date: "2025-07-17",
        items: ["جاكيت شتوي"],
        address: "الإسكندرية، مصر",
      },
    ],
    []
  );

  // simple filter logic (case-insensitive)
  const filteredOrders = orders.filter((order) => {
    const q = searchQuery.trim();
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    const matchesQuery =
      !q ||
      order.customer.toLowerCase().includes(q.toLowerCase()) ||
      order.id.toString().includes(q);
    return matchesStatus && matchesQuery;
  });

  // prevent background scroll when modal open
  useEffect(() => {
    if (selectedOrder) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [selectedOrder]);

  return (
    <div
      className="p-6 min-h-screen"
      dir="rtl"
      style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #fff)` }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            إدارة الطلبات
          </h1>
          <p className="text-sm mt-1" style={{ color: COLORS.muted }}>
            عرض، بحث، وتصفية الطلبات — استبدل بيانات الديمو بمصدرك الحقيقي (API/Redux)
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="بحث بالاسم أو رقم الطلب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2"
              aria-label="بحث الطلبات"
              style={{ boxShadow: "inset 0 0 0 1px rgba(11,19,43,0.02)" }}
            />
            <Search className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" aria-hidden />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            aria-label="تصفية حسب الحالة"
            style={{ minWidth: 140 }}
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
      <div className="overflow-x-auto bg-white rounded shadow p-2">
        <table className="min-w-full text-sm table-auto" role="table" aria-label="قائمة الطلبات">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="px-4 py-3 text-right">رقم الطلب</th>
              <th className="px-4 py-3 text-right">العميل</th>
              <th className="px-4 py-3 text-center">المبلغ</th>
              <th className="px-4 py-3 text-center">الحالة</th>
              <th className="px-4 py-3 text-center">التاريخ</th>
              <th className="px-4 py-3 text-center">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const statusStyle = formatStatusColor(order.status);
                return (
                  <tr key={order.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-right font-semibold" style={{ color: COLORS.primary }}>
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-right">{order.customer}</td>
                    <td className="px-4 py-3 text-center font-bold" style={{ color: COLORS.accent }}>
                      {order.amount}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          background: statusStyle.bg,
                          color: statusStyle.color,
                        }}
                        aria-label={`حالة الطلب: ${order.status}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center" style={{ color: COLORS.muted }}>
                      {order.date}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-indigo-600 hover:underline inline-flex items-center gap-1"
                        aria-label={`عرض تفاصيل الطلب ${order.id}`}
                      >
                        <Eye size={16} /> عرض
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  لا توجد طلبات مطابقة.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-details-title"
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedOrder(null)}
            aria-hidden
          />

          {/* modal */}
          <div
            className="relative bg-white w-full max-w-lg rounded-lg p-6 shadow-lg z-10"
            style={{
              transform: reduceMotion ? "none" : "translateY(0)",
              transition: reduceMotion ? "none" : "all 180ms ease",
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <h2 id="order-details-title" className="text-xl font-bold" style={{ color: COLORS.primary }}>
                تفاصيل الطلب #{selectedOrder.id}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                aria-label="إغلاق تفاصيل الطلب"
                className="p-1 rounded-md"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2 text-sm" style={{ color: COLORS.muted }}>
              <p><strong style={{ color: COLORS.primary }}>العميل:</strong> {selectedOrder.customer}</p>
              <p><strong style={{ color: COLORS.primary }}>العنوان:</strong> {selectedOrder.address}</p>
              <p><strong style={{ color: COLORS.primary }}>المبلغ:</strong> {selectedOrder.amount}</p>
              <p><strong style={{ color: COLORS.primary }}>الحالة:</strong> {selectedOrder.status}</p>
              <p><strong style={{ color: COLORS.primary }}>التاريخ:</strong> {selectedOrder.date}</p>

              <div>
                <strong style={{ color: COLORS.primary }}>المنتجات:</strong>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  {selectedOrder.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setSelectedOrder(null)}
              >
                إغلاق
              </button>

              {/* Example action: mark as shipped (replace with real action) */}
              <button
                onClick={() => {
                  // placeholder action
                  alert(`Action: mark ${selectedOrder.id} as processed (implement)`);
                }}
                className="px-4 py-2 rounded"
                style={{ background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`, color: "#fff" }}
              >
                علامة كقيد المعالجة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
