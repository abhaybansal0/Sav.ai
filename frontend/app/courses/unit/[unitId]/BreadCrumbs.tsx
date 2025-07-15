import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface Props {
    breadDetails: {
        subjectId: string,
        subjectName: string,
        name: string
    }
}

const BreadCrumbs = ({ breadDetails }: Props) => {
    return (
        <div className='flex gap-2 items-center justify-start text-sm font-semibold'>
            <Link href={'/dashboard'}>
                <span className='text-gray-500 dark:text-gray-400 dark:hover:text-gray-200'>
                    Dashbord
                </span>
            </Link>
            <ChevronRight size={15} className='' />
            <Link href={'/courses'}>
                <span className='text-gray-500 dark:text-gray-400 dark:hover:text-gray-200'>
                    Courses
                </span>
            </Link>
            <ChevronRight size={15} className='' />
            <Link href={`/courses/${breadDetails.subjectId}`}>
                <span className='text-gray-500 dark:text-gray-400 dark:hover:text-gray-200'>
                    {breadDetails.subjectName}
                </span>
            </Link>
            <ChevronRight size={15} className='' />
            <span className='text-blue-500 dark:text-blue-400'>
                {breadDetails.name}
            </span>

        </div>
    )
}

export default BreadCrumbs
