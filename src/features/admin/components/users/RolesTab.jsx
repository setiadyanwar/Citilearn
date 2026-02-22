import React, { useState } from 'react';
import { Crown, BadgeCheck, Users, Shield, Trash2, Plus, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Badge from '@/components/common/Badge';
import { cn } from '@/lib/utils';
import RolePermissionsModal from './RolePermissionsModal';
import { MOCK_ROLES, ALL_PERMISSIONS } from './mockData';

// Group permissions by category for display
const groupedPermissions = ALL_PERMISSIONS.reduce((acc, p) => {
    if (!acc[p.group]) acc[p.group] = [];
    acc[p.group].push(p);
    return acc;
}, {});

const RolesTab = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const openPermissions = (role) => {
        setSelectedRole(role);
        setShowModal(true);
    };

    return (
        <>
            <RolePermissionsModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                role={selectedRole}
            />

            <div className="space-y-4">
                {MOCK_ROLES.map(role => (
                    <div
                        key={role.id}
                        id={`role-card-${role.id}`}
                        className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:shadow-slate-100 transition-all"
                    >
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            <div className="flex-1 min-w-0">
                                {/* Role identity row */}
                                <div className="flex items-center gap-3 mb-2">
                                    <Badge variant={role.badgeVariant} size="sm">
                                        {role.name === 'Admin' && <Crown size={11} />}
                                        {role.name === 'Instructor' && <BadgeCheck size={11} />}
                                        {role.name === 'Learner' && <Users size={11} />}
                                        {role.name}
                                    </Badge>
                                    <span className="text-xs font-medium text-tertiary">
                                        {role.userCount} users
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-secondary mb-4">{role.description}</p>

                                {/* Permissions display */}
                                <div className="space-y-4">
                                    {Object.entries(groupedPermissions).map(([group, perms]) => (
                                        <div key={group}>
                                            <p className="text-2xs font-bold text-tertiary  mb-2">
                                                {group}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {perms.map(p => {
                                                    const isOn = role.permissions.includes(p.key);
                                                    return (
                                                        <div
                                                            key={p.key}
                                                            className={cn(
                                                                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border',
                                                                isOn
                                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                                    : 'bg-slate-50 text-tertiary border-slate-100'
                                                            )}
                                                        >
                                                            {isOn
                                                                ? <Check size={11} strokeWidth={3} />
                                                                : <X size={11} strokeWidth={3} />
                                                            }
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
                                        className="rounded-xl h-9 px-4 gap-2 font-bold text-xs text-tertiary hover:text-red-500 hover:bg-red-50"
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
                    <Plus size={18} className="text-tertiary group-hover:text-primary transition-colors" />
                    <span className="text-sm font-bold text-tertiary group-hover:text-primary transition-colors">
                        Create Custom Role
                    </span>
                </button>
            </div>
        </>
    );
};

export default RolesTab;
