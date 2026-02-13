import React, { useState } from 'react';
import { ArrowLeft, Save, Search, Plus, X, Users, Building, UserCheck, Trash2, Filter } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const UserAssignment = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [assignmentType, setAssignmentType] = useState('individual'); // individual, department, role, all

    const [assignments, setAssignments] = useState([
        {
            id: 1,
            type: 'department',
            name: 'Pilot Department',
            description: 'All Junior & Senior Instructors',
            userCount: 45,
            icon: Building
        },
        {
            id: 2,
            type: 'role',
            name: 'Maintenance Crew (A320)',
            description: 'Specific Group',
            userCount: 28,
            icon: Users
        }
    ]);

    const [availableUsers] = useState([
        { id: 1, name: 'Budi Pratama', email: 'budi@citilearn.com', role: 'Senior Instructor', department: 'Pilot' },
        { id: 2, name: 'Siti Nurhaliza', email: 'siti@citilearn.com', role: 'Junior Instructor', department: 'Pilot' },
        { id: 3, name: 'Ahmad Yani', email: 'ahmad@citilearn.com', role: 'Technician', department: 'Maintenance' },
        { id: 4, name: 'Dewi Lestari', email: 'dewi@citilearn.com', role: 'Safety Officer', department: 'Safety' }
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

    const [selectedItems, setSelectedItems] = useState([]);
    const [showAssignModal, setShowAssignModal] = useState(false);

    const toggleSelection = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const handleAssign = () => {
        // Assignment logic here
        setShowAssignModal(false);
        setSelectedItems([]);
    };

    const removeAssignment = (id) => {
        setAssignments(assignments.filter(a => a.id !== id));
    };

    return (
        <div className="space-y-6 pb-20 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to={`/admin/course/${courseId}/edit`} className="p-2 rounded-xl hover:bg-white text-secondary hover:text-primary transition-colors border border-transparent hover:border-gray-200">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-main">Assign Users</h1>
                        <p className="text-sm text-secondary font-medium">Manage who is required to take this mandatory course</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowAssignModal(true)}
                        className="px-5 py-2 text-sm font-bold text-white bg-citilearn-green rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Assign Users/Groups
                    </button>
                </div>
            </div>

            {/* Current Assignments */}
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-main">Current Assignments</h3>
                            <p className="text-sm text-secondary">Users and groups assigned to this course</p>
                        </div>
                        <div className="text-sm font-bold text-main bg-gray-50 px-4 py-2 rounded-xl">
                            {assignments.reduce((sum, a) => sum + a.userCount, 0)} Total Users
                        </div>
                    </div>

                    {assignments.length > 0 ? (
                        <div className="space-y-3">
                            {assignments.map((assignment) => {
                                const Icon = assignment.icon;
                                return (
                                    <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${assignment.type === 'department' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                                                }`}>
                                                <Icon size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-main">{assignment.name}</h4>
                                                <p className="text-sm text-secondary">{assignment.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-main">{assignment.userCount} users</div>
                                                <div className="text-xs text-secondary capitalize">{assignment.type}</div>
                                            </div>
                                            <button
                                                onClick={() => removeAssignment(assignment.id)}
                                                className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                <Users className="text-gray-300" size={32} />
                            </div>
                            <h4 className="text-main font-bold mb-1">No assignments yet</h4>
                            <p className="text-sm text-secondary mb-4">Start by assigning users or groups to this course</p>
                            <button
                                onClick={() => setShowAssignModal(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-main text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors"
                            >
                                <Plus size={16} />
                                Assign Users/Groups
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Assignment Modal */}
            {showAssignModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black text-main">Assign to Course</h2>
                                <p className="text-sm text-secondary">Select users, departments, or roles</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowAssignModal(false);
                                    setSelectedItems([]);
                                }}
                                className="p-2 text-gray-400 hover:text-main hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Assignment Type Tabs */}
                        <div className="px-6 pt-4 border-b border-gray-100">
                            <div className="flex gap-2">
                                {[
                                    { id: 'individual', label: 'Individual Users', icon: UserCheck },
                                    { id: 'department', label: 'Departments', icon: Building },
                                    { id: 'role', label: 'Roles', icon: Users }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setAssignmentType(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all ${assignmentType === tab.id
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-secondary hover:text-main'
                                            }`}
                                    >
                                        <tab.icon size={16} />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={`Search ${assignmentType}...`}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {assignmentType === 'individual' && (
                                <div className="space-y-2">
                                    {availableUsers
                                        .filter(user =>
                                            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            user.email.toLowerCase().includes(searchQuery.toLowerCase())
                                        )
                                        .map((user, index) => (
                                            <label
                                                key={user.id}
                                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors group"
                                            >
                                                <span className="text-sm font-bold text-secondary w-6">{index + 1}</span>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(user.id)}
                                                    onChange={() => toggleSelection(user.id)}
                                                    className="w-4 h-4 text-citilearn-green border-gray-300 rounded focus:ring-citilearn-green"
                                                />
                                                <div className="w-10 h-10 bg-linear-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                                    {user.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-main">{user.name}</h4>
                                                    <p className="text-sm text-secondary">{user.email}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs font-medium text-gray-500">{user.role}</div>
                                                    <div className="text-xs text-gray-400">{user.department}</div>
                                                </div>
                                            </label>
                                        ))}
                                </div>
                            )}

                            {assignmentType === 'department' && (
                                <div className="space-y-2">
                                    {availableDepartments
                                        .filter(dept => dept.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((dept, index) => (
                                            <label
                                                key={dept.id}
                                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors"
                                            >
                                                <span className="text-sm font-bold text-secondary w-6">{index + 1}</span>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(dept.id)}
                                                    onChange={() => toggleSelection(dept.id)}
                                                    className="w-4 h-4 text-citilearn-green border-gray-300 rounded focus:ring-citilearn-green"
                                                />
                                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                                    <Building size={20} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-main">{dept.name}</h4>
                                                    <p className="text-sm text-secondary">{dept.userCount} users in this department</p>
                                                </div>
                                            </label>
                                        ))}
                                </div>
                            )}

                            {assignmentType === 'role' && (
                                <div className="space-y-2">
                                    {availableRoles
                                        .filter(role => role.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((role, index) => (
                                            <label
                                                key={role.id}
                                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors"
                                            >
                                                <span className="text-sm font-bold text-secondary w-6">{index + 1}</span>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(role.id)}
                                                    onChange={() => toggleSelection(role.id)}
                                                    className="w-4 h-4 text-citilearn-green border-gray-300 rounded focus:ring-citilearn-green"
                                                />
                                                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                                                    <Users size={20} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-main">{role.name}</h4>
                                                    <p className="text-sm text-secondary">{role.userCount} users with this role</p>
                                                </div>
                                            </label>
                                        ))}
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-100 flex justify-between items-center">
                            <div className="text-sm text-secondary">
                                {selectedItems.length} selected
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowAssignModal(false);
                                        setSelectedItems([]);
                                    }}
                                    className="px-4 py-2 text-sm font-bold text-secondary bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAssign}
                                    disabled={selectedItems.length === 0}
                                    className="px-5 py-2 text-sm font-bold text-white bg-citilearn-green rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Assign {selectedItems.length > 0 && `(${selectedItems.length})`}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAssignment;
