import { ChevronRight, Zap, Trophy, Flame } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

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
        <div className='w-full  pt-24 tracking-normal px-12 md:px-4 pb-4'>
            <div className='flex gap-2 items-center justify-start text-sm font-semibold'>
                <Link href={'/dashboard'}>
                    <span className='text-gray-500 dark:text-gray-300'>
                        Dashbord
                    </span>
                </Link>
                <ChevronRight size={15} className='' />
                <Link href={'/courses'}>
                    <span className='text-gray-500 dark:text-gray-300'>
                        Courses
                    </span>
                </Link>
                <ChevronRight size={15} className='' />
                <span className='text-blue-500 dark:text-blue-400'>
                    {courseDetails.name}
                </span>

            </div>


            {/* Course Header */}
            <div className='mt-8 w-full mx-auto bg-gray-200/25 dark:bg-transparent backdrop-blur-sm rounded-xl p-6
            flex flex-col items-center justify-center gap-4'>
                <span className='text-4xl font-semibold '>
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

                <div className='w-2/5 h-4 rounded-full bg-gray-600 '>
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
