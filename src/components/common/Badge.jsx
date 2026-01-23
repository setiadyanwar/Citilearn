import React from 'react';
import { BADGE_VARIANTS, BADGE_SIZES } from '../../constants/ui';

const Badge = ({
    children,
    variant = 'primary',
    size = 'md',
    className = ''
}) => {
    return (
        <span className={`inline-flex items-center justify-center rounded-md ${BADGE_VARIANTS[variant]} ${BADGE_SIZES[size]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
