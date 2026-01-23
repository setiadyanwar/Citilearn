import React from 'react';
import { BUTTON_VARIANTS, BUTTON_SIZES } from '../../constants/ui';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    type = 'button',
    icon: Icon = null,
    iconPosition = 'right'
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-none
                ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${className}
            `}
        >
            {Icon && iconPosition === 'left' && <Icon size={size === 'xs' ? 14 : size === 'sm' ? 16 : 20} />}
            {children}
            {Icon && iconPosition === 'right' && <Icon size={size === 'xs' ? 14 : size === 'sm' ? 16 : 20} />}
        </button>
    );
};

export default Button;
