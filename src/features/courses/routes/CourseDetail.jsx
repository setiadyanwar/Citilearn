import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '@/data.json';
import CourseDetailHeader from '@/features/courses/components/CourseDetailHeader';
import CourseStatsGrid from '@/features/courses/components/CourseStatsGrid';
import CourseCurriculum from '@/features/courses/components/CourseCurriculum';
import Breadcrumb from '@/components/common/Breadcrumb';
import CourseSidebarCard from '@/features/courses/components/CourseSidebarCard';

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const found = data.courses.find(c => c.id === id);
            setCourse(found);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [id]);

    if (loading) return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="skeleton h-8 w-1/3 rounded-lg" />
                    <div className="skeleton h-12 w-3/4 rounded-lg" />
                    <div className="skeleton h-24 w-full rounded-lg" />
                </div>
                <div className="skeleton h-80 rounded-2xl" />
            </div>
        </div>
    );

    if (!course) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h2 className="text-xl font-bold text-main dark:text-white mb-2">Course Not Found</h2>
            <p className="text-secondary dark:text-slate-500 text-sm mb-6">The course you are looking for doesn't exist or has been removed.</p>
            <button onClick={() => navigate('/')} className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all">
                Back to Dashboard
            </button>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto">
            <Breadcrumb
                showBack={false}
                items={[
                    { label: 'Explore Courses', link: '/courses' },
                    { label: course.title, link: null }
                ]}
            />

            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-10 items-start">

                {/* Right Column: Sticky Sidebar Component (Ordered First on Mobile) */}
                <div className="order-1 lg:order-2 w-full lg:w-auto lg:sticky lg:top-28 h-fit z-40 self-start">
                    <CourseSidebarCard course={course} />
                </div>

                {/* Left Column: Content (Ordered Second on Mobile) */}
                <div className="order-2 lg:order-1 space-y-10 w-full">
                    <CourseDetailHeader course={course} />

                    <CourseStatsGrid course={course} />

                    <CourseCurriculum course={course} />
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
