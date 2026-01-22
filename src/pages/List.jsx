import React, { useState, useEffect, useRef } from 'react';
import data from '../data.json';
import DashboardHero from '../components/dashboard/DashboardHero';
import CourseCard from '../components/dashboard/CourseCard';
import ContinueLearningCard from '../components/dashboard/ContinueLearningCard';
import Pagination from '../components/Pagination';
import { Play, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

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
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            scrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setCourses(data.courses);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
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

                {/* Continue Learning Section */}
                {continueLearningCourses.length > 0 && (
                    <div className="space-y-4 mb-8 overflow-hidden">
                        <div className="flex items-center justify-between gap-2 mb-4">
                            <h2 className="text-lg font-bold text-citilink-dark dark:text-white flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                                Resume Training
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => scroll('left')}
                                    className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-400 hover:text-primary transition-all duration-300 active:scale-90"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() => scroll('right')}
                                    className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-400 hover:text-primary transition-all duration-300 active:scale-90"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="relative group/scroll">
                            <div
                                ref={scrollRef}
                                className="flex overflow-x-auto pb-6 gap-4 -mx-4 px-4 snap-x lg:gap-6 lg:mx-0 lg:px-0 no-scrollbar relative z-0 scroll-smooth"
                            >
                                {continueLearningCourses
                                    .slice(0, 8)
                                    .map(course => (
                                        <div key={course.id} className="min-w-[85%] md:min-w-[45%] lg:min-w-[340px] snap-center flex-shrink-0">
                                            <ContinueLearningCard course={course} />
                                        </div>
                                    ))
                                }
                            </div>
                            {/* Scroll Indicator Gradient */}
                            {continueLearningCourses.length > 3 && (
                                <div className="absolute right-0 top-0 bottom-6 w-24 bg-gradient-to-l from-gray-50/90 dark:from-slate-950/90 to-transparent pointer-events-none hidden lg:block transition-colors duration-300" />
                            )}
                        </div>
                    </div>
                )}

                {/* Main Course Grid Headers */}
                <div className="mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg md:text-xl font-bold text-citilink-dark dark:text-white flex items-center gap-2 md:gap-3">
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
                        <div className="col-span-full text-center py-12 text-gray-500 dark:text-slate-500">
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
