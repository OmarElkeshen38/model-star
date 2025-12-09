import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import shoseIng from '../../assets/shoice.jpg';
import { useReducedMotion } from 'framer-motion';

const initialItems = [
    {
        id: 1,
        name: 'حذاء رياضي رجالي',
        price: 699,
        quantity: 1,
        image: shoseIng,
    },
    {
        id: 2,
        name: 'نظارة شمسية',
        price: 299,
        quantity: 2,
        image: shoseIng,
    },
];

function Cart() {
    const reduceMotion = useReducedMotion();
    const [cartItems, setCartItems] = useState(() => {
        // حاول استرجاع من localStorage لو موجود (اختياري)
        try {
            const raw = localStorage.getItem('cart_demo_v1');
            return raw ? JSON.parse(raw) : initialItems;
        } catch {
            return initialItems;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cart_demo_v1', JSON.stringify(cartItems));
        } catch { }
    }, [cartItems]);

    // Chic Teal palette (inline)
    const COLORS = {
        primary: '#0B132B',
        accent: '#06B6D4',
        accent2: '#FF6B6B',
        softBg: '#F8FAFC',
        muted: '#6B7280',
    };

    const updateQuantity = (id, amount) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
            )
        );
    };

    const removeItem = (id) => {
        const item = cartItems.find(i => i.id === id);
        const ok = window.confirm(`هل تريد حذف "${item?.name}" من السلة؟`);
        if (!ok) return;
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const formatPrice = (val) => {
        try {
            return Number(val).toLocaleString('ar-EG');
        } catch {
            return val;
        }
    };

    return (
        <section
            className="min-h-screen py-16 px-4"
            style={{ background: `linear-gradient(180deg, ${COLORS.softBg}, #FFFFFF)` }}
            aria-labelledby="cart-heading"
        >
            <div className="container mx-auto max-w-6xl">
                <h1 id="cart-heading" className="text-3xl font-bold text-center my-8" style={{ color: COLORS.primary }}>
                    سلة المشتريات
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-600 text-lg">
                        <p className="mb-6">سلتك فارغة.</p>
                        <Link
                            to="/products"
                            className="inline-block px-6 py-3 rounded-lg font-semibold"
                            style={{
                                background: COLORS.accent,
                                color: '#fff',
                                boxShadow: '0 8px 20px rgba(6,182,212,0.12)',
                            }}
                        >
                            تصفح المنتجات
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="space-y-6">
                            {cartItems.map(item => (
                                <div
                                    key={item.id}
                                    className="bg-white p-6 rounded-lg shadow flex flex-col sm:flex-row items-center gap-6"
                                    role="group"
                                    aria-label={`${item.name} — ${item.quantity} قطعة`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-32 h-32 object-cover rounded-lg border"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src =
                                                "data:image/svg+xml;utf8," +
                                                encodeURIComponent(
                                                    `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 24 24' fill='none'><rect width='100%' height='100%' fill='${COLORS.softBg}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${COLORS.muted}' font-family='Arial, Helvetica, sans-serif' font-size='10'>No image</text></svg>`
                                                );
                                        }}
                                    />

                                    <div className="flex-1 text-center sm:text-right space-y-2">
                                        <h3 className="text-lg font-semibold" style={{ color: COLORS.primary }}>
                                            {item.name}
                                        </h3>

                                        <p className="text-indigo-600 font-bold">
                                            {formatPrice(item.price)} ج.م
                                        </p>

                                        <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                onKeyDown={(e) => { if (e.key === 'Enter') updateQuantity(item.id, -1); }}
                                                aria-label={`نقص ${item.name}`}
                                                className="w-9 h-9 rounded-md flex items-center justify-center focus:outline-none focus-visible:ring-2"
                                                style={{
                                                    background: '#F3F4F6',
                                                    border: `1px solid ${COLORS.primary}20`,
                                                }}
                                            >
                                                <Minus size={16} color={COLORS.primary} />
                                            </button>

                                            <span className="font-semibold text-lg" aria-live="polite">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                onKeyDown={(e) => { if (e.key === 'Enter') updateQuantity(item.id, 1); }}
                                                aria-label={`زيادة ${item.name}`}
                                                className="w-9 h-9 rounded-md flex items-center justify-center focus:outline-none focus-visible:ring-2"
                                                style={{
                                                    background: '#F3F4F6',
                                                    border: `1px solid ${COLORS.primary}20`,
                                                }}
                                            >
                                                <Plus size={16} color={COLORS.primary} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            aria-label={`حذف ${item.name}`}
                                            title={`حذف ${item.name}`}
                                            className="p-2 rounded-md focus:outline-none focus-visible:ring-2"
                                            style={{ color: COLORS.accent2 }}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-white p-6 rounded shadow text-center">
                            <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.primary }}>
                                الإجمالي: <span aria-live="polite">{formatPrice(total)} ج.م</span>
                            </h2>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    to="/checkout"
                                    className="px-8 py-3 rounded-lg font-semibold"
                                    style={{
                                        background: COLORS.accent,
                                        color: '#fff',
                                        boxShadow: '0 10px 30px rgba(6,182,212,0.14)',
                                    }}
                                >
                                    إتمام الشراء
                                </Link>

                                <button
                                    onClick={() => {
                                        if (!window.confirm('هل تريد تفريغ السلة بالكامل؟')) return;
                                        setCartItems([]);
                                    }}
                                    className="px-6 py-3 rounded-lg border font-medium"
                                    style={{ borderColor: `${COLORS.primary}30`, color: COLORS.primary }}
                                >
                                    تفريغ السلة
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default Cart;
