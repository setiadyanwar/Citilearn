import React from 'react';
import MilesIcon from '@/components/icons/MilesIcon';
import HatIcon from '@/assets/Hat.png';
import { formatPoints } from '@/utils/helpers';

const ProfileAvatar = ({ imageUrl, name, level = 'Boarding', points = 0, showPoints = true, size = 'md' }) => {
    // Calculate level from points to ensure synchronization
    const currentLevel = points >= 2000 ? 'Captain' : points >= 1000 ? 'Cruise' : 'Boarding';

    // Determine styles based on level
    const getLevelStyles = (levelName) => {
        const normalizedLevel = levelName.toLowerCase();
        switch (normalizedLevel) {
            case 'cruise':
                return {
                    gradient: 'from-[#F1E304] to-[#B5AE38]',
                };
            case 'captain':
                return {
                    gradient: 'from-[#20B2FB] to-[#0086C9]',
                };
            case 'boarding':
            default:
                return {
                    gradient: 'from-[#018144] to-[#6AC100]',
                };
        }
    };

    const styles = getLevelStyles(currentLevel);

    // Size-based configurations
    const sizes = {
        sm: {
            container: 'w-8 h-8 md:w-10 md:h-10 p-0.5',
            badge: 'text-[9px] px-1.5 py-0.5 -bottom-1.5 border',
            hat: 'w-4 -top-1.5 -right-1',
            gap: 'gap-3'
        },
        md: {
            container: 'w-16 h-16 md:w-24 md:h-24 p-1',
            badge: 'text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 -bottom-2.5 border-2',
            hat: 'w-6 md:w-8 -top-3.5 -right-2',
            gap: 'gap-6'
        }
    };

    const currentSize = sizes[size] || sizes.md;

    return (
        <div className={`flex items-center ${currentSize.gap}`}>
            {/* Avatar Section */}
            <div className="relative shrink-0">
                <div className={`${currentSize.container} rounded-full bg-linear-to-b ${styles.gradient} shadow-xl`}>
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover rounded-full bg-white"
                    />
                </div>
                {level && (
                    <div className={`absolute left-1/2 -translate-x-1/2 ${currentSize.badge.split(' ').filter(c => c.startsWith('-bottom')).join(' ')}`}>
                        <div className="relative">
                            {currentLevel === 'Captain' && (
                                <div className={`absolute z-20 ${currentSize.hat}`}>
                                    <img src={HatIcon} alt="Hat" className="w-full h-auto drop-shadow-md" />
                                </div>
                            )}
                            <span className={`bg-linear-to-b ${styles.gradient} text-white font-bold rounded-full border-white shadow-sm whitespace-nowrap block leading-none ${currentSize.badge.replace(/-bottom-[^\s]+/, '')}`}>
                                {currentLevel}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Miles Points Section */}
            {showPoints && (
                <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white drop-shadow-md select-none">
                        {formatPoints(points)}
                    </span>
                    <MilesIcon className="w-12 h-auto mt-1 drop-shadow-sm" />
                </div>
            )}
        </div>
    );
};

export default ProfileAvatar;
