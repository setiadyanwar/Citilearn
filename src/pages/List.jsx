import React, { useState, useEffect, useRef } from 'react';
import data from '../data.json';
import DashboardHero from '../components/dashboard/DashboardHero';
import CourseCard from '../components/dashboard/CourseCard';
import MandatorySection from '../components/dashboard/MandatorySection';
import ResumeSection from '../components/dashboard/ResumeSection';
import Pagination from '../components/common/Pagination';
import { Filter } from 'lucide-react';

const CourseList = ({
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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
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

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, selectedStatus]);

    // Filter by Search Query (Global)
    const searchFilteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Continue Learning Courses (only search filter, filtered by status)
    const continueLearningCourses = searchFilteredCourses.filter(c => c.status === 'On Progress' && c.progress > 0);

    // Mandatory Courses (Mock logic: Filter by 'Safety' category or take first few)
    const mandatoryCourses = searchFilteredCourses.filter(c => c.category === 'Safety' || c.category === 'Technical').slice(0, 4);

    // Main Grid Filter Logic
    const recommendedCourses = searchFilteredCourses.filter(course => {
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;

        // Status Filter
        let matchesStatus = true;
        if (selectedStatus === 'Not Started') matchesStatus = course.status !== 'On Progress' && course.status !== 'Completed' && course.progress === 0;
        else if (selectedStatus === 'On Progress') matchesStatus = course.status === 'On Progress';
        else if (selectedStatus === 'Done') matchesStatus = course.status === 'Completed' || course.progress === 100;

        const isResumeItem = course.status === 'On Progress' && course.progress > 0;
        const hideBecauseResume = selectedStatus === 'All' && isResumeItem && searchQuery === '';

        return matchesCategory && matchesStatus && !hideBecauseResume;
    });

    const mainGridTotalPages = Math.ceil(recommendedCourses.length / itemsPerPage);
    const mainGridPaginated = recommendedCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 h-[450px] rounded-xl p-6">
                        <div className="skeleton h-48 w-full mb-6 rounded-sm bg-gray-100 dark:bg-slate-800" />
                        <div className="space-y-4">
                            <div className="skeleton h-8 w-3/4 bg-gray-100 dark:bg-slate-800 rounded-sm" />
                            <div className="skeleton h-4 w-full bg-gray-100 dark:bg-slate-800 rounded-sm" />
                            <div className="skeleton h-4 w-2/3 bg-gray-100 dark:bg-slate-800 rounded-sm" />
                        </div>
                    </div>
                ))}
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
                <div className="mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg md:text-xl font-bold text-main dark:text-white flex items-center gap-2 md:gap-3">
                            <div className="w-1.5 h-6 bg-primary rounded-full shrink-0"></div>
                            <span className="truncate">{searchQuery ? 'Search Results' : 'Training Library'}</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-8 min-h-[500px] content-start">
                    {mainGridPaginated.length > 0 ? (
                        mainGridPaginated.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-secondary dark:text-slate-500">
                            No courses found matching "{searchQuery}"
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {mainGridTotalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={mainGridTotalPages}
                        onPageChange={setCurrentPage}
                    />
                )}

                <div className="pb-12"></div>
            </div>
        </div>
    );
};

export default CourseList;
