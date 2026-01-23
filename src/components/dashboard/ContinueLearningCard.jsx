import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';

const ContinueLearningCard = ({ course }) => {
    return (
        <Card padding="p-0" className="group flex flex-col md:flex-row h-full md:min-h-[8rem] relative overflow-hidden hover:border-primary transition-all duration-300">
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
                    <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-tight shrink-0">{course.duration} left</span>
                </div>

                <h3 className="text-lg font-black text-slate-800 dark:text-white mb-1 truncate leading-tight group-hover:text-primary transition-colors" title={course.title}>
                    {course.title}
                </h3>

                <p className="text-sm mb-4 line-clamp-1">
                    <span className="text-gray-400 dark:text-slate-500 font-bold">Next:</span>
                    <span className="text-slate-700 dark:text-white font-black ml-1.5 uppercase text-[10px] tracking-tight">
                        {course.modules[0]?.lessons[0]?.title || "Module 1"}
                    </span>
                </p>

                <div className="space-y-1.5">
                    <div className="flex justify-between items-center font-black">
                        <span className="text-[12px] text-gray-400 dark:text-slate-500 uppercase tracking-tight">Progress</span>
                        <span className="text-[14px] text-primary">{course.progress}%</span>
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
