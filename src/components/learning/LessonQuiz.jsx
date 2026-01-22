import React from 'react';
import { ShieldCheck, CheckCircle2, X, ChevronRight } from 'lucide-react';

const LessonQuiz = ({ activeLesson, showResult, selectedOption, setSelectedOption, handleAssignmentSubmit, isCorrect, nextLesson }) => {
    if (!activeLesson?.assignment) return null;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-colors max-w-3xl">
            <div className="flex items-start gap-4 mb-8">
                <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-xl text-primary shrink-0">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h3 className="text-base font-bold text-citilink-dark dark:text-white">Knowledge Check</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">Verify your understanding to proceed.</p>
                </div>
            </div>

            <h4 className="text-sm font-bold text-gray-800 dark:text-slate-300 mb-6 leading-relaxed">
                {activeLesson.assignment.question}
            </h4>

            {!showResult ? (
                <div className="space-y-3">
                    {activeLesson.assignment.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedOption(idx)}
                            className={`
                                w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all group
                                ${selectedOption === idx
                                    ? 'bg-primary/5 dark:bg-primary/10 border-primary text-primary'
                                    : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-400'}
                            `}
                        >
                            <div className={`
                                w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border transition-colors
                                ${selectedOption === idx ? 'bg-primary border-primary text-white' : 'bg-transparent border-gray-200 dark:border-slate-700 text-gray-400 dark:text-slate-500 group-hover:border-primary/50'}
                            `}>
                                {String.fromCharCode(65 + idx)}
                            </div>
                            <span className="text-xs font-medium">{option}</span>
                        </button>
                    ))}
                    <div className="pt-4">
                        <button
                            className="btn-primary w-full md:w-auto px-8 py-3 !rounded-xl text-xs"
                            disabled={selectedOption === null}
                            onClick={handleAssignmentSubmit}
                        >
                            Submit Answer
                        </button>
                    </div>
                </div>
            ) : (
                <div className={`rounded-xl p-6 border ${isCorrect ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30' : 'bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30'} text-center`}>
                    <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
                        {isCorrect ? <CheckCircle2 size={24} /> : <X size={24} />}
                    </div>
                    <h5 className={`font-bold text-sm mb-1 ${isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-800 dark:text-red-300'}`}>
                        {isCorrect ? 'Correct Answer!' : 'Incorrect'}
                    </h5>
                    <p className="text-xs text-gray-600 dark:text-slate-400 mb-6">
                        {isCorrect ? 'Great job. You can now proceed to the next lesson.' : 'Please review the content and try again.'}
                    </p>
                    <button
                        className={`mx-auto px-6 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-colors ${isCorrect ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-red-600 text-white hover:bg-red-700'}`}
                        onClick={nextLesson}
                    >
                        {isCorrect ? 'Continue' : 'Retry'} <ChevronRight size={14} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default LessonQuiz;
