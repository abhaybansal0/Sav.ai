import React from 'react'
import LessonPlanet from './LessonPlanet'
import MathBlock from './MathBlock'
import Link from 'next/link'

interface Props {
    startInfo: {
        _id: string,
        standard: number,
        chapter: string,
        concept: string,
        theme: "Amber" | "Blue" | "Green" | "Red" | "Purple" | "Orange" | "Yellow" | "Rose",
        explanation: string,
        formulae: {
            latex: string,
            symbols: string[],
        }[],
    }
}

const LessonTheory = ({ startInfo }: Props) => {
    return (
        <div className='w-3/4 pt-8 pb-8 md:w-full bg-white/50 dark:bg-black/40 backdrop-blur-sm rounded-2xl border dark:border-gray-700 flex flex-col items-center justify-center gap-4'>

            {/* Planet component */}
            <LessonPlanet theme={startInfo.theme} />

            {/* Title and lesson details */}
            <h1 className='text-3xl text-black dark:text-gray-200 font-bold'>{startInfo.chapter}</h1>
            <p className='text-gray-500 font-semibold text-lg'>
                Class {startInfo.standard}th • {startInfo.concept}
            </p>


            {/* Theory */}
            <div className='w-3/4 p-8 rounded-2xl bg-white/50 dark:bg-gray-800/40 backdrop-blur-sm mt-6 text-center'>
                <p className='text-lg text-center text-black/80 dark:text-white/80'>
                    {startInfo.explanation}
                </p>
            </div>


            {/* Formulae */}
            <div className='w-3/4 p-8 rounded-2xl bg-white/50 dark:bg-gray-800/40 backdrop-blur-sm mt-6 text-center'>
                <h2 className='text-xl text-gray-700 dark:text-gray-300'>To Remember:</h2>
                <div className='text-lg text-center text-black/80 dark:text-white/80'>
                    {startInfo.formulae.map((f, i) => {
                        return <MathBlock latex={f.latex} key={i} />
                    })}

                </div>
            </div>

            <Link href={{
                pathname: `/courses/lesson/${startInfo._id}`,
                query: { mode: 'test' }
            }}>
                <button className="w-full px-12 min-w-52 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg"
                >
                    Start
                </button>
            </Link>


        </div>
    )
}

export default LessonTheory
