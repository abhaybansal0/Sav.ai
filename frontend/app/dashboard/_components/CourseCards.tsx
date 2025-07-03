import React from 'react';
import ProgressBar from '@/components/CourseProgressBar';
import Link from 'next/link';

interface CourseCardProps {
    title: string;
    progress: number;
    color: string;
    isStarted: boolean;
    subId: string;
    tag: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, progress, color, isStarted, subId, tag }) => {
    return (
        <div className="bg-white dark:bg-black/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                        <div className="w-6 h-6 bg-white bg-opacity-30 rounded-full"></div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        {/* <div className='py-1 px-2 rounded-full bg-green-100 text-center flex items-center justify-center'>

                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{tag}</p>
                        </div> */}
                    </div>
                </div>
                {/* <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" /> */}
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between ">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {progress}%
                    </span>
                </div>

                <ProgressBar progress={progress} />

                <Link href={`courses/${subId}`} className='hover:cursor-pointer'>
                    <button className={`w-full py-3 px-4 rounded-lg font-medium hover:cursor-pointer transition-colors duration-200 mt-4 ${isStarted
                        ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-500 hover:to-blue-800 text-white'
                        : 'bg-gray-300 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700'
                        }`}>
                        {isStarted ? 'Continue' : 'Start'}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CourseCard