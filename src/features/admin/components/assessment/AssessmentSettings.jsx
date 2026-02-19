import React from 'react';
import { Settings, Clock } from 'lucide-react';

const AssessmentSettings = ({ data, onChange }) => {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-6">
            <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2 flex items-center gap-2">
                <Settings size={18} />
                Assessment Settings
            </h3>

            {/* Enable/Disable */}
            <div className="flex items-center justify-between">
                <div>
                    <label className="text-sm font-bold text-main">Enable Assessment</label>
                    <p className="text-xs text-secondary">Make this assessment active</p>
                </div>
                <button
                    onClick={() => onChange({ enabled: !data.enabled })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${data.enabled ? 'bg-citilearn-green' : 'bg-gray-200'}`}
                >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${data.enabled ? 'translate-x-6' : ''}`}></div>
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

            {/* Additional Options */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
                <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-medium text-main group-hover:text-primary">Show Results Immediately</span>
                    <input
                        type="checkbox"
                        checked={data.showResults}
                        onChange={(e) => onChange({ showResults: e.target.checked })}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-medium text-main group-hover:text-primary">Shuffle Questions</span>
                    <input
                        type="checkbox"
                        checked={data.shuffleQuestions}
                        onChange={(e) => onChange({ shuffleQuestions: e.target.checked })}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-medium text-main group-hover:text-primary">Shuffle Answer Options</span>
                    <input
                        type="checkbox"
                        checked={data.shuffleAnswers}
                        onChange={(e) => onChange({ shuffleAnswers: e.target.checked })}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-medium text-main group-hover:text-primary">Allow Review After Submit</span>
                    <input
                        type="checkbox"
                        checked={data.allowReview}
                        onChange={(e) => onChange({ allowReview: e.target.checked })}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                </label>
            </div>
        </div>
    );
};

export default AssessmentSettings;
