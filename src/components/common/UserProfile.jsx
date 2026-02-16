import React from 'react';
import ProfileAvatar from '@/features/profile/components/ProfileAvatar';

/**
 * UserProfile Component
 * A reusable component for displaying user avatars without badges/points by default.
 * Supports placeholder with primary-light background and primary initials.
 */
const UserProfile = ({
    imageUrl,
    name,
    size = 'sm',
    showBadge = false,
    showBorder = false,
    showPoints = false,
    className
}) => {
    return (
        <ProfileAvatar
            imageUrl={imageUrl}
            name={name}
            size={size}
            showBadge={showBadge}
            showBorder={showBorder}
            showPoints={showPoints}
            className={className}
        />
    );
};

export default UserProfile;
