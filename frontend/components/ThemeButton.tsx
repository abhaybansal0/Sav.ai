'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setUserTheme } from '@/lib/redux/slices/userSlice'
import axios, { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

const ThemeButton = () => {

    const [isDark, setIsDark] = useState<boolean>(
        () =>
            typeof window !== "undefined" &&
            document.documentElement.classList.contains("dark")
    );

    const { userTheme } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch();

    const toggleTheme = useCallback(
        async () => {

            const nextIsDark = !isDark;

            // api call to make the preference to dark
            try {
                const res = await axios.post(`/api/auth/settheme`,
                    { theme: nextIsDark ? 'dark' : 'light' },
                    {
                        withCredentials: true
                    }
                );

                if (res.data.success) {
                    document.documentElement.classList.toggle("dark", nextIsDark);
                    setIsDark(nextIsDark);
                    dispatch(setUserTheme(nextIsDark ? 'dark' : 'light'));
                }
            } catch (error: unknown) {
                if (isAxiosError(error)) {

                    document.documentElement.classList.toggle('dark', isDark);
                    setIsDark(isDark);

                    console.error('Error setting theme:', error);

                    // Handle specific error cases
                    if (error.response?.status === 401) {
                        toast.error('Please login to save theme preference');
                    } else {
                        toast.error('Failed to save theme preference');
                    }
                } else if (error instanceof Error) {
                    console.error("Something went wrong:", error.message);
                }
                else {
                    // totally unexpected
                    console.error("Unknown error", error);
                }
            } finally {
                setIsDark(nextIsDark);
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
    }, [userTheme, isDark]);



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
