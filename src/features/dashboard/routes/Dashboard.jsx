import React, { useState, useEffect, useRef } from 'react';
import data from '@/data.json';
import { useDashboardFilter } from '@/hooks/useDashboardFilter';
import DashboardHero from '@/features/dashboard/components/DashboardHero';
import CourseCard from '@/features/dashboard/components/CourseCard';
import MandatorySection from '@/features/dashboard/components/MandatorySection';
import ResumeSection from '@/features/dashboard/components/ResumeSection';
import DashboardSkeleton from '@/features/dashboard/components/DashboardSkeleton';
import RecommendationHeader from '@/features/dashboard/components/RecommendationHeader';

const Dashboard = () => {
    const {
        searchQuery,
        handleSearch,
        selectedCategory,
        setSelectedCategory,
        selectedStatus,
        setSelectedStatus,
    } = useDashboardFilter();
    
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const coursesRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCourses(data.courses);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const statusDropdownRef = useRef(null);

    // No local handleClickOutside needed here anymore as it's now handled by DashboardHero
    // but we can keep it if we want to ensure any outside click closes it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
                setIsStatusDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter by Search Query (Global)
    const searchFilteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Continue Learning Courses (only search filter, filtered by status)
    const continueLearningCourses = searchFilteredCourses.filter(c => c.status === 'On Progress' && c.progress > 0);

    // Mandatory Courses (Mock logic: Filter by 'Safety' category or take first few)
    const mandatoryCourses = searchFilteredCourses.filter(c => c.category === 'Safety' || c.category === 'Technical').slice(0, 4);
    // console.log('Mandatory Courses:', mandatoryCourses.length, mandatoryCourses);

    // Main Grid Filter Logic
    const recommendedCourses = searchFilteredCourses.filter(course => {
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
        const isCompleted = course.status === 'Completed' || course.progress === 100;

        // Status Filter
        let matchesStatus = true;
        if (selectedStatus === 'Not Started') {
            matchesStatus = course.status !== 'On Progress' && !isCompleted && course.progress === 0;
        } else if (selectedStatus === 'On Progress') {
            matchesStatus = course.status === 'On Progress';
        } else if (selectedStatus === 'Done') {
            matchesStatus = isCompleted;
        } else if (selectedStatus === 'All') {
            // Default view: Show "Not Started" and "In Progress", HIDE "Completed"
            matchesStatus = !isCompleted;
        }

        // Removed hideBecauseResume logic to allow In Progress items in the main grid

        return matchesCategory && matchesStatus;
    }).sort((a, b) => {
        // Sort Logic: "Not Available" (Coming Soon) first, then others
        const now = new Date();
        const aAvailable = !a.availableAt || new Date(a.availableAt) <= now;
        const bAvailable = !b.availableAt || new Date(b.availableAt) <= now;

        if (!aAvailable && bAvailable) return -1; // a is unavailable (Coming Soon), put it first
        if (aAvailable && !bAvailable) return 1;  // b is unavailable, put it first
        return 0; // maintain original order for others
    });

    // Limit to 2 rows (4 columns * 2 rows = 8 items) for the dashboard view
    const displayedCourses = recommendedCourses.slice(0, 8);

    if (loading) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="space-y-6 md:space-y-12">
            <DashboardHero
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                isStatusDropdownOpen={isStatusDropdownOpen}
                setIsStatusDropdownOpen={setIsStatusDropdownOpen}
            />

            <div className="space-y-4 md:space-y-8 pt-4" ref={coursesRef}>

                {/* New Dashboard Sections */}
                <div className="flex flex-col xl:flex-row gap-4 xl:gap-6 mb-8">
                    {/* Mandatory Courses Section */}
                    <div className="min-w-0 w-full xl:w-[68%]">
                        <MandatorySection courses={mandatoryCourses} />
                    </div>

                    {/* Resume Training Scrolling Logic */}
                    <div className="min-w-0 w-full xl:w-[32%]">
                        <ResumeSection courses={continueLearningCourses} />
                    </div>
                </div>

                {/* Main Course Grid Headers */}
                <RecommendationHeader searchQuery={searchQuery} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-8 min-h-125 content-start">
                    {displayedCourses.length > 0 ? (
                        displayedCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-secondary dark:text-slate-500">
                            No courses found matching "{searchQuery}"
                        </div>
                    )}
                </div>

                {/* Pagination */}


                <div className="pb-12"></div>
            </div>
        </div>
    );
};

export default Dashboard;
