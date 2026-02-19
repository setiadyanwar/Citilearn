import React from 'react';
import { Play, FileText, CheckCircle2, Lock } from 'lucide-react';
import Badge from '@/components/common/Badge';
import { LESSON_TYPES } from '@/constants/course';

const LessonListItem = ({
    lesson,
    isActive,
    isCompleted,
    isLocked,
    onClick,
    showDuration = true,
    compact = false
}) => {
    let Icon = lesson.type === LESSON_TYPES.VIDEO || lesson.type === LESSON_TYPES.YOUTUBE
        ? Play
        : lesson.type === LESSON_TYPES.QUIZ
            ? CheckCircle2
            : FileText;

    if (isLocked) Icon = Lock;

    return (
        <button
            onClick={isLocked ? undefined : onClick}
            disabled={isLocked}
            className={`
                w-full flex items-center gap-4 transition-all text-left group
                ${compact ? 'px-3 py-2.5 rounded-lg' : 'px-4 py-3.5 rounded-xl'}
                ${isActive
                    ? 'bg-primary/10 dark:bg-emerald-900/10'
                    : (isLocked ? 'opacity-50 cursor-not-allowed' : 'bg-transparent hover:bg-gray-50 dark:hover:bg-slate-800')}
            `}
        >
            <div className={`shrink-0 ${isActive ? 'text-primary' : (isCompleted ? 'text-emerald-500' : (isLocked ? 'text-gray-300 dark:text-slate-700' : 'text-gray-400 dark:text-slate-600'))}`}>
                <Icon
                    size={compact ? 16 : 18}
                    fill={isActive && (lesson.type === LESSON_TYPES.VIDEO || lesson.type === LESSON_TYPES.YOUTUBE) ? "currentColor" : "none"}
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <div className={`
                        font-bold leading-tight line-clamp-1 
                        ${compact ? 'text-3xs' : 'text-2xs'}
                        ${isActive ? 'text-primary' : (isCompleted ? 'text-slate-700 dark:text-slate-300' : (isLocked ? 'text-gray-400 dark:text-slate-600' : 'text-gray-500 dark:text-slate-400'))}
                    `}>
                        {lesson.title}
                    </div>
                    {lesson.type === LESSON_TYPES.QUIZ && (
                        <Badge variant={isLocked ? "secondary" : "warning"} size="xs">Test</Badge>
                    )}
                </div>
                {showDuration && (
                    <div className="text-3xs text-gray-400 dark:text-slate-500 font-medium mt-0.5">15 min</div>
                )}
            </div>


            {isLocked && (
                <div className="text-gray-200 dark:text-slate-800">
                    <Lock size={12} />
                </div>
            )}
        </button>
    );
};

export default LessonListItem;
