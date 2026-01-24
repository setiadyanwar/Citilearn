import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProgressBar from './common/ProgressBar';
import LessonListItem from './learning/LessonListItem';
import Card from './common/Card';

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
    const navigate = useNavigate();

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
                fixed inset-y-0 left-0 z-50 w-72 h-full transition-transform duration-300 transform flex flex-col gap-6 p-4 lg:p-0 
                lg:sticky lg:top-24 lg:w-72 lg:h-[calc(100vh-120px)] lg:translate-x-0 lg:shadow-none lg:overflow-y-auto no-scrollbar lg:pb-10
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 text-gray-400 dark:text-slate-500 font-medium text-sm hover:text-slate-700 dark:hover:text-white transition-all group w-fit mb-2 px-1"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to dashboard
                </button>

                <Card padding="p-0" className="flex flex-col overflow-hidden max-h-[calc(100vh-180px)]">
                    {/* Progress Header */}
                    <div className="p-6 border-b border-gray-50 dark:border-slate-800 shrink-0">
                        <div className="flex items-center justify-between mb-3 px-0.5">
                            <span className="text-sm font-black text-citilink-dark dark:text-white">Course Progress</span>
                            <span className="text-sm font-black text-[#059669]">{progressPercentage}%</span>
                        </div>
                        <ProgressBar progress={progressPercentage} />
                    </div>

                    {/* Module List */}
                    <div className="p-2 divide-y divide-gray-50 dark:divide-slate-800 overflow-y-auto custom-scrollbar flex-1">
                        {course.modules.map((module, mIdx) => (
                            <div key={module.id} className="py-4 first:pt-2 last:pb-2 px-2">
                                <div className="px-2 flex items-center justify-between mb-3 text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                                    <span className="text-[10px]">Module {mIdx + 1}</span>
                                    <span className="text-[10px]">{module.lessons.length} item</span>
                                </div>
                                <div className="space-y-1">
                                    {module.lessons.map((lesson) => (
                                        <LessonListItem
                                            key={lesson.id}
                                            lesson={lesson}
                                            isActive={activeLesson?.id === lesson.id}
                                            isCompleted={completedLessons.has(lesson.id)}
                                            onClick={() => {
                                                setActiveLesson(lesson);
                                                setShowResult(false);
                                                setSelectedOption(null);
                                                setSidebarOpen(false);
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </aside>
        </>
    );
};

export default CourseProgressSidebar;
