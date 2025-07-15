'use client'
import React, { useEffect } from 'react'
import { useAppDispatch } from '@/lib/redux/hooks'
import { setStreak, streakIsActive, setUserTheme } from '@/lib/redux/slices/userSlice'


const ClientSync = ( ) => {

    const dispatch = useAppDispatch();

    useEffect(() => {

        const themeCookie = document.cookie
            .split('; ')
            .find((row) => row.startsWith('user-theme='))
            ?.split('=')[1];
        const theme = themeCookie === 'dark' ? 'dark' : 'light';

        const raw = document.cookie
            .split('; ')
            .find((row) => row.startsWith('user-streak='))
            ?.split('=')[1];


        let streakData = { streak: 0, lastStreakDate: false };
        if (raw) {
            try {
                const decoded = decodeURIComponent(raw);
                const cookieDate = JSON.parse(decoded);

                const lastDate = cookieDate.lastStreakDate.toString().slice(0, 10);
                const today = new Date().toISOString().slice(0, 10);


                streakData = {
                    streak: cookieDate.streak,
                    lastStreakDate: lastDate === today ? true : false
                }

            } catch (e) {
                console.error('Failed to parse user-streak cookie', e);
            }
        }

        dispatch(setStreak(streakData.streak))
        dispatch(streakIsActive(streakData.lastStreakDate));
        dispatch(setUserTheme(theme));

    }, [dispatch])

    return null;
}

export default ClientSync
