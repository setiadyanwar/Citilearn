import React, { useState, useMemo } from 'react';
import {
    Users, Building2, Shield, Search, Plus, MoreHorizontal,
    UserCheck, Mail, Download, Filter, ChevronDown, X,
    Check, Crown, Pencil, Trash2, Eye, Lock, Unlock,
    BadgeCheck, AlertCircle, ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Tabs from '@/components/common/Tabs';
import AdminPageShell from '../components/layout/AdminPageShell';
import ManagementHeader from '../components/layout/ManagementHeader';
import UserProfile from '@/components/common/UserProfile';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────
const MOCK_USERS = [
    { id: 1, name: 'Budi Pratama', email: 'budi.pratama@citilink.co.id', role: 'Admin', department: 'Human Capital', status: 'Active', lastActive: '2 hours ago', avatar: null, joined: '2024-01-15' },
    { id: 2, name: 'Siti Nurhaliza', email: 'siti.nurhaliza@citilink.co.id', role: 'Instructor', department: 'Pilot', status: 'Active', lastActive: '1 day ago', avatar: null, joined: '2024-02-20' },
    { id: 3, name: 'Ahmad Yani', email: 'ahmad.yani@citilink.co.id', role: 'Learner', department: 'Maintenance', status: 'Active', lastActive: '3 days ago', avatar: null, joined: '2024-03-10' },
    { id: 4, name: 'Dewi Lestari', email: 'dewi.lestari@citilink.co.id', role: 'Learner', department: 'Safety', status: 'Inactive', lastActive: '2 weeks ago', avatar: null, joined: '2023-11-05' },
    { id: 5, name: 'Riko Valentino', email: 'riko.valentino@citilink.co.id', role: 'Instructor', department: 'Ground Ops', status: 'Active', lastActive: '5 hours ago', avatar: null, joined: '2024-01-28' },
    { id: 6, name: 'Maya Kusuma', email: 'maya.kusuma@citilink.co.id', role: 'Learner', department: 'Cabin Crew', status: 'Active', lastActive: 'Just now', avatar: null, joined: '2024-04-01' },
    { id: 7, name: 'Hendri Saputra', email: 'hendri.saputra@citilink.co.id', role: 'Learner', department: 'Pilot', status: 'Suspended', lastActive: '1 month ago', avatar: null, joined: '2023-08-14' },
    { id: 8, name: 'Rina Wahyuni', email: 'rina.wahyuni@citilink.co.id', role: 'Admin', department: 'Human Capital', status: 'Active', lastActive: '30 minutes ago', avatar: null, joined: '2023-06-20' },
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
        userCount: 3, color: 'text-violet-600 bg-violet-50 border-violet-200',
        permissions: ['manage_users', 'manage_courses', 'manage_roles', 'manage_departments', 'view_reports', 'view_grading', 'publish_courses'],
    },
    {
        id: 2, name: 'Instructor', description: 'Create & manage courses, grade learners.',
        userCount: 28, color: 'text-blue-600 bg-blue-50 border-blue-200',
        permissions: ['manage_courses', 'view_grading', 'publish_courses', 'view_reports'],
    },
    {
        id: 3, name: 'Learner', description: 'Access and complete assigned courses only.',
        userCount: 1215, color: 'text-slate-600 bg-slate-50 border-slate-200',
        permissions: ['view_courses'],
    },
];

const ALL_PERMISSIONS = [
    { key: 'manage_users', label: 'Manage Users', icon: Users, group: 'Users' },
    { key: 'manage_roles', label: 'Manage Roles', icon: Shield, group: 'Users' },
    { key: 'manage_departments', label: 'Manage Departments', icon: Building2, group: 'Users' },
    { key: 'manage_courses', label: 'Manage Courses', icon: Pencil, group: 'Courses' },
    { key: 'publish_courses', label: 'Publish Courses', icon: BadgeCheck, group: 'Courses' },
    { key: 'view_courses', label: 'View Courses', icon: Eye, group: 'Courses' },
    { key: 'view_grading', label: 'View & Grade Submissions', icon: Check, group: 'Grading' },
    { key: 'view_reports', label: 'View Analytics & Reports', icon: ArrowUpDown, group: 'Reports' },
];

