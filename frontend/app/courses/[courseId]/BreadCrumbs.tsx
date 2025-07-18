import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BreadCrumbs = ({ courseName }: { courseName: string }) => {
    return (
        <div className='flex gap-2 items-center justify-start text-sm font-semibold mt-4'>
            <Link href={'/dashboard'}>
                <span className='text-gray-500 dark:text-gray-300'>
                    Dashbord
                </span>
            </Link>

            <ChevronRight size={15} className='' />

            <Link href={`/courses`}>
                <span className='text-gray-500 dark:text-gray-300'>
                    Courses
                </span>
            </Link>

            <ChevronRight size={15} className='' />
            <span className='text-blue-500 dark:text-blue-400'>
                {courseName}
            </span>

        </div>
    )
}

export default BreadCrumbs
