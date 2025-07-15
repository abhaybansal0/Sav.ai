import React from 'react'

interface PlanetProps {
    theme: 'Amber' | 'Blue' | 'Green' | 'Red' | 'Purple' | 'Orange' | 'Yellow' | 'Rose',
    completed: boolean,
    ram: number,
}

const planetType1 = ({ theme, completed, ram }: PlanetProps) => {

    return (
        <div className="relative z-10 hover:scale-105 transition-transform ease-in-out">
            <div className={`w-20 h-20 rounded-full theme-${theme}
            shadow-2xl shadow-gray-700 dark:shadow-black animate-spin-slow-${completed ? '' : ram === 2 ? 'right' : 'left'} flex items-center justify-center relative overflow-hidden`}>

                <div className="absolute top-2 left-0 right-0 h-2.5 bg-black/18 transform rotate-2" />
                <div className="absolute top-5 left-0 right-0 h-1 bg-white/15 transform -rotate-1" />
                <div className="absolute top-7 left-0 right-0 h-3 bg-black/22 transform rotate-1" />
                <div className="absolute top-11 left-0 right-0 h-2 bg-black/15 transform -rotate-2" />
                <div className="absolute bottom-3 left-0 right-0 h-2.5 bg-black/20 transform rotate-1" />
                <div className="absolute top-6 right-3 w-4 h-4 rounded-full bg-white/15 transform rotate-45" />
                <div className="absolute top-3 left-2 w-2 h-3 rounded-full bg-black/30 transform rotate-30" />
                <div className="absolute bottom-5 left-5 w-3 h-2 rounded-full bg-white/18 transform -rotate-60" />
                <div className="absolute bottom-7 right-6 w-1.5 h-2 rounded-full bg-black/25 transform rotate-90" />
                <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full border border-white/8 transform rotate-15" />
                <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-full border border-white/4 transform rotate-15" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-black/12" />
                <div className="absolute top-1 left-2 w-4 h-4 rounded-full bg-white/20 blur-md" />
                <div className="absolute bottom-2 right-3 w-3 h-3 rounded-full bg-white/12 blur-sm" />
            </div>
        </div>
    )
}

const planetType2 = ({ theme, completed, ram }: PlanetProps) => {

    return (
        <div className="relative z-10 hover:scale-105 transition-transform ease-in-out">
            <div className={`w-20 h-20 rounded-full theme-${theme}
                shadow-2xl shadow-gray-700 dark:shadow-black animate-spin-slow-${completed ? '' : ram === 2 ? 'right' : 'left'} flex items-center justify-center relative overflow-hidden`}>

                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/5 via-transparent to-black/20" />
                <div className="absolute top-3 left-4 w-3 h-3 rounded-full bg-black/25 shadow-inner" />
                <div className="absolute bottom-4 right-3 w-6 h-6 rounded-full bg-white/15 shadow-inner" />
                <div className="absolute top-6 right-8 w-2 h-2 rounded-full bg-black/30" />
                <div className="absolute bottom-7 left-5 w-1.5 h-1.5 rounded-full bg-white/25" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/10" />
                <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/20 blur-sm" />
            </div>
        </div>
    )
}

const planetType3 = ({ theme, completed, ram }: PlanetProps) => {

    return (
        <div className="relative z-10 hover:scale-105 transition-transform ease-in-out">
            <div className={`w-20 h-20 rounded-full theme-${theme}
            shadow-2xl shadow-gray-700 dark:shadow-black animate-spin-slow-${completed ? '' : ram === 2 ? 'right' : 'left'} flex items-center justify-center relative overflow-hidden`}>

                <div className="absolute top-4 left-0 right-0 h-1.5 bg-white/10 transform rotate-1" />
                <div className="absolute top-6 left-0 right-0 h-2 bg-black/15 transform -rotate-1" />
                <div className="absolute top-9 left-0 right-0 h-1 bg-white/8 transform rotate-2" />
                <div className="absolute top-12 left-0 right-0 h-2.5 bg-black/20 transform -rotate-1" />
                <div className="absolute bottom-4 left-0 right-0 h-1.5 bg-white/12 transform rotate-1" />

                <div className="absolute top-5 left-6 w-2.5 h-2.5 rounded-full bg-black/35 transform rotate-45" />
                <div className="absolute top-8 right-4 w-3 h-2 rounded-full bg-white/20 transform -rotate-30" />
                <div className="absolute bottom-6 left-3 w-1.5 h-1.5 rounded-full bg-black/40" />
                <div className="absolute bottom-8 right-7 w-2 h-2 rounded-full bg-white/15 transform rotate-60" />

                <div className="absolute -top-4 -left-4 -right-4 -bottom-4 rounded-full border-2 border-white/12 transform rotate-12" />
                <div className="absolute -top-5 -left-5 -right-5 -bottom-5 rounded-full border border-white/8 transform rotate-12" />
                <div className="absolute -top-6 -left-6 -right-6 -bottom-6 rounded-full border border-white/6 transform rotate-12" />

                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/8 via-transparent to-black/25" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-tl from-transparent via-white/6 to-transparent" />

                <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white/15 blur-md" />
                <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-white/10 blur-sm" />

                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-black/5 to-transparent" />
            </div>
        </div>
    )
}

