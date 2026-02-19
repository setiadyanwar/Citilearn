import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ALL_PERMISSIONS } from './mockData';

const RolePermissionsModal = ({ isOpen, onClose, role }) => {
    const [permissions, setPermissions] = useState(role?.permissions || []);

    useEffect(() => {
        setPermissions(role?.permissions || []);
    }, [role]);

    if (!isOpen || !role) return null;

    const grouped = ALL_PERMISSIONS.reduce((acc, p) => {
        if (!acc[p.group]) acc[p.group] = [];
        acc[p.group].push(p);
        return acc;
    }, {});

    const toggle = (key) =>
        setPermissions(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 fade-in duration-200"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Edit Permissions — {role.name}
                        </h2>
                        <p className="text-sm text-slate-500 mt-0.5">Toggle capabilities for this role.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 pb-4 space-y-5 max-h-[60vh] overflow-y-auto">
                    {Object.entries(grouped).map(([group, perms]) => (
                        <div key={group}>
                            <p className="text-2xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                                {group}
                            </p>
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

                {/* Footer */}
                <div className="flex gap-3 p-6 pt-4 border-t border-slate-100">
                    <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl h-11 font-bold">
                        Cancel
                    </Button>
                    <Button onClick={onClose} className="flex-1 rounded-xl h-11 font-bold gap-2">
                        <Check size={15} />
                        Save Permissions
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RolePermissionsModal;
