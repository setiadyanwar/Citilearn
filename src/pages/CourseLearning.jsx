import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../data.json';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import CourseProgressSidebar from '../components/CourseProgressSidebar';
import CompletionSuccessModal from '../components/CompletionSuccessModal';
import LessonHeader from '../components/learning/LessonHeader';
import LessonContent from '../components/learning/LessonContent';
import LessonTabs from '../components/learning/LessonTabs';
import LessonQuiz from '../components/learning/LessonQuiz';

const CourseLearning = ({ setGlobalPip }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isPip, setIsPip] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [completedLessons, setCompletedLessons] = useState(new Set());
    const [showCompletionSuccess, setShowCompletionSuccess] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Multi-question quiz states
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinalResult, setQuizFinalResult] = useState(null);

    const videoContainerRef = useRef(null);
    const videoRef = useRef(null);
    const quizRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const found = data.courses.find(c => c.id === id);
            setCourse(found);
            if (found && found.modules.length > 0) {
                setActiveLesson(found.modules[0].lessons[0]);
            }
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [id]);

    useEffect(() => {
        // Reset quiz state when switching lessons
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setQuizFinalResult(null);
    }, [activeLesson]);

    useEffect(() => {
        const handleScroll = () => {
            if (!videoContainerRef.current) return;
            const videoRect = videoContainerRef.current.getBoundingClientRect();
            if (videoRect.bottom < 100) {
                setIsPip(true);
            } else {
                setIsPip(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeLesson]);

    const handleAssignmentSubmit = () => {
        const quizList = activeLesson.assignments || (activeLesson.assignment ? [activeLesson.assignment] : []);
        const currentQuiz = quizList[currentQuestionIndex];
        const isAnswerCorrect = selectedOption === currentQuiz.correctAnswer;

        if (isAnswerCorrect) {
            setScore(prev => prev + 1);
        }

        setIsCorrect(isAnswerCorrect);
        setShowResult(true);
    };

    const nextQuestion = () => {
        const quizList = activeLesson.assignments || (activeLesson.assignment ? [activeLesson.assignment] : []);
        if (currentQuestionIndex < quizList.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setShowResult(false);
            setSelectedOption(null);
        } else {
            // End of quiz
            const finalScore = score + (isCorrect ? 0 : 0); // score is already updated in submit
            const totalQuestions = quizList.length;
            const percentage = Math.round((score / totalQuestions) * 100);

            setQuizFinalResult({
                score,
                total: totalQuestions,
                percentage
            });

            // If it's a regular lesson with one quiz, or if they finished final quiz
            if (activeLesson.type !== 'quiz' || percentage >= 70) { // arbitrary pass mark for final
                setCompletedLessons(prev => {
                    const newSet = new Set(prev);
                    newSet.add(activeLesson.id);
                    return newSet;
                });
            }
        }
    };

    const handleRetry = () => {
        setSelectedOption(null);
        setShowResult(false);
        setIsCorrect(false);
    };

    const nextLesson = () => {
        setShowResult(false);
        setSelectedOption(null);
        setCurrentQuestionIndex(0);
        let next = null;
        let currentFound = false;

        for (const module of course.modules) {
            for (const lesson of module.lessons) {
                if (currentFound) {
                    next = lesson;
                    break;
                }
                if (lesson.id === activeLesson.id) currentFound = true;
            }
            if (next) break;
        }

        if (next) {
            setActiveLesson(next);
        } else {
            // Final lesson of the course
            if (isFinalQuiz) {
                navigate('/dashboard');
            } else {
                navigate(`/course/${course.id}`);
            }
        }
    };

    const toggleCompletion = () => {
        if (activeLesson.assignments || activeLesson.assignment) {
            quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setCompletedLessons(prev => {
            const newSet = new Set(prev);
            if (newSet.has(activeLesson.id)) {
                newSet.delete(activeLesson.id);
            } else {
                newSet.add(activeLesson.id);
                setShowCompletionSuccess(true);
                setTimeout(() => setShowCompletionSuccess(false), 3000);
            }
            return newSet;
        });
    };

    if (loading) return (
        <div className="h-[calc(100vh-64px)] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent dark:border-primary dark:border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!course) return null;

    const isFinalQuiz = activeLesson?.type === 'quiz';

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
            <CourseProgressSidebar
                course={course}
                activeLesson={activeLesson}
                setActiveLesson={setActiveLesson}
                completedLessons={completedLessons}
                setShowResult={setShowResult}
                setSelectedOption={setSelectedOption}
                isSidebarOpen={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <main className="flex-1 w-full min-w-0 space-y-6">
                <div className="space-y-6 pb-10">
                    {isFinalQuiz ? (
                        <>
                            <LessonHeader
                                activeLesson={activeLesson}
                                completedLessons={completedLessons}
                                toggleCompletion={toggleCompletion}
                                setSidebarOpen={setSidebarOpen}
                                isSidebarOpen={isSidebarOpen}
                            />
                            <div ref={quizRef}>
                                <LessonQuiz
                                    activeLesson={activeLesson}
                                    showResult={showResult}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption}
                                    handleAssignmentSubmit={handleAssignmentSubmit}
                                    isCorrect={isCorrect}
                                    handleRetry={handleRetry}
                                    nextLesson={nextLesson}
                                    currentQuestionIndex={currentQuestionIndex}
                                    nextQuestion={nextQuestion}
                                    quizFinalResult={quizFinalResult}
                                    isFinalQuiz={true}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <LessonContent
                                activeLesson={activeLesson}
                                course={course}
                                isPip={isPip}
                                videoContainerRef={videoContainerRef}
                                videoRef={videoRef}
                            />

                            <LessonHeader
                                activeLesson={activeLesson}
                                completedLessons={completedLessons}
                                toggleCompletion={toggleCompletion}
                                setSidebarOpen={setSidebarOpen}
                                isSidebarOpen={isSidebarOpen}
                            />

                            <LessonTabs
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                activeLesson={activeLesson}
                                setActiveLesson={setActiveLesson}
                                completedLessons={completedLessons}
                                course={course}
                            />

                            <div ref={quizRef}>
                                <LessonQuiz
                                    activeLesson={activeLesson}
                                    showResult={showResult}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption}
                                    handleAssignmentSubmit={handleAssignmentSubmit}
                                    isCorrect={isCorrect}
                                    handleRetry={handleRetry}
                                    nextLesson={nextLesson}
                                    currentQuestionIndex={currentQuestionIndex}
                                    nextQuestion={nextQuestion}
                                    quizFinalResult={quizFinalResult}
                                />
                            </div>
                        </>
                    )}
                </div>
            </main>

            <CompletionSuccessModal isOpen={showCompletionSuccess} />
        </div >
    );
};

export default CourseLearning;