const planetType4 = ({ theme, completed, ram }: PlanetProps) => {
    return (
        <div className="relative z-10 hover:scale-105 transition-transform ease-in-out">
            <div className={`w-20 h-20 rounded-full theme-${theme}
            shadow-2xl shadow-gray-700 dark:shadow-black animate-spin-slow-${completed ? '' : ram === 2 ? 'right' : 'left'} flex items-center justify-center relative overflow-hidden`}>

                {/* Multiple atmospheric bands like planet 1 & 3 */}
                <div className="absolute top-1 left-0 right-0 h-2 bg-white/15 transform rotate-1" />
                <div className="absolute top-3.5 left-0 right-0 h-1.5 bg-black/20 transform -rotate-1" />
                <div className="absolute top-5.5 left-0 right-0 h-3 bg-gradient-to-r from-white/10 via-white/20 to-white/10 transform rotate-0.5" />
                <div className="absolute top-8.5 left-0 right-0 h-1 bg-black/25 transform -rotate-2" />
                <div className="absolute top-10 left-0 right-0 h-2.5 bg-white/12 transform rotate-1" />
                <div className="absolute top-12.5 left-0 right-0 h-2 bg-gradient-to-r from-black/15 via-black/25 to-black/15 transform -rotate-1" />
                <div className="absolute bottom-2.5 left-0 right-0 h-1.5 bg-white/18 transform rotate-2" />

                {/* Great storm vortex with details */}
                <div className="absolute top-5 right-2 w-7 h-5 rounded-full bg-gradient-radial from-red-900/40 via-red-800/30 to-transparent transform rotate-20">
                    <div className="absolute inset-0.5 rounded-full bg-gradient-conic from-red-700/25 via-orange-800/20 to-red-700/25 animate-spin" style={{ animationDuration: '8s' }} />
                    <div className="absolute inset-1 rounded-full bg-red-900/20" />
                    <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-orange-400/30" />
                </div>

                {/* Multiple storm spots like planet 1 */}
                <div className="absolute top-8 left-3 w-3 h-3 rounded-full bg-black/35 transform rotate-45">
                    <div className="absolute inset-0.5 rounded-full bg-black/25" />
                </div>
                <div className="absolute bottom-5 left-5 w-2.5 h-2 rounded-full bg-white/25 transform -rotate-30" />
                <div className="absolute bottom-7 right-6 w-2 h-2 rounded-full bg-black/30 transform rotate-60" />
                <div className="absolute top-10 right-5 w-1.5 h-1.5 rounded-full bg-white/20" />

                {/* Hexagonal pole structure */}
                <div className="absolute -top-1 left-4 right-4 h-3 bg-gradient-to-b from-blue-300/20 to-transparent rounded-t-full" />
                <div className="absolute -bottom-1 left-4 right-4 h-3 bg-gradient-to-t from-blue-300/20 to-transparent rounded-b-full" />

                {/* Saturn-like rings */}
                <div className="absolute -top-3 -left-3 -right-3 -bottom-3 rounded-full border-2 border-white/10 transform rotate-15" />
                <div className="absolute -top-4 -left-4 -right-4 -bottom-4 rounded-full border border-white/15 transform rotate-15" />
                <div className="absolute -top-5 -left-5 -right-5 -bottom-5 rounded-full border border-white/8 transform rotate-15" />
                <div className="absolute -top-6 -left-6 -right-6 -bottom-6 rounded-full border-2 border-gradient-to-r from-transparent via-white/12 to-transparent transform rotate-15" />

                {/* Complex gradient overlays */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-black/15" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-blue-400/5 to-transparent" />
                <div className="absolute inset-1 rounded-full bg-gradient-to-bl from-transparent via-white/8 to-transparent" />

                {/* Cloud wisps */}
                <div className="absolute top-4 left-1 w-10 h-2 bg-white/10 transform -rotate-25 blur-sm" />
                <div className="absolute bottom-6 right-0 w-8 h-1.5 bg-white/8 transform rotate-30 blur-sm" />

                {/* Highlights and shadows */}
                <div className="absolute top-1 left-2 w-5 h-5 rounded-full bg-white/20 blur-md" />
                <div className="absolute bottom-2 right-3 w-3 h-3 rounded-full bg-white/15 blur-sm" />
                <div className="absolute top-3 right-1 w-2 h-2 rounded-full bg-white/25 blur-sm" />
            </div>
        </div>
    )
}

const planetType5 = ({ theme, completed, ram }: PlanetProps) => {
    return (
        <div className="relative z-10 hover:scale-105 transition-transform ease-in-out">
            <div className={`w-20 h-20 rounded-full theme-${theme}
            shadow-2xl shadow-gray-700 dark:shadow-black animate-spin-slow-${completed ? '' : ram === 2 ? 'right' : 'left'} flex items-center justify-center relative overflow-hidden`}>

                {/* Tectonic plate divisions/continents */}
                <div className="absolute top-2 left-0 right-3 h-6 bg-gradient-to-r from-transparent via-black/20 to-black/25 transform rotate-12 rounded-full" />
                <div className="absolute bottom-1 left-2 right-0 h-7 bg-gradient-to-r from-black/22 via-black/18 to-transparent transform -rotate-15 rounded-full" />
                <div className="absolute top-7 left-0 right-5 h-4 bg-gradient-to-r from-transparent via-white/15 to-transparent transform rotate-5" />

                {/* Ice caps with detail */}
                <div className="absolute -top-1 left-2 right-2 h-4 bg-gradient-to-b from-white/35 via-blue-100/25 to-transparent rounded-t-full" />
                <div className="absolute -bottom-1 left-3 right-3 h-3 bg-gradient-to-t from-white/30 via-blue-100/20 to-transparent rounded-b-full" />

                {/* Large impact craters with ejecta */}
                <div className="absolute top-3 left-4 w-5 h-5 rounded-full bg-black/25 shadow-inner">
                    <div className="absolute inset-0.5 rounded-full bg-black/20" />
                    <div className="absolute -inset-1 rounded-full bg-white/10 blur-sm" />
                </div>
                <div className="absolute bottom-4 right-3 w-4 h-4 rounded-full bg-black/30 shadow-inner">
                    <div className="absolute inset-0.5 rounded-full bg-black/15" />
                    <div className="absolute -inset-0.5 rounded-full bg-white/8 blur-sm" />
                </div>
                <div className="absolute top-8 right-6 w-2.5 h-2.5 rounded-full bg-black/35 shadow-inner" />
                <div className="absolute bottom-7 left-2 w-3 h-3 rounded-full bg-black/20 shadow-inner" />

                {/* Mountain ranges */}
                <div className="absolute top-9 left-2 w-12 h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-25 rounded-full blur-sm" />
                <div className="absolute bottom-5 right-1 w-10 h-2 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -rotate-20 rounded-full blur-sm" />

                {/* Volcanic regions with lava glow */}
                <div className="absolute top-11 right-5 w-3.5 h-3.5 rounded-full">
                    <div className="absolute inset-0 rounded-full bg-orange-600/30 animate-pulse" style={{ animationDuration: '2.5s' }} />
                    <div className="absolute inset-0.5 rounded-full bg-red-700/25" />
                    <div className="absolute inset-1 rounded-full bg-yellow-600/20" />
                </div>
                <div className="absolute bottom-8 left-6 w-2.5 h-2.5 rounded-full">
                    <div className="absolute inset-0 rounded-full bg-red-600/35 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
                    <div className="absolute inset-0.5 rounded-full bg-orange-700/20" />
                </div>

                {/* Thin ring system */}
                <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-full border border-orange-200/15 transform rotate-20" />
                <div className="absolute -top-3 -left-3 -right-3 -bottom-3 rounded-full border-0.5 border-orange-300/10 transform rotate-20" />

                {/* Atmospheric layers */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-100/10 via-transparent to-red-900/15" />
                <div className="absolute -inset-0.5 rounded-full bg-gradient-radial from-transparent via-transparent to-orange-200/8" />

                {/* Cloud formations */}
                <div className="absolute top-5 right-1 w-6 h-3 rounded-full bg-white/8 transform rotate-30 blur-md" />
                <div className="absolute bottom-3 left-1 w-5 h-2.5 rounded-full bg-white/6 transform -rotate-45 blur-md" />
                <div className="absolute top-7 left-3 w-4 h-2 rounded-full bg-black/10 blur-sm" />

                {/* Surface features - canyons */}
                <div className="absolute top-6 left-1 w-14 h-0.5 bg-gradient-to-r from-transparent via-black/20 to-transparent transform rotate-20" />
                <div className="absolute bottom-7 right-0 w-12 h-0.5 bg-gradient-to-r from-transparent via-black/15 to-transparent transform -rotate-15" />

                {/* Multiple highlights for 3D effect */}
                <div className="absolute top-1 left-2 w-4 h-4 rounded-full bg-white/25 blur-lg" />
                <div className="absolute top-3 left-5 w-2 h-2 rounded-full bg-white/20 blur-md" />
                <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-white/10 blur-sm" />

                {/* Dust storms */}
                <div className="absolute top-4 right-0 w-8 h-5 rounded-full bg-orange-300/12 transform rotate-20 blur-lg animate-pulse" style={{ animationDuration: '5s' }} />
                <div className="absolute bottom-2 left-0 w-6 h-4 rounded-full bg-orange-400/8 transform -rotate-30 blur-lg animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />

                {/* Small details like planet 2 */}
                <div className="absolute top-2 right-4 w-1.5 h-1.5 rounded-full bg-white/30" />
                <div className="absolute bottom-6 left-4 w-1 h-1 rounded-full bg-black/40" />
                <div className="absolute top-7 right-2 w-0.5 h-0.5 rounded-full bg-white/35" />
                <div className="absolute bottom-9 right-7 w-1 h-1 rounded-full bg-black/30" />
            </div>
        </div>
    )
}


export {
    planetType1,
    planetType2,
    planetType3,
    planetType4,
    planetType5
}