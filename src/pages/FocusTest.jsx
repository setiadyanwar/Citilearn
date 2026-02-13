import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../data.json';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/common/Badge';
import Card from '@/components/common/Card';
import { Clock, Video, VideoOff, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import QuizOption from '@/components/learning/quiz/QuizOption';

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

                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
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

                {/* Right: Sidebar & Floating Elements */}
                <div className="lg:col-span-1 lg:space-y-6 lg:sticky lg:top-24 lg:h-fit pointer-events-none lg:pointer-events-auto">
                    {/* Camera Feed - Floating on Mobile, Static in Sidebar on Desktop */}
                    {isPostTest && (
                        <Card
                            className={cn(
                                "pointer-events-auto transition-all duration-300",
                                // Mobile Styles
                                "overflow-hidden bg-black dark:bg-black relative flex items-center justify-center", // Base styles
                                // Mobile Styles
                                "fixed bottom-6 right-6 w-32 aspect-3/4 z-50 shadow-2xl border-2 border-white dark:border-slate-800",
                                // Tablet Adjustments
                                "md:w-48 md:aspect-video",
                                // Desktop Styles (Reset to Sidebar)
                                "lg:static lg:w-full lg:aspect-video lg:shadow-none lg:border-0 lg:z-auto"
                            )}
                            padding="p-0"
                            rounded="rounded-xl lg:rounded-2xl"
                        >
                            {cameraActive ? (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-full object-cover transform scale-x-[-1]"
                                />
                            ) : (
                                <div className="flex flex-col items-center text-slate-500">
                                    <VideoOff className="w-8 h-8 mb-2" />
                                    <span className="text-xs">Camera Inactive</span>
                                </div>
                            )}
                            {/* Mobile Nav Toggle */}


                            <div className="absolute top-3 left-3 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                        </Card>
                    )}

                    {/* Mobile Nav Toggle - Floating */}
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

                    {/* Navigation Grid - Desktop Static */}
                    <div className="hidden lg:block">
                        <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
                            <div className="mb-4">
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Navigation Question</h3>
                            </div>
                            <div className="grid grid-cols-5 gap-2 place-items-center">
                                {questions.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => scrollToQuestion(idx)}
                                        className={cn(
                                            "w-[38px] h-[38px] flex items-center justify-center rounded-lg text-sm font-bold transition-all",
                                            answers[idx] !== undefined
                                                ? "bg-emerald-600 text-white"
                                                : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700"
                                        )}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
                                <button
                                    onClick={handleSubmit}
                                    className="w-full text-left text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-bold text-sm hover:underline"
                                >
                                    Finish Attempt
                                </button>
                            </div>
                        </Card>
                    </div>

                    {/* Navigation Grid - Mobile Drawer */}
                    {showMobileNav && (
                        <div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden pointer-events-auto"
                            onClick={() => setShowMobileNav(false)}
                        />
                    )}

                    <div className={cn(
                        "fixed inset-y-0 right-0 w-80 z-[70] shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out bg-white dark:bg-slate-900 lg:hidden pointer-events-auto",
                        showMobileNav ? "translate-x-0" : "translate-x-full"
                    )}>
                        <div className="mb-6 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Navigation Question</h3>
                            <button
                                onClick={() => setShowMobileNav(false)}
                                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full dark:text-gray-400 dark:hover:bg-slate-800"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="grid grid-cols-5 gap-2 place-items-center">
                            {questions.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        scrollToQuestion(idx);
                                        setShowMobileNav(false);
                                    }}
                                    className={cn(
                                        "w-[38px] h-[38px] flex items-center justify-center rounded-lg text-sm font-bold transition-all",
                                        answers[idx] !== undefined
                                            ? "bg-emerald-600 text-white"
                                            : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700"
                                    )}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
                            <button
                                onClick={handleSubmit}
                                className="w-full text-left text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-bold text-sm hover:underline"
                            >
                                Finish Attempt
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FocusTest;
