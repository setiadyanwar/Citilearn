import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../data.json';
import { motion, AnimatePresence } from 'framer-motion';
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

    const videoContainerRef = useRef(null);
    const videoRef = useRef(null);

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
        const handleScroll = () => {
            if (!videoContainerRef.current) return;
            const videoRect = videoContainerRef.current.getBoundingClientRect();
            // Check if the bottom of the video is well above the viewport top
            // indicating it has been scrolled past.
            if (videoRect.bottom < 100) {
                setIsPip(true);
            } else {
                setIsPip(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeLesson]);


    // Cleanup: Set global PiP when leaving the page (unmounting)


    const handleAssignmentSubmit = () => {
        if (selectedOption === activeLesson.assignment.correctAnswer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setShowResult(true);
    };

    const nextLesson = () => {
        setShowResult(false);
        setSelectedOption(null);
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
            navigate(`/course/${course.id}`);
        }
    };

    const toggleCompletion = () => {
        setCompletedLessons(prev => {
            const newSet = new Set(prev);
            if (newSet.has(activeLesson.id)) {
                newSet.delete(activeLesson.id);
            } else {
                newSet.add(activeLesson.id);
                // Trigger Animation
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

            {/* Main Content Area (Now on Right) */}
            <main
                className="flex-1 w-full min-w-0"
            >
                <LessonHeader
                    activeLesson={activeLesson}
                    completedLessons={completedLessons}
                    toggleCompletion={toggleCompletion}
                    setSidebarOpen={setSidebarOpen}
                    isSidebarOpen={isSidebarOpen}
                />

                <motion.div
                    key={activeLesson?.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8 pb-10"
                >
                    <LessonContent
                        activeLesson={activeLesson}
                        course={course}
                        isPip={isPip}
                        videoContainerRef={videoContainerRef}
                        videoRef={videoRef}
                    />

                    <LessonTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        activeLesson={activeLesson}
                        setActiveLesson={setActiveLesson}
                        completedLessons={completedLessons}
                        course={course}
                    />

                    <LessonQuiz
                        activeLesson={activeLesson}
                        showResult={showResult}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        handleAssignmentSubmit={handleAssignmentSubmit}
                        isCorrect={isCorrect}
                        nextLesson={nextLesson}
                    />
                </motion.div>
            </main>


            {/* Completion Celebration Modal */}
            <CompletionSuccessModal isOpen={showCompletionSuccess} />
        </div >
    );
};

export default CourseLearning;
