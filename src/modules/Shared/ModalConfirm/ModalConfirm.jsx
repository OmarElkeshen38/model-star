import React from 'react';
import './ModalConfirm.css';

function ModalConfirm({ onCancel, onConfirm }) {
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onCancel();
        }
    };

    return (
        <div 
            className="modal-overlay animate-modal-fade-in" 
            onClick={handleOverlayClick}
        >
            <div className="modal-box animate-modal-scale-in">
                <h2 className="text-lg font-bold mb-4">تأكيد الحذف</h2>
                <p className="mb-6 text-gray-700">هل أنت متأكد أنك تريد حذف هذا المنتج؟</p>
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                        onClick={onCancel}
                    >
                        إلغاء
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                        onClick={onConfirm}
                    >
                        حذف
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm;
