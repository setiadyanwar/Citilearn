import React from 'react';
import { Play, FileText, CheckCircle2 } from 'lucide-react';
import Badge from '../common/Badge';
import { LESSON_TYPES } from '../../constants/course';

const LessonListItem = ({
    lesson,
    isActive,
    isCompleted,
    onClick,
    showDuration = true,
    compact = false
}) => {
    const Icon = lesson.type === LESSON_TYPES.VIDEO || lesson.type === LESSON_TYPES.YOUTUBE
        ? Play
        : lesson.type === LESSON_TYPES.QUIZ
            ? CheckCircle2
            : FileText;

    return (
        <button
            onClick={onClick}
            className={`
                w-full flex items-center gap-4 transition-all text-left group
                ${compact ? 'px-3 py-2.5 rounded-lg' : 'px-4 py-3.5 rounded-xl'}
                ${isActive
                    ? 'bg-primary/10 dark:bg-emerald-900/10'
                    : 'bg-transparent hover:bg-gray-50 dark:hover:bg-slate-800'}
            `}
        >
            <div className={`shrink-0 ${isActive ? 'text-primary' : (isCompleted ? 'text-emerald-500' : 'text-gray-400 dark:text-slate-600')}`}>
                <Icon
                    size={compact ? 16 : 18}
                    fill={isActive && (lesson.type === LESSON_TYPES.VIDEO || lesson.type === LESSON_TYPES.YOUTUBE) ? "currentColor" : "none"}
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <div className={`
                        font-bold leading-tight line-clamp-1 
                        ${compact ? 'text-[11px]' : 'text-[12px]'}
                        ${isActive ? 'text-primary' : (isCompleted ? 'text-slate-700 dark:text-slate-300' : 'text-gray-500 dark:text-slate-400')}
                    `}>
                        {lesson.title}
                    </div>
                    {lesson.type === LESSON_TYPES.QUIZ && (
                        <Badge variant="warning" size="xs">Test</Badge>
                    )}
                </div>
                {showDuration && (
                    <div className="text-[9px] text-gray-400 dark:text-slate-500 font-medium mt-0.5">15 min</div>
                )}
            </div>

            {isCompleted && !isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            )}
        </button>
    );
};

export default LessonListItem;
