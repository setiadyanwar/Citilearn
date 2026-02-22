import React from 'react';
import { Building, Users, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserProfile from '@/components/common/UserProfile';
import { cn } from '@/lib/utils';

const CurrentAccessList = ({ assignments, onRemove }) => {
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-main">Current Access</h3>
                        <p className="text-sm text-secondary">Manage who currently has access to this course.</p>
                    </div>
                    <div className="text-sm font-bold text-main bg-gray-50 px-4 py-2 rounded-xl">
                        {assignments.reduce((sum, a) => sum + a.userCount, 0)} Total Users
                    </div>
                </div>

                {assignments.length > 0 ? (
                    <div className="space-y-3">
                        {assignments.map((assignment) => {
                            const Icon = assignment.icon;
                            const isIndividual = assignment.type === 'individual';

                            return (
                                <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        {isIndividual ? (
                                            <UserProfile
                                                name={assignment.name}
                                                size="sm"
                                                shape="circle"
                                                className="shrink-0"
                                            />
                                        ) : (
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                                assignment.type === 'department' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                                            )}>
                                                <Icon size={24} />
                                            </div>
                                        )}
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
                                            onClick={() => onRemove(assignment.id)}
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
                            <Users className="text-tertiary" size={32} />
                        </div>
                        <h4 className="text-main font-bold mb-1">No assignments yet</h4>
                        <p className="text-sm text-secondary mb-4">Start by assigning users or groups to this course</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrentAccessList;
