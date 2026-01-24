import React from 'react';
import { CheckCircle2, PanelLeft } from 'lucide-react';

const LessonHeader = ({ activeLesson, completedLessons, toggleCompletion, setSidebarOpen, isSidebarOpen }) => {
    const isCompleted = completedLessons.has(activeLesson?.id);
    const isQuiz = activeLesson?.type === 'quiz';

    return (
        <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-black text-citilink-dark dark:text-white leading-tight flex-1">
                {activeLesson?.title}
            </h1>

            {!isQuiz && (
                <button
                    onClick={toggleCompletion}
                    className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 border ${isCompleted
                        ? 'bg-citilearn-green-light text-citilearn-green border-citilearn-green-light dark:bg-emerald-900/20 dark:border-emerald-900/30'
                        : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-500'
                        }`}
                >
                    <CheckCircle2 size={18} className={isCompleted ? 'text-citilearn-green' : 'text-citilearn-green'} />
                    <span>{isCompleted ? 'Marked as Completed' : 'Mark as Completed'}</span>
                </button>
            )}
        </div>
    );
};

export default LessonHeader;
