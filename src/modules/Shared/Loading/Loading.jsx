import React from 'react'

function Loading() {
    return (
        <div className="flex items-center justify-center space-x-2 my-20">
            <span className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></span>
            <span className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
            <span className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
        </div>
    );
}

export default Loading
