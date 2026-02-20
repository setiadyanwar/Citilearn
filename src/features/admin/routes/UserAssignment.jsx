import React, { useState } from 'react';
import { ArrowLeft, Plus, Building, Users, UserCheck } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import AssignmentModal from '@/features/admin/components/course/assignments/AssignmentModal';
import CurrentAccessList from '@/features/admin/components/course/assignments/CurrentAccessList';

const UserAssignment = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [assignments, setAssignments] = useState([
        {
            id: 201,
            type: 'department',
            name: 'Pilot Department',
            description: 'All Junior & Senior Instructors',
            userCount: 45,
            icon: Building
        },
        {
            id: 301,
            type: 'role',
            name: 'Maintenance Crew (A320)',
            description: 'Specific Group',
            userCount: 28,
            icon: Users
        },
        {
            id: 101,
            type: 'individual',
            name: 'Budi Pratama',
            description: 'budi@citilearn.com',
            userCount: 1,
            icon: UserCheck
        }
    ]);

    const [availableUsers] = useState([
        { id: 101, name: 'Budi Pratama', email: 'budi@citilearn.com', role: 'Senior Instructor', department: 'Pilot' },
        { id: 102, name: 'Siti Nurhaliza', email: 'siti@citilearn.com', role: 'Junior Instructor', department: 'Pilot' },
        { id: 103, name: 'Ahmad Yani', email: 'ahmad@citilearn.com', role: 'Technician', department: 'Maintenance' },
        { id: 104, name: 'Dewi Lestari', email: 'dewi@citilearn.com', role: 'Safety Officer', department: 'Safety' }
    ]);

    const [availableDepartments] = useState([
        { id: 201, name: 'Pilot Department', userCount: 45 },
        { id: 202, name: 'Maintenance', userCount: 32 },
        { id: 203, name: 'Safety & Compliance', userCount: 18 },
        { id: 204, name: 'Ground Operations', userCount: 56 },
        { id: 205, name: 'Human Capital', userCount: 12 },
        { id: 206, name: 'Legal & Compliance', userCount: 8 }
    ]);

    const [availableRoles] = useState([
        { id: 301, name: 'Senior Instructor', userCount: 12 },
        { id: 302, name: 'Junior Instructor', userCount: 33 },
        { id: 303, name: 'Technician', userCount: 28 },
        { id: 304, name: 'Safety Officer', userCount: 15 }
    ]);

    const [showAssignModal, setShowAssignModal] = useState(false);

    const handleAssign = (selectedIds) => {
        const newAssignments = selectedIds.map(id => {
            let item, type, icon, description;

            // Determine type based on ID range
            if (id >= 100 && id < 200) {
                item = availableUsers.find(u => u.id === id);
                type = 'individual';
                icon = UserCheck;
                description = item?.email;
            } else if (id >= 200 && id < 300) {
                item = availableDepartments.find(d => d.id === id);
                type = 'department';
                icon = Building;
                description = 'Department Access';
            } else if (id >= 300) {
                item = availableRoles.find(r => r.id === id);
                type = 'role';
                icon = Users;
                description = 'Role Access';
            }

            if (!item) return null;

            return {
                id: item.id,
                type: type,
                name: item.name,
                description: description,
                userCount: type === 'individual' ? 1 : item.userCount,
                icon: icon
            };
        }).filter(Boolean);

        // Avoid duplicates
        const uniqueAssignments = newAssignments.filter(newA =>
            !assignments.some(existingA => existingA.id === newA.id)
        );

        setAssignments([...assignments, ...uniqueAssignments]);
        setShowAssignModal(false);
    };

    const removeAssignment = (id) => {
        setAssignments(assignments.filter(a => a.id !== id));
    };

    return (
        <div className="space-y-6 pb-20 animate-fade-in relative">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to={`/admin/course/${courseId}/edit`} className="p-2 rounded-xl hover:bg-white text-secondary hover:text-primary transition-colors border border-transparent hover:border-gray-200">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-main">Assign Users</h1>
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
            <CurrentAccessList
                assignments={assignments}
                onRemove={removeAssignment}
            />

            {/* Assignment Modal */}
            <AssignmentModal
                isOpen={showAssignModal}
                onClose={() => setShowAssignModal(false)}
                onAssign={handleAssign}
                availableUsers={availableUsers}
                availableDepartments={availableDepartments}
                availableRoles={availableRoles}
            />
        </div>
    );
};

export default UserAssignment;
