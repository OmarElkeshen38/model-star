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
            className="modal-overlay animate-modal-fade-in flex items-center justify-center"
            onClick={handleOverlayClick}
        >
            <div className="modal-box chic-modal animate-modal-scale-in">
                <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">تأكيد الحذف</h2>

                <p className="mb-6 text-gray-600 text-center leading-relaxed">
                    هل أنت متأكد أنك تريد حذف هذا العنصر؟ هذا الإجراء لا يمكن التراجع عنه.
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 transition font-medium"
                        onClick={onCancel}
                    >
                        إلغاء
                    </button>

                    <button
                        className="px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition font-semibold shadow-md"
                        onClick={onConfirm}
                    >
                        حذف
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirm;
