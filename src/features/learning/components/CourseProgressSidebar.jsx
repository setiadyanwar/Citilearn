import React from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import LessonListItem from './LessonListItem';
import Card from '@/components/common/Card';

const CourseProgressSidebar = ({
    course,
    activeLesson,
    setActiveLesson,
    completedLessons,
    setShowResult,
    setSelectedOption,
    isSidebarOpen,
    setSidebarOpen
}) => {

    // Calculate progress
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedCount = completedLessons.size;
    const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return (
        <>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 h-full transition-transform duration-300 transform flex flex-col p-4 lg:p-0 
                lg:sticky lg:top-0 lg:w-72 lg:h-[calc(100vh-120px)] lg:translate-x-0 lg:shadow-none
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Card padding="p-0" className="flex flex-col overflow-hidden h-full border-gray-100 dark:border-slate-800">
                    {/* Progress Header */}
                    <div className="p-6 border-b border-gray-50 dark:border-slate-800 shrink-0">
                        <div className="flex items-center justify-between mb-3 px-0.5">
                            <span className="text-sm font-bold text-main dark:text-white">Course Progress</span>
                            <span className="text-sm font-bold text-[#059669]">{progressPercentage}%</span>
                        </div>
                        <ProgressBar progress={progressPercentage} />
                    </div>

                    {/* Module List */}
                    <div className="p-2 divide-y divide-gray-50 dark:divide-slate-800 overflow-y-auto custom-scrollbar flex-1">
                        {(() => {
                            let lastIncompleteFound = false;

                            return course.modules.map((module, mIdx) => (
                                <div key={module.id} className="py-4 first:pt-2 last:pb-2 px-2">
                                    <div className="px-2 flex items-center justify-between mb-3 text-tertiary dark:text-slate-500 font-bold ">
                                        <span className="text-[10px]">Module {mIdx + 1}</span>
                                        <span className="text-[10px]">{module.lessons.length} item</span>
                                    </div>
                                    <div className="space-y-1">
                                        {module.lessons.map((lesson) => {
                                            const isCompleted = completedLessons.has(lesson.id);
                                            const isLocked = lastIncompleteFound;

                                            // If this lesson is not completed, subsequent lessons should be locked
                                            if (!isCompleted) {
                                                lastIncompleteFound = true;
                                            }

                                            return (
                                                <LessonListItem
                                                    key={lesson.id}
                                                    lesson={lesson}
                                                    isActive={activeLesson?.id === lesson.id}
                                                    isCompleted={isCompleted}
                                                    isLocked={isLocked && activeLesson?.id !== lesson.id}
                                                    onClick={() => {
                                                        setActiveLesson(lesson);
                                                        setShowResult(false);
                                                        setSelectedOption(null);
                                                        setSidebarOpen(false);
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                </Card>
            </aside>
        </>
    );
};

export default CourseProgressSidebar;
