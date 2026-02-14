import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '@/data.json';
import { Button } from '@/components/ui/button';
import { Clock, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProctoringCamera from '@/features/learning/components/quiz/ProctoringCamera';
import QuestionNavigation from '@/features/learning/components/quiz/QuestionNavigation';
import QuestionList from '@/features/learning/components/quiz/QuestionList';

const FocusTest = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
    const [answers, setAnswers] = useState({});
    const [cameraActive, setCameraActive] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    // Initial Load
    useEffect(() => {
        const foundCourse = data.courses.find(c => c.id === courseId);
        if (foundCourse) {
            let foundLesson = null;
            for (const module of foundCourse.modules) {
                const l = module.lessons.find(l => l.id === lessonId);
                if (l) {
                    foundLesson = l;
                    break;
                }
            }
            setLesson(foundLesson);
        }
    }, [courseId, lessonId]);

    const isPostTest = lesson?.id === 'l-final' || lesson?.id.includes('final') || lesson?.title.toLowerCase().includes('post');
    const questions = lesson?.assignments || [];

    // Timer
    useEffect(() => {
        if (!lesson) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(); // Auto submit
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [lesson]);

    // Camera Logic
    useEffect(() => {
        let stream = null;

        const startCamera = async () => {
            if (isPostTest && navigator.mediaDevices) {
                try {
                    stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                    setCameraActive(true);
                } catch (err) {
                    console.error("Camera access denied or error:", err);
                    setCameraActive(false);
                }
            }
        };

        if (lesson && isPostTest) {
            startCamera();
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [lesson, isPostTest]);

    // Retry attaching video stream if ref wasn't ready
    useEffect(() => {
        if (cameraActive && videoRef.current && streamRef.current) {
            if (videoRef.current.srcObject !== streamRef.current) {
                videoRef.current.srcObject = streamRef.current;
            }
        }
    }, [cameraActive]);

    const handleOptionSelect = (qIdx, optionIdx) => {
        setAnswers(prev => ({
            ...prev,
            [qIdx]: optionIdx
        }));
    };

    const scrollToQuestion = (index) => {
        const element = document.getElementById(`question-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // Lock body scroll when mobile nav is open
    useEffect(() => {
        if (showMobileNav) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [showMobileNav]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleSubmit = () => {
        // Calculate score
        let score = 0;
        questions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswer) {
                score++;
            }
        });

        const percentage = Math.round((score / questions.length) * 100);
        const passed = percentage >= 75;

        // Save history
        const newHistoryItem = {
            date: new Date().toISOString(),
            score: percentage,
            passed: passed
        };
        const storageKey = `quiz_history_${lessonId}`;
        const existing = localStorage.getItem(storageKey);
        const history = existing ? JSON.parse(existing) : [];
        history.push(newHistoryItem);
        localStorage.setItem(storageKey, JSON.stringify(history));

        // Redirect back to course learning page
        // We can pass state to show result immediately if we want, 
        // but for now let's just go back and let the logic there handle "completed" or "history"
        navigate(`/learn/${courseId}`, { state: { targetLessonId: lessonId } });
    };

    if (!lesson) return <div className="p-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col">
            {/* Header */}
            <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                        {lesson.title}
                    </h1>
                    <span className="text-sm text-gray-500 dark:text-slate-400">
                        {isPostTest ? 'Proctored Exam' : 'Knowledge Check'}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                        <span className="text-lg font-mono font-bold text-gray-900 dark:text-white">
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 lg:px-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Left: Questions List */}
                <QuestionList
                    questions={questions}
                    answers={answers}
                    handleOptionSelect={handleOptionSelect}
                    handleSubmit={handleSubmit}
                />

                {/* Right: Sidebar & Floating Elements */}
                <div className="lg:col-span-1 lg:space-y-6 lg:sticky lg:top-24 lg:h-fit pointer-events-none lg:pointer-events-auto">
                    {/* Camera Feed - Floating on Mobile, Static in Sidebar on Desktop */}
                    <ProctoringCamera
                        isPostTest={isPostTest}
                        cameraActive={cameraActive}
                        videoRef={videoRef}
                    />

                    {/* Mobile Nav Toggle - Floating */}
                    <div className={cn(
                        "lg:hidden fixed right-0 z-50 transition-all duration-300 pointer-events-auto",
                        isPostTest ? "top-25" : "bottom-6"
                    )}>
                        <Button
                            size="icon"
                            className="rounded-l-xl rounded-r-none h-12 w-14 shadow-xl bg-emerald-600 hover:bg-emerald-700 text-white border-r-0"
                            onClick={() => setShowMobileNav(!showMobileNav)}
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                    </div>

                    {/* Navigation Grid (Desktop & Mobile) */}
                    <QuestionNavigation
                        questions={questions}
                        answers={answers}
                        scrollToQuestion={scrollToQuestion}
                        handleSubmit={handleSubmit}
                        showMobileNav={showMobileNav}
                        setShowMobileNav={setShowMobileNav}
                    />
                </div>
            </main>
        </div>
    );
};

export default FocusTest;
