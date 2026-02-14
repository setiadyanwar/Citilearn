import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from '@/features/dashboard/components/CourseCard';
import DashboardCourseCard from '@/features/dashboard/components/DashboardCourseCard';
import EmptyState from '@/components/common/EmptyState';

const CourseGrid = ({ loading, courses, emptyTitle, emptyMessage, onClearFilter, showClearFilter, viewMode = 'grid' }) => {
    const isGrid = viewMode === 'grid';
    const containerClass = isGrid
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px] content-start"
        : "flex flex-col gap-4 min-h-[400px]";

    return (
        <div className={containerClass}>
            {loading ? (
                [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} className={`${isGrid ? 'flex flex-col h-full' : 'flex flex-col sm:flex-row gap-4 p-4'} bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden animate-pulse`}>
                        {/* Image Skeleton */}
                        <div className={`${isGrid ? 'h-48 w-full' : 'w-full sm:w-32 h-40 sm:h-32'} bg-gray-200 dark:bg-slate-800 shrink-0`} />

                        {/* Content Skeleton */}
                        <div className="flex-1 p-4 flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-16 bg-gray-200 dark:bg-slate-800 rounded-full" />
                                <div className="h-4 w-24 bg-gray-200 dark:bg-slate-800 rounded-full" />
                            </div>
                            <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-800 rounded-lg" />
                            <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded-lg" />
                            {!isGrid && <div className="h-4 w-1/2 bg-gray-200 dark:bg-slate-800 rounded-lg" />}

                            <div className="mt-auto pt-2 space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="h-3 w-12 bg-gray-200 dark:bg-slate-800 rounded" />
                                    <div className="h-3 w-8 bg-gray-200 dark:bg-slate-800 rounded" />
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-slate-800 rounded-full" />
                            </div>
                        </div>
                    </div>
                ))
            ) : courses.length > 0 ? (
                courses.map((course, index) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        {isGrid ? (
                            <CourseCard course={course} />
                        ) : (
                            <DashboardCourseCard course={course} variant="list" />
                        )}
                    </motion.div>
                ))
            ) : (
                <div className="col-span-full">
                    <EmptyState
                        title={emptyTitle || "No Search Result!"}
                        message={emptyMessage || "No results found. Please try again."}
                    >
                        {showClearFilter && (
                            <button
                                onClick={onClearFilter}
                                className="px-6 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-sm font-bold text-secondary hover:text-primary transition-colors cursor-pointer"
                            >
                                Clear Category Filter
                            </button>
                        )}
                    </EmptyState>
                </div>
            )}
        </div>
    );
};

export default CourseGrid;
