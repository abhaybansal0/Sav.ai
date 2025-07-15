import React from 'react'
import Link from 'next/link'
import CourseCard from './CourseCards';
import { ChevronRight } from 'lucide-react';
import { getDashboardCourses } from '@/lib/content';
import { CoursesType } from '@/lib/types';

type PropsType = {
  courses: CoursesType[];
} 

const Courses = async ({ courses }: PropsType) => {

  // Get Dashbaord Courses



  return (
    <div className="w-4/6 p-6 bg-white/40  dark:bg-gray-900/50 backdrop-blur-sm  rounded-2xl md:w-full md:p-4">

      <div className="flex items-center justify-between mb-8 md:flex-col">

        <h1 className="text-2xl md:text-base font-bold text-gray-900 dark:text-white">
          Continue Learning
        </h1>

        <Link href={'/courses'}>
          <button className="flex md:text-sm items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200">
            View all courses
            <ChevronRight className="w-4 h-4" />
          </button>
        </Link>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-6">

        {courses.map((sub: any, i: number) => {
          const title = sub.name.toString();
          const { NoOfUnitsDone, unitCount, icon, difficulty } = sub;
          const subId = sub._id;
          const progress = (NoOfUnitsDone / unitCount) * 100 || 0;
          const isStarted = progress !== 0;


          if (i > 3) return null;

          return <CourseCard
            key={i}
            title={title}
            progress={progress}
            color="bg-orange-500"
            isStarted={isStarted}
            subId={subId}
            tag={difficulty}
          />
        })}

      </div>
    </div>
  );
};


export default Courses
