import React from 'react'
import LessonTheory from './_components/LessonTheory'
import { getLessonbyLessonId } from '@/lib/content'
import { LessonType } from '@/lib/types'
import { notFound } from 'next/navigation'
import TestContainer from './_components/TestContainer'


interface Props {
  params: {
    lessonId: string
  }
  searchParams: { mode?: 'test' };
}

const page = async ({ params, searchParams }: Props) => {

  const { lessonId } = await params;
  const { mode } = await searchParams;

  const res = await getLessonbyLessonId(lessonId);
  if (!res) notFound();

  const lesson = res?.lesson as LessonType;

  const { _id, standard, chapter, concept, theme, explanation, formulae, unit } = lesson;
  const startInfo = {
    _id, standard, chapter, concept, theme, explanation, formulae
  }
  const lessonInfo = {
    _id, unit, standard, chapter, concept
  }

  return (
    <div className='w-full bg-transparent pt-24 flex flex-col justify-center items-center min-h-screen relative gap-8 pb-12'>

      <div className="absolute inset-0 -z-10 
      bg-gradient-to-br from-white via-[#e6f2fa] to-[#d4e5f0] text-gray-900
      dark:bg-gradient-to-br dark:from-black dark:via-[#112236] dark:to-[#0b0c10] dark:text-white
    ">

        {[...Array(120)].map((_, i) => {
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


      {mode === 'test' ?
        <TestContainer 
        questions={lesson.questions} 
        revisionCard={lesson.revisionCards}
        lessonInfo={lessonInfo} /> :

        <LessonTheory startInfo={startInfo} />
      }

    </div>
  )
}

export default page






export async function generateMetadata({ params }: Props) {
  const { lessonId } = await params;
  const res = await getLessonbyLessonId(lessonId);

  return {
    title: res.lesson?.chapter || 'Lesson',
    description: `Test your knowladge on ${res.lesson?.concept}`
  }
}