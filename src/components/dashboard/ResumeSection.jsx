import React from 'react';
import DashboardCourseCard from './DashboardCourseCard';

const ResumeSection = ({ courses = [] }) => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-main dark:text-white">Resume Training</h2>
                <button className="text-sm font-bold text-primary hover:underline">Show All</button>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar pr-1 relative h-[260px]">
                {courses.length > 0 ? (
                    courses.map(course => (
                        <div key={course.id}>
                            <DashboardCourseCard course={course} variant="resume" />
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-secondary dark:text-slate-500 text-sm">
                        No courses in progress.
                    </div>
                )}

                {/* Gradient Overlay for Spoiler Effect */}
                <div className="sticky bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none -mb-4 sm:-mb-0" />
            </div>
        </div>
    );
};

export default ResumeSection;
