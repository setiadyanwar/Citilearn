import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import data from '@/data.json';
import Tabs from '@/components/common/Tabs';
import Pagination from '@/components/common/Pagination';
import { Button } from "@/components/ui/button";
import MainSearchBar from '@/features/dashboard/components/MainSearchBar';

// Standard Admin Components
import AdminPageShell from '../components/AdminPageShell';
import ManagementHeader from '../components/ManagementHeader';
import FilterBar from '../components/FilterBar';

// Sub-components
import CourseManagementTable from '../components/course/CourseManagementTable';
import { Skeleton } from '@/components/ui/skeleton';

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            // Simulate network latency
            await new Promise(resolve => setTimeout(resolve, 800));

            const loadedCourses = data.courses.map(course => ({
                ...course,
                modules: course.modules ? course.modules.length : 0,
                enrolled: course.enrolled || Math.floor(Math.random() * 200) + 20,
                assignedUsers: course.assignedUsers || Math.floor(Math.random() * 50),
                lastUpdated: "2 days ago",
                status: ['Published', 'Draft'][Math.floor(Math.random() * 2)]
            }));
            setCourses(loadedCourses);
            setIsLoading(false);
        };

        fetchCourses();
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
        <AdminPageShell>
            <ManagementHeader
                title="Course Management"
                description="Create and manage your training programs"
            >
                <Link to="/admin/courses/create">
                    <Button className="font-bold rounded-xl h-10 px-6 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none">
                        <Plus size={18} className="mr-2" />
                        Create Course
                    </Button>
                </Link>
            </ManagementHeader>

            <FilterBar
                searchSlot={
                    <MainSearchBar
                        placeholder="Search courses..."
                        variant="compact"
                        hideButton={true}
                        searchQuery={searchQuery}
                        handleSearch={(e) => setSearchQuery(e.target.value)}
                    />
                }
                filterSlot={
                    <Tabs
                        tabs={filterTabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                }
            />

            {/* Content Area */}
            {isLoading ? (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 h-12 flex items-center px-6">
                        <div className="flex gap-4 w-full">
                            <Skeleton className="h-3 w-[40%]" />
                            <Skeleton className="h-3 w-[15%]" />
                            <Skeleton className="h-3 w-[10%]" />
                            <Skeleton className="h-3 w-[10%]" />
                            <Skeleton className="h-3 w-[10%]" />
                            <Skeleton className="h-3 w-[15%] ml-auto" />
                        </div>
                    </div>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex h-24 items-center px-6 border-b border-slate-50 last:border-0">
                            <div className="flex items-start gap-4 w-full">
                                <Skeleton className="w-20 h-14 rounded-lg shrink-0" />
                                <div className="space-y-2 flex-1 min-w-0">
                                    <Skeleton className="h-4 w-1/3" />
                                    <Skeleton className="h-3 w-1/2" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <div className="flex gap-16 items-center px-4 shrink-0">
                                    <Skeleton className="h-6 w-20 rounded-md" />
                                    <Skeleton className="h-6 w-12 rounded-md" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-16" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                    <Skeleton className="h-6 w-24 rounded-full" />
                                    <div className="flex gap-1">
                                        <Skeleton className="h-8 w-8 rounded-lg" />
                                        <Skeleton className="h-8 w-8 rounded-lg" />
                                        <Skeleton className="h-8 w-8 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : paginatedCourses.length > 0 ? (
                <>
                    <CourseManagementTable
                        courses={paginatedCourses}
                        getCategoryColor={getCategoryColor}
                    />

                    {/* Footer / Pagination */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
                        <div className="text-2xs text-slate-400 font-medium whitespace-nowrap">
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
                        <Plus size={40} className="text-slate-300 rotate-45" />
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
        </AdminPageShell>
    );
};

export default CourseManagement;
