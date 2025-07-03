'use client'
import { useAppSelector } from '@/lib/redux/hooks';
import { Flame } from 'lucide-react';

const StreakButton = () => {

    const { streak, streakIsActive } = useAppSelector((state) => state.user);


    return (
        <div
            className="flex items-center space-x-1  bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Click to show Streak Week"
        >
            <span className={` ${streakIsActive ? 'text-orange-400' : 'text-gray-400'} text-lg `}>
                <Flame size={16} className={`${streakIsActive ? 'fill-orange-400' : ''}`} />
                {/* <User  /> */}
            </span>
            <span className={` ${streakIsActive ? 'text-orange-400' : 'text-gray-400'} font-medium`}>
                {streak}
            </span>
        </div>
    )
}

export default StreakButton