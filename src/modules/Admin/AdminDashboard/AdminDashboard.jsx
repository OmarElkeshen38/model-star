import React from 'react';
import { Package, Users, ShoppingCart, DollarSign } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Chic Teal palette (inline)
const COLORS = {
    primary: '#0B132B',
    accent: '#06B6D4',
    accentDark: '#0585A3',
    accent2: '#FF6B6B',
    softBg: '#F8FAFC',
    muted: '#6B7280',
};

const stats = [
    {
        label: 'عدد المنتجات',
        value: 120,
        icon: <Package size={28} color={COLORS.accent} />,
        bgColor: '#F0FCFE',
    },
    {
        label: 'عدد الطلبات',
        value: 350,
        icon: <ShoppingCart size={28} color={COLORS.accent} />,
        bgColor: '#F0FCFE',
    },
    {
        label: 'عدد المستخدمين',
        value: 85,
        icon: <Users size={28} color={COLORS.accent} />,
        bgColor: '#F0FCFE',
    },
    {
        label: 'إجمالي المبيعات',
        value: '45,000 ج.م',
        icon: <DollarSign size={28} color={COLORS.accent} />,
        bgColor: '#F0FCFE',
    },
];

const latestOrders = [
    { id: 'ORD123', customer: 'أحمد علي', total: '749 ج.م', status: 'مكتمل', date: '2025-07-13' },
    { id: 'ORD124', customer: 'سارة محمد', total: '1200 ج.م', status: 'قيد المعالجة', date: '2025-07-13' },
    { id: 'ORD125', customer: 'محمود فؤاد', total: '499 ج.م', status: 'ملغي', date: '2025-07-12' },
    { id: 'ORD126', customer: 'أحمد علي', total: '749 ج.م', status: 'مكتمل', date: '2025-07-13' },
    { id: 'ORD127', customer: 'سارة محمد', total: '1200 ج.م', status: 'قيد المعالجة', date: '2025-07-13' },
    { id: 'ORD128', customer: 'محمود فؤاد', total: '499 ج.م', status: 'ملغي', date: '2025-07-12' },
];

// بيانات تجريبية للمبيعات (colors use palette)
const salesData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
    datasets: [
        {
            label: 'المبيعات (ج.م)',
            data: [5000, 8000, 6500, 9000, 7000, 12000, 11000],
            fill: false,
            backgroundColor: COLORS.accent,
            borderColor: COLORS.accent,
            tension: 0.4,
        },
    ],
};

const salesOptions = {
    responsive: true,
    plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'تقرير المبيعات الشهري', font: { size: 18 } },
        tooltip: { mode: 'index', intersect: false },
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false },
    scales: {
        y: { beginAtZero: true, ticks: { callback: (v) => new Intl.NumberFormat('ar-EG').format(v) } },
        x: {},
    },
};

function AdminDashboard() {
    return (
        <div className="p-6" style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #FFFFFF)` }}>
            <header className="mb-8">
                <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
                    لوحة التحكم
                </h1>
                <p className="text-sm" style={{ color: COLORS.muted }}>نظرة عامة سريعة على أداء المتجر</p>
            </header>

            {/* كروت الإحصائيات */}
            <section aria-labelledby="stats-heading">
                <h2 id="stats-heading" className="sr-only">إحصائيات سريعة</h2>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="p-5 rounded-lg shadow-sm"
                            style={{ background: item.bgColor, border: '1px solid rgba(6,182,212,0.06)' }}
                            role="group"
                            aria-label={`${item.label}: ${item.value}`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold" style={{ color: COLORS.primary }}>{item.value}</h3>
                                    <p className="text-sm" style={{ color: COLORS.muted }}>{item.label}</p>
                                </div>
                                <div className="p-2 rounded-full bg-white shadow" aria-hidden>
                                    {item.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Chart */}
            <section className="bg-white rounded-lg shadow p-6 mb-8" aria-label="مخطط المبيعات">
                <Line data={salesData} options={salesOptions} />
            </section>

            {/* جدول الطلبات الأخيرة */}
            <section className="bg-white rounded-lg shadow p-6" aria-labelledby="orders-heading">
                <h2 id="orders-heading" className="text-xl font-semibold mb-4" style={{ color: COLORS.primary }}>الطلبات الأخيرة</h2>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto text-right" role="table" aria-label="الطلبات الأخيرة">
                        <thead className="bg-gray-50 text-sm" style={{ color: COLORS.muted }}>
                            <tr>
                                <th className="p-3 text-left">رقم الطلب</th>
                                <th className="p-3">العميل</th>
                                <th className="p-3">الإجمالي</th>
                                <th className="p-3">الحالة</th>
                                <th className="p-3">التاريخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestOrders.map((order, i) => (
                                <tr key={i} className="border-t" style={{ borderColor: '#F1F5F9' }}>
                                    <td className="p-3 font-semibold" style={{ color: COLORS.accent }}>{order.id}</td>
                                    <td className="p-3" style={{ color: COLORS.primary }}>{order.customer}</td>
                                    <td className="p-3" style={{ color: COLORS.primary }}>{order.total}</td>
                                    <td className="p-3">
                                        <span
                                            className="px-2 py-1 rounded text-xs font-medium"
                                            style={{
                                                background: order.status === 'مكتمل' ? '#ECFDF5' : order.status === 'قيد المعالجة' ? '#FFFBEB' : '#FEF2F2',
                                                color: order.status === 'مكتمل' ? '#065F46' : order.status === 'قيد المعالجة' ? '#92400E' : '#9B1C1C',
                                            }}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-3" style={{ color: COLORS.muted }}>{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default AdminDashboard;
