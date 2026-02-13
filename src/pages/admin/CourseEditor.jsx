import React, { useState } from 'react';
import {
    Save, ArrowLeft, Image as ImageIcon, Plus, Trash2, GripVertical,
    Video, FileText, HelpCircle, Users, CheckSquare, Clock, Upload,
    Settings, Layout, BookOpen, GraduationCap, Building, Search
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Tabs from '../../components/common/Tabs';
import CurriculumTab from '../../components/admin/CurriculumTab';


const CourseEditor = () => {
    const { id } = useParams();
    const isEditing = !!id;
    const [activeTab, setActiveTab] = useState('basic'); // basic, curriculum, assessment, assignment

    const [courseData, setCourseData] = useState({
        title: isEditing ? "Safety Procedures V2" : "",
        description: isEditing ? "Comprehensive guide to workplace safety." : "",
        category: "Safety",
        type: "Mandatory",
        thumbnail: null,
        status: "Draft",
        startDate: "",
        endDate: ""
    });

    const [assignmentType, setAssignmentType] = useState('individual'); // individual, department, role
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    // Assignment Data
    const [assignments, setAssignments] = useState([
        { id: 101, type: 'department', name: 'Pilot Department', subtitle: 'All Instructors', count: 45, icon: Building },
        { id: 102, type: 'role', name: 'Maintenance Crew', subtitle: 'A320 Scecialists', count: 28, icon: Users }
    ]);

    const [availableUsers] = useState([
        { id: 1, name: 'Budi Pratama', email: 'budi@citilearn.com', role: 'Senior Instructor', department: 'Pilot' },
        { id: 2, name: 'Siti Nurhaliza', email: 'siti@citilearn.com', role: 'Junior Instructor', department: 'Pilot' },
        { id: 3, name: 'Ahmad Yani', email: 'ahmad@citilearn.com', role: 'Technician', department: 'Maintenance' },
        { id: 4, name: 'Dewi Lestari', email: 'dewi@citilearn.com', role: 'Safety Officer', department: 'Safety' },
        { id: 5, name: 'Eko Saputra', email: 'eko@citilearn.com', role: 'Cabin Crew', department: 'Flight Ops' },
    ]);

    const [availableDepartments] = useState([
        { id: 1, name: 'Pilot Department', userCount: 45 },
        { id: 2, name: 'Maintenance', userCount: 32 },
        { id: 3, name: 'Safety & Compliance', userCount: 18 },
        { id: 4, name: 'Ground Operations', userCount: 56 },
        { id: 5, name: 'Human Capital', userCount: 12 },
        { id: 6, name: 'Legal & Compliance', userCount: 8 }
    ]);

    const [availableRoles] = useState([
        { id: 1, name: 'Senior Instructor', userCount: 12 },
        { id: 2, name: 'Junior Instructor', userCount: 33 },
        { id: 3, name: 'Technician', userCount: 28 },
        { id: 4, name: 'Safety Officer', userCount: 15 }
    ]);

    const toggleSelection = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const handleAssign = () => {
        // Mock assignment logic
        const newAssignments = selectedItems.map(id => {
            if (assignmentType === 'individual') {
                const u = availableUsers.find(u => u.id === id);
                return { id: Date.now() + id, type: 'user', name: u.name, subtitle: u.role, count: 1, icon: Users };
            } else if (assignmentType === 'department') {
                const d = availableDepartments.find(d => d.id === id);
                return { id: Date.now() + id, type: 'department', name: d.name, subtitle: 'Department', count: d.userCount, icon: Building };
            } else {
                const r = availableRoles.find(r => r.id === id);
                return { id: Date.now() + id, type: 'role', name: r.name, subtitle: 'Role', count: r.userCount, icon: Users };
            }
        });
        setAssignments([...assignments, ...newAssignments]);
        setSelectedItems([]);
    };

    return (
        <div className="animate-fade-in relative min-h-screen pb-20" >
            {/* Header Group - Static (Not Sticky) as requested */}
            < div className="mb-8 pt-4" >
                {/* 1. Title & Actions */}
                < div className="flex items-center justify-between mb-6 px-1" >
                    <div className="flex items-center gap-4">
                        <Link to="/admin/courses" className="p-2 rounded-xl hover:bg-white text-secondary hover:text-primary transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-black text-main">
                                    {isEditing ? 'Edit Course' : 'Create New Course'}
                                </h1>
                                <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${courseData.status === 'Published'
                                    ? 'bg-green-50 text-green-600 border-green-200'
                                    : 'bg-transparent text-gray-500 border-gray-300'
                                    }`}>
                                    {courseData.status}
                                </span>
                            </div>
                            <p className="text-sm text-secondary font-medium">
                                {isEditing ? `You are editing "${courseData.title}"` : 'Set up your new learning material'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 text-sm font-bold text-secondary bg-transparent hover:bg-white border border-transparent hover:border-gray-200 rounded-xl transition-colors">
                            Save Draft
                        </button>
                        <button className="px-5 py-2 text-sm font-bold text-white bg-citilearn-green rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2">
                            <Save size={18} />
                            Publish
                        </button>
                    </div>
                </div >

                {/* 2. Navigation Tabs */}
                < div className="flex gap-2 overflow-x-auto no-scrollbar px-1 border-b border-gray-200" >
                    {
                        [
                            { id: 'basic', label: 'Basic Info', icon: Settings },
                            { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
                            { id: 'assessment', label: 'Assessment', icon: GraduationCap },
                            { id: 'assignment', label: 'Learners', icon: Users }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap -mb-[1px] ${activeTab === tab.id
                                    ? 'border-citilearn-green text-citilearn-green'
                                    : 'border-transparent text-secondary hover:text-main'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))
                    }
                </div >
            </div >

            {/* Content Area - Full Width */}
            <div className="w-full px-2">

                {/* 1. Basic Information Tab */}
                {
                    activeTab === 'basic' && (
                        <div className="space-y-10">
                            {/* Section 1 */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-main flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gray-200/50 flex items-center justify-center text-secondary">
                                        <FileText size={18} />
                                    </div>
                                    Course Details
                                </h3>

                                <div className="space-y-6 pl-11">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-main">Course Title</label>
                                            <input
                                                type="text"
                                                value={courseData.title}
                                                onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                                                className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-citilearn-green focus:outline-none text-lg font-medium transition-colors placeholder-gray-300"
                                                placeholder="Enter course title..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-main">Category</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-citilearn-green focus:outline-none font-medium appearance-none cursor-pointer"
                                                    value={courseData.category}
                                                    onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                                                >
                                                    <option>Safety</option>
                                                    <option>Technical</option>
                                                    <option>Soft Skill</option>
                                                    <option>Leadership</option>
                                                </select>
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                                                    <ArrowLeft size={16} className="rotate-[-90deg]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-main">Description</label>
                                        <textarea
                                            rows="4"
                                            value={courseData.description}
                                            onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-citilearn-green/50 font-medium resize-none transition-all"
                                            placeholder="Briefly describe what this course is about..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-main">Start Date</label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    value={courseData.startDate}
                                                    onChange={(e) => setCourseData({ ...courseData, startDate: e.target.value })}
                                                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-citilearn-green focus:outline-none text-base font-medium transition-colors placeholder-gray-300"
                                                />
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                                                    <Clock size={16} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-main">End Date</label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    value={courseData.endDate}
                                                    onChange={(e) => setCourseData({ ...courseData, endDate: e.target.value })}
                                                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-citilearn-green focus:outline-none text-base font-medium transition-colors placeholder-gray-300"
                                                />
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                                                    <Clock size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-main flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gray-200/50 flex items-center justify-center text-secondary">
                                        <ImageIcon size={18} />
                                    </div>
                                    Thumbnail
                                </h3>
                                <div className="pl-11">
                                    <div className="border-2 border-dashed border-gray-300 hover:border-citilearn-green/50 hover:bg-white rounded-2xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all group">
                                        <Upload className="text-gray-400 group-hover:text-citilearn-green mb-3 transition-colors" size={32} />
                                        <span className="text-sm font-bold text-secondary group-hover:text-main">Click to upload image</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* 2. Curriculum Tab */}
                {
                    activeTab === 'curriculum' && (
                        <CurriculumTab courseId={id} />
                    )
                }

                {/* 3. Assessment Tab */}
                {
                    activeTab === 'assessment' && (
                        <div className="space-y-8">
                            <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-6 flex items-start gap-4">
                                <div className="p-3 bg-white/50 rounded-xl text-blue-500">
                                    <GraduationCap size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-main mb-1">Assessment Configuration</h3>
                                    <p className="text-sm text-secondary">Global settings for course passing criteria.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { type: 'pre-test', label: 'Pre-Test', icon: BookOpen, desc: 'Initial assessment', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                                    { type: 'post-test', label: 'Post-Test', icon: CheckSquare, desc: 'Final exam', color: 'text-green-600', bg: 'bg-green-50' }
                                ].map((assessment) => (
                                    <div key={assessment.type} className="bg-transparent border border-gray-200 p-6 rounded-2xl hover:border-gray-300 transition-colors group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`w-10 h-10 ${assessment.bg} ${assessment.color} rounded-lg flex items-center justify-center`}>
                                                <assessment.icon size={20} />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                <span className="text-xs font-bold text-secondary">Active</span>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-main mb-1">{assessment.label}</h3>
                                        <p className="text-sm text-secondary mb-6">{assessment.desc}</p>
                                        <Link
                                            to={`/admin/course/${id || 'new'}/assessment/${assessment.type}`}
                                            className="block w-full py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-secondary hover:text-main hover:bg-white hover:border-gray-300 transition-all text-center"
                                        >
                                            Manage
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }

                {/* 4. Learners Tab (Embedded - Clean Design) */}
                {activeTab === 'assignment' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* LEFT: Source - Selection Area */}
                        <div className="lg:col-span-7 flex flex-col h-[calc(100vh-200px)]">
                            {/* Header & Tabs - Minimalist */}
                            <div className="pb-4">
                                <h3 className="text-xl font-bold text-main mb-6">Add Learners</h3>
                                <div className="flex gap-6 border-b border-gray-200">
                                    {[
                                        { id: 'individual', label: 'Users', icon: Users },
                                        { id: 'department', label: 'Departments', icon: Building },
                                        { id: 'role', label: 'Roles', icon: CheckSquare }
                                    ].map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => { setAssignmentType(tab.id); setSelectedItems([]); }}
                                            className={`flex items-center gap-2 pb-3 text-sm font-bold border-b-2 transition-all ${assignmentType === tab.id
                                                ? 'border-citilearn-green text-citilearn-green'
                                                : 'border-transparent text-gray-400 hover:text-main'
                                                }`}
                                        >
                                            <tab.icon size={18} />
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Search - Clean Input */}
                            <div className="py-4">
                                <div className="relative">
                                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={`Search ${assignmentType}...`}
                                        className="w-full pl-8 py-2 bg-transparent border-b border-gray-200 focus:outline-none focus:border-citilearn-green text-lg font-medium placeholder-gray-300"
                                    />
                                </div>
                            </div>

                            {/* Scrollable List - Clean Rows */}
                            <div className="flex-1 overflow-y-auto pr-2 space-y-1">
                                {assignmentType === 'individual' && availableUsers
                                    .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.includes(searchQuery.toLowerCase()))
                                    .map((user, idx) => (
                                        <label key={user.id} className={`flex items-center gap-4 py-3 cursor-pointer group transition-colors border-b border-gray-50 hover:bg-gray-50/50 rounded-lg px-2 -mx-2`}>
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(user.id)}
                                                onChange={() => toggleSelection(user.id)}
                                                className="w-4 h-4 text-citilearn-green rounded focus:ring-citilearn-green border-gray-300"
                                            />
                                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`text-sm font-bold transition-colors ${selectedItems.includes(user.id) ? 'text-citilearn-green' : 'text-main'}`}>
                                                    {user.name}
                                                </h4>
                                                <p className="text-xs text-secondary">{user.department} • {user.role}</p>
                                            </div>
                                        </label>
                                    ))
                                }
                                {assignmentType === 'department' && availableDepartments
                                    .filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(dept => (
                                        <label key={dept.id} className={`flex items-center gap-4 py-3 cursor-pointer group transition-colors border-b border-gray-50 hover:bg-gray-50/50 rounded-lg px-2 -mx-2`}>
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(dept.id)}
                                                onChange={() => toggleSelection(dept.id)}
                                                className="w-4 h-4 text-citilearn-green rounded focus:ring-citilearn-green border-gray-300"
                                            />
                                            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                                <Building size={18} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`text-sm font-bold transition-colors ${selectedItems.includes(dept.id) ? 'text-citilearn-green' : 'text-main'}`}>
                                                    {dept.name}
                                                </h4>
                                                <p className="text-xs text-secondary">{dept.userCount} Users</p>
                                            </div>
                                        </label>
                                    ))
                                }
                                {assignmentType === 'role' && availableRoles
                                    .filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(role => (
                                        <label key={role.id} className={`flex items-center gap-4 py-3 cursor-pointer group transition-colors border-b border-gray-50 hover:bg-gray-50/50 rounded-lg px-2 -mx-2`}>
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(role.id)}
                                                onChange={() => toggleSelection(role.id)}
                                                className="w-4 h-4 text-citilearn-green rounded focus:ring-citilearn-green border-gray-300"
                                            />
                                            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                                                <Users size={18} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`text-sm font-bold transition-colors ${selectedItems.includes(role.id) ? 'text-citilearn-green' : 'text-main'}`}>
                                                    {role.name}
                                                </h4>
                                                <p className="text-xs text-secondary">{role.userCount} Users</p>
                                            </div>
                                        </label>
                                    ))
                                }
                            </div>

                            {/* Footer Action */}
                            <div className="pt-4 mt-2 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-400">{selectedItems.length} selected</span>
                                <button
                                    onClick={handleAssign}
                                    disabled={selectedItems.length === 0}
                                    className="px-6 py-2 bg-citilearn-green text-white text-sm font-bold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-citilearn-green/20"
                                >
                                    <Plus size={18} />
                                    Add Selected
                                </button>
                            </div>
                        </div>

                        {/* RIGHT: Target - Current Assignments */}
                        <div className="lg:col-span-5 flex flex-col h-[calc(100vh-200px)] pl-8 border-l border-gray-100">
                            <div className="pb-6 flex justify-between items-end">
                                <div>
                                    <h3 className="text-xl font-bold text-main">Enrolled</h3>
                                    <p className="text-sm text-secondary mt-1">{assignments.length} learners assigned</p>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 space-y-1">
                                {assignments.length > 0 ? (
                                    assignments.map((assign, idx) => (
                                        <div key={idx} className="flex items-center gap-3 py-3 border-b border-gray-50 group transition-all hover:pl-2">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${assign.type === 'department' ? 'bg-orange-50 text-orange-600' :
                                                assign.type === 'role' ? 'bg-purple-50 text-purple-600' :
                                                    'bg-blue-50 text-blue-600'
                                                }`}>
                                                <assign.icon size={16} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-main truncate">{assign.name}</h4>
                                                <p className="text-xs text-secondary truncate">{assign.subtitle}</p>
                                            </div>
                                            <div className="text-right pr-4">
                                                <div className="text-xs font-bold text-main">{assign.count}</div>
                                                <div className="text-[10px] text-secondary">users</div>
                                            </div>
                                            <button
                                                onClick={() => setAssignments(prev => prev.filter((_, i) => i !== idx))}
                                                className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                        <Users size={48} className="text-gray-300 mb-4" />
                                        <p className="text-sm font-bold text-secondary">No learners enrolled</p>
                                        <p className="text-xs text-gray-400 mt-1 max-w-[200px]">Learners you add from the left will appear here.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </div >
    );
};

export default CourseEditor;
