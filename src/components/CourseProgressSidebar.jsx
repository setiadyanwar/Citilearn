import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, FileText, CheckCircle2 } from 'lucide-react';

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
                fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 h-full transition-transform duration-300 transform flex flex-col gap-4 p-4 lg:p-0 border-r lg:border-r-0 border-gray-200 dark:border-slate-800
                lg:sticky lg:top-24 lg:w-64 lg:h-fit lg:bg-transparent lg:translate-x-0 lg:shadow-none
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-500 dark:text-slate-400 font-bold text-xs hover:text-primary transition-all group w-fit px-1 shrink-0"
                >
                    <div className="p-1 rounded-full group-hover:bg-primary/10 transition-colors">
                        <ChevronLeft size={18} />
                    </div>
                    Back to Dashboard
                </button>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] h-full lg:h-[calc(100vh-180px)] flex flex-col">
                    <div className="p-5 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide">Course Progress</span>
                            <span className="text-xs font-black text-primary">{progressPercentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
                        </div>
                    </div>

                    <div className="overflow-y-auto custom-scrollbar flex-1 p-2 space-y-2">
                        {course.modules.map((module, mIdx) => (
                            <div key={module.id} className="rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                                <div className="px-4 py-3 bg-gray-50/30 dark:bg-slate-800/30 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase">Module {mIdx + 1}</span>
                                    <span className="text-[10px] font-bold text-gray-300 dark:text-slate-600">{module.lessons.length} Item</span>
                                </div>
                                <div className="divide-y divide-gray-50 dark:divide-slate-800">
                                    {module.lessons.map((lesson) => {
                                        const isActive = activeLesson?.id === lesson.id;
                                        const isCompleted = completedLessons.has(lesson.id);
                                        return (
                                            <button
                                                key={lesson.id}
                                                onClick={() => {
                                                    setActiveLesson(lesson);
                                                    setShowResult(false);
                                                    setSelectedOption(null);
                                                    // Close sidebar on mobile when a lesson is clicked
                                                    setSidebarOpen(false);
                                                }}
                                                className={`
                                                w-full px-4 py-3 flex items-start gap-3 transition-colors text-left
                                                ${isActive ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-gray-50 dark:hover:bg-slate-800'}
                                            `}
                                            >
                                                <div className={`mt-0.5 ${isActive ? 'text-primary' : (isCompleted ? 'text-emerald-500' : 'text-gray-300 dark:text-slate-700')}`}>
                                                    {isActive ? <Play size={14} fill="currentColor" /> : (lesson.type === 'video' ? <Play size={14} /> : <FileText size={14} />)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className={`text-xs font-bold leading-snug mb-0.5 ${isActive ? 'text-primary' : (isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-slate-300')}`}>
                                                        {lesson.title}
                                                    </div>
                                                    <div className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">15 min</div>
                                                </div>
                                                {/* Real completion status */}
                                                {isCompleted && (
                                                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default CourseProgressSidebar;