// ─────────────────────────────────────────────────────────────────
// SUBCOMPONENTS
// ─────────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
    const map = {
        Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
        Suspended: 'bg-red-50 text-red-600 border-red-200',
    };
    return (
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border', map[status] || map.Inactive)}>
            <span className={cn('w-1.5 h-1.5 rounded-full', {
                'bg-emerald-500': status === 'Active',
                'bg-slate-400': status === 'Inactive',
                'bg-red-500': status === 'Suspended',
            })} />
            {status}
        </span>
    );
};

const RoleBadge = ({ role }) => {
    const map = {
        Admin: 'bg-violet-50 text-violet-700 border-violet-200',
        Instructor: 'bg-blue-50 text-blue-700 border-blue-200',
        Learner: 'bg-slate-50 text-slate-500 border-slate-200',
    };
    return (
        <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold border', map[role] || map.Learner)}>
            {role === 'Admin' && <Crown size={10} />}
            {role === 'Instructor' && <BadgeCheck size={10} />}
            {role}
        </span>
    );
};

const ActionMenu = ({ actions }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative" onBlur={() => setTimeout(() => setOpen(false), 150)}>
            <button
                id={`action-menu-${Math.random()}`}
                onClick={() => setOpen(o => !o)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
                <MoreHorizontal size={16} />
            </button>
            {open && (
                <div className="absolute right-0 top-8 z-50 w-44 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/60 py-1.5 divide-y divide-slate-50">
                    {actions.map((action) => (
                        <button
                            key={action.label}
                            onClick={() => { action.onClick(); setOpen(false); }}
                            className={cn('w-full flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium transition-colors', action.danger ? 'text-red-500 hover:bg-red-50' : 'text-slate-700 hover:bg-slate-50')}
                        >
                            {action.icon && <action.icon size={14} />}
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────
// MODALS
// ─────────────────────────────────────────────────────────────────

const InviteUserModal = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({ name: '', email: '', role: 'Learner', department: '' });
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md animate-in zoom-in-95 fade-in duration-200" onClick={e => e.stopPropagation()}>
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
                        <Input placeholder="e.g. Budi Pratama" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Email Address</label>
                        <Input placeholder="name@citilink.co.id" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="rounded-xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Role</label>
                            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                                <option value="Admin">Admin</option>
                                <option value="Instructor">Instructor</option>
                                <option value="Learner">Learner</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Department</label>
                            <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                                <option value="">Select...</option>
                                {MOCK_DEPARTMENTS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                            </select>
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

const RolePermissionsModal = ({ isOpen, onClose, role }) => {
    const [permissions, setPermissions] = useState(role?.permissions || []);
    if (!isOpen || !role) return null;
    const grouped = ALL_PERMISSIONS.reduce((acc, p) => {
        if (!acc[p.group]) acc[p.group] = [];
        acc[p.group].push(p);
        return acc;
    }, {});
    const toggle = (key) => setPermissions(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 fade-in duration-200" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 pb-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Edit Permissions — {role.name}</h2>
                        <p className="text-sm text-slate-500 mt-0.5">Toggle which capabilities this role has access to.</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={18} />
                    </button>
                </div>
                <div className="px-6 pb-4 space-y-5 max-h-[60vh] overflow-y-auto">
                    {Object.entries(grouped).map(([group, perms]) => (
                        <div key={group}>
                            <p className="text-2xs font-bold text-slate-400 uppercase tracking-widest mb-2">{group}</p>
                            <div className="space-y-2">
                                {perms.map(p => {
                                    const isOn = permissions.includes(p.key);
                                    return (
                                        <button key={p.key} onClick={() => toggle(p.key)} className={cn('w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left', isOn ? 'border-primary/30 bg-primary/5' : 'border-slate-100 hover:border-slate-200 bg-white')}>
                                            <div className="flex items-center gap-3">
                                                <div className={cn('p-1.5 rounded-lg', isOn ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400')}>
                                                    <p.icon size={14} />
                                                </div>
                                                <span className={cn('text-sm font-semibold', isOn ? 'text-slate-800' : 'text-slate-500')}>{p.label}</span>
                                            </div>
                                            <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all', isOn ? 'bg-primary border-primary' : 'border-slate-300')}>
                                                {isOn && <Check size={11} className="text-white" strokeWidth={3} />}
                                            </div>
                                        </button>
                                    );
                                })}
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
// TAB VIEWS
// ─────────────────────────────────────────────────────────────────

const UsersTab = ({ search }) => {
    const [filter, setFilter] = useState('All');
    const [showInvite, setShowInvite] = useState(false);
    const [sortField, setSortField] = useState('name');

    const statusFilters = ['All', 'Active', 'Inactive', 'Suspended'];

    const filtered = useMemo(() => {
        return MOCK_USERS
            .filter(u => filter === 'All' || u.status === filter)
            .filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.department.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => a[sortField]?.localeCompare(b[sortField]));
    }, [filter, search, sortField]);

    return (
        <>
            <InviteUserModal isOpen={showInvite} onClose={() => setShowInvite(false)} />

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl">
                    {statusFilters.map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={cn('px-3 py-1.5 rounded-lg text-xs font-bold transition-all', filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700')}>
                            {f}
                            <span className={cn('ml-1.5 text-2xs px-1 py-0.5 rounded-full', filter === f ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-400')}>
                                {f === 'All' ? MOCK_USERS.length : MOCK_USERS.filter(u => u.status === f).length}
                            </span>
                        </button>
                    ))}
                </div>

                <Button id="invite-user-btn" onClick={() => setShowInvite(true)} className="rounded-xl h-9 px-4 gap-2 font-bold text-sm">
                    <Plus size={15} />
                    Invite User
                </Button>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] px-5 py-3 border-b border-slate-100 bg-slate-50/60">
                    {[['name', 'User'], ['role', 'Role'], ['department', 'Department'], ['status', 'Status']].map(([field, label]) => (
                        <button key={field} onClick={() => setSortField(field)} className="flex items-center gap-1 text-2xs font-bold text-slate-400 uppercase tracking-wider hover:text-slate-700 transition-colors text-left">
                            {label}
                            <ArrowUpDown size={10} className={sortField === field ? 'text-primary' : ''} />
                        </button>
                    ))}
                    <div className="text-2xs font-bold text-slate-400 uppercase tracking-wider">Actions</div>
                </div>

                {/* Table Rows */}
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                        <Users size={32} className="mb-3 opacity-30" />
                        <p className="text-sm font-medium">No users found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {filtered.map(user => (
                            <div key={user.id} id={`user-row-${user.id}`} className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] px-5 py-4 items-center hover:bg-slate-50/60 transition-colors group">
                                {/* User */}
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary/20 to-primary/40 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                                        <p className="text-xs text-slate-400 font-medium truncate">{user.email}</p>
                                    </div>
                                </div>
                                {/* Role */}
                                <div><RoleBadge role={user.role} /></div>
                                {/* Department */}
                                <p className="text-sm font-medium text-slate-600 truncate pr-2">{user.department}</p>
                                {/* Status */}
                                <div><StatusBadge status={user.status} /></div>
                                {/* Actions */}
                                <ActionMenu actions={[
                                    { label: 'Edit User', icon: Pencil, onClick: () => { } },
                                    { label: 'View Profile', icon: Eye, onClick: () => { } },
                                    { label: user.status === 'Suspended' ? 'Unsuspend' : 'Suspend', icon: user.status === 'Suspended' ? Unlock : Lock, onClick: () => { } },
                                    { label: 'Remove User', icon: Trash2, onClick: () => { }, danger: true },
                                ]} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer hint */}
            <p className="text-xs text-slate-400 font-medium mt-4 text-center">
                Showing {filtered.length} of {MOCK_USERS.length} users
            </p>
        </>
    );
};

const DepartmentsTab = ({ search }) => {
    const filtered = useMemo(() => MOCK_DEPARTMENTS.filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase())), [search]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {/* Add New Card */}
            <button id="add-department-btn" className="group border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-primary/40 hover:bg-primary/5 transition-all min-h-[160px]">
                <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <Plus size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm font-bold text-slate-400 group-hover:text-primary transition-colors">Add Department</p>
            </button>

            {filtered.map(dept => (
                <div key={dept.id} id={`dept-card-${dept.id}`} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:shadow-slate-100 transition-all group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', dept.color)}>
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
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                            <Users size={13} className="text-slate-300" />
                            {dept.memberCount} members
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                            <Eye size={13} className="text-slate-300" />
                            {dept.courseCount} courses assigned
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const RolesTab = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const openPermissions = (role) => {
        setSelectedRole(role);
        setShowModal(true);
    };

    const groupedPerms = ALL_PERMISSIONS.reduce((acc, p) => {
        if (!acc[p.group]) acc[p.group] = [];
        acc[p.group].push(p);
        return acc;
    }, {});

    return (
        <>
            <RolePermissionsModal isOpen={showModal} onClose={() => setShowModal(false)} role={selectedRole} />
            <div className="space-y-4">
                {MOCK_ROLES.map(role => (
                    <div key={role.id} id={`role-card-${role.id}`} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:shadow-slate-100 transition-all">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            {/* Role info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border', role.color)}>
                                        {role.name === 'Admin' && <Crown size={11} />}
                                        {role.name === 'Instructor' && <BadgeCheck size={11} />}
                                        {role.name === 'Learner' && <Users size={11} />}
                                        {role.name}
                                    </span>
                                    <span className="text-xs font-medium text-slate-400">{role.userCount} users</span>
                                </div>
                                <p className="text-sm font-medium text-slate-500 mb-4">{role.description}</p>

                                {/* Permissions grid */}
                                <div className="space-y-3">
                                    {Object.entries(groupedPerms).map(([group, perms]) => {
                                        const activePerms = perms.filter(p => role.permissions.includes(p.key));
                                        if (activePerms.length === 0) return null;
                                        return (
                                            <div key={group}>
                                                <p className="text-2xs font-bold text-slate-400 uppercase tracking-widest mb-2">{group}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {perms.map(p => {
                                                        const isOn = role.permissions.includes(p.key);
                                                        return (
                                                            <div key={p.key} className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border', isOn ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-300 border-slate-100')}>
                                                                {isOn ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                                                                {p.label}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex md:flex-col gap-2 shrink-0">
                                <Button id={`edit-permissions-${role.id}`} onClick={() => openPermissions(role)} variant="outline" size="sm" className="rounded-xl h-9 px-4 gap-2 font-bold text-xs">
                                    <Shield size={13} />
                                    Edit Permissions
                                </Button>
                                {role.name !== 'Learner' && (
                                    <Button variant="ghost" size="sm" className="rounded-xl h-9 px-4 gap-2 font-bold text-xs text-slate-400 hover:text-red-500 hover:bg-red-50">
                                        <Trash2 size={13} />
                                        Delete
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add Custom Role */}
                <button id="add-role-btn" className="group w-full border-2 border-dashed border-slate-200 rounded-2xl p-5 flex items-center justify-center gap-3 hover:border-primary/40 hover:bg-primary/5 transition-all">
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

    const STATS = [
        { label: 'Total Users', value: MOCK_USERS.length, sub: `${MOCK_USERS.filter(u => u.status === 'Active').length} active`, icon: Users, color: 'text-blue-600 bg-blue-50' },
        { label: 'Departments', value: MOCK_DEPARTMENTS.length, sub: 'across all units', icon: Building2, color: 'text-violet-600 bg-violet-50' },
        { label: 'Roles Defined', value: MOCK_ROLES.length, sub: 'with RBAC rules', icon: Shield, color: 'text-amber-600 bg-amber-50' },
        { label: 'Suspended', value: MOCK_USERS.filter(u => u.status === 'Suspended').length, sub: 'need attention', icon: AlertCircle, color: 'text-red-600 bg-red-50' },
    ];

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

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {STATS.map(stat => (
                    <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4">
                        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', stat.color)}>
                            <stat.icon size={18} />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900 leading-none">{stat.value}</p>
                            <p className="text-xs font-bold text-slate-500 mt-0.5">{stat.label}</p>
                            <p className="text-2xs text-slate-400 font-medium">{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tab Bar + Search Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
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
                        <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            <X size={13} />
                        </button>
                    )}
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'users' && <UsersTab search={search} />}
            {activeTab === 'departments' && <DepartmentsTab search={search} />}
            {activeTab === 'roles' && <RolesTab />}
        </AdminPageShell>
    );
};

export default UserHub;
