import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const QuizFeedback = ({ isCorrect, onNext, isLastQuestion, isFinalQuiz }) => {
    return (
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isCorrect ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {isCorrect ? <CheckCircle2 size={20} /> : <X size={20} />}
            </div>
            <div className="flex-1">
                <h5 className={`font-bold text-base leading-none mb-1 ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                    {isCorrect ? 'Outstanding!' : isFinalQuiz ? 'Almost there!' : 'Incorrect answer'}
                </h5>
                <p className="text-[13px] text-slate-500 font-medium">
                    {isCorrect
                        ? 'Your answer is correct. Let\'s proceed.'
                        : isFinalQuiz
                            ? 'That wasn\'t the correct choice. Let\'s try the next one.'
                            : 'Please try selecting a different answer.'}
                </p>
            </div>
            <Button
                variant={isCorrect ? 'default' : 'secondary'}
                size="sm"
                onClick={onNext}
            >
                {isCorrect
                    ? (isLastQuestion ? (isFinalQuiz ? 'Seal Results' : 'Finish') : 'Next Question')
                    : (isFinalQuiz ? 'Next Question' : 'Retry')}
            </Button>
        </div>
    );
};

export default QuizFeedback;
