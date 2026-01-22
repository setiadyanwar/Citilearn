import React from 'react';
import { Globe, Clock } from 'lucide-react';

const CourseDetailHeader = ({ course }) => {
    return (
        <header className="space-y-6">
            <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm font-bold border border-emerald-100 dark:border-emerald-900/30">
                    Aviation Series
                </span>

            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-citilink-dark dark:text-white leading-tight tracking-tight">
                {course.title}
            </h1>

            <p className="text-gray-600 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
                {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-2">
                <div className="flex items-center gap-4 text-base font-bold text-gray-700 dark:text-slate-300">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                        <img src="https://ui-avatars.com/api/?name=Citilink+Academy&background=random" alt="Author" className="rounded-full w-full h-full" />
                    </div>
                    <span className="text-sm">Citilink Academy</span>
                </div>
                <div className="hidden sm:block h-6 w-px bg-gray-200 dark:bg-slate-800" />
                <div className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-slate-500">
                    <Globe size={18} />
                    <span>English</span>
                </div>
                <div className="hidden sm:block h-6 w-px bg-gray-200 dark:bg-slate-800" />
                <div className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-slate-500">
                    <Clock size={18} />
                    <span>Last updated June 2025</span>
                </div>
            </div>
        </header>
    );
};

export default CourseDetailHeader;
