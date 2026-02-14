import React from 'react';
import ProfileStats from '../components/ProfileStats';

const MyLearning = () => {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-main">My Learning</h2>
                <p className="text-secondary mt-1">Track your course progress and achievements</p>
            </div>

            {/* Stats Section */}
            <ProfileStats />

            {/* Course Progress Section (Placeholder) */}
            <div className="bg-white rounded-3xl p-10 border border-gray-100 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-lg font-bold text-main">Your courses will appear here</h3>
                <p className="text-secondary max-w-sm mt-2">
                    Start learning today and track your progress through modules and assessments.
                </p>
            </div>
        </div>
    );
};

export default MyLearning;
