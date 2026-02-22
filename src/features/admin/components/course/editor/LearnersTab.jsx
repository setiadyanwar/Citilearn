import React, { useState } from 'react';
import { Search, Plus, X, Users, Building, UserCheck, Trash2, Filter, Info, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import UserProfile from '@/components/common/UserProfile';
import Tabs from '@/components/common/Tabs';

const LearnersTab = ({ courseId }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [assignmentType, setAssignmentType] = useState('individual'); // individual, department, role

    const [assignments, setAssignments] = useState(courseId ? [
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
    ] : []);

    const [availableUsers] = useState([
        { id: 101, name: 'Budi Pratama', email: 'budi@citilearn.com', role: 'Senior Instructor', department: 'Pilot' },
        { id: 102, name: 'Siti Nurhaliza', email: 'siti@citilearn.com', role: 'Junior Instructor', department: 'Pilot' },
        { id: 103, name: 'Ahmad Yani', email: 'ahmad@citilearn.com', role: 'Technician', department: 'Maintenance' },
        { id: 104, name: 'Dewi Lestari', email: 'dewi@citilearn.com', role: 'Safety Officer', department: 'Safety' }
    ]);

    const [availableDepartments] = useState([
        { id: 201, name: 'Ground Operations', userCount: 56 },
        { id: 202, name: 'Human Capital', userCount: 12 },
        { id: 203, name: 'Legal & Compliance', userCount: 8 }
    ]);

    const [availableRoles] = useState([
        { id: 301, name: 'Technician', userCount: 28 },
        { id: 302, name: 'Safety Officer', userCount: 15 }
    ]);

    const [selectedIds, setSelectedIds] = useState([]);

    const toggleSelection = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleBulkAssign = () => {
        const newAssignments = [...assignments];
        let itemsToAdd = [];

        if (assignmentType === 'individual') {
            itemsToAdd = availableUsers.filter(u => selectedIds.includes(u.id));
        } else if (assignmentType === 'department') {
            itemsToAdd = availableDepartments.filter(d => selectedIds.includes(d.id));
        } else if (assignmentType === 'role') {
            itemsToAdd = availableRoles.filter(r => selectedIds.includes(r.id));
        }

        itemsToAdd.forEach(item => {
            if (!newAssignments.some(a => a.id === item.id && a.type === assignmentType)) {
                newAssignments.push({
                    id: item.id,
                    type: assignmentType,
                    name: item.name,
                    description: assignmentType === 'individual' ? item.email : `${item.userCount} users`,
                    userCount: assignmentType === 'individual' ? 1 : item.userCount,
                    icon: assignmentType === 'individual' ? UserCheck : assignmentType === 'department' ? Building : Users
                });
            }
        });

        setAssignments(newAssignments);
        setSelectedIds([]);
    };

    const removeAssignment = (id) => {
        setAssignments(assignments.filter(a => a.id !== id));
    };

    const isAssigned = (id, type) => assignments.some(a => a.id === id && a.type === type);

    return (
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-8 items-start overflow-hidden w-full">
            {/* Left: Selection Area */}
            <div className="lg:col-span-7 space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-main leading-none mb-2">Add Learners</h3>
                    <p className="text-sm text-muted-foreground">Select multiple users, departments, or roles and assign them to this course at once.</p>
                </div>

                <div className="space-y-6">
                    {/* Tabs Selection and Bulk Action */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <Tabs
                            tabs={[
                                { id: 'individual', label: 'Users', icon: UserCheck },
                                { id: 'department', label: 'Departments', icon: Building },
                                { id: 'role', label: 'Roles', icon: Users }
                            ]}
                            activeTab={assignmentType}
                            onTabChange={setAssignmentType}
                        />

                        {selectedIds.length > 0 && (
                            <Button
                                onClick={handleBulkAssign}
                                className="rounded-xl font-bold h-10 px-6 animate-in fade-in slide-in-from-right-2"
                            >
                                <Plus size={18} className="mr-2" />
                                Assign Selected ({selectedIds.length})
                            </Button>
                        )}
                    </div>

                    {/* Search & Select All */}
                    <div className="space-y-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={20} />
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={`Quick search ${assignmentType}...`}
                                className="pl-12 h-13 bg-transparent border-slate-200 dark:border-slate-800 rounded-2xl font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-base"
                            />
                        </div>

                        <div className="flex items-center gap-2 px-1">
                            <Checkbox
                                disabled={
                                    (assignmentType === 'individual' ? availableUsers :
                                        assignmentType === 'department' ? availableDepartments :
                                            availableRoles)
                                        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .length === 0
                                }
                                checked={
                                    (assignmentType === 'individual' ? availableUsers :
                                        assignmentType === 'department' ? availableDepartments :
                                            availableRoles)
                                        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .length > 0 &&
                                    (assignmentType === 'individual' ? availableUsers :
                                        assignmentType === 'department' ? availableDepartments :
                                            availableRoles)
                                        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .every(item => selectedIds.includes(item.id))
                                }
                                onCheckedChange={(checked) => {
                                    const currentItems = (assignmentType === 'individual' ? availableUsers :
                                        assignmentType === 'department' ? availableDepartments :
                                            availableRoles)
                                        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

                                    if (checked) {
                                        const newSelected = [...selectedIds];
                                        currentItems.forEach(item => {
                                            if (!newSelected.includes(item.id)) {
                                                newSelected.push(item.id);
                                            }
                                        });
                                        setSelectedIds(newSelected);
                                    } else {
                                        const idsToRemove = currentItems.map(item => item.id);
                                        setSelectedIds(selectedIds.filter(id => !idsToRemove.includes(id)));
                                    }
                                }}
                                className="border-slate-300 dark:border-slate-700 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            />
                            <span className="text-sm font-medium text-muted-foreground">Select All</span>
                        </div>
                    </div>

                    {/* List Content - Clean vertical list */}
                    <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-0.5 custom-scrollbar">
                        {assignmentType === 'individual' && availableUsers
                            .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => !isAssigned(user.id, 'individual') && toggleSelection(user.id)}
                                    className={cn(
                                        "group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border",
                                        selectedIds.includes(user.id)
                                            ? "bg-primary/5 dark:bg-primary/10 border-primary/20"
                                            : "bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700"
                                    )}
                                >
                                    <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            id={`user-${user.id}`}
                                            disabled={isAssigned(user.id, 'individual')}
                                            checked={selectedIds.includes(user.id)}
                                            onCheckedChange={() => toggleSelection(user.id)}
                                            className="w-5 h-5 rounded-md border-slate-300 dark:border-slate-700"
                                        />
                                    </div>
                                    <UserProfile
                                        imageUrl={user.avatar} // Assuming user object might have avatar
                                        name={user.name}
                                        size="sm"
                                        className="shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-main text-base truncate">{user.name}</h4>
                                        <p className="text-sm truncate">
                                            <span className="text-secondary font-medium">{user.role}</span>
                                            <span className="mx-1.5 text-tertiary">•</span>
                                            <span className="text-tertiary">{user.department}</span>
                                        </p>
                                    </div>
                                    {isAssigned(user.id, 'individual') && (
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-3xs font-bold uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                                            <CheckCircle2 size={13} />
                                            Assigned
                                        </div>
                                    )}
                                </div>
                            ))
                        }

                        {assignmentType === 'department' && availableDepartments
                            .filter(dept => dept.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((dept) => (
                                <div
                                    key={dept.id}
                                    onClick={() => !isAssigned(dept.id, 'department') && toggleSelection(dept.id)}
                                    className={cn(
                                        "group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border",
                                        selectedIds.includes(dept.id)
                                            ? "bg-primary/5 dark:bg-primary/10 border-primary/20"
                                            : "bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700"
                                    )}
                                >
                                    <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            id={`dept-${dept.id}`}
                                            disabled={isAssigned(dept.id, 'department')}
                                            checked={selectedIds.includes(dept.id)}
                                            onCheckedChange={() => toggleSelection(dept.id)}
                                            className="w-5 h-5 rounded-md border-slate-300 dark:border-slate-700"
                                        />
                                    </div>
                                    <div className="w-11 h-11 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/10">
                                        <Building size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-main text-base truncate">{dept.name}</h4>
                                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground truncate">{dept.userCount} Users in this department</p>
                                    </div>
                                    {isAssigned(dept.id, 'department') && (
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-3xs font-bold uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                                            <CheckCircle2 size={13} />
                                            Assigned
                                        </div>
                                    )}
                                </div>
                            ))
                        }

                        {/* Similar clean updates for Role type if needed, but I'll stop here to keep the diff clean while covering the pattern */}
                        {assignmentType === 'role' && availableRoles
                            .filter(role => role.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((role) => (
                                <div
                                    key={role.id}
                                    onClick={() => !isAssigned(role.id, 'role') && toggleSelection(role.id)}
                                    className={cn(
                                        "group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border",
                                        selectedIds.includes(role.id)
                                            ? "bg-primary/5 dark:bg-primary/10 border-primary/20"
                                            : "bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700"
                                    )}
                                >
                                    <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            id={`role-${role.id}`}
                                            disabled={isAssigned(role.id, 'role')}
                                            checked={selectedIds.includes(role.id)}
                                            onCheckedChange={() => toggleSelection(role.id)}
                                            className="w-5 h-5 rounded-md border-slate-300 dark:border-slate-700"
                                        />
                                    </div>
                                    <div className="w-11 h-11 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center shrink-0 border border-purple-500/10">
                                        <Users size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-main text-base truncate">{role.name}</h4>
                                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground truncate">{role.userCount} Users with this role</p>
                                    </div>
                                    {isAssigned(role.id, 'role') && (
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-3xs font-bold uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                                            <CheckCircle2 size={13} />
                                            Assigned
                                        </div>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* Right: Current Assignments Area - Also clean and flat */}
            <div className="lg:col-span-5 space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-main leading-none mb-2">Current Access</h3>
                    <p className="text-sm text-muted-foreground">Manage who currently has access to this course.</p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/50 rounded-3xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3.5 bg-primary/10 text-primary rounded-2xl border border-primary/10">
                                <Users size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-main leading-none">
                                    {assignments.reduce((sum, a) => sum + a.userCount, 0)}
                                </div>
                                <div className="text-3xs font-medium uppercase tracking-widest text-muted-foreground mt-1.5">Total Learners</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-0.5 custom-scrollbar">
                        {assignments.length > 0 ? (
                            assignments.map((assignment) => {
                                const Icon = assignment.icon;
                                return (
                                    <div key={`${assignment.type}-${assignment.id}`} className="flex items-center justify-between p-3.5 pl-4 bg-transparent border border-slate-100 dark:border-slate-800/50 rounded-2xl hover:bg-white dark:hover:bg-slate-900/80 hover:border-slate-200 dark:hover:border-slate-700 transition-all group">
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                                                assignment.type === 'department' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/10' :
                                                    assignment.type === 'individual' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/10' :
                                                        'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-500/10'
                                            )}>
                                                <Icon size={18} />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-semibold text-main text-sm truncate">{assignment.name}</h4>
                                                <p className="text-3xs text-muted-foreground font-medium uppercase tracking-wider truncate">{assignment.description}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeAssignment(assignment.id)}
                                            className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800/50 rounded-3xl bg-slate-50/50 dark:bg-slate-900/20">
                                <Users className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                                <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">No learners assigned yet</p>
                            </div>
                        )}
                    </div>

                    {assignments.length > 0 && (
                        <div className="p-4 bg-emerald-500/5 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-500/10 flex items-center gap-3">
                            <CheckCircle2 size={18} />
                            <span className="text-3xs font-medium uppercase tracking-wide">Course visibility active</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LearnersTab;
