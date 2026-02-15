import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileStats from '../components/ProfileStats';
import { LayoutGrid, List as ListIcon } from 'lucide-react';
import MainSearchBar from '@/features/dashboard/components/MainSearchBar';
import Tabs from '@/components/common/Tabs';
import CourseGrid from '@/features/courses/components/CourseGrid';
import { Button } from '@/components/ui/button';
import data from '@/data.json';

const MyLearningIcon = () => (
    <svg width="64" height="64" viewBox="0 0 69 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <circle cx="36.7207" cy="38.0835" r="24" fill="#F9FFFC" />
        <path d="M36.46 22.1271L26.4599 24.8173C22.8326 25.7932 21.2898 28.4937 22.2649 32.1476L25.5676 44.5227C26.5587 48.2364 29.2269 49.7527 32.8542 48.7769L42.8543 46.0866C46.5401 45.095 48.0361 42.4585 47.045 38.7447L43.7423 26.3696C42.7672 22.7158 40.1458 21.1355 36.46 22.1271Z" fill="url(#paint0_linear_my_learning)" />
        <g filter="url(#filter0_f_my_learning)">
            <rect width="16.0127" height="13.5128" rx="6.7564" transform="matrix(-0.257853 -0.966184 0.965666 -0.259788 29.6172 44.46)" fill="#2AA42B" fill-opacity="0.5" />
        </g>
        <path d="M45.8643 28.031C47.8677 28.0311 49.4953 28.6125 50.6211 29.7566C51.7457 30.8997 52.3047 32.5383 52.3047 34.5212V47.3328C52.3047 49.3447 51.7474 50.9879 50.6211 52.1277C49.4938 53.2683 47.8648 53.8356 45.8643 53.8357H35.5107C33.5385 53.8356 31.911 53.2669 30.7773 52.1287C29.644 50.9906 29.0693 49.3484 29.0693 47.3328V34.5212L29.0762 34.1531C29.1436 32.3319 29.7163 30.8257 30.7773 29.7556C31.9096 28.6138 33.5356 28.0311 35.5107 28.031H45.8643Z" fill="#72DC60" fill-opacity="0.35" stroke="url(#paint1_linear_my_learning)" stroke-linecap="round" stroke-linejoin="round" />
        <g filter="url(#filter2_d_my_learning)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.8445 45.573H45.5291C46.0217 45.6228 46.3933 46.0442 46.3933 46.5525C46.3932 47.0471 46.0216 47.4695 45.5291 47.5193H35.8445C35.4739 47.5689 35.1154 47.3831 34.9177 47.073C34.7201 46.7505 34.7201 46.341 34.9177 46.031C35.1154 45.7088 35.4741 45.5358 35.8445 45.573ZM45.5281 39.9158C46.0593 39.9158 46.492 40.3512 46.492 40.8845C46.4919 41.4177 46.0592 41.8513 45.5281 41.8513H35.8435C35.3114 41.8511 34.8807 41.4176 34.8806 40.8845C34.8806 40.3513 35.3113 39.916 35.8435 39.9158H45.5281ZM39.5359 34.2986C40.0682 34.2986 40.5006 34.7325 40.5008 35.2644C40.5008 35.8113 40.0683 36.2458 39.5359 36.2458H35.8435C35.3113 36.2457 34.8806 35.8113 34.8806 35.2781C34.8808 34.745 35.3114 34.3115 35.8435 34.3113V34.2986H39.5359Z" fill="url(#paint2_linear_my_learning)" />
        </g>
        <defs>
            <filter id="filter0_f_my_learning" x="0" y="0" width="68.1543" height="69.9382" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="13.5" result="effect1_foregroundBlur_my_learning" />
            </filter>
            <filter id="filter2_d_my_learning" x="19.7695" y="19.2986" width="41.7227" height="43.2288" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="5" dy="5" />
                <feGaussianBlur stdDeviation="5" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.577356 0 0 0 0 0.359375 0 0 0 0 0.9375 0 0 0 0.5 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_my_learning" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_my_learning" result="shape" />
            </filter>
            <linearGradient id="paint0_linear_my_learning" x1="31.4594" y1="23.4724" x2="37.9016" y2="47.419" gradientUnits="userSpaceOnUse">
                <stop stop-color="#9BF763" />
                <stop offset="1" stop-color="#9BF763" />
            </linearGradient>
            <linearGradient id="paint1_linear_my_learning" x1="33.1088" y1="31.4208" x2="49.2069" y2="49.2932" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" stop-opacity="0.25" />
                <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="paint2_linear_my_learning" x1="45.6609" y1="36.6874" x2="32.6002" y2="37.0648" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" />
                <stop offset="1" stop-color="white" stop-opacity="0.2" />
            </linearGradient>
        </defs>
    </svg>
);

const MyLearning = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [viewMode, setViewMode] = useState('grid');

    // Only show courses that are NOT "Not Started" (all enrolled courses)
    const enrolledCourses = data.courses.filter(course => course.status !== 'Not Started');

    const tabs = [
        { id: 'all', label: 'All Courses', count: enrolledCourses.length },
        { id: 'mandatory', label: 'Mandatory', count: enrolledCourses.filter(c => c.category === 'Safety').length },
        { id: 'progress', label: 'On Progress', count: enrolledCourses.filter(c => c.status === 'On Progress').length },
        { id: 'completed', label: 'Completed', count: enrolledCourses.filter(c => c.status === 'Done').length }
    ];

    // Filter enrolled courses based on active tab and search query
    const filteredCourses = enrolledCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'mandatory') return matchesSearch && course.category === 'Safety';
        if (activeTab === 'progress') return matchesSearch && course.status === 'On Progress';
        if (activeTab === 'completed') return matchesSearch && course.status === 'Done';
        return matchesSearch;
    });

    return (
        <div className="space-y-8 w-full mb-20 animate-fade-in">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <MyLearningIcon />
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-main tracking-tight">My Learning</h2>
                        <p className="text-tertiary font-medium">Your progress learning will show here</p>
                    </div>
                </div>

                <div className="w-full lg:w-96">
                    <MainSearchBar
                        searchQuery={searchQuery}
                        handleSearch={(e) => setSearchQuery(e.target.value)}
                        variant="inline"
                    />
                </div>
            </div>

            {/* Stats Section */}
            <ProfileStats />

            {/* Filter and View Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100">
                <div className="w-full md:w-auto">
                    <Tabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        tabs={tabs}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="link" asChild>
                        <Link to="/profile/learning/grades">
                            Grades
                        </Link>
                    </Button>

                    <div className="flex items-center bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-gray-100 dark:border-slate-800">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2.5 rounded-xl transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-citilearn-green text-white shadow-none' : 'text-secondary hover:text-primary'}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2.5 rounded-xl transition-all cursor-pointer ${viewMode === 'list' ? 'bg-citilearn-green text-white shadow-none' : 'text-secondary hover:text-primary'}`}
                        >
                            <ListIcon size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Existing CourseGrid Component */}
            <CourseGrid
                courses={filteredCourses}
                viewMode={viewMode}
                loading={false}
                emptyTitle="No courses found"
                emptyMessage="Try adjusting your search or filters to find what you're looking for."
            />
        </div>
    );
};

export default MyLearning;
