import React from 'react';
import { Clock } from 'lucide-react';

const CourseStatsGrid = ({ course }) => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-10 flex items-center justify-between shadow-sm">
            {[
                { label: 'Duration', value: course.duration },
                { label: 'Modules', value: `${course.modules.length} Units` },
                { label: 'Certificate', value: 'Official' },
                { label: 'Access', value: 'Lifetime' }
            ].map((stat, idx) => (
                <div key={idx} className={`flex-1 flex flex-col items-center justify-center gap-3 ${idx < 3 ? 'border-r border-gray-100 dark:border-slate-800' : ''}`}>
                    <Clock size={20} className="text-[#059669]" />
                    <div className="text-center">
                        <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-1">{stat.label}</p>
                        <p className="text-sm md:text-base font-black text-[#334155] dark:text-white leading-none">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseStatsGrid;
