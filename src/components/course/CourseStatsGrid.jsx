import React from 'react';
import { Clock, Layers, Award, ShieldCheck } from 'lucide-react';

const CourseStatsGrid = ({ course }) => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-sm font-inter">
            {[
                { label: 'Duration', value: course.duration, icon: Clock },
                { label: 'Modules', value: `${course.modules.length} Units`, icon: Layers },
                { label: 'Certificate', value: 'Official', icon: Award },
                { label: 'Access', value: 'Lifetime', icon: ShieldCheck }
            ].map((stat, idx) => (
                <div key={idx} className={`flex-1 flex flex-col items-center justify-center gap-2 ${idx < 3 ? 'border-r border-gray-100 dark:border-slate-800' : ''}`}>
                    <stat.icon size={24} className="text-[#059669]" />
                    <div className="text-center mt-2">
                        <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 tracking-wider mb-[14px] leading-none">{stat.label}</p>
                        <p className="text-sm font-black text-[#334155] dark:text-white leading-none">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseStatsGrid;
