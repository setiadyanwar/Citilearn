import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import data from '@/data.json';
import Tabs from '@/components/common/Tabs';
import Pagination from '@/components/common/Pagination';
import { Button } from "@/components/ui/button";
import MainSearchBar from '@/features/dashboard/components/MainSearchBar';

// Sub-components
import CourseManagementTable from '../components/course/CourseManagementTable';

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const loadedCourses = data.courses.map(course => ({
            ...course,
            modules: course.modules ? course.modules.length : 0,
            enrolled: course.enrolled || Math.floor(Math.random() * 200) + 20,
            assignedUsers: course.assignedUsers || Math.floor(Math.random() * 50),
            lastUpdated: "2 days ago",
            status: ['Published', 'Draft'][Math.floor(Math.random() * 2)]
        }));
        setCourses(loadedCourses);
    }, []);

    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const counts = {
        all: courses.length,
        published: courses.filter(c => c.status === 'Published').length,
        draft: courses.filter(c => c.status === 'Draft').length,
    };

    const filterTabs = [
        { id: 'all', label: 'All', count: counts.all },
        { id: 'published', label: 'Published', count: counts.published },
        { id: 'draft', label: 'Draft', count: counts.draft },
    ];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = activeTab === 'all' || course.status.toLowerCase() === activeTab;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeTab]);

    const getCategoryColor = (category) => {
        return 'bg-slate-50 text-slate-600 border-slate-200';
    };

    return (
        <div className="w-full animate-fade-in flex flex-col pb-20 max-w-7xl mx-auto px-4 md:px-0">
            {/* Header Area */}
            <div className="pt-10 pb-6 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Course Management</h1>
                        <p className="text-slate-500 text-sm mt-1 font-medium">Create and manage your training programs</p>
                    </div>
                    <Link to="/admin/courses/create">
                        <Button className="font-bold rounded-xl h-10 px-6 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none">
                            <Plus size={18} className="mr-2" />
                            Create Course
                        </Button>
                    </Link>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="w-full md:w-96">
                        <MainSearchBar
                            placeholder="Search courses..."
                            variant="compact"
                            hideButton={true}
                            searchQuery={searchQuery}
                            handleSearch={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <Tabs
                            tabs={filterTabs}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                        <Button variant="ghost" className="h-11 w-11 rounded-xl bg-white border border-slate-200 shrink-0 hover:bg-slate-50 text-slate-400 shadow-none">
                            <Filter size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {paginatedCourses.length > 0 ? (
                <>
                    <CourseManagementTable
                        courses={paginatedCourses}
                        getCategoryColor={getCategoryColor}
                    />

                    {/* Footer / Pagination */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
                        <div className="text-2xs text-slate-400 font-medium whitespace-nowrap uppercase tracking-wider">
                            Showing {paginatedCourses.length} of {filteredCourses.length} courses
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            className="mt-0"
                        />
                    </div>
                </>
            ) : (
                <div className="border border-slate-200 bg-white rounded-2xl h-80 flex flex-col items-center justify-center text-center shadow-none">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 border border-slate-100">
                        <Search className="w-10 h-10 text-slate-300" />
                    </div>
                    <h4 className="font-bold text-xl text-slate-900 tracking-tight">No courses found</h4>
                    <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto font-medium">
                        We couldn't find any courses matching "{searchQuery}".
                    </p>
                    <Button
                        variant="outline"
                        className="mt-6 border-slate-200 rounded-xl px-8 font-bold hover:bg-slate-50 shadow-none h-11"
                        onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                    >
                        Clear All Filters
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CourseManagement;
