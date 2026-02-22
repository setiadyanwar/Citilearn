import React from 'react';
import { cn } from '@/lib/utils';

export const GradeBadge = ({ status }) => (
    <span className={cn(
        "px-2.5 py-1 rounded-full text-3xs font-bold border ",
        status === 'Passed'
            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
            : "bg-red-50 text-red-700 border-red-100"
    )}>
        {status}
    </span>
);

export const TypeBadge = ({ type }) => {
    const colors = {
        'Pre-test': 'bg-indigo-50 text-indigo-700 border-indigo-100',
        'Quiz': 'bg-blue-50 text-blue-700 border-blue-100',
        'Post-test': 'bg-purple-50 text-purple-700 border-purple-100'
    };
    return (
        <span className={cn("px-2.5 py-1 rounded-full text-3xs font-bold border ", colors[type] || "bg-gray-50 text-main")}>
            {type}
        </span>
    );
};
