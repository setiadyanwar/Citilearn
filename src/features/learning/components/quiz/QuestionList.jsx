import React from 'react';
import { Badge } from '@/components/common/Badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const QuestionList = ({ questions, answers, handleOptionSelect, handleSubmit }) => {
    return (
        <div className="lg:col-span-3 space-y-12 pb-20">
            {questions.map((q, idx) => (
                <div key={idx} id={`question-${idx}`} className="scroll-mt-32">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                            Question {idx + 1}
                        </span>
                        <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            1 Point
                        </Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-main dark:text-white mb-6 leading-relaxed">
                        {q.question}
                    </h3>

                    <div className="space-y-3">
                        {q.options.map((option, optIdx) => (
                            <div
                                key={optIdx}
                                onClick={() => handleOptionSelect(idx, optIdx)}
                                className={cn(
                                    "flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer group",
                                    answers[idx] === optIdx
                                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 dark:border-emerald-500"
                                        : "border-transparent bg-white dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm mr-4 transition-colors",
                                    answers[idx] === optIdx
                                        ? "bg-emerald-600 text-white"
                                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-400"
                                )}>
                                    {String.fromCharCode(65 + optIdx)}
                                </div>
                                <span className={cn(
                                    "text-base font-medium",
                                    answers[idx] === optIdx
                                        ? "text-emerald-900 dark:text-emerald-100"
                                        : "text-gray-600 dark:text-slate-300"
                                )}>
                                    {option}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="pt-8 flex justify-start">
                <Button
                    onClick={handleSubmit}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8"
                >
                    Finish Attempt
                </Button>
            </div>
        </div>
    );
};

export default QuestionList;
