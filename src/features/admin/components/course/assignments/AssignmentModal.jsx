import React, { useState } from 'react';
import { Search, X, Users, Building, UserCheck } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import UserProfile from '@/components/common/UserProfile';
import { cn } from '@/lib/utils';

const AssignmentModal = ({
    isOpen,
    onClose,
    onAssign,
    availableUsers = [],
    availableDepartments = [],
    availableRoles = []
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [assignmentType, setAssignmentType] = useState('individual'); // individual, department, role
    const [selectedItems, setSelectedItems] = useState([]);

    if (!isOpen) return null;

    const getFilteredItems = () => {
        let items = [];
        if (assignmentType === 'individual') items = availableUsers;
        else if (assignmentType === 'department') items = availableDepartments;
        else if (assignmentType === 'role') items = availableRoles;

        if (!searchQuery) return items;

        const lowerQuery = searchQuery.toLowerCase();
        return items.filter(item =>
            item.name.toLowerCase().includes(lowerQuery) ||
            (item.email && item.email.toLowerCase().includes(lowerQuery))
        );
    };

    const filteredItems = getFilteredItems();
    const allFilteredSelected = filteredItems.length > 0 && filteredItems.every(item => selectedItems.includes(item.id));

    const toggleSelection = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            const newSelected = [...selectedItems];
            filteredItems.forEach(item => {
                if (!newSelected.includes(item.id)) {
                    newSelected.push(item.id);
                }
            });
            setSelectedItems(newSelected);
        } else {
            const idsToRemove = filteredItems.map(item => item.id);
            setSelectedItems(selectedItems.filter(id => !idsToRemove.includes(id)));
        }
    };

    const handleAssign = () => {
        onAssign(selectedItems, assignmentType);
        onClose();
        setSelectedItems([]);
        setSearchQuery('');
    };

    const handleClose = () => {
        onClose();
        console.log("Closing modal, resetting state");
        setSelectedItems([]);
        setSearchQuery('');
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-main">Assign to Course</h2>
                        <p className="text-sm text-secondary">Select users, departments, or roles</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 text-gray-400 hover:text-main hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Assignment Type Tabs */}
                <div className="px-6 pt-4 border-b border-gray-100">
                    <div className="flex gap-2">
                        {[
                            { id: 'individual', label: 'Individual Users', icon: UserCheck },
                            { id: 'department', label: 'Departments', icon: Building },
                            { id: 'role', label: 'Roles', icon: Users }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setAssignmentType(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all",
                                    assignmentType === tab.id
                                        ? "border-primary text-primary"
                                        : "border-transparent text-secondary hover:text-main"
                                )}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search & Select All */}
                <div className="p-6 border-b border-gray-100 space-y-4">
                    <Input
                        icon={Search}
                        placeholder={`Search ${assignmentType}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-gray-50 border-gray-200 focus:border-primary"
                    />

                    <div className="flex items-center gap-2 px-1">
                        <Checkbox
                            checked={allFilteredSelected}
                            onCheckedChange={handleSelectAll}
                            disabled={filteredItems.length === 0}
                            className="border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <span className="text-sm font-medium text-slate-600">Select All</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-1.5 custom-scrollbar">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => toggleSelection(item.id)}
                            className={cn(
                                "group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border",
                                selectedItems.includes(item.id)
                                    ? "bg-primary/5 border-primary/20"
                                    : "bg-white border-slate-100 hover:border-slate-200"
                            )}
                        >
                            <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                                <Checkbox
                                    checked={selectedItems.includes(item.id)}
                                    onCheckedChange={() => toggleSelection(item.id)}
                                    className="border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                />
                            </div>

                            {assignmentType === 'individual' ? (
                                <UserProfile
                                    name={item.name}
                                    size="sm"
                                    shape="circle"
                                    className="shrink-0"
                                />
                            ) : (
                                <div className={cn(
                                    "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border",
                                    assignmentType === 'department'
                                        ? "bg-blue-100 text-blue-600 border-blue-200"
                                        : "bg-purple-100 text-purple-600 border-purple-200"
                                )}>
                                    {assignmentType === 'department' ? <Building size={20} /> : <Users size={20} />}
                                </div>
                            )}

                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-main text-base truncate">{item.name}</h4>
                                <p className={cn(
                                    "truncate",
                                    assignmentType === 'individual'
                                        ? "text-sm"
                                        : "text-xs font-medium uppercase tracking-wider text-slate-500"
                                )}>
                                    {assignmentType === 'individual' ? (
                                        <>
                                            <span className="text-slate-500 font-medium">{item.role}</span>
                                            <span className="mx-1.5 text-slate-300">•</span>
                                            <span className="text-slate-400">{item.department}</span>
                                        </>
                                    ) : (
                                        `${item.userCount} Users ${assignmentType === 'department' ? 'in this department' : 'with this role'}`
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}

                    {filteredItems.length === 0 && (
                        <div className="text-center py-8 text-slate-400 text-sm">
                            No {assignmentType} found matching "{searchQuery}"
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-white">
                    <div className="text-sm text-secondary">
                        {selectedItems.length} selected
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="bg-white border-gray-200 hover:bg-gray-50 text-secondary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAssign}
                            disabled={selectedItems.length === 0}
                            className="bg-citilearn-green hover:bg-emerald-600 text-white"
                        >
                            Assign {selectedItems.length > 0 && `(${selectedItems.length})`}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentModal;
