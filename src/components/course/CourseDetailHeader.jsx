import React from 'react';
import { Globe, Clock, Upload, BookmarkPlus } from 'lucide-react';

const CourseDetailHeader = ({ course }) => {
    return (
        <header className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                <span className="self-start px-3 py-1 rounded-full bg-citilearn-green-light dark:bg-emerald-900/20 text-citilearn-green dark:text-emerald-400 text-xs font-bold border border-emerald-100 dark:border-emerald-900/30">
                    {course.category || 'Aviation'} Series
                </span>
                <div className="flex items-center gap-6">
                    <button className="flex items-center gap-3.5 text-citilink-dark/80 dark:text-slate-300 hover:text-primary transition-colors group cursor-pointer">
                        <Upload size={18} className="stroke-[1.5px]" />
                        <span className="text-base font-semibold border-b border-citilink-dark/20 group-hover:border-primary transition-colors pb-0.5 leading-none">Share</span>
                    </button>
                    <button className="flex items-center gap-3.5 text-citilink-dark/80 dark:text-slate-300 hover:text-primary transition-colors group cursor-pointer">
                        <BookmarkPlus size={18} className="stroke-[1.5px]" />
                        <span className="text-base font-semibold border-b border-citilink-dark/20 group-hover:border-primary transition-colors pb-0.5 leading-none">Save</span>
                    </button>
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-citilink-dark dark:text-white leading-tight tracking-tight">
                {course.title}
            </h1>

            <p className="text-gray-500 dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-3xl">
                {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-2xs font-bold">
                        CA
                    </div>
                    <span className="text-sm font-bold text-gray-600 dark:text-slate-300">Citilink Academy</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-slate-400">
                    <Globe size={16} className="text-gray-400" />
                    <span>English</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-slate-400">
                    <Clock size={16} className="text-gray-400" />
                    <span>Last updated June 2025</span>
                </div>
            </div>
        </header>
    );
};

export default CourseDetailHeader;
