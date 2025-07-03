'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react';
import { useAppSelector } from '@/lib/redux/hooks';
import axios from 'axios';
import toast from 'react-hot-toast';

const ThemeButton = () => {

    const [isDark, setIsDark] = useState<boolean>(
        () =>
            typeof window !== "undefined" &&
            document.documentElement.classList.contains("dark")
    );

    const { userTheme } = useAppSelector((state) => state.user)


    const toggleTheme = useCallback(
        async () => {
            const nextIsDark = !isDark;

            document.documentElement.classList.toggle("dark", nextIsDark);
            setIsDark(nextIsDark);

            // api call to make the preference to dark
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/settheme`,
                    { theme: nextIsDark ? 'dark' : 'light' },
                    {
                        withCredentials: true
                    }
                );

            } catch (error) {
                console.log('Error in setting theme: ', error)
                toast.error('Error while setting the theme')
            }
        },
        [isDark],
    )

    useEffect(() => {
        const shouldBeDark = userTheme === 'dark';
        if (shouldBeDark !== isDark) {
            // only update when there’s a mismatch
            document.documentElement.classList.toggle('dark', shouldBeDark);
            setIsDark(shouldBeDark);
        }
    }, [userTheme]);



    return (
        <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    )
}

export default ThemeButton
