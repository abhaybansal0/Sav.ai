import React from 'react'
import { Search } from 'lucide-react'
import CourseCard from './CourseCard';
import { CoursesType } from '@/lib/types';


type CourseProps = {
    courses: CoursesType[];
}

const CoursesSection = ({ courses }: CourseProps) => {
    return (
        <div className='w-full tracking-normal px-12 md:px-4 pb-4 pt-6'>

            <div className='flex mb-8'>

                <div className='flex-1 relative '>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input type="text"
                        placeholder='Search courses...'
                        className='w-2/5 md:w-full border dark:border-gray-900 p-4 py-5 h-4 bg-white dark:bg-gray-800 rounded-md text-black dark:text-white text-sm pl-10' />

                </div>

            </div>


            <div className="grid grid-cols-3 gap-6  md:grid-cols-1 ">
                {courses.map((course, index) => (
                    <CourseCard key={index} {...course} />
                ))}
            </div>
        </div>
    )
}

export default CoursesSection
