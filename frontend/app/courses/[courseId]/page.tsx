import React from 'react'
import CourseDetails from './CourseDetails'
import Galaxy from './GalaxyUnit'
import { getUnitsBySubId } from '@/lib/content'
import { UnitsType, CoursesType } from '@/lib/types'

interface Props {
  params: Promise<{ courseId: string }>;
}

const Page = async ({ params }: Props) => {

  const { courseId } = await params;

  const res = await getUnitsBySubId(courseId);
  const Subject = res?.populatedSub as CoursesType;

  const { name, description, icon, totalLessons, totalCompletedLessons } = Subject;

  const courseDetails = {
    name, description, icon, totalLessons, totalCompletedLessons
  }


  return (
    <div className='w-full bg-transparent
    overflow-hidden relative'>

      <div className="absolute inset-0 -z-10 
      bg-gradient-to-br from-white via-[#e6f2fa] to-[#d4e5f0] text-gray-900
      dark:bg-gradient-to-br dark:from-black dark:via-[#112236] dark:to-[#0b0c10] dark:text-white
    ">

        {[...Array(200)].map((_, i) => {
          const random = Math.floor(Math.random() * (4 - 1 + 1) + 1);
          return <div
            key={i}
            className={`absolute bg-black dark:bg-white rounded-full animate-pulse`}
            style={{
              width: `${random}px`,
              height: `${random}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        })}
      </div>


      <CourseDetails courseDetails={courseDetails} />

      <div className='mb-12 pt-4  w-full min-h-52 flex flex-col gap-40 mt-12'>

        {Subject.units.map((unit: UnitsType, i: number) => {
          return <Galaxy key={i} unit={unit} i={i} />
        })}

      </div>

    </div>
  )
}

export default Page
