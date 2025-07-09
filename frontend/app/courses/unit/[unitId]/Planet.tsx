import Link from 'next/link';
import React from 'react'
import { LessonType } from '@/lib/types';
import './Planets.css'

interface Props {
  lesson: LessonType
}

interface PlanetProps {
  theme: 'Amber' | 'Blue' | 'Green' | 'Red' | 'Purple' | 'Orange' | 'Yellow' | 'Rose',
  completed: boolean,
  ram: number,
}

const planetType1 = ({ theme, completed, ram }: PlanetProps) => {

  return (
    <div className="relative z-10 hover:scale-105 transition-transform ease-in-out">
      <div className={`w-20 h-20 rounded-full theme-${theme}
            shadow-2xl shadow-gray-700 dark:shadow-black animate-spin-slow-${!completed ? '' : ram === 2 ? 'right' : 'left'} flex items-center justify-center relative overflow-hidden`}>

        <div className="absolute top-2 left-0 right-0 h-2.5 bg-black/18 transform rotate-2" />
        <div className="absolute top-5 left-0 right-0 h-1 bg-white/15 transform -rotate-1" />
        <div className="absolute top-7 left-0 right-0 h-3 bg-black/22 transform rotate-1" />
        <div className="absolute top-11 left-0 right-0 h-2 bg-black/15 transform -rotate-2" />
        <div className="absolute bottom-3 left-0 right-0 h-2.5 bg-black/20 transform rotate-1" />
        <div className="absolute top-6 right-3 w-4 h-4 rounded-full bg-white/15 transform rotate-45" />
        <div className="absolute top-3 left-2 w-2 h-3 rounded-full bg-black/30 transform rotate-30" />
        <div className="absolute bottom-5 left-5 w-3 h-2 rounded-full bg-white/18 transform -rotate-60" />
        <div className="absolute bottom-7 right-6 w-1.5 h-2 rounded-full bg-black/25 transform rotate-90" />
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full border border-white/8 transform rotate-15" />
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-full border border-white/4 transform rotate-15" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-black/12" />
        <div className="absolute top-1 left-2 w-4 h-4 rounded-full bg-white/20 blur-md" />
        <div className="absolute bottom-2 right-3 w-3 h-3 rounded-full bg-white/12 blur-sm" />
      </div>
    </div>
  )
}

const planetType2 = ({ theme, completed, ram }: PlanetProps) => {

  return (
    <div className="relative z-10 hover:scale-105 transition-transform ease-in-out">
      <div className={`w-20 h-20 rounded-full theme-${theme}
                shadow-2xl shadow-gray-700 dark:shadow-black animate-spin-slow-${!completed ? '' : ram === 2 ? 'right' : 'left'} flex items-center justify-center relative overflow-hidden`}>

        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/5 via-transparent to-black/20" />
        <div className="absolute top-3 left-4 w-3 h-3 rounded-full bg-black/25 shadow-inner" />
        <div className="absolute bottom-4 right-3 w-6 h-6 rounded-full bg-white/15 shadow-inner" />
        <div className="absolute top-6 right-8 w-2 h-2 rounded-full bg-black/30" />
        <div className="absolute bottom-7 left-5 w-1.5 h-1.5 rounded-full bg-white/25" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/10" />
        <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/20 blur-sm" />
      </div>
    </div>
  )
}

const planetType3 = ({ theme, completed, ram }: PlanetProps) => {

  return (
    <div className="relative z-10 hover:scale-105 transition-transform ease-in-out">
      <div className={`w-20 h-20 rounded-full theme-${theme}
            shadow-2xl shadow-gray-700 dark:shadow-black animate-spin-slow-${!completed ? '' : ram === 2 ? 'right' : 'left'} flex items-center justify-center relative overflow-hidden`}>

        <div className="absolute top-4 left-0 right-0 h-1.5 bg-white/10 transform rotate-1" />
        <div className="absolute top-6 left-0 right-0 h-2 bg-black/15 transform -rotate-1" />
        <div className="absolute top-9 left-0 right-0 h-1 bg-white/8 transform rotate-2" />
        <div className="absolute top-12 left-0 right-0 h-2.5 bg-black/20 transform -rotate-1" />
        <div className="absolute bottom-4 left-0 right-0 h-1.5 bg-white/12 transform rotate-1" />

        <div className="absolute top-5 left-6 w-2.5 h-2.5 rounded-full bg-black/35 transform rotate-45" />
        <div className="absolute top-8 right-4 w-3 h-2 rounded-full bg-white/20 transform -rotate-30" />
        <div className="absolute bottom-6 left-3 w-1.5 h-1.5 rounded-full bg-black/40" />
        <div className="absolute bottom-8 right-7 w-2 h-2 rounded-full bg-white/15 transform rotate-60" />

        <div className="absolute -top-4 -left-4 -right-4 -bottom-4 rounded-full border-2 border-white/12 transform rotate-12" />
        <div className="absolute -top-5 -left-5 -right-5 -bottom-5 rounded-full border border-white/8 transform rotate-12" />
        <div className="absolute -top-6 -left-6 -right-6 -bottom-6 rounded-full border border-white/6 transform rotate-12" />

        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/8 via-transparent to-black/25" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-tl from-transparent via-white/6 to-transparent" />

        <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white/15 blur-md" />
        <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-white/10 blur-sm" />

        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-black/5 to-transparent" />
      </div>
    </div>
  )
}



const Planet = ({ lesson }: Props) => {

  const noOfStars = Math.floor(Math.random() * 4) + 2;
  const ram = Math.floor(Math.random() * (3 - 2 + 1) + 2);
  const PlanetRandom = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  const planetDetails = {
    theme: lesson.theme,
    completed: lesson.completed,
    ram
  }

  return (
    <div className='w-full flex items-center justify-center gap-16 px-8 min-h-[250px]'>
      <div className='md:px-2 relative flex items-center justify-center '>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="min-w-40 min-h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full opacity-30" />
        </div>


        <Link href={`/courses/lesson/${lesson._id}`} >
          {PlanetRandom === 1 ? planetType1(planetDetails) :
            PlanetRandom === 2 ? planetType2(planetDetails) :
              planetType3(planetDetails)}
        </Link>


        <div className={`animate-spin-veryslow-${!lesson.completed ? '' : ram === 2 ? 'left' : 'right'} absolute`}>
          {[...Array(noOfStars)].map((_, i) => {
            const angle = (i * 360) / noOfStars;
            const radius = 74;

            return (
              <div
                key={i}
                className="absolute z-20"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: '0 0'
                }}
              >
                <div
                  className="w-3 h-3 rounded-full bg-gray-500/100 shadow-lg animate-pulse"
                  style={{
                    transform: `translateX(${radius}px)`,
                  }}
                >
                </div>
              </div>
            );
          })}
        </div>


      </div>
      <span className={`text-gray-700 dark:text-gray-400 
          ${lesson.completed ? 'text-gray-600 dark:text-gray-300' : 'text-gray-300 dark:text-gray-500'}
        font-semibold`}>{lesson.chapter}</span>
    </div>
  )
}

export default Planet
