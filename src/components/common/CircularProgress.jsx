import React from 'react';

const CircularProgress = ({
    progress,
    size = 'w-16 h-16',
    strokeWidth = 10,
    color = 'text-primary',
    trackColor = 'text-gray-100 dark:text-main',
    textSize = 'text-sm'
}) => {
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className={`relative ${size} flex items-center justify-center shrink-0`}>
            <svg className={`${size} transform -rotate-90`} viewBox="0 0 100 100">
                <circle
                    cx="50" cy="50" r={radius}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className={trackColor}
                />
                <circle
                    cx="50" cy="50" r={radius}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset: offset }}
                    className={`${color} transition-all duration-1000 ease-out`}
                    strokeLinecap="round"
                />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center font-bold ${textSize} ${color}`}>
                {progress}%
            </span>
        </div>
    );
};

export default CircularProgress;
