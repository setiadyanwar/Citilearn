import React, { useState, useEffect, useRef } from 'react';
import data from '../data.json';
import DashboardCourseCard from '../components/dashboard/DashboardCourseCard';
import MainSearchBar from '../components/dashboard/MainSearchBar';
import CourseGrid from '../components/common/CourseGrid';
import TopicDropdown from '../components/common/TopicDropdown';
import Tabs from '../components/common/Tabs';
import StatusDropdown from '../components/common/StatusDropdown';
import { ChevronLeft, ChevronRight, ChevronDown, LayoutGrid, List as ListIcon, Search } from 'lucide-react';
import { COURSE_CATEGORIES } from '../constants/course';

const WingDecorationLeft = () => (
    <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-8 left-8 md:left-24 hidden md:block">
        <path d="M0 20L80 0L30 40L0 20Z" fill="#D0E92A" />
        <path d="M10 50L90 30L40 70L10 50Z" fill="#D0E92A" />
    </svg>
);

const WingDecorationRight = () => (
    <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-8 right-8 md:right-24 hidden md:block transform scale-x-[-1]">
        <path d="M0 20L80 0L30 40L0 20Z" fill="#D0E92A" />
        <path d="M10 50L90 30L40 70L10 50Z" fill="#D0E92A" />
    </svg>
);

const TreeIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-2 -mt-2">
        <path d="M12.5359 6C14.0755 3.33333 17.9245 3.33333 19.4641 6L26.3923 18C27.9319 20.6667 26.0074 24 22.9282 24H9.07179C5.99259 24 4.06809 20.6667 5.6077 18L12.5359 6Z" fill="#32D583" />
        <rect x="5" y="26" width="22" height="4" rx="2" fill="#32D583" />
    </svg>
);

const ExploreCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('mandatory'); // 'mandatory' | 'skills-up'
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');

    // Resume Training Scrolling
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
        // Simulate fetch
        setTimeout(() => {
            setCourses(data.courses);
            setLoading(false);
        }, 500);
    }, []);

    // Filter Logic
    const resumeCourses = courses.filter(c => c.status === 'On Progress' && c.progress > 0);

    // Mandatory: Category Safety or Technical
    const mandatoryCourses = courses.filter(c =>
        (c.category === 'Safety' || c.category === 'Technical') &&
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === 'All' || c.category === selectedCategory) &&
        (selectedStatus === 'All' || c.status === selectedStatus)
    );

    // Skills-Up: Everything else
    const skillsUpCourses = courses.filter(c =>
        c.category !== 'Safety' && c.category !== 'Technical' &&
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === 'All' || c.category === selectedCategory) &&
        (selectedStatus === 'All' || c.status === selectedStatus)
    );

    const displayedCourses = activeTab === 'mandatory' ? mandatoryCourses : skillsUpCourses;

    return (
        <div className="pb-20 space-y-8 animate-fade-in">
            <div className="relative z-50 -mt-6 -mx-6 px-6 pt-10 pb-8 mb-4">
                <WingDecorationLeft />
                <WingDecorationRight />

                <div className="max-w-4xl mx-auto text-center relative z-10 mt-4">
                    <h1 className="text-3xl md:text-4xl font-black text-main dark:text-white mb-6 tracking-tight">
                        Let's Upgrade make <span className="text-citilearn-green">your skills up</span> <TreeIcon />
                    </h1>

                    {/* Search Bar - Reusing MainSearchBar */}
                    <div className="max-w-xl mx-auto mb-8">
                        <MainSearchBar
                            searchQuery={searchQuery}
                            handleSearch={(e) => setSearchQuery(e.target.value)}
                            variant="large"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                        <TopicDropdown />

                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-secondary dark:text-slate-400">Category:</span>
                            <div className="flex gap-2 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800 rounded-full p-1 overflow-x-auto no-scrollbar max-w-full items-center h-10 md:h-11">
                                {COURSE_CATEGORIES.map(filter => (
                                    <button
                                        key={filter}
                                        onClick={() => setSelectedCategory(filter)}
                                        className={`text-sm font-bold px-3 md:px-4 h-full rounded-full transition-all whitespace-nowrap cursor-pointer ${selectedCategory === filter
                                            ? 'bg-primary text-white'
                                            : 'text-secondary dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-main dark:hover:text-white'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resume Training Section */}
            {(loading || (resumeCourses.length > 0 && !searchQuery && selectedCategory === 'All' && selectedStatus === 'All')) && (
                <div className="px-2 mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold flex items-center gap-3 text-main dark:text-white">
                            <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                            Resume Training
                        </h2>
                        {!loading && (
                            <div className="flex gap-2">
                                <button onClick={() => scroll('left')} className="p-2 bg-white dark:bg-slate-800 rounded-full hover:bg-gray-50 text-secondary border border-gray-100 dark:border-slate-700 transition-transform active:scale-95 cursor-pointer">
                                    <ChevronLeft size={18} />
                                </button>
                                <button onClick={() => scroll('right')} className="p-2 bg-white dark:bg-slate-800 rounded-full hover:bg-gray-50 text-secondary border border-gray-100 dark:border-slate-700 transition-transform active:scale-95 cursor-pointer">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="relative -mx-2 px-2">
                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto gap-5 pb-6 no-scrollbar scroll-smooth snap-x"
                        >
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <div key={i} className="snap-start min-w-[300px] md:min-w-[360px] flex flex-col sm:flex-row gap-3 p-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl animate-pulse">
                                        <div className="w-full sm:w-28 h-40 sm:h-28 bg-gray-200 dark:bg-slate-800 rounded-xl shrink-0" />
                                        <div className="flex-1 space-y-3 py-1">
                                            <div className="flex justify-between items-center">
                                                <div className="h-4 w-12 bg-gray-200 dark:bg-slate-800 rounded-full" />
                                                <div className="h-3 w-16 bg-gray-200 dark:bg-slate-800 rounded" />
                                            </div>
                                            <div className="h-5 w-3/4 bg-gray-200 dark:bg-slate-800 rounded" />
                                            <div className="h-3 w-full bg-gray-100 dark:bg-slate-800 rounded" />
                                            <div className="mt-auto space-y-2">
                                                <div className="flex justify-between">
                                                    <div className="h-3 w-10 bg-gray-200 dark:bg-slate-800 rounded" />
                                                    <div className="h-3 w-6 bg-gray-200 dark:bg-slate-800 rounded" />
                                                </div>
                                                <div className="h-1.5 w-full bg-gray-100 dark:bg-slate-800 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                resumeCourses.map(course => (
                                    <div key={course.id} className="snap-start min-w-[300px] md:min-w-[360px]">
                                        <DashboardCourseCard course={course} variant="resume" />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Course Tabs & Controls */}
            <div className="px-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    {/* Tabs */}
                    <Tabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        tabs={[
                            { id: 'mandatory', label: 'Mandatory', count: mandatoryCourses.length },
                            { id: 'skills-up', label: 'Skills-Up', count: skillsUpCourses.length }
                        ]}
                    />

                    {/* Filter & View Toggle */}
                    <div className="flex items-center gap-3">
                        <StatusDropdown
                            selectedStatus={selectedStatus}
                            onSelectStatus={setSelectedStatus}
                            isOpen={isStatusDropdownOpen}
                            onToggle={setIsStatusDropdownOpen}
                        />
                        <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-gray-100 dark:border-slate-800">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-citilearn-green text-white' : 'text-secondary hover:text-primary'}`}
                            >
                                <LayoutGrid size={16} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-citilearn-green text-white' : 'text-secondary hover:text-primary'}`}
                            >
                                <ListIcon size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <CourseGrid
                    viewMode={viewMode}
                    loading={loading}
                    courses={displayedCourses}
                    emptyTitle="No Search Result!"
                    emptyMessage={
                        <span>
                            No results found. Please try again or check <span className="font-bold">{activeTab === 'mandatory' ? 'Mandatory' : 'Skills-Up'}</span> section.
                        </span>
                    }
                    showClearFilter={selectedCategory !== 'All'}
                    onClearFilter={() => setSelectedCategory('All')}
                />
            </div>
        </div>
    );
};

export default ExploreCourses;
