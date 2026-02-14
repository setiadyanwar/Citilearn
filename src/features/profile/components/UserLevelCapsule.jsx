import React from 'react';
import MilesIcon from '@/components/icons/MilesIcon';
import ProfileAvatar from './ProfileAvatar';
import { formatPoints } from '@/utils/helpers';

const UserLevelCapsule = ({ imageUrl, name, points = 0, isDark = false }) => {

    return (
        <div className={`flex items-center rounded-full p-1 pr-4 gap-3 border transition-colors ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
            {/* Unified Avatar Component */}
            <ProfileAvatar
                imageUrl={imageUrl}
                name={name}
                points={points}
                size="sm"
                showPoints={false}
            />

            {/* Miles Point Display */}
            <div className="flex flex-col items-center gap-0.5">
                <span className={`text-sm font-bold leading-none ${isDark ? 'text-white' : 'text-main'}`}>
                    {formatPoints(points)}
                </span>
                <MilesIcon className="w-6 h-auto" />
            </div>
        </div>
    );
};

export default UserLevelCapsule;
