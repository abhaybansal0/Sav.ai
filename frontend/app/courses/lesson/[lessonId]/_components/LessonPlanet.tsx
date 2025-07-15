import React from 'react'
import Link from 'next/link';
import { LessonType } from '@/lib/types';
import { planetType1, planetType2, planetType3, planetType4, planetType5  } from '@/app/courses/unit/[unitId]/PlanetTypes';
import '@/app/courses/unit/[unitId]/Planets.css'

interface Props {
    theme: 'Amber' | 'Blue' | 'Green' | 'Red' | 'Purple' | 'Orange' | 'Yellow' | 'Rose',
}


const LessonPlanet = ({ theme }: Props) => {

  const noOfStars = Math.floor(Math.random() * 4) + 2;
  const ram = Math.floor(Math.random() * (3 - 2 + 1) + 2);
  const PlanetRandom = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
  
  const planetDetails = {
    theme: theme,
    completed: false,
    ram
  }

  return (
    <div className='w-full flex items-center justify-center gap-16 px-8 min-h-[150px]'>
      <div className='md:px-2 relative flex items-center justify-center '>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="min-w-40 min-h-40 border-2 border-dashed border-gray-800 dark:border-gray-600 rounded-full opacity-30" />
        </div>


          {PlanetRandom === 1 ? planetType1(planetDetails) :
            PlanetRandom === 2 ? planetType2(planetDetails) :
            PlanetRandom === 3 ? planetType3(planetDetails) :
            PlanetRandom === 4 ? planetType4(planetDetails) :
              planetType5(planetDetails)}


        <div className={`animate-spin-veryslow-${ram === 2 ? 'left' : 'right'} absolute`}>
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

    </div>
  )
}

export default LessonPlanet
