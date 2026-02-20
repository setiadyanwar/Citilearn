import React from 'react';
import MilesIcon from '@/components/icons/MilesIcon';
import HatIcon from '@/assets/Hat.png';
import { formatPoints, getInitials } from '@/utils/helpers';
import { cn } from '@/lib/utils';

const ProfileAvatar = ({
    imageUrl,
    name,
    level,
    points = 0,
    showPoints = true,
    size = 'md',
    showBadge = true,
    showBorder = true,
    shape = 'circle', // 'circle' or 'square'
    className
}) => {
    // Calculate level from points to ensure synchronization
    const currentLevel = level || (points >= 2000 ? 'Captain' : points >= 1000 ? 'Cruise' : 'Boarding');

    // Determine styles based on level
    const getLevelStyles = (levelName) => {
        const normalizedLevel = levelName?.toLowerCase();
        switch (normalizedLevel) {
            case 'cruise':
                return { gradient: 'from-[#F1E304] to-[#B5AE38]' };
            case 'captain':
                return { gradient: 'from-[#20B2FB] to-[#0086C9]' };
            case 'boarding':
            default:
                return { gradient: 'from-[#018144] to-[#6AC100]' };
        }
    };

    const styles = getLevelStyles(currentLevel);

    // Size-based configurations
    const sizes = {
        xs: {
            container: 'w-7 h-7 p-0.5',
            badge: 'text-3xs px-1 py-0.5 -bottom-1 border',
            hat: 'w-3 -top-1 -right-0.5',
            gap: 'gap-2',
            text: 'text-xs'
        },
        sm: {
            container: 'w-8 h-8 md:w-9 md:h-9 p-0.5',
            badge: 'text-[9px] px-1.5 py-0.5 -bottom-1.5 border',
            hat: 'w-4 -top-1.5 -right-1',
            gap: 'gap-3',
            text: 'text-sm'
        },
        md: {
            container: 'w-16 h-16 md:w-24 md:h-24 p-1',
            badge: 'text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 -bottom-2.5 border-2',
            hat: 'w-6 md:w-8 -top-3.5 -right-2',
            gap: 'gap-6',
            text: 'text-xl md:text-2xl'
        }
    };

    const currentSize = sizes[size] || sizes.md;

    return (
        <div className={cn("flex items-center", currentSize.gap, className)}>
            {/* Avatar Section */}
            <div className="relative shrink-0">
                <div className={cn(
                    "transition-all duration-300",
                    shape === 'circle' ? 'rounded-full' : 'rounded-xl',
                    currentSize.container,
                    (showBorder && imageUrl) ? `bg-linear-to-b ${styles.gradient}` : "bg-transparent p-0"
                )}>
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={name}
                            className={cn(
                                "w-full h-full object-cover bg-white",
                                shape === 'circle' ? 'rounded-full' : 'rounded-xl'
                            )}
                        />
                    ) : (
                        <div className={cn(
                            "w-full h-full flex items-center justify-center font-bold text-primary bg-primary-light",
                            shape === 'circle' ? 'rounded-full' : 'rounded-xl',
                            currentSize.text
                        )}>
                            {getInitials(name)}
                        </div>
                    )}
                </div>

                {showBadge && currentLevel && (
                    <div className={cn("absolute left-1/2 -translate-x-1/2", currentSize.badge.split(' ').filter(c => c.startsWith('-bottom')).join(' '))}>
                        <div className="relative">
                            {currentLevel === 'Captain' && (
                                <div className={cn("absolute z-20", currentSize.hat)}>
                                    <img src={HatIcon} alt="Hat" className="w-full h-auto" />
                                </div>
                            )}
                            <span className={cn(
                                "bg-linear-to-b text-white font-bold rounded-full border-white whitespace-nowrap block leading-none transition-all",
                                styles.gradient,
                                currentSize.badge.replace(/-bottom-[^\s]+/, '')
                            )}>
                                {currentLevel}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Miles Points Section */}
            {showPoints && (
                <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white select-none">
                        {formatPoints(points)}
                    </span>
                    <MilesIcon className="w-12 h-auto mt-1" />
                </div>
            )}
        </div>
    );
};

export default ProfileAvatar;
