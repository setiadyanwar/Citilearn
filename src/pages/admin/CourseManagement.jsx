import React, { useState, useEffect } from 'react';
import {
    Search,
    Plus,
    Filter,
    MoreVertical,
    Users,
    BookOpen,
    PlayCircle,
    Edit,
    Clock,
    FileText,
    Trash2,
    CheckCircle,
    LayoutGrid,
    List
} from 'lucide-react';
import { Link } from 'react-router-dom';
import data from '../../data.json';
import Tabs from '../../components/common/Tabs';
import Pagination from '../../components/common/Pagination';

// Import shadcn/ui components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CourseManagement = () => {
    // Load courses from data.json and augment with mock admin data
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const loadedCourses = data.courses.map(course => ({
            ...course,
            // Map data.json fields to Admin View requirements
            modules: course.modules ? course.modules.length : 0,
            enrolled: course.enrolled || Math.floor(Math.random() * 200) + 20, // Mock enrollment data
            assignedUsers: course.assignedUsers || Math.floor(Math.random() * 50), // Mock assignment data
            lastUpdated: "2 days ago", // Mock timestamp
            status: ['Published', 'Draft'][Math.floor(Math.random() * 2)] // Randomize status
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

    // Pagination logic
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset page when filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeTab]);

    // Helper for Category Colors (Neutral Gray Standard)
    const getCategoryColor = (category) => {
        return 'bg-slate-50 text-slate-600 border-slate-200';
    };

    return (
        <div className="w-full animate-fade-in flex flex-col">
            {/* Header and Controls Area */}
            <div className="px-8 pt-6 pb-2 space-y-3 shrink-0">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Course Management</h1>
                        <p className="text-slate-500 text-sm mt-1 font-medium">Create and manage your training programs</p>
                    </div>
                    <Link to="/admin/courses/create">
                        <Button className="font-bold rounded-xl h-9 px-5 transition-all hover:scale-[1.02] active:scale-[0.98]">
                            <Plus size={16} className="mr-2" />
                            Create Course
                        </Button>
                    </Link>
                </div>

                {/* Controls Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Search */}
                    <div className="w-full md:w-96">
                        <Input
                            icon={Search}
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white border-slate-200 focus-visible:ring-slate-100"
                        />
                    </div>

                    {/* Tabs */}
                    <Tabs
                        tabs={filterTabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                </div>
            </div>

            {/* Data Table Container */}
            <div className="px-8 mt-6 flex flex-col mb-10">
                <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden">
                    <Table>
                        <TableHeader className="sticky top-[0px] z-20 bg-slate-50 border-b border-slate-200">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="w-[40%] font-bold text-slate-500 h-12 pl-6">Course Info</TableHead>
                                <TableHead className="w-[15%] font-bold text-slate-500 h-12">Category</TableHead>
                                <TableHead className="w-[10%] font-bold text-slate-500 h-12">Modules</TableHead>
                                <TableHead className="w-[10%] font-bold text-slate-500 h-12">Stats</TableHead>
                                <TableHead className="w-[10%] font-bold text-slate-500 h-12">Status</TableHead>
                                <TableHead className="w-[15%] text-right font-bold text-slate-500 h-12 pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedCourses.length > 0 ? (
                                paginatedCourses.map((course) => (
                                    <TableRow key={course.id} className="group hover:bg-slate-100/60 border-slate-100 transition-all duration-200 cursor-pointer">
                                        <TableCell className="py-4 pl-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-100 bg-slate-100 group-hover:border-slate-200 transition-all duration-300">
                                                    <img
                                                        src={course.thumbnail}
                                                        alt={course.title}
                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-bold text-slate-900 truncate leading-tight mb-1 group-hover:text-amber-600 transition-colors">{course.title}</h3>
                                                    <p className="text-xs text-slate-500 line-clamp-1 mb-1.5">{course.description}</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="text-3xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium border border-slate-200 flex items-center gap-1">
                                                            <Clock size={10} />
                                                            Updated {course.lastUpdated}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex px-2.5 py-1 rounded-md text-3xs font-bold uppercase tracking-wide border ${getCategoryColor(course.category)}`}>
                                                {course.category}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                                                    <LayoutGrid size={14} />
                                                </div>
                                                {course.modules}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                                    <Users size={12} className="text-slate-400" />
                                                    <span>{course.enrolled}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                                    <Clock size={12} className="text-slate-400" />
                                                    <span>{course.duration}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={`inline-flex items-center pl-1.5 pr-2.5 py-1 rounded-full text-xs font-bold border transition-colors ${course.status === 'Published'
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                : 'bg-slate-100 text-slate-600 border-slate-200'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${course.status === 'Published' ? 'bg-emerald-500' : 'bg-slate-500'
                                                    }`}></span>
                                                {course.status}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link to={`/admin/course/${course.id}/assign`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg">
                                                        <Users size={16} />
                                                    </Button>
                                                </Link>
                                                <Link to={`/admin/course/${course.id}/edit?tab=curriculum`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                                                        <List size={16} />
                                                    </Button>
                                                </Link>
                                                <Link to={`/admin/course/${course.id}/edit`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg">
                                                        <Edit size={16} />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-500">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                                                <Search className="w-8 h-8 text-slate-300" />
                                            </div>
                                            <p className="font-bold text-lg text-slate-700">No courses found</p>
                                            <p className="text-sm text-slate-400 mt-1 max-w-xs mx-auto">
                                                We couldn't find any courses matching your search "{searchQuery}"
                                            </p>
                                            <Button
                                                variant="outline"
                                                className="mt-4 border-slate-200 hover:bg-slate-50 hover:text-slate-700"
                                                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                                            >
                                                Clear Filters
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination / Footer Info - Minimalist */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 shrink-0">
                    <div className="text-xs text-slate-400 font-medium whitespace-nowrap">
                        Showing {paginatedCourses.length} of {filteredCourses.length} courses
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        className="mt-0"
                    />
                </div>
            </div>
        </div>
    );
};

export default CourseManagement;
