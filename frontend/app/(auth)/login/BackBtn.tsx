'use client'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

const BackBtn = () => {
    return (
            <button 
                onClick={() => window.history.back()}
                className="absolute left-6 top-6 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 z-10"
            >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
    )
}

export default BackBtn
