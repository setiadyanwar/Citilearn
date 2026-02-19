import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
    explanation,
    minWords,
    maxWords,
    onChange
}) => {
    return (
        <div className="lg:col-span-1 space-y-6">
            {/* Configuration */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-6">
                <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2">Config</h3>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-bold text-main">Question Type</Label>
                        <Select
                            value={type}
                            onValueChange={(value) => onChange({ type: value })}
                        >
                            <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:ring-citilearn-green/20">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="multiple-choice">Multiple Choice (Single)</SelectItem>
                                <SelectItem value="multiple-answer">Multiple Choice (Multiple)</SelectItem>
                                <SelectItem value="true-false">True / False</SelectItem>
                                <SelectItem value="essay" disabled>Essay (Coming Soon)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-bold text-main">Point</Label>
                        <Input
                            type="number"
                            min="1"
                            value={points}
                            onChange={(e) => onChange({ points: parseInt(e.target.value) || 0 })}
                            className="bg-gray-50 border-gray-200 focus:ring-citilearn-green/20"
                        />
                    </div>
                </div>
            </div>

            {/* Essay Question Settings */}
            {type === 'essay' && (
                <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2">Essay Settings</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-bold text-main">Min Words</Label>
                            <Input
                                type="number"
                                min="0"
                                value={minWords}
                                onChange={(e) => onChange({ minWords: parseInt(e.target.value) || 0 })}
                                className="bg-gray-50 border-gray-200 focus:ring-citilearn-green/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-bold text-main">Max Words</Label>
                            <Input
                                type="number"
                                min="0"
                                value={maxWords}
                                onChange={(e) => onChange({ maxWords: parseInt(e.target.value) || 0 })}
                                className="bg-gray-50 border-gray-200 focus:ring-citilearn-green/20"
                            />
                        </div>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                        <span className="font-bold text-amber-800">Note:</span> Requires manual grading.
                    </p>
                </div>
            )}

            {/* Explanation - Hidden for Multiple Choice */}
            {type !== 'multiple-choice' && type !== 'multiple-answer' && (
                <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2">Explanation</h3>
                    <div className="space-y-2">
                        <Label className="text-sm italic text-secondary">Optional</Label>
                        <Textarea
                            rows={6}
                            value={explanation}
                            onChange={(e) => onChange({ explanation: e.target.value })}
                            className="bg-gray-50 border-gray-200 focus:ring-citilearn-green/20 min-h-[150px]"
                            placeholder="Explain why this answer is correct..."
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditorSidebar;
