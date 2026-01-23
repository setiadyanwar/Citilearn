import React from 'react';

const ProgressBar = ({
    progress,
    height = 'h-2',
    color = 'bg-primary',
    trackColor = 'bg-gray-100 dark:bg-slate-800',
    rounded = 'rounded-full',
    className = ''
}) => {
    return (
        <div className={`w-full ${height} ${trackColor} ${rounded} overflow-hidden ${className}`}>
            <div
                className={`h-full ${color} transition-all duration-700 ease-out ${rounded}`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
        </div>
    );
};

export default ProgressBar;
