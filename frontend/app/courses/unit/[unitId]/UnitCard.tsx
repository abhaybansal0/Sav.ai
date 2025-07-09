import React from 'react'
import LessonGalaxy from './LessonGalaxy'
import { UnitsType } from '@/lib/types'

interface Props {
  unitDetails: {
    name: string,
    desciption: string,
    lessonCount: number,
    userCompletedLessonsCount: number,
    theme: 'Yellow' | 'Brown' | 'Blue' | 'Green' | 'Orange' | 'Red' | 'Cyan' | 'Teal' | 'Pink' | 'Purple' | 'Gray'
  }
}

const UnitCard = ({ unitDetails }: Props) => {


  return (
    <div className='w-5/12 md:w-full rounded-2xl min-h-52 md:min-h-44 p-8 md:p-1 
    border border-gray-400 dark:border-gray-700 
    md:absolute md:top-28 md:z-50 md:backdrop-blur-md
    bg-gray-200/15 dark:bg-transparent backdrop-blur-sm '>

      {/* Unit Solar System */}
      <div className='flex  items-center justify-start gap-6 md:gap-2'>

        <LessonGalaxy theme={unitDetails.theme} />

        <div>
          <p className='text-base text-gray-500 md:text-sm'>Solar System</p>
          <h2 className='text-gray-900 dark:text-gray-300 text-2xl md:text-xl font-semibold'>{unitDetails.name}</h2>
          <p>{unitDetails.desciption}</p>
          <span className='text-gray-500  mt-8 font-semibold text-sm'>
            {unitDetails.lessonCount} Lessons
          </span>
          <span className='text-gray-500 ml-4 mt-8 font-semibold text-sm'>
            {unitDetails.userCompletedLessonsCount} Completed
          </span>
        </div>
      </div>


    </div>
  )
}

export default UnitCard
