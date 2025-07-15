import React from 'react'
import Planet from './Planet';
import BlackHole from './BlackHole';
import { LessonType } from '@/lib/types'

interface Props {
    lessons: LessonType[];
}

const LessonsPath = ({ lessons }: Props) => {
    return (
        <div className='w-1/2 md:w-full h-full md:min-h-screen course-list
        rounded-md overflow-auto scrollbar-none transition-transform duration-300 
        overflow-x-hidden overflow-y-visible pb-24
        pt-24 md:pt-52'>

            {lessons.map((lesson, i) => {
                return <Planet lesson={lesson} key={i} />
            })}

            <BlackHole />


        </div>
    )
}

export default LessonsPath
