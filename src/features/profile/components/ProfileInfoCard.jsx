import React from 'react';
import Card from '@/components/common/Card';

const ProfileInfoCard = ({ title, className = '', children, ...props }) => {
    return (
        <Card variant="default" padding="p-6 md:p-8" className={`h-full ${className}`} {...props}>
            <h3 className="text-md font-medium text-tertiary mb-6">{title}</h3>
            {children}
        </Card>
    );
};

export default ProfileInfoCard;
