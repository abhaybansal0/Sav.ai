import React from 'react'
import { ReduxProvider } from '@/lib/redux/provider'
import ClientSync from '../../components/ClientSync'
import HeroSection from './_components/HeroSection'
import Courses from './_components/Courses'

const coursesPage = () => {
  return (
    <div className='w-full'>

      <ReduxProvider>
        <ClientSync />
      </ReduxProvider>

      {/* Courses Heading Section */}
      <HeroSection />

      {/* Search Bar and Sorting */}
      <Courses />





    </div>
  )
}

export default coursesPage
