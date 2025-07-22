import React from 'react';
import { Package, Users, ShoppingCart, DollarSign } from 'lucide-react';

const stats = [
    {
        label: 'عدد المنتجات',
        value: 120,
        icon: <Package size={28} className="text-indigo-600" />,
        bg: 'bg-indigo-50',
    },
    {
        label: 'عدد الطلبات',
        value: 350,
        icon: <ShoppingCart size={28} className="text-green-600" />,
        bg: 'bg-green-50',
    },
    {
        label: 'عدد المستخدمين',
        value: 85,
        icon: <Users size={28} className="text-yellow-600" />,
        bg: 'bg-yellow-50',
    },
    {
        label: 'إجمالي المبيعات',
        value: '45,000 ج.م',
        icon: <DollarSign size={28} className="text-rose-600" />,
        bg: 'bg-rose-50',
    },
];

const latestOrders = [
    {
        id: 'ORD123',
        customer: 'أحمد علي',
        total: '749 ج.م',
        status: 'مكتمل',
        date: '2025-07-13',
    },
    {
        id: 'ORD124',
        customer: 'سارة محمد',
        total: '1200 ج.م',
        status: 'قيد المعالجة',
        date: '2025-07-13',
    },
    {
        id: 'ORD125',
        customer: 'محمود فؤاد',
        total: '499 ج.م',
        status: 'ملغي',
        date: '2025-07-12',
    },
    {
        id: 'ORD126',
        customer: 'أحمد علي',
        total: '749 ج.م',
        status: 'مكتمل',
        date: '2025-07-13',
    },
    {
        id: 'ORD127',
        customer: 'سارة محمد',
        total: '1200 ج.م',
        status: 'قيد المعالجة',
        date: '2025-07-13',
    },
    {
        id: 'ORD128',
        customer: 'محمود فؤاد',
        total: '499 ج.م',
        status: 'ملغي',
        date: '2025-07-12',
    },
];

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

// بيانات تجريبية للمبيعات
const salesData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
    datasets: [
        {
            label: 'المبيعات (ج.م)',
            data: [5000, 8000, 6500, 9000, 7000, 12000, 11000],
            fill: false,
            backgroundColor: '#4f46e5',
            borderColor: '#4f46e5',
            tension: 0.4,
        },
    ],
};

const salesOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                font: {
                    family: 'Cairo',
                },
            },
        },
        title: {
            display: true,
            text: 'تقرير المبيعات الشهري',
            font: {
                size: 18,
                family: 'Cairo',
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                font: {
                    family: 'Cairo',
                },
            },
        },
        x: {
            ticks: {
                font: {
                    family: 'Cairo',
                },
            },
        },
    },
};

function AdminDashboard() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">لوحة التحكم</h1>

            {/* كروت الإحصائيات */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className={`p-5 rounded-lg shadow-sm ${item.bg} border border-gray-200`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{item.value}</h2>
                                <p className="text-sm text-gray-600 mt-1">{item.label}</p>
                            </div>
                            <div className="p-2 rounded-full bg-white shadow">{item.icon}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow p-6 mt-10">
                <Line data={salesData} options={salesOptions} />
            </div>

            {/* جدول الطلبات الأخيرة */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">الطلبات الأخيرة</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto text-right border border-gray-200">
                        <thead className="bg-gray-100 text-sm text-gray-600">
                            <tr>
                                <th className="p-3">رقم الطلب</th>
                                <th className="p-3">العميل</th>
                                <th className="p-3">الإجمالي</th>
                                <th className="p-3">الحالة</th>
                                <th className="p-3">التاريخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestOrders.map((order, i) => (
                                <tr key={i} className="border-t text-sm">
                                    <td className="p-3 font-semibold text-indigo-700">{order.id}</td>
                                    <td className="p-3">{order.customer}</td>
                                    <td className="p-3">{order.total}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${order.status === 'مكتمل'
                                                ? 'bg-green-100 text-green-700'
                                                : order.status === 'قيد المعالجة'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-3">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default AdminDashboard;
