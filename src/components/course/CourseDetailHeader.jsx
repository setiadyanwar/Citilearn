import React from 'react';
import { Globe, Clock, Share2, Bookmark } from 'lucide-react';

const CourseDetailHeader = ({ course }) => {
    return (
        <header className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="self-start px-3 py-1 rounded-full bg-[#EBF7F2] dark:bg-emerald-900/20 text-[#059669] dark:text-emerald-400 text-xs font-bold border border-emerald-100 dark:border-emerald-900/30">
                    {course.category || 'Aviation'} Series
                </span>
                <div className="flex items-center gap-4 text-gray-400">
                    <button className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                        <Share2 size={18} />
                        <u>Share</u>
                    </button>
                    <button className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                        <Bookmark size={18} />
                        <u>Save</u>
                    </button>
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#334155] dark:text-white leading-[1.15] tracking-tight">
                {course.title}
            </h1>

            <p className="text-gray-500 dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-3xl">
                {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-y-3 gap-x-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">
                        CA
                    </div>
                    <span className="text-sm font-bold text-gray-600 dark:text-slate-300">Citilink Academy</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-400 dark:text-slate-500">
                    <Globe size={18} />
                    <span>English</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-400 dark:text-slate-500">
                    <Clock size={18} />
                    <span>Last updated June 2025</span>
                </div>
            </div>
        </header>
    );
};

export default CourseDetailHeader;
