import React, { useState } from 'react';
import { Search, Plus, Check, ChevronsUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * Reusable Category Picker with Search and Add functionality
 */
const CategoryPicker = ({
    value,
    onChange,
    categories,
    onAddCategory,
    label = "Category",
    placeholder = "Select Category",
    className
}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredCategories = categories.filter(c =>
        c.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (cat) => {
        onChange(cat);
        setOpen(false);
        setSearch("");
    };

    const handleAddNew = () => {
        if (search) {
            const formatted = search.charAt(0).toUpperCase() + search.slice(1);
            onAddCategory(formatted);
            onChange(formatted);
            setSearch("");
            setOpen(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <div className="space-y-0.5">
                <Label className="text-sm font-bold text-main tracking-tight">{label}</Label>
                <p className="text-xs text-secondary font-medium">Classify your course for better discovery.</p>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full h-12 justify-between rounded-xl bg-white border-slate-200 font-medium text-main hover:bg-slate-50 focus:ring-0 focus-visible:ring-0"
                    >
                        {value ? value : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0 rounded-xl shadow-sm border-slate-200" align="start">
                    <div className="flex items-center border-b border-slate-100 p-3 bg-slate-50/50">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-40 text-tertiary" />
                        <input
                            placeholder="Search or add category..."
                            className="flex h-8 w-full rounded-md bg-transparent text-sm outline-none border-none focus:ring-0 placeholder:text-tertiary"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddNew();
                            }}
                        />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto p-1">
                        {filteredCategories.map((cat) => (
                            <div
                                key={cat}
                                className={cn(
                                    "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm font-medium outline-none transition-colors",
                                    value === cat ? "bg-primary/10 text-primary" : "text-secondary hover:bg-slate-100/80 hover:text-main"
                                )}
                                onClick={() => handleSelect(cat)}
                            >
                                <div className="flex items-center gap-2 flex-1">
                                    <div className={cn(
                                        "h-2 w-2 rounded-full",
                                        value === cat ? "bg-primary" : "bg-slate-300"
                                    )} />
                                    {cat}
                                </div>
                                {value === cat && (
                                    <Check className="h-4 w-4 text-primary" />
                                )}
                            </div>
                        ))}

                        {search && !categories.some(c => c.toLowerCase() === search.toLowerCase()) && (
                            <div
                                className="flex cursor-pointer items-center rounded-lg px-3 py-3 text-sm font-bold text-primary bg-primary/5 hover:bg-primary/10 transition-all border border-dashed border-primary/20 mt-1 mx-1 mb-1"
                                onClick={handleAddNew}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add "{search}"
                            </div>
                        )}

                        {filteredCategories.length === 0 && !search && (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                No category found.
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default CategoryPicker;
