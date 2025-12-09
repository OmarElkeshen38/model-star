import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Users,
    ShoppingCart,
    Settings,
    ChartBarStacked,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../Authentication/authSlice";

function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Chic Teal palette
    const COLORS = {
        primary: "#0B132B",
        accent: "#06B6D4",
        accentDark: "#0585A3",
        softBg: "#F8FAFC",
        muted: "#6B7280",
        white: "#FFFFFF",
    };

    const links = [
        { to: "/admin", label: "لوحة التحكم", icon: <LayoutDashboard size={18} /> },
        { to: "/admin/products", label: "المنتجات", icon: <Package size={18} /> },
        { to: "/admin/categories", label: "الأصناف", icon: <ChartBarStacked size={18} /> },
        { to: "/admin/orders", label: "الطلبات", icon: <ShoppingCart size={18} /> },
        { to: "/admin/users", label: "المستخدمون", icon: <Users size={18} /> },
        { to: "/admin/settings", label: "الإعدادات", icon: <Settings size={18} /> },
    ];

    function handleLogout() {
        const ok = window.confirm("هل تريد تسجيل الخروج من لوحة التحكم؟");
        if (!ok) return;
        dispatch(logout());
        navigate("/auth/login");
    }

    const isActive = (path) =>
        location.pathname === path || location.pathname.startsWith(path + "/");

    return (
        <div
            className="min-h-screen flex pt-10"
            dir="rtl"
            style={{ background: `linear-gradient(135deg, ${COLORS.softBg}, #FFFFFF)` }}
        >
            {/* Sidebar - Desktop */}
            <aside
                className="hidden md:flex md:flex-col w-64 p-6 shadow-lg"
                style={{ backgroundColor: COLORS.white }}
            >
                <div className="mb-8">
                    <h2
                        className="text-2xl font-extrabold tracking-wide"
                        style={{ color: COLORS.primary }}
                    >
                        لوحة التحكم
                    </h2>
                    <p className="text-xs mt-1" style={{ color: COLORS.muted }}>
                        ModelStar Admin
                    </p>
                </div>

                <nav className="flex-1">
                    <ul className="space-y-2 text-sm">
                        {links.map((link) => {
                            const active = isActive(link.to);
                            return (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="flex items-center gap-2 px-4 py-2 rounded-md font-medium transition"
                                        style={
                                            active
                                                ? {
                                                    background: `${COLORS.accent}15`,
                                                    color: COLORS.primary,
                                                    boxShadow: "0 4px 14px rgba(6,182,212,0.18)",
                                                }
                                                : {
                                                    color: COLORS.muted,
                                                }
                                        }
                                    >
                                        <span
                                            className="flex items-center justify-center w-7 h-7 rounded-md"
                                            style={{
                                                background: active ? COLORS.accent : "#F3F4F6",
                                                color: active ? "#fff" : COLORS.muted,
                                            }}
                                        >
                                            {link.icon}
                                        </span>
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            );
                        })}

                        <li className="pt-4 border-t mt-4" style={{ borderColor: `${COLORS.primary}10` }}>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 w-full px-4 py-2 rounded-md font-medium transition"
                                style={{ color: "#EF4444" }}
                            >
                                <span className="flex items-center justify-center w-7 h-7 rounded-md bg-red-50">
                                    <LogOut size={18} />
                                </span>
                                تسجيل الخروج
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Sidebar - Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 flex md:hidden"
                    aria-label="قائمة لوحة التحكم"
                >
                    {/* overlay */}
                    <div
                        className="flex-1 bg-black/40"
                        onClick={() => setSidebarOpen(false)}
                    ></div>

                    {/* drawer */}
                    <aside
                        className="w-64 p-6 bg-white shadow-xl"
                        style={{ backgroundColor: COLORS.white }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2
                                    className="text-xl font-extrabold"
                                    style={{ color: COLORS.primary }}
                                >
                                    لوحة التحكم
                                </h2>
                                <p className="text-xs" style={{ color: COLORS.muted }}>
                                    ModelStar Admin
                                </p>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-1 rounded-md"
                                aria-label="إغلاق القائمة"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <nav>
                            <ul className="space-y-2 text-sm">
                                {links.map((link) => {
                                    const active = isActive(link.to);
                                    return (
                                        <li key={link.to}>
                                            <Link
                                                to={link.to}
                                                onClick={() => setSidebarOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2 rounded-md font-medium transition"
                                                style={
                                                    active
                                                        ? {
                                                            background: `${COLORS.accent}15`,
                                                            color: COLORS.primary,
                                                        }
                                                        : {
                                                            color: COLORS.muted,
                                                        }
                                                }
                                            >
                                                <span
                                                    className="flex items-center justify-center w-7 h-7 rounded-md"
                                                    style={{
                                                        background: active ? COLORS.accent : "#F3F4F6",
                                                        color: active ? "#fff" : COLORS.muted,
                                                    }}
                                                >
                                                    {link.icon}
                                                </span>
                                                <span>{link.label}</span>
                                            </Link>
                                        </li>
                                    );
                                })}

                                <li className="pt-4 border-t mt-4" style={{ borderColor: `${COLORS.primary}10` }}>
                                    <button
                                        onClick={() => {
                                            setSidebarOpen(false);
                                            handleLogout();
                                        }}
                                        className="flex items-center gap-2 w-full px-4 py-2 rounded-md font-medium transition"
                                        style={{ color: "#EF4444" }}
                                    >
                                        <span className="flex items-center justify-center w-7 h-7 rounded-md bg-red-50">
                                            <LogOut size={18} />
                                        </span>
                                        تسجيل الخروج
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top bar for mobile */}
                <header
                    className="md:hidden flex items-center justify-between px-4 pt-4 pb-2"
                    style={{ backgroundColor: COLORS.white, boxShadow: "0 1px 4px rgba(15,23,42,0.06)" }}
                >
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-md"
                        aria-label="فتح القائمة"
                    >
                        <Menu size={22} />
                    </button>
                    <span className="text-sm font-semibold" style={{ color: COLORS.primary }}>
                        ModelStar Admin
                    </span>
                </header>

                <main className="flex-1 p-4 md:p-6 pt-6 md:pt-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
