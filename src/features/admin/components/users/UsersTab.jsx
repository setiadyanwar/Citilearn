import React, { useMemo } from 'react';
import {
    Crown, BadgeCheck, Pencil, Trash2, Eye,
    Lock, Unlock, ArrowUpDown
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Badge from '@/components/common/Badge';
import EmptyState from '@/components/common/EmptyState';
import UserProfile from '@/components/common/UserProfile';
import Pagination from '@/components/common/Pagination';
import ActionMenu from './ActionMenu';
import { MOCK_USERS, ROLE_BADGE_MAP } from './mockData';

const ITEMS_PER_PAGE = 5;

const SortableHead = ({ field, label, sortField, onSort }) => (
    <TableHead
        className="cursor-pointer hover:text-slate-700 transition-colors select-none"
        onClick={() => onSort(field)}
    >
        <div className="flex items-center gap-1.5">
            {label}
            <ArrowUpDown size={12} className={sortField === field ? 'text-primary' : 'text-slate-300'} />
        </div>
    </TableHead>
);

const UsersTab = ({ search, filterRole, sortField, onSort, currentPage, onPageChange }) => {
    const filtered = useMemo(() => {
        return MOCK_USERS
            .filter(u => filterRole === 'All' || u.role === filterRole)
            .filter(u =>
                !search ||
                u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase()) ||
                u.department.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => (a[sortField] || '').localeCompare(b[sortField] || ''));
    }, [filterRole, search, sortField]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const paginated = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <>
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/60 hover:bg-slate-50/60 border-slate-100">
                            <SortableHead field="name" label="User" sortField={sortField} onSort={onSort} />
                            <SortableHead field="nopeg" label="No. Peg" sortField={sortField} onSort={onSort} />
                            <SortableHead field="role" label="Role" sortField={sortField} onSort={onSort} />
                            <SortableHead field="department" label="Department" sortField={sortField} onSort={onSort} />
                            <SortableHead field="lastActive" label="Last active" sortField={sortField} onSort={onSort} />
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <EmptyState
                                        title="No users found"
                                        message="Try adjusting your search or filter."
                                    />
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map(user => (
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
                                                <p className="text-sm font-bold text-main truncate">{user.name}</p>
                                                <p className="text-xs text-slate-400 font-medium truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    {/* No. Peg */}
                                    <TableCell>
                                        <span className="text-xs font-mono font-medium text-slate-400">{user.nopeg}</span>
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
                                            { label: 'Remove', icon: Trash2, onClick: () => { }, danger: true },
                                        ]} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Footer: count + pagination */}
            <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-slate-400 font-medium">
                    Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} users
                </p>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    className="mt-0"
                />
            </div>
        </>
    );
};

export default UsersTab;
