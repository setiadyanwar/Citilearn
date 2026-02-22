import React, { useState } from 'react';
import { X, Plus, Hash } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Badge from '@/components/common/Badge';
import { cn } from "@/lib/utils";

const TagInput = ({ tags = [], onChange, label = "Course Tags", placeholder = "Add a tag and press Enter..." }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                onChange([...tags, inputValue.trim()]);
            }
            setInputValue('');
        } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    };

    const removeTag = (indexToRemove) => {
        onChange(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <Label className="text-sm md:text-base font-bold text-main tracking-tight">{label}</Label>
                <span className="text-3xs text-slate-400 font-bold uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                    {tags.length} Tags
                </span>
            </div>

            <div className={cn(
                "min-h-14 p-2 rounded-2xl bg-white border border-slate-200 focus-within:ring-2 focus-within:ring-primary/10 focus-within:border-primary/30 transition-all flex flex-wrap items-center gap-2",
                tags.length > 0 ? "pt-3 pb-3 px-3" : "px-6"
            )}>
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="group flex items-center gap-1.5 bg-primary/5 text-primary border border-primary/10 px-3 py-1.5 rounded-xl hover:bg-primary/10 transition-colors animate-in fade-in zoom-in duration-200"
                    >
                        <Hash size={12} className="text-primary/40" />
                        <span className="text-sm font-bold tracking-tight">{tag}</span>
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="p-0.5 hover:bg-primary/20 rounded-full transition-colors cursor-pointer"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}

                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={tags.length === 0 ? placeholder : "Add more..."}
                    className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm md:text-base font-medium placeholder:text-slate-400 h-8"
                />
            </div>
            <p className="text-xs text-slate-400 font-medium ml-1">
                Tags help learners find this course through topic filters. Press <kbd className="font-sans px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-500 font-bold">Enter</kbd> to add.
            </p>
        </div>
    );
};

export default TagInput;
