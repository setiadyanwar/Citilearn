import React from 'react';
import { Link } from 'react-router-dom';

const RecommendationHeader = ({ searchQuery }) => {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <h2 className="text-lg md:text-xl font-bold text-main dark:text-white flex items-center gap-2 md:gap-3">
                    <div className="w-1.5 h-6 bg-primary rounded-full shrink-0"></div>
                    <span className="truncate">{searchQuery ? 'Search Results' : 'Recommendation Skill Up'}</span>
                </h2>
            </div>
            {!searchQuery && (
                <Link to="/courses" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">
                    Show All
                </Link>
            )}
        </div>
    );
};

export default RecommendationHeader;
