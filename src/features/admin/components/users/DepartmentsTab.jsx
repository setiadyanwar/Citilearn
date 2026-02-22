import React, { useMemo } from 'react';
import { Plus, Users, Eye, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import ActionMenu from './ActionMenu';
import { MOCK_DEPARTMENTS } from './mockData';

const DepartmentsTab = ({ search }) => {
    const filtered = useMemo(
        () => MOCK_DEPARTMENTS.filter(d =>
            !search || d.name.toLowerCase().includes(search.toLowerCase())
        ),
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
                <p className="text-sm font-bold text-slate-400 group-hover:text-primary transition-colors">
                    Add Department
                </p>
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
                                <h3 className="font-bold text-main text-sm leading-tight">{dept.name}</h3>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">{dept.memberCount} members</p>
                            </div>
                        </div>
                        <ActionMenu actions={[
                            { label: 'Edit', icon: Pencil, onClick: () => { } },
                            { label: 'View Members', icon: Users, onClick: () => { } },
                            { label: 'Delete', icon: Trash2, onClick: () => { }, danger: true },
                        ]} />
                    </div>

                    <p className="text-xs font-medium text-slate-500 mb-4 leading-relaxed line-clamp-2">
                        {dept.description}
                    </p>

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

export default DepartmentsTab;
