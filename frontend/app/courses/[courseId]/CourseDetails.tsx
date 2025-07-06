import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CourseDetails = () => {

    const courseName = 'Physics'
    return (
        <div className='w-full h-52 light-teal dark:bg-background text-black dark:text-white pt-24 tracking-normal px-12 md:px-4 pb-4'>
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
                    {courseName}
                </span>

            </div>

            {/* Course Header */}
            <div className='mt-4 '>
                <span className='text-3xl block font-bold text-black dark:text-white '>
                    {courseName}
                </span>

                <span className='text-gray-500 dark:text-gray-300 mt-2 block'>
                    Discover new skills and advance your learning journey
                </span>
            </div>


        </div>
    )
}

export default CourseDetails
