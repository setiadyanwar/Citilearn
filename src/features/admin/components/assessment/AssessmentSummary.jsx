import React from 'react';

const AssessmentSummary = ({ questions, timeLimit }) => {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100">
            <h4 className="text-sm font-bold text-main mb-4">Assessment Summary</h4>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-secondary">Total Questions</span>
                    <span className="text-sm font-bold text-main">{questions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-secondary">Total Point</span>
                    <span className="text-sm font-bold text-main">{questions.reduce((sum, q) => sum + (q.points || 0), 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-secondary">Estimated Time</span>
                    <span className="text-sm font-bold text-main">{timeLimit} min</span>
                </div>
            </div>
        </div>
    );
};

export default AssessmentSummary;
