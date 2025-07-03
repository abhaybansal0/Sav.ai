"use server"
import React from 'react'
import HeroSection from './_components/HeroSection'
import Courses from './_components/Courses'
import RecentAchievements from './_components/RecentAchievements'
import RecentActivity from './_components/RecentActivity'
import { ReduxProvider } from '@/lib/redux/provider'
import ClientSync from '@/components/ClientSync'
import { getUserWithAuth } from '@/lib/auth'
import type { UserProfile } from '@/lib/types'


const DashboardPage = async () => {

  const user = await getUserWithAuth();
  const userData = user.profile as UserProfile;

  const { username, streak, xp, coursesNo } = userData;
  const { everyDayGoal } = userData;

  //  User Progress
  const { questionsDone } = userData.todayProgress;
  let ProgressPer = (questionsDone / everyDayGoal) * 100;
  if (ProgressPer > 100) ProgressPer = 100;

  // User streak
  const { lastStreakDate } = userData;
  const todayKey = new Date();
  const today = todayKey.toISOString().slice(0, 10);
  const lastDate = lastStreakDate.toString().slice(0, 10);

  if (lastDate !== today) {
    ProgressPer = 0;
  }

  return (
    <div className=' w-full'>

      <ReduxProvider>
        <ClientSync />
      </ReduxProvider>
      
      {/* Hero section */}
      <HeroSection userData={{ username, streak, xp, coursesNo, ProgressPer }} />


      <div className='w-full over light-teal dark:bg-background text-black dark:text-white  px-12 flex pt-4 items-start gap-4 md:flex-1 
        pb-8 md:flex-col md:px-4
      '>

        {/* User Courses */}
        <Courses />

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
