import React, { useState } from 'react';
import { Users, Building2, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatCard from '@/features/dashboard/components/StatCard';
import MainSearchBar from '@/features/dashboard/components/MainSearchBar';
import Tabs from '@/components/common/Tabs';
import AdminPageShell from '../components/layout/AdminPageShell';
import ManagementHeader from '../components/layout/ManagementHeader';
import UsersTab from '../components/users/UsersTab';
import DepartmentsTab from '../components/users/DepartmentsTab';
import RolesTab from '../components/users/RolesTab';
import { MOCK_USERS, MOCK_DEPARTMENTS, MOCK_ROLES } from '../components/users/mockData';

const TABS = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'roles', label: 'Roles & Permissions', icon: Shield },
];

const STATS = [
    { label: 'Total Users', getValue: () => MOCK_USERS.length, getTrend: () => `${MOCK_USERS.filter(u => u.status === 'Active').length} active` },
    { label: 'Departments', getValue: () => MOCK_DEPARTMENTS.length, getTrend: () => 'across all units' },
    { label: 'Roles Defined', getValue: () => MOCK_ROLES.length, getTrend: () => 'with RBAC rules' },
    { label: 'Suspended', getValue: () => MOCK_USERS.filter(u => u.status === 'Suspended').length, getTrend: () => 'need attention' },
];

const UserHub = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [search, setSearch] = useState('');
    const [filterRole, setFilterRole] = useState('All');
    const [sortField, setSortField] = useState('name');
    const [currentPage, setCurrentPage] = useState(1);

    const handleTabChange = (id) => {
        setActiveTab(id);
        setSearch('');
        setFilterRole('All');
        setCurrentPage(1);
    };

    const handleSearch = (e) => { setSearch(e.target.value); setCurrentPage(1); };
    const handleRoleFilter = (v) => { setFilterRole(v); setCurrentPage(1); };
    const handleSort = (field) => { setSortField(field); setCurrentPage(1); };

    return (
        <AdminPageShell>
            <ManagementHeader
                title="User Hub"
                description="Manage users, departments, and role-based access control (RBAC)."
            >
                <Button size="sm" variant="outline" className="h-9 px-4 gap-2 font-bold text-sm rounded-xl shadow-none">
                    <RefreshCw size={15} />
                    Refresh
                </Button>
            </ManagementHeader>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {STATS.map(stat => (
                    <StatCard
                        key={stat.label}
                        variant="admin"
                        label={stat.label}
                        value={stat.getValue()}
                        trend={stat.getTrend()}
                    />
                ))}
            </div>

            {/* ── Toolbar: Tabs | [Role filter] [Search] ── */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                {/* Tabs — grows to fill space */}
                <div className="flex-1">
                    <Tabs tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />
                </div>

                {/* Controls — only shown per tab */}
                <div className="flex items-center gap-2">
                    {/* Role filter — Users tab only */}
                    {activeTab === 'users' && (
                        <Select value={filterRole} onValueChange={handleRoleFilter}>
                            <SelectTrigger id="filter-role" className="h-9 w-32 rounded-xl text-xs font-bold">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Roles</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Instructor">Instructor</SelectItem>
                                <SelectItem value="Learner">Learner</SelectItem>
                            </SelectContent>
                        </Select>
                    )}

                    {/* Search — Users & Departments only */}
                    {activeTab !== 'roles' && (
                        <div className="w-52">
                            <MainSearchBar
                                searchQuery={search}
                                handleSearch={handleSearch}
                                placeholder={activeTab === 'users' ? 'Search users...' : 'Search departments...'}
                                variant="compact"
                                hideButton
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'users' && (
                <UsersTab
                    search={search}
                    filterRole={filterRole}
                    sortField={sortField}
                    onSort={handleSort}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            )}
            {activeTab === 'departments' && <DepartmentsTab search={search} />}
            {activeTab === 'roles' && <RolesTab />}
        </AdminPageShell>
    );
};

export default UserHub;
