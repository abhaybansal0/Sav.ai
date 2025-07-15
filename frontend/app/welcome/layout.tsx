import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full min-h-screen relative'>

            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-[#e6f2fa] to-[#d4e5f0] text-gray-900">
                {[...Array(150)].map((_, i) => {
                    const random = Math.floor(Math.random() * (4 - 1 + 1) + 1);
                    return (
                        <div
                            key={i}
                            className="absolute bg-black rounded-full animate-pulse"
                            style={{
                                width: `${random}px`,
                                height: `${random}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        />
                    );
                })}
            </div>

            {children}
            
        </div>
    )
}

export default layout
