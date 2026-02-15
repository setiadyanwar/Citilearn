import React from 'react';
import { CARD_VARIANTS } from '../../constants/ui';

const Card = ({
    children,
    className = '',
    variant = 'default',
    rounded = 'rounded-2xl',
    padding = 'p-6',
    ...props
}) => {
    return (
        <div
            className={`${CARD_VARIANTS[variant]} ${rounded} ${padding} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
