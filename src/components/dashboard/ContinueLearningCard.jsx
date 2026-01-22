import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const ContinueLearningCard = ({ course }) => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-primary dark:hover:border-primary transition-all duration-300 group flex flex-col md:flex-row h-full md:min-h-[8rem] relative">
            {/* Thumbnail */}
            <div className="relative w-full md:w-32 h-32 md:h-full bg-gray-100 dark:bg-slate-800 shrink-0">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center md:hidden">
                    <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 flex items-center justify-center text-primary shadow-sm">
                        <Play size={16} fill="currentColor" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-center flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full border border-amber-100 dark:border-amber-900/30 shrink-0">
                        Continue
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold shrink-0">{course.duration} left</span>
                </div>

                <h3 className="text-xl font-bold text-citilink-dark dark:text-white mb-1 truncate leading-tight group-hover:text-primary transition-colors" title={course.title}>
                    {course.title}
                </h3>

                <p className="text-base mb-3 line-clamp-1">
                    <span className="text-gray-400 dark:text-slate-500 font-medium">Next:</span>
                    <span className="text-citilink-dark dark:text-white font-bold ml-1.5">
                        {course.modules[0]?.lessons[0]?.title || "Module 1"}
                    </span>
                </p>

                <div className="space-y-1.5">
                    <div className="flex justify-between items-center font-bold">
                        <span className="text-[14px] text-gray-400 dark:text-slate-500">Progress</span>
                        <span className="text-[16px] font-semibold text-primary dark:text-primary-light">{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Full Card Link Overlay */}
            <Link to={`/learn/${course.id}`} className="absolute inset-0 z-10" />
        </div>
    );
};

export default ContinueLearningCard;
