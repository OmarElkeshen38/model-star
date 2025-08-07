import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ShoppingCart, Settings } from 'lucide-react';

function AdminLayout() {
    const location = useLocation();

    const links = [
        { to: '/admin', label: 'لوحة التحكم', icon: <LayoutDashboard size={18} /> },
        { to: '/admin/products', label: 'المنتجات', icon: <Package size={18} /> },
        { to: '/admin/orders', label: 'الطلبات', icon: <ShoppingCart size={18} /> },
        { to: '/admin/users', label: 'المستخدمون', icon: <Users size={18} /> },
        { to: '/admin/settings', label: 'الإعدادات', icon: <Settings size={18} /> },
    ];

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
                <h2 className="text-2xl font-bold mb-8 text-indigo-600">لوحة التحكم</h2>
                <ul className="space-y-4">
                    {links.map((link) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition hover:bg-indigo-50 ${location.pathname === link.to ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'
                                    }`}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 pt-12 mt-4">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
