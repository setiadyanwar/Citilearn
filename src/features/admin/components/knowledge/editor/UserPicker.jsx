import React, { useState } from 'react';
import { Search, Check, ChevronsUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MOCK_USERS } from '../../users/mockData';
import UserProfile from '@/components/common/UserProfile';

const UserPicker = ({
    selectedName,
    onChange,
    label = "Author",
    placeholder = "Select Author"
}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredUsers = MOCK_USERS.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (user) => {
        onChange({
            name: user.name,
            role: user.role
        });
        setOpen(false);
        setSearch("");
    };

    return (
        <div className="flex flex-col gap-2">
            <Label className="text-xs font-bold text-slate-500">{label}</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full h-11 justify-between rounded-xl bg-white border-slate-200 font-medium text-slate-700 hover:bg-slate-50 focus:ring-0 shadow-none px-3"
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            <UserProfile
                                name={selectedName || "Guest User"}
                                size="xs"
                                shape="circle"
                                className="shrink-0"
                            />
                            <span className="truncate">{selectedName || placeholder}</span>
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0 rounded-xl shadow-lg border-slate-100" align="start">
                    <div className="flex items-center border-b border-slate-100 p-3 bg-slate-50/50">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-40 text-slate-400" />
                        <input
                            placeholder="Search user by name or email..."
                            className="flex h-8 w-full rounded-md bg-transparent text-sm outline-none border-none focus:ring-0 placeholder:text-slate-400 font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto p-1 custom-scrollbar">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className={cn(
                                    "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm transition-colors",
                                    selectedName === user.name ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50 hover:text-main"
                                )}
                                onClick={() => handleSelect(user)}
                            >
                                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                                    <UserProfile
                                        name={user.name}
                                        size="sm"
                                        shape="circle"
                                        className="shrink-0"
                                    />
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="font-medium truncate">{user.name}</span>
                                        <span className="text-[10px] text-slate-400 truncate leading-none mt-1 tracking-tight font-normal">
                                            {user.role} • {user.department}
                                        </span>
                                    </div>
                                </div>
                                {selectedName === user.name && (
                                    <Check className="h-4 w-4 text-emerald-600 shrink-0 ml-2" />
                                )}
                            </div>
                        ))}

                        {filteredUsers.length === 0 && (
                            <div className="py-6 text-center text-sm text-slate-400 font-medium">
                                No users found.
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default UserPicker;
