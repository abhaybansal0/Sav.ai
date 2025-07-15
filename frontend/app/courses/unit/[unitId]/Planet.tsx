import Link from 'next/link';
import React from 'react'
import { LessonType } from '@/lib/types';
import { planetType1, planetType2, planetType3, planetType4, planetType5 } from './PlanetTypes';
import './Planets.css'

interface Props {
  lesson: LessonType
}


const Planet = ({ lesson }: Props) => {

  const noOfStars = Math.floor(Math.random() * 4) + 2;
  const ram = Math.floor(Math.random() * (3 - 2 + 1) + 2);
  const PlanetRandom = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
  
  const planetDetails = {
    theme: lesson.theme,
    completed: lesson.completed ,
    ram
  }

  return (
    <div className='w-full flex items-center justify-center gap-16 px-8 min-h-[250px]'>
      <div className='md:px-2 relative flex items-center justify-center '>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="min-w-40 min-h-40 border-2 border-dashed border-gray-800 dark:border-gray-600 rounded-full opacity-30" />
        </div>


        <Link href={`/courses/lesson/${lesson._id}`} >
          {PlanetRandom === 1 ? planetType1(planetDetails) :
            PlanetRandom === 2 ? planetType2(planetDetails) :
            PlanetRandom === 3 ? planetType3(planetDetails) :
            PlanetRandom === 4 ? planetType4(planetDetails) :
              planetType5(planetDetails)}
        </Link>


        <div className={`animate-spin-veryslow-${lesson.completed ? '' : ram === 2 ? 'left' : 'right'} absolute`}>
          {!lesson.completed && [...Array(noOfStars)].map((_, i) => {
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
      <span className={`
          ${!lesson.completed ? 'text-gray-800 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}
        font-semibold`}>{lesson.chapter}</span>
    </div>
  )
}

export default Planet
