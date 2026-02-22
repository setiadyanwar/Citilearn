import React from 'react';
import { Trophy, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const QuizResultSummary = ({ score, total, percentage, onReturn, isFinalQuiz }) => {
    return (
        <div className="py-10 text-center w-full">
            <div className="w-14 h-14 bg-citilearn-green-light dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <Trophy size={28} className="text-citilearn-green" />
            </div>
            <h3 className="text-2xl font-bold text-main dark:text-white mb-2">
                Assessment Concluded
            </h3>
            <p className="text-sm text-secondary dark:text-slate-400 mb-8 max-w-md mx-auto font-medium">
                {isFinalQuiz
                    ? "You have successfully finished the final exam for this course."
                    : "You have completed the knowledge check for this lesson."}
            </p>

            <div className="flex items-center justify-center gap-6 mb-10">
                <div className="text-center">
                    <div className="text-3xs font-bold text-tertiary  mb-1">Score</div>
                    <div className="text-3xl font-bold text-main dark:text-white leading-none">{score}/{total}</div>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
                <div className="text-center">
                    <div className="text-3xs font-bold text-tertiary  mb-1">Grade</div>
                    <div className="text-3xl font-bold text-citilearn-green leading-none">{percentage}%</div>
                </div>
            </div>

            <Button
                onClick={onReturn}
                variant="default"
                size="lg"
                className="px-10 gap-2"
            >
                {isFinalQuiz ? 'Return to Dashboard' : 'Continue to Next Item'}
                <ChevronRight size={16} />
            </Button>
        </div>
    );
};

export default QuizResultSummary;
