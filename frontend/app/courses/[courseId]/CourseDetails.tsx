import React from 'react'
import { ChevronRight, Zap, Trophy, Flame } from 'lucide-react'
import BreadCrumbs from './BreadCrumbs'

interface Props {
    courseDetails: {
        name: string,
        description: string,
        icon: string,
        totalLessons: number,
        totalCompletedLessons: number
    }
}

const CourseDetails = ({ courseDetails }: Props) => {

    const totalXp = courseDetails.totalLessons * 75;
    const userXp = courseDetails.totalCompletedLessons * 75;

    const progressPer = (courseDetails.totalCompletedLessons / courseDetails.totalLessons) * 100 || 0;

    return (
        <div className='w-full  pt-24 tracking-normal px-12 md:px-4 pb-4 '>

            <BreadCrumbs courseName={courseDetails.name} />

            {/* Course Header */}
            <div className='mt-8  mx-auto w-3/4 p-8 rounded-2xl bg-white/50 dark:bg-gray-800/40 backdrop-blur-sm  
            flex flex-col items-center justify-center gap-4 md:w-full
            text-lg md:text-sm'>
                <span className='text-4xl font-semibold md:text-3xl'>
                    {courseDetails.name}
                </span>

                <span className='text-gray-500 dark:text-gray-300 mt-2'>
                    {courseDetails.description}
                </span>

                <div className='flex gap-4'>
                    <span className='flex gap-2 items-center justify-center'>
                        <Zap size={18} className="text-yellow-500" />
                        {userXp} / {totalXp}
                    </span>
                    <span className='flex gap-2 items-center justify-center'>
                        <Flame size={18} className="text-orange-500" />
                        5 days Streak!!
                    </span>
                    <span className='flex gap-2 items-center justify-center'>
                        <Trophy size={18} className="text-green-500" />
                        {progressPer}% Completed
                    </span>
                </div>

                <div className='w-3/4 md:w-full h-4 rounded-full bg-gray-600 '>
                    <div className={` h-full rounded-full
                    bg-gradient-to-r from-[#4b1d71] to-[#2962ff]`}
                        style={{ width: `${progressPer}%` }}>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default CourseDetails
