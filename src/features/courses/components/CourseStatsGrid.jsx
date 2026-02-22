import React from 'react';
import { Clock, Layers, Award, ShieldCheck } from 'lucide-react';

const CourseStatsGrid = ({ course }) => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-between font-inter">
            {[
                { label: 'Duration', value: course.duration, icon: Clock },
                { label: 'Modules', value: `${course.modules.length} Units`, icon: Layers },
                { label: 'Certificate', value: 'Official', icon: Award },
                { label: 'Access', value: 'Lifetime', icon: ShieldCheck }
            ].map((stat, idx) => (
                <div key={idx} className={`flex-1 flex flex-col items-center justify-center gap-2 ${idx < 3 ? 'border-r border-gray-100 dark:border-slate-800' : ''}`}>
                    <stat.icon size={24} className="text-citilearn-green" />
                    <div className="text-center mt-2">
                        <p className="text-2xs font-bold text-tertiary dark:text-slate-500  mb-3.5 leading-none">{stat.label}</p>
                        <p className="text-sm font-bold text-main dark:text-white leading-none">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseStatsGrid;
