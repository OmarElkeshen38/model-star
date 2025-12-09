import React from 'react';

function Loading() {
    return (
        <div className="flex items-center justify-center my-20">
            <div className="relative w-12 h-12">
                {/* الدائرة الخلفية */}
                <div
                    className="absolute inset-0 rounded-full animate-ping opacity-75"
                    style={{ backgroundColor: '#06B6D4' }} // Chic Teal
                ></div>

                {/* الدائرة الأساسية */}
                <div
                    className="absolute inset-0 rounded-full animate-spin"
                    style={{
                        border: '4px solid #06B6D4',
                        borderTopColor: '#0B132B', // Primary dark
                    }}
                ></div>
            </div>
        </div>
    );
}

export default Loading;
