'use client'
import React, { useEffect, useState } from 'react'

type Theme = keyof typeof themeMap;

type Props = {
    stat: number;
    theme: Theme;
    isPercent?: boolean;
    isStreak?: boolean;
}


const themeMap = {
    orange: "text-orange-900 dark:text-orange-100",
    yellow: "text-yellow-900 dark:text-yellow-100",
    green: 'text-green-900 dark:text-green-100',
    blue: 'text-blue-900 dark:text-blue-100',
} as const


const StatRoller = ({ stat, theme, isPercent = false, isStreak = false }: Props) => {

    const [display, setDisplay] = useState(0);


    useEffect(() => {
        const duration = 800; // ms
        const startTime = performance.now();

        const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setDisplay(Math.floor(progress * stat));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [stat]);

    const colorClasses = themeMap[theme];

    return (
        <span className={`font-bold text-2xl ${colorClasses}`}>
            {display}{isPercent ? '%' : ''}{isStreak ? ' days' : ''}
        </span>
    )
}

export default StatRoller
