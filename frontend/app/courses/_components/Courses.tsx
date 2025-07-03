import React from 'react'
import { BookOpen, Code, Search } from 'lucide-react'
import CourseCard from './CourseCard';

const sampleCourses = [
    {
        title: "JavaScript Fundamentals",
        description: "Learn the basics of JavaScript programming language with hands-on exercises",
        level: "Beginner" as const,
        rating: 4.8,
        students: 15420,
        units: 12,
        duration: "4 weeks",
        progress: 85,
        icon: <Code className="w-6 h-6 text-white" />,
        gradientColors: "from-orange-400 via-red-500 to-pink-500",
        isStarted: true
    },
    {
        title: "React Advanced Patterns",
        description: "Master advanced React patterns and best practices for scalable applications",
        level: "Advanced" as const,
        rating: 4.9,
        students: 8750,
        units: 16,
        duration: "6 weeks",
        progress: 0,
        icon: <Code className="w-6 h-6 text-white" />,
        gradientColors: "from-blue-500 via-purple-500 to-pink-500",
        isStarted: false
    },
    {
        title: "Python for Data Science",
        description: "Comprehensive introduction to Python programming for data analysis and visualization",
        level: "Intermediate" as const,
        rating: 4.7,
        students: 12300,
        units: 20,
        duration: "8 weeks",
        progress: 42,
        icon: <BookOpen className="w-6 h-6 text-white" />,
        gradientColors: "from-green-400 via-blue-500 to-purple-600",
        isStarted: true
    }
];

const Courses = () => {
    return (
        <div className='w-full light-teal dark:bg-background text-black dark:text-white tracking-normal px-12 md:px-4 pb-4 pt-6'>

            <div className='flex mb-8'>

                <div className='flex-1 relative '>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input type="text"
                        placeholder='Search courses...'
                        className='w-2/5 border dark:border-gray-900 p-4 py-5 h-4 bg-white dark:bg-gray-800 rounded-md text-black dark:text-white text-sm pl-10' />

                </div>

            </div>


            <div className="grid grid-cols-3 gap-6 lg:grid-cols-2 md:grid-cols-1 ">
                {sampleCourses.map((course, index) => (
                    <CourseCard key={index} {...course} />
                ))}
            </div>
        </div>
    )
}

export default Courses
