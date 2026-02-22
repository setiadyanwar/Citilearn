import React, { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOCK_DEPARTMENTS } from './mockData';

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
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-0">
                    <div>
                        <h2 className="text-lg font-bold text-main">Invite User</h2>
                        <p className="text-sm text-slate-500 mt-0.5">Send an invitation to join CitiLearn.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
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

                {/* Footer */}
                <div className="flex gap-3 p-6 pt-0">
                    <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl h-11 font-bold">
                        Cancel
                    </Button>
                    <Button className="flex-1 rounded-xl h-11 font-bold gap-2">
                        <Mail size={15} />
                        Send Invite
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InviteUserModal;
