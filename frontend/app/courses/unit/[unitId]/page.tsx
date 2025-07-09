// pages/index.tsx
import React from 'react';
import MentorAvatar from '@/components/MentorAvatar';
import UnitCard from './UnitCard';
import LessonsPath from './LessonsPath';
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

    const unitDetails = {
        name, desciption, lessonCount, userCompletedLessonsCount, theme
    }



    return (
        <div className="w-full bg-transparent overflow-hidden relative px-12 md:px-4 h-1 min-h-screen">

            {/* Background stars */}
            <div className="absolute inset-0 -z-10 
                bg-gradient-to-br from-white via-[#e6f2fa] to-[#d4e5f0] text-gray-900
                dark:bg-gradient-to-br dark:from-black dark:via-[#112236] dark:to-[#0b0c10] dark:text-white
                ">

                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-black dark:bg-gray-300 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className='h-full flex items-center justify-evenly md:flex-col'>

                {/* Unit details */}
                <UnitCard unitDetails={unitDetails} />


                {/* Lessons Listed */}
                <LessonsPath lessons={lessons} />



                {/* <MentorAvatar
                seed="newton"
                options={{
                    hair: ['short15'],
                    facialHair: ['beardMedium'],
                    clothes: ['shirt'],
                }}
                className="w-32 h-32"
            /> */}

            </div>
        </div>
    );
}


export default page