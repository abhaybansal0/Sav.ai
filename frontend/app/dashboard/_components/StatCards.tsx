import React from 'react'
import { BookOpen, Flame, Target, Zap } from 'lucide-react'
import PercentageCircle from '@/components/PercentageCircle'
import StatRoller from '@/components/StatRoller'


interface userStat {
    xp: number
    streak: number
    coursesNo: number
    ProgressPer: number
}


const StatCards = ({
    stats: { xp, streak, coursesNo, ProgressPer },
}: {
    stats: userStat
}) => {


    return (

        <div className='flex items-center justify-center gap-4 mt-8 md:flex-col'>

            {/* XP Card */}
            <div className="w-full md:w-5/7  border  text-black rounded-lg px-6 py-6 
            bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800
            ">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-yellow-700 dark:text-yellow-300 block font-semibold text-sm">Total XP</span>
                        <StatRoller stat={xp} theme={'yellow'} />
                    </div>
                    <Zap size={34} className='text-yellow-500' />
                </div>
            </div>

            {/* Streak Card */}
            <div className="w-full md:w-5/7  border  text-black rounded-lg px-6 py-6 
            bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800
            ">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-orange-700 dark:text-orange-300 block font-semibold text-sm">Learning Streak</span>

                        <StatRoller stat={streak} theme={'orange'} isStreak={true} />

                    </div>
                    <Flame size={34} className='text-orange-500' />
                </div>
            </div>

            {/* Courses Completed Card */}
            <div className="w-full md:w-5/7  border  text-black rounded-lg px-6 py-6 
                bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800            ">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-green-700 dark:text-green-300 block font-semibold text-sm">Courses Completed</span>

                        <StatRoller stat={coursesNo} theme={'green'} />

                    </div>
                    <BookOpen size={34} className='text-green-500' />
                </div>
            </div>


            {/* Today Progress Card */}
            <div className="w-full md:w-5/7  border  text-black rounded-lg px-6 py-6 
                bg-gradient-to-br from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800        ">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-blue-700 dark:text-blue-300 block font-semibold text-sm">Today&apos;s Learning</span>

                        <StatRoller stat={ProgressPer} theme={'blue'} isPercent={true} />

                    </div>

                    {/* Percentage Circle */}
                    <PercentageCircle percentage={ProgressPer} />
                </div>


            </div>


        </div>
    )
}

export default StatCards
