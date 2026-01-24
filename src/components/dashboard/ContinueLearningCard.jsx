import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';

const ContinueLearningCard = ({ course }) => {
    return (
        <Card padding="p-0" className="group flex flex-col md:flex-row h-full md:min-h-32 relative overflow-hidden hover:border-primary transition-all duration-300">
            {/* Thumbnail */}
            <div className="relative w-full md:w-32 h-32 md:h-auto bg-gray-100 dark:bg-slate-800 shrink-0 border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-800">
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
                    <Badge variant="warning" size="xs">Continue</Badge>
                    <div className="flex items-center gap-1 text-gray-400 dark:text-slate-500 font-bold tracking-tight shrink-0">
                        <Clock size={12} className="text-gray-400" />
                        <span className="text-2xs">{course.duration} left</span>
                    </div>
                </div>

                <h3 className="text-lg font-black text-citilink-dark dark:text-white mb-1 truncate leading-tight group-hover:text-primary transition-colors" title={course.title}>
                    {course.title}
                </h3>

                <p className="text-sm mb-4 line-clamp-1">
                    <span className="text-gray-400 dark:text-slate-500 font-semibold">Next:</span>
                    <span className="text-citilink-dark dark:text-white font-semibold ml-1.5 text-2xs tracking-tight">
                        {course.modules[0]?.lessons[0]?.title || "Module 1"}
                    </span>
                </p>

                <div className="space-y-1.5">
                    <div className="flex justify-between items-center font-black">
                        <span className="text-xs text-gray-400 dark:text-slate-500 uppercase tracking-tight">Progress</span>
                        <span className="text-sm text-primary">{course.progress}%</span>
                    </div>
                    <ProgressBar progress={course.progress} height="h-1.5" />
                </div>
            </div>

            {/* Full Card Link Overlay */}
            <Link to={`/learn/${course.id}`} className="absolute inset-0 z-10" />
        </Card>
    );
};

export default ContinueLearningCard;
