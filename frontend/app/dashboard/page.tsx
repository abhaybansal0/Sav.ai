import React from 'react'
import HeroSection from './_components/HeroSection'
import Courses from './_components/Courses'
import RecentAchievements from './_components/RecentAchievements'
import RecentActivity from './_components/RecentActivity'
import { ReduxProvider } from '@/lib/redux/provider'
import ClientSync from '@/components/ClientSync'
import { getUserWithAuth } from '@/lib/auth'
import type { UserProfile } from '@/lib/types'
import { getDashboardCourses } from '@/lib/content'


const DashboardPage = async () => {

  // Fetching both the userData and CourseData simulataniously
  const [user, courses] = await Promise.all([getUserWithAuth(), getDashboardCourses()]);
  const { CoursesArray } = courses;

  const userData = user.profile as UserProfile;

  const { username, streak, xp, coursesNo, shipFuel } = userData;
  const { everyDayGoal } = userData;

  //  User Progress
  const { questionsDone } = userData.todayProgress;
  let ProgressPer = (questionsDone / everyDayGoal) * 100;
  if (ProgressPer > 100) ProgressPer = 100;

  // User streak
  const { lastStreakDate } = userData;
  const todayKey = new Date();
  const today = todayKey.toISOString().slice(0, 10);
  const lastDate = lastStreakDate?.toString().slice(0, 10);

  if (lastDate !== today) {
    ProgressPer = 0;
  }

  return (
    <div className='w-full !bg-transparent
     relative '>


      <div className="absolute inset-0 -z-10 
      bg-gradient-to-br from-white via-[#e6f2fa] to-[#d4e5f0] text-gray-900
      dark:bg-gradient-to-br dark:from-black dark:via-[#112236] dark:to-[#0b0c10] dark:text-white
    ">

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

      <ReduxProvider>
        <ClientSync />
      </ReduxProvider>

      {/* Hero section */}
      <HeroSection userData={{ username, streak, xp, coursesNo, ProgressPer, shipFuel }} />


      <div className='w-full px-12 flex pt-8 items-start gap-4 md:flex-1 
        pb-8 md:flex-col md:px-4
      '>

        {/* User Courses */}
        <Courses courses={CoursesArray} />

        {/* Rescent activity and badges / Achivements */}
        <div className='flex-col w-2/6 justify-start items-center gap-4 md:w-full '>

          <RecentActivity />

          <RecentAchievements />

        </div>


      </div>


    </div>
  )
}

export default DashboardPage
