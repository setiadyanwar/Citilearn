import React from 'react';
import { ShieldCheck, GraduationCap } from 'lucide-react';
import ProgressBar from '../../common/ProgressBar';

const QuizHeader = ({ isFinalQuiz, currentQuestionIndex, totalQuestions }) => {
    const progress = Math.round((currentQuestionIndex / totalQuestions) * 100);

    if (!isFinalQuiz) {
        return (
            <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 bg-citilearn-green-light dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-citilearn-green shrink-0">
                    <ShieldCheck size={20} />
                </div>
                <div>
                    <h3 className="text-base font-bold text-main dark:text-white leading-tight">Knowledge Check</h3>
                    <p className="text-[13px] text-secondary font-medium">Verify your understanding to proceed.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-primary/10 text-smrimary rounded-xl shrink-0">
                        <GraduationCap size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="px-2 py-0.5 rounded bg-primary text-white text-smxs font-bold uppercase tracking-wider">Final Test</span>
                            <span className="text-smxs font-bold text-tertiary uppercase tracking-wider">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                        </div>
                        <h3 className="text-base font-bold text-main dark:text-white">Module Certification</h3>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sml font-bold text-main dark:text-white leading-none">
                        {progress}%
                    </div>
                    <div className="text-smxs font-bold text-tertiary uppercase tracking-wider mt-1">Progress</div>
                </div>
            </div>

            <ProgressBar progress={progress} height="h-1" className="mb-8" />
        </>
    );
};

export default QuizHeader;
