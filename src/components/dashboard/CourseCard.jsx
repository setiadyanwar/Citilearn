import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Play } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';
import { COURSE_STATUS } from '../../constants/course';

const CourseCard = ({ course, compact = false }) => {
    const getStatusBadge = (status) => {
        if (compact) return null;
        switch (status) {
            case COURSE_STATUS.DONE:
                return (
                    <Badge variant="success" size="sm" className="gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Completed
                    </Badge>
                );
            case COURSE_STATUS.ON_PROGRESS:
                return (
                    <Badge variant="warning" size="sm" className="gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        In Progress
                    </Badge>
                );
            default:
                return (
                    <Badge variant="secondary" size="sm" className="gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        Not Started
                    </Badge>
                );
        }
    };

    return (
        <Card padding="p-0" className="group flex flex-col h-full overflow-hidden hover:border-primary transition-all duration-300">
            <Link to={`/course/${course.id}`} className="flex flex-col h-full">
                <div className={`relative ${compact ? 'h-40' : 'h-48'} bg-gray-100 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-800 overflow-hidden`}>
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {!compact && <div className="absolute top-4 left-4">{getStatusBadge(course.status)}</div>}
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white dark:bg-primary text-primary dark:text-white px-5 py-2.5 rounded-xl font-black text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                            <Play size={16} fill="currentColor" /> {course.progress > 0 ? 'Continue' : 'Start Learning'}
                        </div>
                    </div>
                </div>

                <div className={`${compact ? 'p-4' : 'p-6'} flex-1 flex flex-col`}>
                    <h3 className={`${compact ? 'text-lg truncate' : 'text-lg line-clamp-2'} font-black text-main dark:text-white mb-1.5 leading-tight group-hover:text-primary transition-colors`} title={course.title}>{course.title}</h3>

                    {compact ? (
                        <p className="text-sm mb-3 truncate">
                            <span className="text-tertiary dark:text-slate-500 font-bold">Next:</span>
                            <span className="text-main dark:text-white font-semibold ml-1.5 text-xs tracking-tight">
                                {course.modules[0]?.lessons[0]?.title || "Module 1"}
                            </span>
                        </p>
                    ) : (
                        <p className="text-sm text-secondary dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed font-medium">
                            {course.description}
                        </p>
                    )}

                    <div className="mt-auto">
                        <div className={`flex items-center gap-4 text-2xs md:text-xs text-tertiary dark:text-slate-500 font-black uppercase tracking-wider ${compact ? 'mb-3' : 'mb-4'} flex-wrap`}>
                            <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary" />{course.duration}</span>
                            <span className="flex items-center gap-1.5"><BookOpen size={12} className="text-primary" />{course.modules.length} Modules</span>
                        </div>

                        <div className={`${compact ? 'pt-2' : 'pt-4 border-t'} border-gray-100 dark:border-slate-800`}>
                            <div className="flex justify-between items-center mb-1.5">
                                <span className="text-xs text-tertiary dark:text-slate-500 font-black uppercase tracking-tight">Progress</span>
                                <span className="text-sm font-black text-primary">{course.progress}%</span>
                            </div>
                            <ProgressBar progress={course.progress} height={compact ? 'h-1.5' : 'h-2'} />
                        </div>
                    </div>
                </div>
            </Link>
        </Card>
    );
};

export default CourseCard;
