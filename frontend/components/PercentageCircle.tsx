'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { Percent } from 'lucide-react';

type Props = {
    percentage: number;
    size?: number;
    stroke?: number;
};

export default function PercentageCircle({ percentage, size = 50, stroke = 7 }: Props) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;

    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            strokeDashoffset: circumference - (percentage / 100) * circumference,
            transition: { duration: 1.2, ease: 'easeInOut' },
        });
    }, [percentage]);

    return (
        <div className="relative w-fit">
            <svg width={size} height={size} className="rotate-[-90deg]">
                <defs>
                    <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />   {/* blue-500 */}
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                </defs>

                <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />

                <motion.circle
                    stroke="url(#gradient)"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    animate={controls}
                />
            </svg>

            {/* Icon centered over the SVG */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Percent size={20} className="text-blue-500 dark:text-blue-300 " />
            </div>
        </div>
    );
}
