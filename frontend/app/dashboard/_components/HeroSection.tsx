import React from 'react'
import StatCards from './StatCards'
import SpaceShip from '@/components/SpaceShip'
import HudBtn from './HudBtn'
import { Fuel, Battery } from 'lucide-react'

interface DataType {
    username: string
    streak: number
    xp: number
    coursesNo: number
    ProgressPer: number
    shipFuel: 0 | 1 | 2 | 3 | 4
}

const HeroSection = ({
    userData: { username, xp, streak, coursesNo, ProgressPer, shipFuel },
}: {
    userData: DataType
}) => {
    return (
        <div className='w-full px-12 mx-auto md:px-8 pt-28 pb-8'>
            {/* Hero Content - Single Row Layout */}
            <div className='max-w-7xl mx-auto mb-12'>
                <div className='flex items-center justify-between gap-8 md:gap-12'>
                    {/* Left: Welcome Text */}
                    <div className='flex-1'>
                        <h1 className='text-3xl md:text-4xl font-bold mb-2'>
                            Welcome back, {username}!
                        </h1>
                        <p className='text-gray-500 dark:text-gray-400 mb-6'>
                            Keep your ship fueled, your next exploration awaits!
                        </p>
                        
                        {/* Action Buttons */}
                        <div className='flex flex-wrap gap-3'>
                            <HudBtn mode={'continue'} />
                            <HudBtn mode={'daily'} />
                        </div>
                    </div>

                    {/* Right: Spaceship & Fuel */}
                    <div className='flex items-center gap-6'>
                        <SpaceShip size='large' mode='stationary' />
                        
                        {/* Fuel Indicator - Vertical */}
                        <div className='flex flex-col items-center gap-2'>
                            <Fuel className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                            <div className='flex flex-col gap-1'>
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Battery
                                        key={i}
                                        className={`w-5 h-5 transition-colors ${
                                            i < (4 - shipFuel)
                                                ? 'text-gray-700 dark:text-gray-600'
                                                : 'fill-orange-400 text-orange-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className='max-w-7xl mx-auto'>
                <StatCards stats={{ xp, streak, coursesNo, ProgressPer }} />
            </div>
        </div>
    )
}

export default HeroSection