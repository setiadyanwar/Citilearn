import React from 'react';
import BookmarkButton from '@/components/common/BookmarkButton';
import Badge from '@/components/common/Badge';
import { Clock, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { STORAGE_KEYS } from '@/constants/storageKeys';

const DashboardCourseCard = ({ course, variant = 'resume' }) => {
    const navigate = useNavigate();
    const isMandatory = variant === 'mandatory';

    // State for availability countdown
    const [timeLeft, setTimeLeft] = React.useState('');
    const [isLocked, setIsLocked] = React.useState(false);
    const [displayProgress, setDisplayProgress] = React.useState(course.progress || 0);

    // Calculate dynamic progress from localStorage
    React.useEffect(() => {
        const savedCompleted = localStorage.getItem(STORAGE_KEYS.courseProgress(course.id));
        if (savedCompleted) {
            const completedIds = JSON.parse(savedCompleted);
            const totalLessons = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || course.modulesCount || 1;
            const percentage = Math.round((completedIds.length / totalLessons) * 100);
            setDisplayProgress(percentage);
        } else {
            setDisplayProgress(course.progress || 0);
        }
    }, [course.id, course.modules, course.modulesCount, course.progress]);

    React.useEffect(() => {
        if (course.availableAt) {
            const calculateTimeLeft = () => {
                const availableDate = new Date(course.availableAt);
                const now = new Date();
                const difference = availableDate - now;

                if (difference > 0) {
                    setIsLocked(true);
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
                    setTimeLeft(null);
                    setIsLocked(false);
                }
            };

            calculateTimeLeft();
            const timer = setInterval(calculateTimeLeft, 1000); // Update every second to better sync
            return () => clearInterval(timer);
        }
    }, [course.availableAt]);

    const handleClick = () => {
        if (!isLocked) {
            const isActuallyCompleted = displayProgress === 100;
            if (course.status === 'On Progress' || (displayProgress > 0 && !isActuallyCompleted)) {
                navigate(`/profile/learning/${course.id}`);
            } else {
                navigate(`/course/${course.id}`);
            }
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`flex flex-row gap-4 p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl cursor-pointer group overflow-hidden transition-all duration-300 ${isLocked ? 'opacity-75 grayscale cursor-not-allowed' : ''}`}
        >
            {/* Thumbnail */}
            <div className="relative shrink-0 rounded-xl overflow-hidden w-28 h-auto">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${!isLocked ? 'group-hover:scale-105' : ''}`}
                />
                {!isLocked && (
                    <div className="absolute top-1.5 left-1.5 z-10">
                        <BookmarkButton size={12} className="p-1" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div className="min-w-0">
                    <div className="flex items-center justify-between font-medium mb-2 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                            {isMandatory && (
                                <div className="shrink-0">
                                    <Badge variant="mandatory" size="compact">Mandatory</Badge>
                                </div>
                            )}
                            <span className="text-xs text-tertiary truncate min-w-0">{course.category}</span>
                        </div>
                        {!isLocked && (
                            <span className="text-xs text-secondary dark:text-slate-500 flex items-center gap-1 whitespace-nowrap shrink-0">
                                <Clock size={12} />
                                {course.timeLeft || 'Start now'}
                            </span>
                        )}
                    </div>

                    <h3 className={`text-base font-bold text-main dark:text-white mb-1 transition-colors overflow-hidden whitespace-nowrap overflow-ellipsis block w-full ${!isLocked ? 'group-hover:text-primary' : ''}`}>
                        {course.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                        {displayProgress === 100 ? (
                            <Badge variant="completed" size="compact">Completed</Badge>
                        ) : displayProgress > 0 ? (
                            <Badge variant="in-progress" size="compact">In Progress</Badge>
                        ) : (
                            <Badge variant="not-started" size="compact">Not Started</Badge>
                        )}
                    </div>
                    <p className="text-xs text-secondary dark:text-slate-400 mb-3 block w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {course.description}
                    </p>

                    <div className="flex items-center gap-4 mb-3 overflow-hidden">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-tertiary whitespace-nowrap shrink-0">
                            <Clock size={14} className="text-primary" />
                            {course.duration}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-tertiary whitespace-nowrap shrink-0">
                            <BookOpen size={14} className="text-primary" />
                            {course.modules?.length || 0} Modules
                        </div>
                    </div>
                </div>

                {/* Progress or Locked State */}
                <div className="mt-auto">
                    {isLocked ? (
                        <button
                            disabled
                            className="w-full py-2 px-3 bg-gray-100 dark:bg-slate-800 text-secondary dark:text-slate-400 text-xs font-bold rounded-lg cursor-not-allowed border border-gray-200 dark:border-slate-700 flex items-center justify-center gap-2"
                        >
                            <Clock size={14} />
                            Available in {timeLeft}
                        </button>
                    ) : (
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <span className="text-xs font-medium text-tertiary">Progress</span>
                                <span className="text-xs font-bold text-primary">
                                    {displayProgress}%
                                </span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{ width: `${displayProgress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default DashboardCourseCard;
