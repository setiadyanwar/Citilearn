import React, { useState, useMemo } from 'react';
import {
    Users, Building2, Shield, Search, Plus,
    UserCheck, Mail, Download, X,
    Check, Crown, Pencil, Trash2, Eye, Lock, Unlock,
    BadgeCheck, AlertCircle, ArrowUpDown, MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Badge from '@/components/common/Badge';
import EmptyState from '@/components/common/EmptyState';
import UserProfile from '@/components/common/UserProfile';
import StatCard from '@/features/dashboard/components/StatCard';
import Tabs from '@/components/common/Tabs';
import AdminPageShell from '../components/layout/AdminPageShell';
import ManagementHeader from '../components/layout/ManagementHeader';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────
const MOCK_USERS = [
    { id: 1, name: 'Budi Pratama', email: 'budi.pratama@citilink.co.id', role: 'Admin', department: 'Human Capital', status: 'Active', lastActive: '2 hours ago', joined: '2024-01-15' },
    { id: 2, name: 'Siti Nurhaliza', email: 'siti.nurhaliza@citilink.co.id', role: 'Instructor', department: 'Pilot', status: 'Active', lastActive: '1 day ago', joined: '2024-02-20' },
    { id: 3, name: 'Ahmad Yani', email: 'ahmad.yani@citilink.co.id', role: 'Learner', department: 'Maintenance', status: 'Active', lastActive: '3 days ago', joined: '2024-03-10' },
    { id: 4, name: 'Dewi Lestari', email: 'dewi.lestari@citilink.co.id', role: 'Learner', department: 'Safety', status: 'Inactive', lastActive: '2 weeks ago', joined: '2023-11-05' },
    { id: 5, name: 'Riko Valentino', email: 'riko.valentino@citilink.co.id', role: 'Instructor', department: 'Ground Ops', status: 'Active', lastActive: '5 hours ago', joined: '2024-01-28' },
    { id: 6, name: 'Maya Kusuma', email: 'maya.kusuma@citilink.co.id', role: 'Learner', department: 'Cabin Crew', status: 'Active', lastActive: 'Just now', joined: '2024-04-01' },
    { id: 7, name: 'Hendri Saputra', email: 'hendri.saputra@citilink.co.id', role: 'Learner', department: 'Pilot', status: 'Suspended', lastActive: '1 month ago', joined: '2023-08-14' },
    { id: 8, name: 'Rina Wahyuni', email: 'rina.wahyuni@citilink.co.id', role: 'Admin', department: 'Human Capital', status: 'Active', lastActive: '30 minutes ago', joined: '2023-06-20' },
];

const MOCK_DEPARTMENTS = [
    { id: 1, name: 'Human Capital', shortCode: 'HC', description: 'HR, recruitment & employee development.', memberCount: 12, courseCount: 5, color: 'bg-violet-500' },
    { id: 2, name: 'Pilot', shortCode: 'PIL', description: 'First officers, captains & flight crew.', memberCount: 85, courseCount: 12, color: 'bg-blue-500' },
    { id: 3, name: 'Maintenance', shortCode: 'MNT', description: 'Aircraft technicians & engineers.', memberCount: 60, courseCount: 8, color: 'bg-amber-500' },
    { id: 4, name: 'Safety & Compliance', shortCode: 'SAF', description: 'Safety officers & risk analysts.', memberCount: 18, courseCount: 10, color: 'bg-red-500' },
    { id: 5, name: 'Ground Operations', shortCode: 'GRD', description: 'Check-in, baggage & ramp teams.', memberCount: 120, courseCount: 6, color: 'bg-green-500' },
    { id: 6, name: 'Cabin Crew', shortCode: 'CAB', description: 'Flight attendants & service crew.', memberCount: 200, courseCount: 9, color: 'bg-pink-500' },
];

const MOCK_ROLES = [
    {
        id: 1, name: 'Admin', description: 'Full system access — manage courses, users, reports.',
        userCount: 3, badgeVariant: 'danger',
        permissions: ['manage_users', 'manage_courses', 'manage_roles', 'manage_departments', 'view_reports', 'view_grading', 'publish_courses'],
    },
    {
        id: 2, name: 'Instructor', description: 'Create & manage courses, grade learners.',
        userCount: 28, badgeVariant: 'continue',
        permissions: ['manage_courses', 'view_grading', 'publish_courses', 'view_reports'],
    },
    {
        id: 3, name: 'Learner', description: 'Access and complete assigned courses only.',
        userCount: 1215, badgeVariant: 'outline',
        permissions: ['view_courses'],
    },
];

const ALL_PERMISSIONS = [
    { key: 'manage_users', label: 'Manage Users', group: 'Users' },
    { key: 'manage_roles', label: 'Manage Roles', group: 'Users' },
    { key: 'manage_departments', label: 'Manage Departments', group: 'Users' },
    { key: 'manage_courses', label: 'Manage Courses', group: 'Courses' },
    { key: 'publish_courses', label: 'Publish Courses', group: 'Courses' },
    { key: 'view_courses', label: 'View Courses', group: 'Courses' },
    { key: 'view_grading', label: 'View & Grade Submissions', group: 'Grading' },
    { key: 'view_reports', label: 'View Analytics & Reports', group: 'Reports' },
];

const STATUS_BADGE_MAP = {
    Active: 'success',
    Inactive: 'outline',
    Suspended: 'danger',
};

const ROLE_BADGE_MAP = {
    Admin: 'danger',
    Instructor: 'continue',
    Learner: 'outline',
};

// ─────────────────────────────────────────────────────────────────
// ACTION MENU — uses existing Popover UI component
// ─────────────────────────────────────────────────────────────────
const ActionMenu = ({ actions }) => (
    <Popover>
        <PopoverTrigger asChild>
            <button
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                onClick={e => e.stopPropagation()}
            >
                <MoreHorizontal size={16} />
            </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-44 p-1.5 rounded-xl">
            {actions.map((action) => (
                <button
                    key={action.label}
                    onClick={action.onClick}
                    className={cn(
                        'w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                        action.danger ? 'text-red-500 hover:bg-red-50' : 'text-slate-700 hover:bg-slate-50'
                    )}
                >
                    {action.icon && <action.icon size={14} />}
                    {action.label}
                </button>
            ))}
        </PopoverContent>
    </Popover>
);

// ─────────────────────────────────────────────────────────────────
// INVITE USER MODAL
// ─────────────────────────────────────────────────────────────────
const InviteUserModal = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({ name: '', email: '', role: 'Learner', department: '' });
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md animate-in zoom-in-95 fade-in duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 pb-0">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Invite User</h2>
                        <p className="text-sm text-slate-500 mt-0.5">Send an invitation to join CitiLearn.</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Full Name</label>
                        <Input
                            id="invite-name"
                            placeholder="e.g. Budi Pratama"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="rounded-xl"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Email Address</label>
                        <Input
                            id="invite-email"
                            placeholder="name@citilink.co.id"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className="rounded-xl"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Role</label>
                            <Select value={form.role} onValueChange={v => setForm({ ...form, role: v })}>
                                <SelectTrigger id="invite-role" className="rounded-xl h-10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Instructor">Instructor</SelectItem>
                                    <SelectItem value="Learner">Learner</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Department</label>
                            <Select value={form.department} onValueChange={v => setForm({ ...form, department: v })}>
                                <SelectTrigger id="invite-dept" className="rounded-xl h-10">
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {MOCK_DEPARTMENTS.map(d => (
                                        <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 p-6 pt-0">
                    <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl h-11 font-bold">Cancel</Button>
                    <Button className="flex-1 rounded-xl h-11 font-bold gap-2">
                        <Mail size={15} />
                        Send Invite
                    </Button>
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────
// ROLE PERMISSIONS MODAL
// ─────────────────────────────────────────────────────────────────
const RolePermissionsModal = ({ isOpen, onClose, role }) => {
    const [permissions, setPermissions] = useState(role?.permissions || []);

    // Sync when role changes
    React.useEffect(() => {
        setPermissions(role?.permissions || []);
    }, [role]);

    if (!isOpen || !role) return null;

    const grouped = ALL_PERMISSIONS.reduce((acc, p) => {
        if (!acc[p.group]) acc[p.group] = [];
        acc[p.group].push(p);
        return acc;
    }, {});

    const toggle = (key) =>
        setPermissions(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 fade-in duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 pb-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Edit Permissions — {role.name}</h2>
                        <p className="text-sm text-slate-500 mt-0.5">Toggle capabilities for this role.</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 pb-4 space-y-5 max-h-[60vh] overflow-y-auto">
                    {Object.entries(grouped).map(([group, perms]) => (
                        <div key={group}>
                            <p className="text-2xs font-bold text-slate-400 uppercase tracking-widest mb-3">{group}</p>
                            <div className="space-y-2">
                                {perms.map(p => (
                                    <label
                                        key={p.key}
                                        className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 cursor-pointer transition-all"
                                    >
                                        <Checkbox
                                            id={`perm-${p.key}`}
                                            checked={permissions.includes(p.key)}
                                            onCheckedChange={() => toggle(p.key)}
                                        />
                                        <span className="text-sm font-semibold text-slate-700">{p.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-3 p-6 pt-4 border-t border-slate-100">
                    <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl h-11 font-bold">Cancel</Button>
                    <Button onClick={onClose} className="flex-1 rounded-xl h-11 font-bold gap-2">
                        <Check size={15} />
                        Save Permissions
                    </Button>
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────
// USERS TAB
// ─────────────────────────────────────────────────────────────────
const UsersTab = ({ search }) => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterRole, setFilterRole] = useState('All');
    const [showInvite, setShowInvite] = useState(false);
    const [sortField, setSortField] = useState('name');

    const statusFilters = ['All', 'Active', 'Inactive', 'Suspended'];

    const filtered = useMemo(() => {
        return MOCK_USERS
            .filter(u => filterStatus === 'All' || u.status === filterStatus)
            .filter(u => filterRole === 'All' || u.role === filterRole)
            .filter(u =>
                !search ||
                u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase()) ||
                u.department.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => (a[sortField] || '').localeCompare(b[sortField] || ''));
    }, [filterStatus, filterRole, search, sortField]);

    const SortableHead = ({ field, label }) => (
        <TableHead
            className="cursor-pointer hover:text-slate-700 transition-colors select-none"
            onClick={() => setSortField(field)}
        >
            <div className="flex items-center gap-1.5">
                {label}
                <ArrowUpDown size={12} className={sortField === field ? 'text-primary' : 'text-slate-300'} />
            </div>
        </TableHead>
    );

    return (
        <>
            <InviteUserModal isOpen={showInvite} onClose={() => setShowInvite(false)} />

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
                {/* Status filter pills */}
                <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl flex-wrap">
                    {statusFilters.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilterStatus(f)}
                            className={cn(
                                'px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                                filterStatus === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                            )}
                        >
                            {f}
                            <span className={cn(
                                'ml-1.5 text-2xs px-1 py-0.5 rounded-full',
                                filterStatus === f ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-400'
                            )}>
                                {f === 'All' ? MOCK_USERS.length : MOCK_USERS.filter(u => u.status === f).length}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* Role filter */}
                    <Select value={filterRole} onValueChange={setFilterRole}>
                        <SelectTrigger id="filter-role" className="h-9 w-36 rounded-xl text-xs font-bold">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Roles</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Instructor">Instructor</SelectItem>
                            <SelectItem value="Learner">Learner</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        id="invite-user-btn"
                        onClick={() => setShowInvite(true)}
                        className="rounded-xl h-9 px-4 gap-2 font-bold text-sm"
                    >
                        <Plus size={15} />
                        Invite User
                    </Button>
                </div>
            </div>

            {/* Table using existing Table UI component */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/60 hover:bg-slate-50/60 border-slate-100">
                            <SortableHead field="name" label="User" />
                            <SortableHead field="role" label="Role" />
                            <SortableHead field="department" label="Department" />
                            <SortableHead field="status" label="Status" />
                            <TableHead className="text-slate-400 font-bold text-xs uppercase tracking-wider">Last Active</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <EmptyState
                                        title="No users found"
                                        message="Try adjusting your search or filter."
                                    />
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map(user => (
                                <TableRow
                                    key={user.id}
                                    id={`user-row-${user.id}`}
                                    className="border-slate-50 hover:bg-slate-50/50"
                                >
                                    {/* User */}
                                    <TableCell>
                                        <div className="flex items-center gap-3 min-w-0">
                                            <UserProfile name={user.name} size="sm" shape="circle" />
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                                                <p className="text-xs text-slate-400 font-medium truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    {/* Role */}
                                    <TableCell>
                                        <Badge variant={ROLE_BADGE_MAP[user.role] || 'outline'} size="compact">
                                            {user.role === 'Admin' && <Crown size={10} />}
                                            {user.role === 'Instructor' && <BadgeCheck size={10} />}
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    {/* Department */}
                                    <TableCell>
                                        <span className="text-sm font-medium text-slate-600">{user.department}</span>
                                    </TableCell>
                                    {/* Status */}
                                    <TableCell>
                                        <Badge variant={STATUS_BADGE_MAP[user.status] || 'outline'} size="compact" showDot>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    {/* Last Active */}
                                    <TableCell>
                                        <span className="text-xs text-slate-400 font-medium">{user.lastActive}</span>
                                    </TableCell>
                                    {/* Actions */}
                                    <TableCell className="text-right">
                                        <ActionMenu actions={[
                                            { label: 'Edit User', icon: Pencil, onClick: () => { } },
                                            { label: 'View Profile', icon: Eye, onClick: () => { } },
                                            {
                                                label: user.status === 'Suspended' ? 'Unsuspend' : 'Suspend',
                                                icon: user.status === 'Suspended' ? Unlock : Lock,
                                                onClick: () => { }
                                            },
                                            { label: 'Remove User', icon: Trash2, onClick: () => { }, danger: true },
                                        ]} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <p className="text-xs text-slate-400 font-medium mt-4 text-center">
                Showing {filtered.length} of {MOCK_USERS.length} users
            </p>
        </>
    );
};

// ─────────────────────────────────────────────────────────────────
// DEPARTMENTS TAB
// ─────────────────────────────────────────────────────────────────
const DepartmentsTab = ({ search }) => {
    const filtered = useMemo(
        () => MOCK_DEPARTMENTS.filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase())),
        [search]
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {/* Add New Card */}
            <button
                id="add-department-btn"
                className="group border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-primary/40 hover:bg-primary/5 transition-all min-h-[160px]"
            >
                <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <Plus size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm font-bold text-slate-400 group-hover:text-primary transition-colors">Add Department</p>
            </button>

            {filtered.map(dept => (
                <div
                    key={dept.id}
                    id={`dept-card-${dept.id}`}
                    className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:shadow-slate-100 transition-all"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', dept.color)}>
                                <span className="text-white text-xs font-black">{dept.shortCode}</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm leading-tight">{dept.name}</h3>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">{dept.memberCount} members</p>
                            </div>
                        </div>
                        <ActionMenu actions={[
                            { label: 'Edit', icon: Pencil, onClick: () => { } },
                            { label: 'View Members', icon: Users, onClick: () => { } },
                            { label: 'Delete', icon: Trash2, onClick: () => { }, danger: true },
                        ]} />
                    </div>
                    <p className="text-xs font-medium text-slate-500 mb-4 leading-relaxed line-clamp-2">{dept.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                            <Users size={12} className="text-slate-300" />
                            {dept.memberCount} members
                        </span>
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                            <Eye size={12} className="text-slate-300" />
                            {dept.courseCount} courses
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────
// ROLES TAB
// ─────────────────────────────────────────────────────────────────
const RolesTab = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const openPermissions = (role) => {
        setSelectedRole(role);
        setShowModal(true);
    };

    const grouped = ALL_PERMISSIONS.reduce((acc, p) => {
        if (!acc[p.group]) acc[p.group] = [];
        acc[p.group].push(p);
        return acc;
    }, {});

    return (
        <>
            <RolePermissionsModal isOpen={showModal} onClose={() => setShowModal(false)} role={selectedRole} />
            <div className="space-y-4">
                {MOCK_ROLES.map(role => (
                    <div
                        key={role.id}
                        id={`role-card-${role.id}`}
                        className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:shadow-slate-100 transition-all"
                    >
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            <div className="flex-1 min-w-0">
                                {/* Role title row */}
                                <div className="flex items-center gap-3 mb-2">
                                    <Badge variant={role.badgeVariant} size="sm">
                                        {role.name === 'Admin' && <Crown size={11} />}
                                        {role.name === 'Instructor' && <BadgeCheck size={11} />}
                                        {role.name === 'Learner' && <Users size={11} />}
                                        {role.name}
                                    </Badge>
                                    <span className="text-xs font-medium text-slate-400">{role.userCount} users</span>
                                </div>
                                <p className="text-sm font-medium text-slate-500 mb-4">{role.description}</p>

                                {/* Permissions using Checkbox */}
                                <div className="space-y-4">
                                    {Object.entries(grouped).map(([group, perms]) => (
                                        <div key={group}>
                                            <p className="text-2xs font-bold text-slate-400 uppercase tracking-widest mb-2">{group}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {perms.map(p => {
                                                    const isOn = role.permissions.includes(p.key);
                                                    return (
                                                        <div key={p.key} className={cn(
                                                            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border',
                                                            isOn
                                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                                : 'bg-slate-50 text-slate-300 border-slate-100'
                                                        )}>
                                                            {isOn ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                                                            {p.label}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex md:flex-col gap-2 shrink-0">
                                <Button
                                    id={`edit-permissions-${role.id}`}
                                    onClick={() => openPermissions(role)}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl h-9 px-4 gap-2 font-bold text-xs"
                                >
                                    <Shield size={13} />
                                    Edit Permissions
                                </Button>
                                {role.name !== 'Learner' && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-xl h-9 px-4 gap-2 font-bold text-xs text-slate-400 hover:text-red-500 hover:bg-red-50"
                                    >
                                        <Trash2 size={13} />
                                        Delete
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add Custom Role */}
                <button
                    id="add-role-btn"
                    className="group w-full border-2 border-dashed border-slate-200 rounded-2xl p-5 flex items-center justify-center gap-3 hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                    <Plus size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
                    <span className="text-sm font-bold text-slate-400 group-hover:text-primary transition-colors">Create Custom Role</span>
                </button>
            </div>
        </>
    );
};

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────
const UserHub = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [search, setSearch] = useState('');

    const tabs = [
        { id: 'users', label: 'Users', icon: Users },
        { id: 'departments', label: 'Departments', icon: Building2 },
        { id: 'roles', label: 'Roles & Permissions', icon: Shield },
    ];

    return (
        <AdminPageShell>
            <ManagementHeader
                title="User Hub"
                description="Manage users, departments, and role-based access control (RBAC)."
            >
                <Button variant="outline" size="sm" className="h-9 px-4 gap-2 font-bold text-sm rounded-xl shadow-none">
                    <Download size={15} />
                    Export
                </Button>
                <Button size="sm" className="h-9 px-4 gap-2 font-bold text-sm rounded-xl">
                    <UserCheck size={15} />
                    Sync from SSO
                </Button>
            </ManagementHeader>

            {/* Stats Row — uses existing StatCard (variant="admin") */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    variant="admin"
                    label="Total Users"
                    value={MOCK_USERS.length}
                    trend={`${MOCK_USERS.filter(u => u.status === 'Active').length} active`}
                />
                <StatCard
                    variant="admin"
                    label="Departments"
                    value={MOCK_DEPARTMENTS.length}
                    trend="across all units"
                />
                <StatCard
                    variant="admin"
                    label="Roles Defined"
                    value={MOCK_ROLES.length}
                    trend="with RBAC rules"
                />
                <StatCard
                    variant="admin"
                    label="Suspended"
                    value={MOCK_USERS.filter(u => u.status === 'Suspended').length}
                    trend="need attention"
                />
            </div>

            {/* Tab Bar + Search Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Only show search on Users & Departments tab */}
                {activeTab !== 'roles' && (
                    <div className="relative sm:ml-auto w-full sm:w-64">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            id="user-hub-search"
                            placeholder={activeTab === 'users' ? 'Search users...' : 'Search departments...'}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-9 h-9 rounded-xl shadow-none border-slate-200 bg-white text-sm"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X size={13} />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Tab Content */}
            {activeTab === 'users' && <UsersTab search={search} />}
            {activeTab === 'departments' && <DepartmentsTab search={search} />}
            {activeTab === 'roles' && <RolesTab />}
        </AdminPageShell>
    );
};

export default UserHub;
