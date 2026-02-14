import React from 'react';
import { BookOpen, CheckCircle, Award, Zap } from 'lucide-react';
import StatCard from '@/features/dashboard/components/StatCard';

const ProfileStats = () => {
    const stats = [
        { label: 'Total Courses', value: '12', icon: <BookOpen size={20} />, trendType: 'neutral' },
        { label: 'Completed', value: '8', icon: <CheckCircle size={20} />, trendType: 'success' },
        { label: 'Certificates', value: '4', icon: <Award size={20} />, trendType: 'reward' },
        { label: 'Points', value: '850', icon: <Zap size={20} />, trendType: 'reward' },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <StatCard
                    key={index}
                    label={stat.label}
                    value={stat.value}
                    icon={stat.icon}
                    trendType={stat.trendType}
                />
            ))}
        </div>
    );
};

export default ProfileStats;
