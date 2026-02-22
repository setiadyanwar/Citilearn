import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle2, Share2, BookOpen } from 'lucide-react';
import CourseCard from '@/features/dashboard/components/CourseCard';

const CourseSidebarCard = ({ course }) => {
    const navigate = useNavigate();

    return (
        <div className="relative">
            <div className="space-y-6">
                {/* Main Course Card */}
                <CourseCard course={course} compact={true} />

                {/* Secondary Card (Learning Objectives) */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8">
                    <h4 className="font-bold text-base text-main dark:text-white mb-6">Learning Objectives</h4>
                    <ul className="space-y-5">
                        {(course.learningObjectives || [
                            "Industry-standard aviation courseware",
                            "Flexible 24/7 multi-device access",
                            "Internal training completion record"
                        ]).map((outcome, index) => (
                            <li key={index} className="flex items-start gap-3.5 text-secondary dark:text-slate-400">
                                <BookOpen size={20} className="text-tertiary dark:text-slate-700 mt-0.5 shrink-0" />
                                <span className="text-sm font-medium leading-relaxed">{outcome}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CourseSidebarCard;
