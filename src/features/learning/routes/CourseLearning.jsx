import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import data from '@/data.json';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import CourseProgressSidebar from '@/features/learning/components/CourseProgressSidebar';
import CompletionSuccessModal from '@/features/learning/components/CompletionSuccessModal';
import LessonHeader from '@/features/learning/components/LessonHeader';
import LessonContent from '@/features/learning/components/LessonContent';
import LessonTabs from '@/features/learning/components/LessonTabs';
import LessonQuiz from '@/features/learning/components/LessonQuiz';
import QuizLanding from '@/features/learning/components/QuizLanding';
import { STORAGE_KEYS } from '@/constants/storageKeys';

const CourseLearning = ({ setGlobalPip }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
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
    const [quizStarted, setQuizStarted] = useState(false);

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

            // Load completed lessons from localStorage
            const savedCompleted = localStorage.getItem(STORAGE_KEYS.courseProgress(id));
            if (savedCompleted) {
                setCompletedLessons(new Set(JSON.parse(savedCompleted)));
            } else if (found && found.progress > 0) {
                // Initial fallback if not in localStorage but has progress in data.json
                // This is just a mock logic for the initial state
            }

            if (found && found.modules.length > 0) {
                // Check for targetLessonId from navigation state
                const targetLessonId = location.state?.targetLessonId;
                let initialLesson = found.modules[0].lessons[0];

                if (targetLessonId) {
                    for (const module of found.modules) {
                        const l = module.lessons.find(l => l.id === targetLessonId);
                        if (l) {
                            initialLesson = l;
                            break;
                        }
                    }
                }

                setActiveLesson(initialLesson);
            }
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [id, location.state]);

    // Save progress whenever completedLessons changes
    useEffect(() => {
        if (course && course.id) {
            localStorage.setItem(STORAGE_KEYS.courseProgress(course.id), JSON.stringify([...completedLessons]));
        }
    }, [completedLessons, course]);

    useEffect(() => {
        // Reset quiz state when switching lessons
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setQuizFinalResult(null);
        setQuizStarted(false);
    }, [activeLesson]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the video container is not intersecting (out of view)
                // AND it is positioned above the viewport (top < 0), usage has scrolled past it -> Enable PiP.
                // Otherwise (intersecting or below viewport), disable PiP.
                setIsPip(!entry.isIntersecting && entry.boundingClientRect.top < 0);
            },
            {
                root: null, // viewport
                threshold: 0, // Trigger immediately when visibility changes
            }
        );

        if (videoContainerRef.current) {
            observer.observe(videoContainerRef.current);
        }

        return () => {
            if (videoContainerRef.current) {
                observer.unobserve(videoContainerRef.current);
            }
        };
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
            // End of quiz — score state is async so we compute final score directly here
            const finalScore = score + (isCorrect ? 1 : 0);
            const totalQuestions = quizList.length;
            const percentage = Math.round((finalScore / totalQuestions) * 100);

            setQuizFinalResult({
                score: finalScore,
                total: totalQuestions,
                percentage
            });

            // Save history to localStorage using centralized key
            const passed = percentage >= (activeLesson.passingGrade || 80);
            const newHistoryItem = {
                date: new Date().toISOString(),
                score: percentage,
                passed,
            };
            const storageKey = STORAGE_KEYS.quizHistory(activeLesson.id);
            const existing = localStorage.getItem(storageKey);
            const history = existing ? JSON.parse(existing) : [];
            history.push(newHistoryItem);
            localStorage.setItem(storageKey, JSON.stringify(history));

            // Mark lesson as complete
            if (activeLesson.type !== 'quiz' || percentage >= 70) {
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
            // Final lesson of the course, go back to my learning list
            navigate('/profile/learning');
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
                        <QuizLanding
                            activeLesson={activeLesson}
                            onNextLesson={nextLesson}
                        />
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

            <CompletionSuccessModal
                isOpen={showCompletionSuccess}
                onContinue={() => {
                    setShowCompletionSuccess(false);
                    nextLesson();
                }}
            />
        </div >
    );
};

export default CourseLearning;
