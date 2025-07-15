// pages/index.tsx
import React from 'react';
import UnitCard from './UnitCard';
import LessonsPath from './LessonsPath';
import BreadCrumbs from './BreadCrumbs';
import { getLessonsByUnitId } from '@/lib/content';
import { UnitsType } from '@/lib/types';


interface Props {
    params: {
        unitId: string
    }
}

const page = async ({ params }: Props) => {

    const { unitId } = await params;

    const res = await getLessonsByUnitId(unitId);

    const unit = res?.unit as UnitsType;

    const { name, desciption, lessonCount, userCompletedLessonsCount, theme } = unit;
    const { lessons } = unit;

    const subjectName = unit.subject.name;
    const subjectId = unit.subject._id;

    const unitDetails = {
        name, desciption, lessonCount, userCompletedLessonsCount, theme
    }

    const BreadCrumbDetails = {
        subjectId,
        subjectName,
        name
    }

    return (
        <div className="w-full bg-transparent overflow-hidden relative px-12 md:px-4 h-1 min-h-screen">

            {/* Background stars */}
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

            <div className='h-full flex items-center justify-evenly md:flex-col'>

                {/* Unit details */}
                <div className='w-1/2 md:w-full 
                h-full pt-24 flex flex-col gap-24'>
                    <BreadCrumbs breadDetails={BreadCrumbDetails} />

                    <UnitCard unitDetails={unitDetails} />
                    
                </div>


                {/* Lessons Listed */}
                <LessonsPath lessons={lessons} />


            </div>
        </div>
    );
}


export default page