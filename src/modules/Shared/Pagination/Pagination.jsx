import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center items-center gap-2 mt-8 select-none">

            {/* زر السابق */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border bg-white shadow-sm text-gray-700
                hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                السابق
            </button>

            {/* أرقام الصفحات */}
            <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;

                    const active =
                        currentPage === pageNum
                            ? "bg-indigo-600 text-white shadow-md scale-105"
                            : "bg-white text-gray-700 hover:bg-gray-100";

                    return (
                        <button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg border
                            font-medium transition transform ${active}`}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>

            {/* زر التالي */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border bg-white shadow-sm text-gray-700
                hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                التالي
            </button>
        </div>
    );
};

export default Pagination;
