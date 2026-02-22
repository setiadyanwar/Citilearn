import React from 'react';
import QuizHeader from './quiz/QuizHeader';
import QuizOption from './quiz/QuizOption';
import QuizFeedback from './quiz/QuizFeedback';
import QuizResultSummary from './quiz/QuizResultSummary';
import { Button } from '@/components/ui/button';

const LessonQuiz = ({
    activeLesson,
    showResult,
    selectedOption,
    setSelectedOption,
    handleAssignmentSubmit,
    isCorrect,
    handleRetry,
    nextLesson,
    currentQuestionIndex,
    nextQuestion,
    quizFinalResult,
    isFinalQuiz = false
}) => {
    const quizList = activeLesson?.assignments || (activeLesson?.assignment ? [activeLesson.assignment] : []);
    if (quizList.length === 0) return null;

    // 1. FINAL RESULT VIEW
    if (quizFinalResult) {
        return (
            <QuizResultSummary
                score={quizFinalResult.score}
                total={quizFinalResult.total}
                percentage={quizFinalResult.percentage}
                onReturn={nextLesson}
                isFinalQuiz={isFinalQuiz}
            />
        );
    }

    const currentQuiz = quizList[isFinalQuiz ? currentQuestionIndex : 0];
    const isLastQuestion = currentQuestionIndex === quizList.length - 1;

    // 2. MAIN QUIZ VIEW
    return (
        <div className={`w-full py-4 ${!isFinalQuiz ? 'bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 max-w-2xl' : 'max-w-4xl mx-auto'}`}>
            <QuizHeader
                isFinalQuiz={isFinalQuiz}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={quizList.length}
            />

            <div className="mb-6">
                {isFinalQuiz && <p className="text-[10px] font-bold text-slate-400  mb-2">Question</p>}
                <h4 className={`${isFinalQuiz ? 'text-base' : 'text-[15px]'} font-bold text-slate-700 dark:text-slate-300 leading-relaxed`}>
                    {currentQuiz.question}
                </h4>
            </div>

            {!showResult ? (
                <div className="space-y-3">
                    {currentQuiz.options.map((option, idx) => (
                        <QuizOption
                            key={idx}
                            idx={idx}
                            option={option}
                            isSelected={selectedOption === idx}
                            onClick={setSelectedOption}
                        />
                    ))}
                    <div className="pt-6">
                        <Button
                            onClick={handleAssignmentSubmit}
                            disabled={selectedOption === null}
                            className="w-full sm:w-auto"
                        >
                            Submit Answer
                        </Button>
                    </div>
                </div>
            ) : (
                <QuizFeedback
                    isCorrect={isCorrect}
                    isFinalQuiz={isFinalQuiz}
                    isLastQuestion={isLastQuestion}
                    onNext={() => {
                        if (isCorrect || isFinalQuiz) {
                            nextQuestion();
                        } else {
                            // Explicit retry for Knowledge Checks
                            handleRetry();
                        }
                    }}
                />
            )}
        </div>
    );
};

export default LessonQuiz;
