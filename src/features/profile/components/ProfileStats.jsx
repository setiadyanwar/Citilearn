import React, { useMemo } from 'react';
import { BookOpen, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import StatCard from '@/features/dashboard/components/StatCard';
import { useAuthContext } from '@/contexts/useAuthContext';
import data from '@/data.json';
import { formatPoints } from '@/utils/helpers';

const ProfileStats = () => {
    const { user } = useAuthContext();

    const stats = useMemo(() => {
        const courses = data.courses || [];
        const enrolledCourses = courses.filter(c => c.status !== 'Not Started');

        // Calculate dynamic points from all quizzes
        let totalQuizPoints = 0;
        courses.forEach(course => {
            course.modules.forEach(module => {
                module.lessons.forEach(lesson => {
                    if (lesson.type === 'quiz') {
                        // Check for history in localStorage
                        const storageKey = `quiz_history_${lesson.id}`;
                        const historyStr = localStorage.getItem(storageKey);

                        if (historyStr) {
                            const history = JSON.parse(historyStr);
                            const maxScore = Math.max(...history.map(h => h.score || 0));
                            totalQuizPoints += maxScore;
                        } else if (course.status === 'Done') {
                            // Mock fallback for already completed courses in data.json
                            totalQuizPoints += 100;
                        }
                    }
                });
            });
        });

        return [
            {
                label: 'Total Courses',
                value: enrolledCourses.length.toString(),
                icon: <BookOpen size={20} />,
                trendType: 'neutral'
            },
            {
                label: 'Completed',
                value: enrolledCourses.filter(c => c.status === 'Done').length.toString(),
                icon: <CheckCircle size={20} />,
                trendType: 'neutral'
            },
            {
                label: 'Mandatory',
                value: enrolledCourses.filter(c => c.category === 'Safety').length.toString(),
                icon: <ShieldCheck size={20} />,
                trendType: 'neutral'
            },
            {
                label: 'Total Points',
                value: formatPoints(totalQuizPoints).toString(),
                icon: <Zap size={20} />,
                trendType: 'neutral'
            },
        ];
    }, [user?.points]); // Still keep user?.points in dependency if user data changes overall

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <StatCard
                    key={index}
                    label={stat.label}
                    value={stat.value}
                    icon={stat.icon}
                    trendType={stat.trendType}
                />
            ))}
        </div>
    );
};

export default ProfileStats;
