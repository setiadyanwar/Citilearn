import React from 'react';
import Card from '@/components/common/Card';

const QuizStats = ({ bestScore, passingScore = 80 }) => {
    const isPassed = bestScore >= passingScore;

    return (
        <Card
            className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 flex flex-col items-end min-w-[140px]"
            padding="px-6 py-4"
        >
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mb-1">
                Best Score
            </span>
            <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-bold ${isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                    {bestScore}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">
                    / 100
                </span>
            </div>
            <span className="text-3xs text-emerald-600/70 dark:text-emerald-400/60 mt-1 font-medium">
                *Min. passing: {passingScore}
            </span>
        </Card>
    );
};

export default QuizStats;
