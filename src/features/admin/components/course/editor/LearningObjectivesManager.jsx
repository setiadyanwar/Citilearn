import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

/**
 * Reusable component to manage a list of learning objectives
 */
const LearningObjectivesManager = ({
    objectives = [],
    onChange,
    label = "Learning Objectives",
    description = "What knowledge/skills will the students gain?",
    placeholder = "e.g., Implement hazard identification and risk assessment...",
    className
}) => {

    const handleAdd = () => {
        onChange([...objectives, ""]);
    };

    const handleUpdate = (index, value) => {
        const newObjectives = [...objectives];
        newObjectives[index] = value;
        onChange(newObjectives);
    };

    const handleRemove = (index) => {
        const newObjectives = objectives.filter((_, i) => i !== index);
        onChange(newObjectives);
    };

    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex flex-row items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
                <div className="space-y-1">
                    <Label className="text-sm md:text-base font-bold text-foreground">{label}</Label>
                    <p className="text-xs text-secondary font-medium">{description}</p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAdd}
                    className="h-8 px-3 rounded-lg border-primary/20 text-primary hover:bg-primary/5 font-bold text-xs flex items-center gap-1.5 shrink-0"
                >
                    <Plus size={14} />
                    Add Objective
                </Button>
            </div>

            {objectives.length > 0 ? (
                <div className="space-y-3">
                    {objectives.map((objective, index) => (
                        <div key={index} className="group relative flex items-start gap-3 animate-in fade-in slide-in-from-top-1 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-slate-200 transition-all">
                            <div className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" />
                            <Input
                                value={objective}
                                onChange={(e) => handleUpdate(index, e.target.value)}
                                placeholder={placeholder}
                                className="border-none bg-transparent h-auto p-0 focus-visible:ring-0 text-sm font-medium shadow-none placeholder:text-slate-400 leading-relaxed"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemove(index)}
                                className="h-7 w-7 rounded-lg text-slate-300 hover:text-destructive hover:bg-destructive/5 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                            >
                                <Trash2 size={14} />
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    onClick={handleAdd}
                    className="h-24 rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-slate-200 hover:bg-slate-50/50 transition-all group"
                >
                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors text-slate-400">
                        <Plus size={20} />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">Add your first objective</span>
                </div>
            )}
        </div>
    );
};

export default LearningObjectivesManager;
