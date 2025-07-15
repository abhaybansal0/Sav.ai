
import React from 'react';
import { Code, Users, BookOpen, Clock, Star, ChevronRight, Play, Omega } from 'lucide-react';
import { CoursesType } from '@/lib/types';
import Link from 'next/link';

const CourseCard = ({
    _id, name, icon, description, rating = 4, students = 10, duration = '4 Weeks', unitCount, difficulty, progress, isStarted, gradientColors = 'from-blue-500 via-purple-500 to-pink-500'
}: CoursesType) => {


    const ProgressPer = progress / unitCount * 100;

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Beginner':
                return 'bg-green-400 text-white';
            case 'Intermediate':
                return 'bg-yellow-500 text-white';
            case 'Advanced':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <Star key="half" className="w-4 h-4  text-yellow-400" />
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Star key={`empty-${i}`} className="w-4 h-4 text-gray-500" />
            );
        }

        return stars;
    };

    return (
        <div className="bg-white/5  dark:bg-gray-900/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.001] hover:border-blue-500/50 group">

            {/* Header with Gradient Background */}
            <div className={`bg-gradient-to-br ${gradientColors} p-6 relative overflow-hidden lg:p-5 md:p-4`}>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 lg:w-24 lg:h-24 md:w-20 md:h-20"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-10 lg:w-16 lg:h-16 md:w-14 md:h-14"></div>

                <div className="relative z-10 flex items-center justify-between">
                    {/* Course Icon */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 lg:p-2.5 md:p-2">
                        {icon || <Code className="w-6 h-6 text-white lg:w-5 lg:h-5 md:w-4 md:h-4" />}
                    </div>


                    {/* Level Badge */}
                    <div className={`${getLevelColor(difficulty)} px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm lg:px-2.5 md:px-2 md:text-xs`}>
                        {difficulty}
                    </div>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 lg:p-5 md:p-4">
                {/* Title and Description */}
                <div className="mb-4 lg:mb-3 md:mb-2">
                    <h3 className="text-xl font-bold text-gray-700 dark:text-white mb-2 group-hover:text-blue-600 transition-colors lg:text-lg md:text-base lg:mb-1.5 md:mb-1">
                        {name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-normal lg:text-xs md:text-xs ">
                        {description}
                    </p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4 lg:mb-3 md:mb-2 lg:space-x-1.5 md:space-x-1">
                    <div className="flex space-x-1 lg:space-x-0.5 md:space-x-0.5">
                        {renderStars(rating)}
                    </div>
                    <span className="text-gray-500 dark:text-white font-medium text-sm lg:text-xs md:text-xs">{rating}</span>
                    <span className="text-gray-500 text-xs lg:text-xs md:text-xs">({students.toLocaleString()} students)</span>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 lg:gap-3 lg:mb-4 md:gap-2 md:mb-3">
                    <div className="flex items-center justify-start space-x-2 text-gray-400 lg:space-x-1.5 md:space-x-1">
                        <BookOpen className="w-4 h-4 lg:w-3.5 lg:h-3.5 md:w-3 md:h-3" />
                        <span className="text-sm  lg:text-xs md:text-xs">{unitCount} units</span>
                    </div>
                    <div className="flex items-center justify-end space-x-2 text-gray-400 lg:space-x-1.5 md:space-x-1">
                        <Clock className="w-4 h-4 lg:w-3.5 lg:h-3.5 md:w-3 md:h-3" />
                        <span className="text-sm lg:text-xs md:text-xs">{duration}</span>
                    </div>
                </div>

                {/* Progress Section */}
                {isStarted && (
                    <div className="mb-6 lg:mb-4 md:mb-3">
                        <div className="flex justify-between items-center mb-2 lg:mb-1.5 md:mb-1">
                            <span className="text-sm text-gray-400 lg:text-xs md:text-xs">Progress</span>
                            <span className="text-sm font-semibold text-gray-600 dark:text-white lg:text-xs md:text-xs">{ProgressPer}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden lg:h-1.5 md:h-1.5">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out lg:h-1.5 md:h-1.5"
                                style={{ width: `${ProgressPer}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <Link href={`/courses/${_id}`}>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-500 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex text-center items-center justify-center space-x-2 group/btn shadow-sm hover:shadow-blue-500/15 lg:py-2.5 lg:px-4 md:py-2 md:px-3 lg:text-sm md:text-sm lg:space-x-1.5 md:space-x-1">
                        {isStarted ? (
                            <>
                                <span>Continue Learning</span>
                                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform lg:w-3.5 lg:h-3.5 md:w-3 md:h-3" />
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4 lg:w-3.5 lg:h-3.5 md:w-3 md:h-3" />
                                <span>Start Course</span>
                            </>
                        )}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CourseCard