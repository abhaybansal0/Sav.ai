'use client'
import React from 'react';
import { motion } from 'framer-motion';
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
        <motion.div 
            className="bg-white dark:bg-black/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.3,
                ease: "easeOut"
            }}
            whileHover={{ 
                scale: 1.015,
                transition: { duration: 0.2 }
            }}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <motion.div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                            duration: 0.3,
                            delay: 0.1
                        }}
                    >
                        <div className="w-6 h-6 bg-white bg-opacity-30 rounded-full"></div>
                    </motion.div>
                    <div>
                        <motion.h3 
                            className="text-lg font-semibold text-gray-900 dark:text-white"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                                duration: 0.3,
                                delay: 0.2
                            }}
                        >
                            {title}
                        </motion.h3>
                    </div>
                </div>
            </div>

            <motion.div 
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                    duration: 0.3,
                    delay: 0.3
                }}
            >
                <div className="flex items-center justify-between ">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {progress}%
                    </span>
                </div>

                <ProgressBar progress={progress} />

                <Link href={`courses/${subId}`} className='hover:cursor-pointer'>
                    <motion.button 
                        className={`w-full py-3 px-4 rounded-lg font-medium hover:cursor-pointer transition-colors duration-200 mt-4 ${
                            isStarted
                                ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-500 hover:to-blue-800 text-white'
                                : 'bg-gray-300 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700'
                        }`}
                        whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isStarted ? 'Continue' : 'Start'}
                    </motion.button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default CourseCard;