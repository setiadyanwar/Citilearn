import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Play } from 'lucide-react';

const CourseCard = ({ course, compact = false }) => {
    const getBadge = (status) => {
        if (compact) return null; // Hide badges in compact mode to save space
        switch (status) {
            case 'Done':
                return (
                    <span className="flex items-center gap-1.5 bg-emerald-50 dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 shadow-sm transition-colors">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Completed
                    </span>
                );
            case 'On Progress':
                return (
                    <span className="flex items-center gap-1.5 bg-amber-50 dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30 shadow-sm transition-colors">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        In Progress
                    </span>
                );
            default:
                return (
                    <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-slate-700 shadow-sm transition-colors">
                        <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                        Not Started
                    </span>
                );
        }
    };

    return (
        <div className={`bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-primary dark:hover:border-primary transition-all duration-300 group flex flex-col h-full shadow-sm`}>
            <Link to={`/course/${course.id}`} className="flex flex-col h-full">
                <div className={`relative ${compact ? 'h-32' : 'h-48'} bg-gray-100 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-800 overflow-hidden`}>
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {!compact && <div className="absolute top-4 left-4">{getBadge(course.status)}</div>}
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white dark:bg-primary text-primary dark:text-white px-4 py-2 rounded-xl font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                            <Play size={16} fill="currentColor" /> {course.progress > 0 ? 'Continue' : 'Start Learning'}
                        </div>
                    </div>
                </div>

                <div className={`${compact ? 'p-4' : 'p-6'} flex-1 flex flex-col`}>
                    <h3 className={`${compact ? 'text-xl truncate' : 'text-lg line-clamp-2'} font-black text-citilink-dark dark:text-white mb-1.5 leading-tight group-hover:text-primary transition-colors`} title={course.title}>{course.title}</h3>

                    {compact ? (
                        <p className="text-base mb-3 truncate">
                            <span className="text-gray-400 dark:text-slate-500 font-medium">Next:</span>
                            <span className="text-citilink-dark dark:text-white font-bold ml-1.5">
                                {course.modules[0]?.lessons[0]?.title || "Module 1"}
                            </span>
                        </p>
                    ) : (
                        <p className="text-base text-gray-700 dark:text-slate-400 mb-3 md:mb-6 line-clamp-2 leading-relaxed font-medium">
                            {course.description}
                        </p>
                    )}

                    <div className="mt-auto">
                        <div className={`flex items-center gap-4 text-[10px] md:text-xs text-gray-700 dark:text-slate-400 font-bold ${compact ? 'mb-2.5' : 'mb-4'} flex-wrap`}>
                            <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary" />{course.duration}</span>
                            <span className="flex items-center gap-1.5"><BookOpen size={12} className="text-primary" />{course.modules.length} Modules</span>
                        </div>

                        <div className={`${compact ? 'pt-2' : 'pt-4 border-t'} border-gray-100 dark:border-slate-800`}>
                            <div className="flex justify-between items-center mb-1.5">
                                <span className="text-[14px] text-gray-400 dark:text-slate-500 font-bold">Progress</span>
                                <span className="text-[16px] font-semibold text-primary">{course.progress}%</span>
                            </div>
                            <div className={`w-full ${compact ? 'h-1.5' : 'h-2'} bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden`}>
                                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CourseCard;
