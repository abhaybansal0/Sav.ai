'use client'
import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import StreakButton from './StreakButton';
import ThemeButton from './ThemeButton';
import { ReduxProvider } from '@/lib/redux/provider';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
    active: 'courses' | 'dashboard' | 'profile';
}

const Header: React.FC<Props> = ({ active }) => {

    const router = useRouter();
    const logoutUser = async () => {
        try {
            const res = await axios.post(`/api/auth/logout`, {},
                { withCredentials: true }
            );
            toast.success('Logged Out Successfully!')
            router.push('/login')
        } catch (error) {
            console.log("Error while logging out: ", error)
        }
    }

    return (

        <header className="bg-blue-50/20 dark:bg-blue-800/10 backdrop-blur-lg text-gray-900 dark:text-white px-12 py-5 border-b
        fixed w-screen z-30
         border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="flex items-center justify-between max-w-full mx-auto">

                {/* Logo */}
                <div className="flex items-center">

                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <span className="text-xl font-semibold">Sav.ai</span>
                    </Link>

                </div>

                {/* Navigation Links */}
                <nav className="flex items-center space-x-8">
                    <Link
                        href="/dashboard"
                        className={`
                            ${active === 'dashboard' ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-400'}
                            hover:text-blue-800 dark:hover:text-blue-500 transition-colors duration-200
                            `}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/courses"
                        className={` dark:text-gray-300 
                             ${active === 'courses' ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-400'}
                            hover:text-blue-800 dark:hover:text-blue-500 transition-colors duration-200
                            `}
                    >
                        Courses
                    </Link>
                    <Link
                        href="/my-space"
                        className={` dark:text-gray-300 
                             ${active === 'profile' ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-400'}
                            hover:text-blue-800 dark:hover:text-blue-500 transition-colors duration-200
                            `}
                    >
                        My Space
                    </Link>
                </nav>

                {/* Right Side - Streak, Theme Toggle, Settings, Profile */}
                <div className="flex items-center space-x-4">

                    <ReduxProvider>
                        {/* Streak Buttton*/}
                        <StreakButton />

                        {/* Theme Toggle */}
                        <ThemeButton />
                    </ReduxProvider>

                    {/* Profile */}
                    <button
                        onClick={logoutUser}
                        className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                        <LogOut size={16} className="text-white " />
                    </button>
                </div>
            </div>
        </header>


    );
};




export default Header;
