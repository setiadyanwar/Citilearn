import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, BookOpen, Bookmark, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import ProgressBar from '@/components/common/ProgressBar';
import BookmarkButton from '@/components/common/BookmarkButton';
import { COURSE_STATUS } from '@/constants/course';
import { cn } from '@/lib/utils';

const CourseCard = ({ course, compact = false, variant = 'default', disabled = false }) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(course.isBookmarked || false);
    const [timeLeft, setTimeLeft] = useState('');
    const [displayProgress, setDisplayProgress] = useState(course.progress || 0);

    // Calculate dynamic progress from localStorage
    useEffect(() => {
        const savedCompleted = localStorage.getItem(`course_progress_${course.id}`);
        if (savedCompleted) {
            const completedIds = JSON.parse(savedCompleted);
            const totalLessons = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || course.modulesCount || 1;
            const percentage = Math.round((completedIds.length / totalLessons) * 100);
            setDisplayProgress(percentage);
        } else {
            setDisplayProgress(course.progress || 0);
        }
    }, [course.id, course.modules, course.modulesCount, course.progress]);

    // Countdown logic for "Coming Soon" courses
    useEffect(() => {
        if (course.availableAt) {
            const calculateTimeLeft = () => {
                const availableDate = new Date(course.availableAt);
                const now = new Date();
                const difference = availableDate - now;

                if (difference > 0) {
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((difference / 1000 / 60) % 60);
                    const seconds = Math.floor((difference / 1000) % 60);

                    if (days > 0) {
                        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
                    } else {
                        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
                    }
                } else {
                    setTimeLeft(null); // Available
                }
            };

            calculateTimeLeft();
            const timer = setInterval(calculateTimeLeft, 1000);
            return () => clearInterval(timer);
        }
    }, [course.availableAt]);

    const handleBookmark = (e) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation();
        setIsBookmarked(!isBookmarked);
    };

    const isAvailable = !course.availableAt || new Date(course.availableAt) <= new Date();
    const isActuallyCompleted = displayProgress === 100;
    const isCompleted = course.status === COURSE_STATUS.DONE || isActuallyCompleted;
    const inProgress = (course.status === COURSE_STATUS.ON_PROGRESS || (displayProgress > 0 && !isActuallyCompleted)) && !isActuallyCompleted;
    const notStarted = (course.status === COURSE_STATUS.NOT_STARTED || (!course.status && isAvailable)) && displayProgress === 0;

    const handleCardClick = () => {
        if (isAvailable && !disabled) {
            if (inProgress) {
                navigate(`/profile/learning/${course.id}`);
            } else {
                navigate(`/course/${course.id}`);
            }
        }
    };

    const handleActionClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // If not enrolled/not started AND in dashboard grid, go to course landing page
        if (notStarted && !compact) {
            navigate(`/course/${course.id}`);
        } else {
            // Already on landing page or already enrolled, go to learning interface
            navigate(`/profile/learning/${course.id}`);
        }
    };

    // Determine Status Badge
    const renderStatusBadge = () => {
        if (isCompleted) {
            return <Badge variant="completed" size="sm">Completed</Badge>;
        }
        if (inProgress) {
            return <Badge variant="in-progress" size="sm">In Progress</Badge>;
        }
        if (course.status === COURSE_STATUS.FAILED) {
            return <Badge variant="failed" size="sm">Failed</Badge>;
        }
        return <Badge variant="not-started" size="sm">Not Started</Badge>;
    };

    return (
        <Card
            padding="p-0"
            className={`group flex flex-col h-full overflow-hidden transition-all duration-300 border border-gray-100 dark:border-slate-800 rounded-2xl ${isAvailable && !disabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={handleCardClick}
        >
            <div className={`flex flex-col h-full ${!isAvailable ? 'opacity-75' : ''}`}>
                {/* Image Section */}
                <div className={`relative ${compact ? 'h-40' : 'h-48'} bg-gray-100 dark:bg-slate-800 overflow-hidden`}>
                    {course.thumbnail ? (
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className={`w-full h-full object-cover transition-transform duration-700 ${isAvailable ? 'group-hover:scale-105' : 'grayscale opacity-80'}`}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-300 bg-slate-50 dark:bg-slate-900/50">
                            <BookOpen size={48} strokeWidth={1.5} />
                            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-400">No Preview</p>
                        </div>
                    )}

                    {/* Status Badge (Top Left) */}
                    <div className="absolute top-4 left-4 z-10">
                        {renderStatusBadge()}
                    </div>

                    {/* Bookmark Toggle (Top Right) - Only if NOT completed/certificate */}
                    {!isCompleted && (
                        <div className="absolute top-4 right-4 z-10">
                            <BookmarkButton isBookmarked={isBookmarked} size={18} />
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className={`${compact ? 'p-4' : 'p-4 sm:p-5'} flex-1 flex flex-col`}>
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs font-bold text-tertiary mb-3 tracking-wide flex-nowrap overflow-x-auto no-scrollbar">
                        <span className="text-secondary whitespace-nowrap">{course.category || 'General'}</span>
                        {course.duration && (
                            <span className="flex items-center gap-1.5 text-tertiary whitespace-nowrap">
                                <Clock size={14} className="text-primary" />
                                {course.duration}
                            </span>
                        )}
                        {(course.modulesCount > 0 || course.modules?.length > 0) && (
                            <span className="flex items-center gap-1.5 text-tertiary whitespace-nowrap">
                                <BookOpen size={14} className="text-primary" />
                                {course.modulesCount || course.modules?.length} Modules
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className={`${compact ? 'text-base' : 'text-xl'} font-bold text-main dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors`} title={course.title}>
                        {course.title}
                    </h3>

                    {/* Description (Optional) */}
                    {!compact && course.description && (
                        <p className="text-sm text-secondary dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed font-medium">
                            {course.description}
                        </p>
                    )}

                    <div className="mt-auto pt-4">
                        {/* 1. NOT AVAILABLE (Coming Soon) */}
                        {!isAvailable && (
                            <div className="w-full bg-gray-50 text-gray-400 font-bold rounded-xl h-11 border border-gray-100 flex items-center justify-center text-sm">
                                Available in {timeLeft || 'Loading...'}
                            </div>
                        )}

                        {/* 2. COMPLETED or IN PROGRESS */}
                        {isAvailable && (isCompleted || inProgress) && (
                            <div className="space-y-2">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-3xs font-bold text-tertiary uppercase tracking-wider">Progress</span>
                                    <span className="text-sm font-bold text-primary">{isCompleted ? '100' : displayProgress}%</span>
                                </div>
                                <ProgressBar
                                    progress={isCompleted ? 100 : displayProgress}
                                    height="h-2"
                                    color="bg-primary"
                                    trackColor="bg-gray-100"
                                    rounded="rounded-full"
                                />
                                {isCompleted && course.finishedAt && (
                                    <p className="text-3xs font-medium text-tertiary mt-1">
                                        Finished at: {course.finishedAt}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* 3. NOT STARTED */}
                        {isAvailable && notStarted && (
                            <Button
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold rounded-xl h-11 shadow-none transition-all active:scale-[0.98]"
                                onClick={handleActionClick}
                            >
                                {compact ? 'Enroll Now' : 'Start Learn'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CourseCard;
