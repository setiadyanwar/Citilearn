import React from 'react';
import { Clock, BookOpen, Award, CheckCircle2 } from 'lucide-react';

const CourseStatsGrid = ({ course }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center gap-2 transition-colors">
                <Clock size={24} className="text-primary" />
                <span className="text-sm font-bold text-gray-500 dark:text-slate-500 uppercase tracking-tighter">Duration</span>
                <span className="text-lg font-black text-citilink-dark dark:text-white">{course.duration}</span>
            </div>
            <div className="p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center gap-2 transition-colors">
                <BookOpen size={24} className="text-primary" />
                <span className="text-sm font-bold text-gray-500 dark:text-slate-500 uppercase tracking-tighter">Modules</span>
                <span className="text-lg font-black text-citilink-dark dark:text-white">{course.modules.length} Units</span>
            </div>
            <div className="p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center gap-2 transition-colors">
                <Award size={24} className="text-primary" />
                <span className="text-sm font-bold text-gray-500 dark:text-slate-500 uppercase tracking-tighter">Certificate</span>
                <span className="text-lg font-black text-citilink-dark dark:text-white">Official</span>
            </div>
            <div className="p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center gap-2 transition-colors">
                <CheckCircle2 size={24} className="text-primary" />
                <span className="text-sm font-bold text-gray-500 dark:text-slate-500 uppercase tracking-tighter">Access</span>
                <span className="text-lg font-black text-citilink-dark dark:text-white">Lifetime</span>
            </div>
        </div>
    );
};

export default CourseStatsGrid;
