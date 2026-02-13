import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreVertical, Users, BookOpen, PlayCircle, Edit, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import data from '../../data.json';
import MainSearchBar from '../../components/dashboard/MainSearchBar';

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
            // Normalize status for Admin filtering (Draft vs Published)
            // For demo purposes, we map 'Not Started' to 'Draft' sometimes, or use existing status key if suitable
            status: ['Published', 'Draft'][Math.floor(Math.random() * 2)] // Randomize status for demo variety as data.json status is User Progress oriented
        }));
        setCourses(loadedCourses);
    }, []);

    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = activeTab === 'all' || course.status.toLowerCase() === activeTab;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="h-full flex flex-col animate-fade-in">
            {/* Header Section (Fixed) */}
            <div className="flex-none space-y-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-main">Course Management</h1>
                        <p className="text-secondary text-sm mt-1">Create, edit, and manage your training programs</p>
                    </div>
                    <Link
                        to="/admin/courses/create"
                        className="inline-flex items-center gap-2 bg-citilearn-green text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors text-sm"
                    >
                        <Plus size={18} />
                        Create Course
                    </Link>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-3 bg-white p-3 rounded-xl border border-gray-200 items-center">
                    <div className="flex-1 w-full md:w-auto">
                        <MainSearchBar
                            searchQuery={searchQuery}
                            handleSearch={(e) => setSearchQuery(e.target.value)}
                            variant="compact"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['All', 'Published', 'Draft'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                className={`px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeTab === tab.toLowerCase()
                                    ? 'bg-citilearn-green text-white'
                                    : 'bg-gray-50 text-secondary hover:bg-gray-100 border border-transparent hover:border-gray-200'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                        <button className="px-3 py-3 rounded-xl bg-gray-50 text-secondary hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Course List (Scrollable) */}
            <div className="flex-1 overflow-y-auto min-h-0 pr-2 -mr-2 pb-4">
                <div className="space-y-3">
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-primary/50 transition-all duration-200"
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-5">
                                {/* Thumbnail */}
                                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0 py-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${course.category === 'Safety' ? 'bg-orange-50 text-orange-600' :
                                                course.category === 'Technical' ? 'bg-blue-50 text-blue-600' :
                                                    course.category === 'Service' ? 'bg-purple-50 text-purple-600' :
                                                        'bg-gray-50 text-gray-600'
                                            }`}>
                                            {course.category}
                                        </span>
                                        {course.assignedUsers > 0 && (
                                            <>
                                                <span className="text-gray-300 mx-1">•</span>
                                                <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600 flex items-center gap-1">
                                                    <Users size={12} />
                                                    {course.assignedUsers} Assigned
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-main mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                                    <p className="text-sm text-secondary mb-3 line-clamp-1">{course.description}</p>
                                    <div className="flex items-center gap-4 text-xs font-medium text-secondary">
                                        <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded">
                                            <BookOpen size={14} className="text-gray-400" />
                                            <span>{course.modules} Modules</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded">
                                            <Clock size={14} className="text-gray-400" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded">
                                            <Users size={14} className="text-gray-400" />
                                            <span>{course.enrolled} Enrolled</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status & Actions */}
                                <div className="flex flex-row md:flex-col items-center md:items-end gap-3 justify-between md:justify-center border-t md:border-t-0 border-gray-100 pt-3 md:pt-0 mt-2 md:mt-0">
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold border ${course.status === 'Published'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                        : 'bg-gray-100 text-gray-600 border-gray-200'
                                        }`}>
                                        {course.status}
                                    </div>

                                    <div className="flex items-center gap-1">
                                        {[
                                            { to: `/admin/course/${course.id}/assign`, icon: Users, color: 'text-amber-600', bg: 'hover:bg-amber-50', title: 'Assign' },
                                            { to: `/admin/course/${course.id}/edit?tab=curriculum`, icon: PlayCircle, color: 'text-blue-600', bg: 'hover:bg-blue-50', title: 'Content' },
                                            { to: `/admin/course/${course.id}/edit`, icon: Edit, color: 'text-emerald-600', bg: 'hover:bg-emerald-50', title: 'Edit' }
                                        ].map((action, idx) => (
                                            <Link
                                                key={idx}
                                                to={action.to}
                                                className={`p-2 text-gray-400 hover:${action.color} ${action.bg} rounded-lg transition-all`}
                                                title={action.title}
                                            >
                                                <action.icon size={18} />
                                            </Link>
                                        ))}
                                        <button className="p-2 text-gray-400 hover:text-main hover:bg-gray-100 rounded-lg transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredCourses.length === 0 && (
                        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                            <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
                            <h3 className="text-main font-bold text-lg mb-1">No courses found</h3>
                            <p className="text-sm text-secondary">Broaden your search or create a new course.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseManagement;
