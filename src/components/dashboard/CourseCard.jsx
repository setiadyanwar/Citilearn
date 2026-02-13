import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Bookmark, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Card from '../common/Card';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';
import BookmarkButton from '../common/BookmarkButton';
import { COURSE_STATUS } from '../../constants/course';
import { cn } from '@/lib/utils';

const CourseCard = ({ course, compact = false, variant = 'default', disabled = false }) => {
    const [isBookmarked, setIsBookmarked] = useState(course.isBookmarked || false);
    const [timeLeft, setTimeLeft] = useState('');

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
    const isCompleted = course.status === COURSE_STATUS.DONE;
    const inProgress = course.status === COURSE_STATUS.ON_PROGRESS;
    const notStarted = course.status === COURSE_STATUS.NOT_STARTED || (!course.status && isAvailable);

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
        <Card padding="p-0" className="group flex flex-col h-full overflow-hidden transition-all duration-300 border border-gray-100 dark:border-slate-800 rounded-2xl">
            <Link to={isAvailable ? `/course/${course.id}` : '#'} className={`flex flex-col h-full ${!isAvailable ? 'cursor-not-allowed' : ''}`}>
                {/* Image Section */}
                <div className={`relative ${compact ? 'h-40' : 'h-48'} bg-gray-100 dark:bg-slate-800 overflow-hidden`}>
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${isAvailable ? 'group-hover:scale-105' : 'grayscale opacity-80'}`}
                    />

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
                    <div className="flex items-center gap-4 text-xs font-bold text-tertiary mb-3 tracking-wide">
                        <span className="text-secondary">{course.category || 'General'}</span>
                        {course.duration && (
                            <span className="flex items-center gap-1.5 text-tertiary">
                                <Clock size={14} className="text-primary" />
                                {course.duration}
                            </span>
                        )}
                        {(course.modulesCount > 0 || course.modules?.length > 0) && (
                            <span className="flex items-center gap-1.5 text-tertiary">
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
                            <Button
                                disabled
                                className="w-full bg-gray-100 text-gray-500 font-bold rounded-xl h-11 border border-gray-200 cursor-not-allowed"
                            >
                                Available in {timeLeft || 'Loading...'}
                            </Button>
                        )}

                        {/* 2. COMPLETED (Download Certificate) */}
                        {isAvailable && isCompleted && (
                            <div className="flex flex-col gap-3">
                                {course.finishedAt && (
                                    <span className="text-sm font-medium text-secondary">
                                        Finished at: {course.finishedAt}
                                    </span>
                                )}
                                <Button
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold rounded-xl h-11 flex items-center justify-center gap-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // Handle download logic
                                        console.log("Download Certificate clicked");
                                    }}
                                >
                                    Download Certificate
                                    <Download size={18} />
                                </Button>
                            </div>
                        )}

                        {/* 3. IN PROGRESS */}
                        {isAvailable && inProgress && (
                            <div className="space-y-2">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-xs font-bold text-tertiary uppercase">Progress</span>
                                    <span className="text-sm font-bold text-primary">{course.progress}%</span>
                                </div>
                                <ProgressBar
                                    progress={course.progress}
                                    height="h-2"
                                    color="bg-primary"
                                    trackColor="bg-gray-100"
                                    rounded="rounded-full"
                                />
                            </div>
                        )}

                        {/* 4. NOT STARTED */}
                        {isAvailable && notStarted && (
                            <Button
                                disabled={disabled}
                                className={cn(
                                    "w-full bg-primary hover:bg-primary-dark text-white font-bold rounded-xl h-11",
                                    disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                                )}
                            >
                                Start Learn
                            </Button>
                        )}
                    </div>
                </div>
            </Link>
        </Card>
    );
};

export default CourseCard;
