import { useState, useCallback } from 'react';

/**
 * useQuizState
 * Manages quiz-specific state
 */
export const useQuizState = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinalResult, setQuizFinalResult] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const resetQuiz = useCallback(() => {
        setQuizStarted(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizFinalResult(null);
        setSelectedOption(null);
        setShowResult(false);
        setIsCorrect(false);
    }, []);

    const handleAnswerSelect = useCallback((optionIndex) => {
        setSelectedOption(optionIndex);
    }, []);

    const handleSubmitAnswer = useCallback((isAnswerCorrect) => {
        setIsCorrect(isAnswerCorrect);
        if (isAnswerCorrect) {
            setScore((prev) => prev + 1);
        }
        setShowResult(true);
    }, []);

    const goToNextQuestion = useCallback((totalQuestions) => {
        if (currentQuestionIndex + 1 >= totalQuestions) {
            setQuizFinalResult({
                score,
                totalQuestions,
                percentage: ((score / totalQuestions) * 100).toFixed(2),
            });
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedOption(null);
            setShowResult(false);
            setIsCorrect(false);
        }
    }, [currentQuestionIndex, score]);

    return {
        quizStarted,
        setQuizStarted,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        score,
        setScore,
        quizFinalResult,
        setQuizFinalResult,
        selectedOption,
        setSelectedOption,
        showResult,
        setShowResult,
        isCorrect,
        setIsCorrect,
        resetQuiz,
        handleAnswerSelect,
        handleSubmitAnswer,
        goToNextQuestion,
    };
};
