import React from 'react'
import { ReduxProvider } from '@/lib/redux/provider'
import ClientSync from '../../components/ClientSync'
import HeroSection from './_components/HeroSection'
import CoursesSection from './_components/CoursesSection'
import { getCourses } from '@/lib/content'
import type { CoursesType } from '@/lib/types'

const coursesPage = async () => {

  const res  = await getCourses();
  const Subjects = res.Subjects as CoursesType[];


  return (
    <div className='w-full'>

      <ReduxProvider>
        <ClientSync />
      </ReduxProvider>

      {/* Courses Heading Section */}
      <HeroSection />

      {/* Search Bar and Sorting */}


      {/* Courses Section */}
      <CoursesSection courses={Subjects}/>





    </div>
  )
}

export default coursesPage
