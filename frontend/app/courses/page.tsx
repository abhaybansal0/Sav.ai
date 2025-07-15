import React from 'react'
import HeroSection from './_components/HeroSection'
import CoursesSection from './_components/CoursesSection'
import { getCourses } from '@/lib/content'
import type { CoursesType } from '@/lib/types'

const coursesPage = async () => {

  const res = await getCourses();
  const Subjects = res.Subjects as CoursesType[];


  return (
    <div className='w-full bg-transparent
    overflow-hidden relative '>


      <div className="absolute inset-0 -z-10 
      bg-gradient-to-br from-white via-[#e6f2fa] to-[#d4e5f0] text-gray-900
      dark:bg-gradient-to-br dark:from-black dark:via-[#112236] dark:to-[#0b0c10] dark:text-white
    ">
        {/* bg-gradient-to-br from-white via-[#e6f2fa] to-[#d4e5f0] text-gray-900
      dark:bg-gradient-to-br dark:from-black dark:via-[#112236] dark:to-[#0b0c10] dark:text-white */}

                {[...Array(150)].map((_, i) => {
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

      {/* Courses Heading Section */}
      <HeroSection />

      {/* Search Bar and Sorting */}


      {/* Courses Section */}
      <CoursesSection courses={Subjects} />





    </div>
  )
}

export default coursesPage
