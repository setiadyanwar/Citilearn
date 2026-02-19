import React from 'react';
import { Users } from 'lucide-react';

const CourseRow = ({ course }) => (
    <div className="py-4 flex items-center justify-between group px-1 border-b border-slate-50 last:border-0">
        <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                <img src={course.thumbnail} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div>
                <h4 className="text-sm font-bold text-main leading-tight group-hover:text-primary transition-colors">{course.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xs font-bold text-tertiary">{course.category}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-200" />
                    <span className="text-2xs font-bold text-tertiary text-opacity-70 flex items-center gap-1">
                        <Users size={12} className="opacity-70" />
                        124 Students
                    </span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
                <div className="flex justify-between items-center mb-1 w-28">
                    <span className="text-3xs font-bold text-tertiary">Completion</span>
                    <span className="text-2xs font-bold text-main">{course.progress}%</span>
                </div>
                <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary/80" style={{ width: `${course.progress}%` }} />
                </div>
            </div>
        </div>
    </div>
);

export default CourseRow;
