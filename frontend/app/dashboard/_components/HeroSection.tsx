'use client'
import React from 'react'
import StatCards from './StatCards'
import axios from 'axios'
import toast from 'react-hot-toast'


interface DataType {
    username: string
    streak: number
    xp: number
    coursesNo: number
    ProgressPer: number
}

const logout = async () => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/logout`, {},
            {
                withCredentials: true
            }
        );
        toast.success('Logged Out Successfully!')
    } catch (error) {
        console.log("Error while logging out: ", error)
    }
}

const HeroSection = ({
    userData: { username, xp, streak, coursesNo, ProgressPer },
}: {
    userData: DataType
}) => {


    return (
        <div className='w-full pt-32 tracking-normal px-12 md:px-4 pb-4 '>



            <div className='flex items-center justify-between md:flex-col md:gap-4 md:justify-center'>
                <div>
                    <div className='mb-2'>

                        <span className='text-3xl font-bold '>
                            Welcome back, {username}!
                        </span>
                    </div>
                    <div>
                        <span className='text-gray-400'>
                            Keep your streak alive, your next lesson awaits!
                        </span>
                    </div>
                </div>

                <div className='flex gap-4  rounded-lg text-gray-900 dark:text-white'>


                    <button className='px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 
                        text-white font-semibold
                    border-none'>
                        Continue Learning
                    </button>

                    <button onClick={logout} className='py-2 px-4 border rounded-md border-orange-300 text-orange-600 hover:bg-orange-50
                        font-semibold hover:text-black
                    '>
                        Daily challange
                    </button>
                </div>

            </div>

            {/* Stat Cards */}
            <div >


                <StatCards stats={{ xp, streak, coursesNo, ProgressPer }} />

            </div>
        </div>
    )
}

export default HeroSection
