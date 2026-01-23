import React from 'react';
import { ShieldCheck, GraduationCap } from 'lucide-react';
import ProgressBar from '../../common/ProgressBar';

const QuizHeader = ({ isFinalQuiz, currentQuestionIndex, totalQuestions }) => {
    const progress = Math.round((currentQuestionIndex / totalQuestions) * 100);

    if (!isFinalQuiz) {
        return (
            <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 bg-[#EBF7F2] dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-[#059669] shrink-0">
                    <ShieldCheck size={20} />
                </div>
                <div>
                    <h3 className="text-base font-black text-slate-800 dark:text-white leading-tight">Knowledge Check</h3>
                    <p className="text-[13px] text-slate-500 font-medium">Verify your understanding to proceed.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                        <GraduationCap size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="px-2 py-0.5 rounded bg-primary text-white text-[8px] font-black uppercase tracking-wider">Final Test</span>
                            <span className="text-[8px] font-bold text-slate-300 uppercase tracking-wider">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                        </div>
                        <h3 className="text-base font-black text-slate-800 dark:text-white">Module Certification</h3>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xl font-black text-slate-800 dark:text-white leading-none">
                        {progress}%
                    </div>
                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-wider mt-1">Progress</div>
                </div>
            </div>

            <ProgressBar progress={progress} height="h-1" className="mb-8" />
        </>
    );
};

export default QuizHeader;
