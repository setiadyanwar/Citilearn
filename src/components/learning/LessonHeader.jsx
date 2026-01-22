import React from 'react';
import { CheckCircle2, PanelLeft } from 'lucide-react';

const LessonHeader = ({ activeLesson, completedLessons, toggleCompletion, setSidebarOpen, isSidebarOpen }) => {
    const isCompleted = completedLessons.has(activeLesson?.id);

    return (
        <div className="mb-6 pt-2 flex items-start justify-between gap-4">
            <button
                className="hidden lg:hidden p-2 -ml-2 text-gray-500 hover:text-citilink-dark"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                <PanelLeft size={24} />
            </button>
            <h1 className="text-lg md:text-2xl font-black text-citilink-dark dark:text-white leading-tight flex-1 pt-1.5 lg:pt-0 line-clamp-2">
                {activeLesson?.title}
            </h1>

            <button
                onClick={toggleCompletion}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${isCompleted
                    ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50'
                    : 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:border-primary dark:hover:border-primary hover:text-primary'
                    }`}
            >
                {isCompleted ? (
                    <>
                        <CheckCircle2 size={16} className="fill-emerald-200" />
                        <span className="hidden sm:inline">Completed</span>
                        <span className="inline sm:hidden">Done</span>
                    </>
                ) : (
                    <>
                        <CheckCircle2 size={16} />
                        <span className="hidden sm:inline">Mark as Completed</span>
                        <span className="inline sm:hidden">Mark Done</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default LessonHeader;
