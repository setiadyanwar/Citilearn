import React from 'react';
import { Info } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "@/components/ui/date-picker";

const CourseAvailabilitySettings = ({ isLifetime, startDate, endDate, onChange }) => {
    return (
        <div className="p-0 space-y-6">
            <div className="flex flex-row items-center justify-between border-b border-slate-200/60 pb-4 gap-4">
                <div className="space-y-1">
                    <Label className="text-sm md:text-base font-bold text-main">Course Availability</Label>
                    <p className="text-xs md:text-sm text-secondary">Set time limits or allow lifetime access</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <Label htmlFor="lifetime-mode" className="text-xs md:text-sm font-bold text-secondary cursor-pointer">Lifetime Access</Label>
                    <Switch
                        id="lifetime-mode"
                        checked={isLifetime}
                        onCheckedChange={(checked) => onChange({ isLifetime: checked })}
                    />
                </div>
            </div>

            {isLifetime ? (
                <div className="rounded-xl border border-sky-100 bg-sky-50 p-4 flex gap-3 text-sky-700 shadow-none animate-fade-in">
                    <Info className="h-5 w-5 text-sky-400 mt-0.5" />
                    <div>
                        <h5 className="font-bold text-sky-900 mb-1">Lifetime Access Enabled</h5>
                        <p className="text-sm opacity-90 font-medium leading-relaxed">
                            This course will be permanently available to assigned learners without any time restrictions.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                    <div className="flex flex-col gap-2.5">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-bold text-main">Start Date</Label>
                            <p className="text-xs text-tertiary font-medium">When course begins</p>
                        </div>
                        <DatePicker
                            date={startDate}
                            setDate={(date) => onChange({ startDate: date })}
                            placeholder="Pick a start date"
                            className="bg-white border-slate-200 shadow-none h-12 rounded-xl"
                        />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-bold text-main">End Date</Label>
                            <p className="text-xs text-tertiary font-medium">Enrollment deadline</p>
                        </div>
                        <DatePicker
                            date={endDate}
                            setDate={(date) => onChange({ endDate: date })}
                            placeholder="Pick an end date"
                            className="bg-white border-slate-200 shadow-none h-12 rounded-xl"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseAvailabilitySettings;
