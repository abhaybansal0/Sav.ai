import { UnitsType } from "@/lib/types";
import Link from "next/link";
import './galaxyClasses.css'
import { CircleDashed } from "lucide-react";

interface Props {
    unit: UnitsType;
    i: number
}

const GalaxyUnit = ({ unit, i }: Props) => {

    const progress = Math.floor((unit.userCompletedLessonsCount / unit.lessonCount) * 100) || 0;

    return (
        <div className={`relative flex items-center justify-center gap-36 md:gap-20 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`} >

            <Link href={`/courses/unit/${unit._id}`}>
                <div className="galaxy cursor-pointer ">
                    <div className="galaxyRing ring1"></div>
                    <div className="galaxyRing ring2"></div>
                    <div className="galaxyRing ring3"></div>
                    <div className="galaxyRing ring4"></div>
                    <div className={`galaxyCenter center-${unit.theme} animate-pulse-slow`}></div>
                </div>
            </Link>

            <div className="text-center mt-4">
                <h3 className="text-black dark:text-white font-semibold text-sm">{unit?.name}</h3>
                <p className="text-gray-400 text-xs mt-1">{progress ? progress : '0'}% Completed</p>
                <p className="text-gray-400 text-xs mt-1 flex items-center justify-center gap-2">
                    <CircleDashed size={12} /> {unit.lessonCount} Lesssons
                     </p>
                <Link href={`/courses/unit/${unit._id}`}>
                    <button className="border border-black p-1 px-2 rounded-md text-xs font-bold mt-2
                        dark:text-gray-300 dark:border-gray-400 text-center
                        ">
                        {progress === 100 ? 'Revisit' : progress > 0 ? 'Continue' : 'Warp to'}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default GalaxyUnit