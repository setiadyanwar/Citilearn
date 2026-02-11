import React from 'react';
import BookmarkButton from '../common/BookmarkButton';
import { Clock, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardCourseCard = ({ course, variant = 'resume' }) => {
    const navigate = useNavigate();
    const isMandatory = variant === 'mandatory';

    return (
        <div
            onClick={() => navigate(`/course/${course.id}`)}
            className={`flex flex-col sm:flex-row ${isMandatory ? 'gap-4 p-4' : 'gap-3 p-3'} bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl cursor-pointer group`}
        >
            {/* Thumbnail */}
            <div className={`relative shrink-0 rounded-xl overflow-hidden ${isMandatory ? 'w-full sm:w-32 h-48 sm:h-32' : 'w-full sm:w-28 h-40 sm:h-auto'}`}>
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 left-2 z-10">
                    <BookmarkButton size={14} className="p-1.5" />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between font-medium mb-2">
                        <div className="flex items-center gap-2">
                            {isMandatory && (
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold border bg-red-50 text-red-500 border-red-100 dark:bg-red-500/10 dark:border-red-500/20">
                                    Mandatory
                                </span>
                            )}
                            <span className="text-xs text-tertiary">{course.category}</span>
                        </div>
                        <span className="text-xs text-secondary dark:text-slate-500 flex items-center gap-1 whitespace-nowrap">
                            <Clock size={12} />
                            {course.timeLeft || 'Start now'}
                        </span>
                    </div>

                    <h3 className="text-base font-bold text-main dark:text-white line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                        {course.title}
                    </h3>
                    <p className="text-xs text-secondary dark:text-slate-400 line-clamp-1 mb-3">
                        {course.description}
                    </p>

                    <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-tertiary">
                            <Clock size={14} className="text-primary" />
                            {course.duration}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-tertiary">
                            <BookOpen size={14} className="text-primary" />
                            {course.modules?.length || 0} Modules
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-medium text-tertiary">Progress</span>
                        <span className="text-xs font-bold text-primary">
                            {course.progress}%
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${course.progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DashboardCourseCard;
