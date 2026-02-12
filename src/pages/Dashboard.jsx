import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import data from '../data.json';
import DashboardHero from '../components/dashboard/DashboardHero';
import CourseCard from '../components/dashboard/CourseCard';
import MandatorySection from '../components/dashboard/MandatorySection';
import ResumeSection from '../components/dashboard/ResumeSection';

import { Filter } from 'lucide-react';

const Dashboard = ({
    searchQuery,
    handleSearch,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus
}) => {
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
    console.log('Mandatory Courses:', mandatoryCourses.length, mandatoryCourses);

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
        return (
            <div className="space-y-12 animate-pulse">
                {/* Hero Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8 items-stretch">
                    {/* Left Card (Welcome) */}
                    <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-10 h-full flex flex-col justify-between min-h-[400px]">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-4 w-32 rounded bg-gray-200 dark:bg-slate-800" />
                                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-800" />
                            </div>
                            <div className="h-12 w-3/4 rounded bg-gray-200 dark:bg-slate-800" />
                            <div className="h-6 w-full max-w-md rounded bg-gray-200 dark:bg-slate-800" />
                        </div>
                        <div className="mt-8 space-y-6">
                            <div className="h-12 w-full rounded-2xl bg-gray-200 dark:bg-slate-800" />
                            <div className="flex gap-3">
                                <div className="h-10 w-full rounded-full bg-gray-200 dark:bg-slate-800" />
                                <div className="h-10 w-48 rounded-full bg-gray-200 dark:bg-slate-800" />
                            </div>
                        </div>
                    </div>

                    {/* Right Card (Stats) */}
                    <div className="lg:col-span-6 flex flex-col gap-4">
                        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-8 flex flex-row items-stretch justify-between gap-6 overflow-hidden min-h-[200px]">
                            <div className="flex flex-col justify-between gap-4">
                                <div className="h-20 w-20 rounded-full border-4 border-gray-200 dark:border-slate-800" />
                                <div className="space-y-2">
                                    <div className="h-4 w-32 rounded bg-gray-200 dark:bg-slate-800" />
                                    <div className="h-3 w-20 rounded bg-gray-200 dark:bg-slate-800" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-full sm:w-auto">
                                <div className="flex gap-3">
                                    <div className="h-20 w-24 rounded-2xl bg-gray-200 dark:bg-slate-800" />
                                    <div className="h-20 w-24 rounded-2xl bg-gray-200 dark:bg-slate-800" />
                                </div>
                                <div className="h-12 w-full rounded-2xl bg-gray-200 dark:bg-slate-800" />
                            </div>
                        </div>
                        <div className="hidden sm:grid grid-cols-2 gap-4 flex-1">
                            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 h-32 flex flex-col justify-between">
                                <div className="h-8 w-16 rounded bg-gray-200 dark:bg-slate-800" />
                                <div className="h-10 w-10 rounded bg-gray-200 dark:bg-slate-800 self-end" />
                            </div>
                            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 h-32 flex flex-col justify-between">
                                <div className="h-8 w-16 rounded bg-gray-200 dark:bg-slate-800" />
                                <div className="h-10 w-10 rounded bg-gray-200 dark:bg-slate-800 self-end" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mandatory & Resume Skeleton */}
                <div className="grid grid-cols-1 xl:grid-cols-10 gap-6 mb-8 h-[380px]">
                    {/* Mandatory */}
                    <div className="hidden lg:block xl:col-span-7 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <div className="h-8 w-48 rounded bg-gray-200 dark:bg-slate-800" />
                            <div className="h-8 w-24 rounded-lg bg-gray-200 dark:bg-slate-800" />
                        </div>
                        <div className="flex gap-4 overflow-hidden">
                            <div className="h-[250px] w-[400px] shrink-0 rounded-2xl bg-gray-200 dark:bg-slate-800" />
                            <div className="h-[250px] w-[400px] shrink-0 rounded-2xl bg-gray-200 dark:bg-slate-800" />
                        </div>
                    </div>
                    {/* Resume */}
                    <div className="hidden lg:flex xl:col-span-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 h-full flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div className="h-6 w-32 rounded bg-gray-200 dark:bg-slate-800" />
                            <div className="h-4 w-16 rounded bg-gray-200 dark:bg-slate-800" />
                        </div>
                        <div className="flex flex-col gap-4 flex-1">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex gap-3 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800">
                                    <div className="h-16 w-24 rounded-xl bg-gray-200 dark:bg-slate-800 shrink-0" />
                                    <div className="flex-1 space-y-2 py-1">
                                        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-slate-800" />
                                        <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-slate-800" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Course Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 h-[380px] rounded-2xl overflow-hidden flex flex-col">
                            <div className="h-48 w-full bg-gray-200 dark:bg-slate-800" />
                            <div className="p-5 space-y-4 flex-1">
                                <div className="flex justify-between">
                                    <div className="h-4 w-20 rounded-full bg-gray-200 dark:bg-slate-800" />
                                    <div className="h-4 w-16 rounded bg-gray-200 dark:bg-slate-800" />
                                </div>
                                <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-slate-800" />
                                <div className="h-4 w-full rounded bg-gray-200 dark:bg-slate-800" />
                                <div className="flex gap-4 mt-auto pt-2">
                                    <div className="h-4 w-16 rounded bg-gray-200 dark:bg-slate-800" />
                                    <div className="h-4 w-20 rounded bg-gray-200 dark:bg-slate-800" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12">
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

            <div className="space-y-8 pt-4" ref={coursesRef}>

                {/* New Dashboard Sections */}
                <div className="grid grid-cols-1 xl:grid-cols-10 gap-6 mb-8">
                    {/* Mandatory Courses Section */}
                    <div className="min-w-0 h-full xl:col-span-7">
                        <MandatorySection courses={mandatoryCourses} />
                    </div>

                    {/* Resume Training Section */}
                    <div className="min-w-0 h-full xl:col-span-3">
                        <ResumeSection courses={continueLearningCourses} />
                    </div>
                </div>

                {/* Main Course Grid Headers */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg md:text-xl font-bold text-main dark:text-white flex items-center gap-2 md:gap-3">
                            <div className="w-1.5 h-6 bg-primary rounded-full shrink-0"></div>
                            <span className="truncate">{searchQuery ? 'Search Results' : 'Recommendation Skill Up'}</span>
                        </h2>
                    </div>
                    {!searchQuery && (
                        <Link to="/courses" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">
                            Show All
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8 min-h-[500px] content-start">
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
