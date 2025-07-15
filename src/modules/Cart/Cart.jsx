import React, { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import shoseIng from '../../assets/shoice.jpg';

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
    }
];

function Cart() {
    const [cartItems, setCartItems] = useState(initialItems);

    const updateQuantity = (id, amount) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <section className="min-h-screen bg-gray-100 py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-center text-indigo-700 my-8">سلة المشتريات</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-600 text-lg">سلتك فارغة.</div>
                ) : (
                    <>
                        <div className="space-y-6">
                            {cartItems.map(item => (
                                <div
                                    key={item.id}
                                    className="bg-white p-6 rounded-lg shadow flex flex-col sm:flex-row items-center gap-6"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />

                                    <div className="flex-1 text-center sm:text-right space-y-2">
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <p className="text-indigo-600 font-bold">{item.price} ج.م</p>
                                        <div className="flex items-center justify-center sm:justify-start gap-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                <Minus size={16} className="mx-auto text-gray-700" />
                                            </button>
                                            <span className="font-semibold text-lg">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                <Plus size={16} className="mx-auto text-gray-700" />
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-600 hover:text-red-800 transition"
                                    >
                                        <Trash2 size={22} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-white p-6 rounded shadow text-center">
                            <h2 className="text-xl font-bold mb-4">الإجمالي: {total} ج.م</h2>
                            <Link
                                to="/checkout"
                                className="bg-indigo-600 mt-8 hover:bg-indigo-700 text-white px-8 py-1 rounded text-lg font-semibold transition"
                            >
                                إتمام الشراء
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default Cart;
