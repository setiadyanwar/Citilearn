import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const EditorSidebar = ({
    type,
    points,
    onChange
}) => {
    return (
        <div className="space-y-6">
            {/* Configuration */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-none space-y-5">
                <h3 className="text-lg font-bold text-main border-b border-slate-100 pb-3">Configuration</h3>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-slate-700">Question Type</Label>
                        <Select
                            value={type}
                            onValueChange={(value) => onChange({ type: value })}
                        >
                            <SelectTrigger className="w-full bg-slate-50 border-none shadow-none focus:ring-1 focus:ring-primary/30 h-10 font-medium text-slate-700">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="border-slate-100 shadow-lg rounded-xl">
                                <SelectItem value="multiple-choice">Multiple Choice (Single)</SelectItem>
                                <SelectItem value="multiple-answer">Multiple Choice (Multiple)</SelectItem>
                                <SelectItem value="true-false">True / False</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-slate-700">Points</Label>
                        <Input
                            type="number"
                            min="1"
                            value={points}
                            onChange={(e) => onChange({ points: parseInt(e.target.value) || 0 })}
                            className="bg-slate-50 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary/30 h-10 font-medium text-slate-700"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorSidebar;
