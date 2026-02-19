import React from 'react';
import { Settings, Clock, Camera } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const AssessmentSettings = ({ data, onChange }) => {

    const checkboxOptions = [
        {
            key: 'showResults',
            label: 'Show Results Immediately',
            description: 'Learners see their score right after submitting',
        },
        {
            key: 'shuffleQuestions',
            label: 'Shuffle Questions',
            description: 'Randomize question order for each attempt',
        },
        {
            key: 'shuffleAnswers',
            label: 'Shuffle Answer Options',
            description: 'Randomize answer choices for each question',
        },
        {
            key: 'requireCamera',
            label: 'Require Camera (Proctoring)',
            description: 'Activate webcam during the test session',
            icon: Camera,
        },
    ];

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-6">
            <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2 flex items-center gap-2">
                <Settings size={18} />
                Assessment Settings
            </h3>

            {/* Enable/Disable toggle */}
            <div className="flex items-center justify-between">
                <div>
                    <label className="text-sm font-bold text-main">Enable Assessment</label>
                    <p className="text-xs text-secondary">Make this assessment active</p>
                </div>
                <button
                    onClick={() => onChange({ enabled: !data.enabled })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${data.enabled ? 'bg-citilearn-green' : 'bg-gray-200'}`}
                >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${data.enabled ? 'translate-x-6' : ''}`} />
                </button>
            </div>

            {/* Passing Grade */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-main">Passing Grade (%)</label>
                <input
                    type="number"
                    min="0"
                    max="100"
                    value={data.passingGrade}
                    onChange={(e) => onChange({ passingGrade: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                />
            </div>

            {/* Time Limit */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-main flex items-center gap-2">
                    <Clock size={16} />
                    Time Limit (minutes)
                </label>
                <input
                    type="number"
                    min="0"
                    value={data.timeLimit}
                    onChange={(e) => onChange({ timeLimit: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                    placeholder="0 = No limit"
                />
                <p className="text-xs text-secondary">Set to 0 for unlimited time</p>
            </div>

            {/* Max Attempts */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-main">Maximum Attempts</label>
                <input
                    type="number"
                    min="1"
                    value={data.maxAttempts}
                    onChange={(e) => onChange({ maxAttempts: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                />
            </div>

            {/* Checkbox options */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
                {checkboxOptions.map(({ key, label, description, icon: Icon }) => (
                    <div
                        key={key}
                        className="flex items-start justify-between gap-4 cursor-pointer group"
                        onClick={() => onChange({ [key]: !data[key] })}
                    >
                        <div className="flex items-start gap-2">
                            {Icon && <Icon size={15} className="mt-0.5 text-secondary shrink-0" />}
                            <div>
                                <p className="text-sm font-medium text-main group-hover:text-primary transition-colors leading-tight">
                                    {label}
                                </p>
                                {description && (
                                    <p className="text-xs text-secondary mt-0.5">{description}</p>
                                )}
                            </div>
                        </div>
                        <Checkbox
                            checked={!!data[key]}
                            onCheckedChange={(checked) => onChange({ [key]: checked })}
                            onClick={(e) => e.stopPropagation()}
                            className="mt-0.5 shrink-0"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssessmentSettings;
