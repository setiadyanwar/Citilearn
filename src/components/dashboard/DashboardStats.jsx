import React from 'react';
import { BookOpen, Trophy } from 'lucide-react';
import StatCard from './StatCard';
import ProgressStatsCard from './ProgressStatsCard';

const DashboardStats = () => {
    return (
        <div className="flex flex-nowrap overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-6 -mt-24 relative z-20 px-6 pb-6 md:pb-0 snap-x hide-scrollbar">
            <div className="min-w-[85%] sm:min-w-[60%] md:min-w-0 snap-center flex-shrink-0">
                <StatCard icon={<BookOpen size={24} />} label="Assigned Courses" value="12" trend="+3 New" trendType="neutral" />
            </div>
            <div className="min-w-[85%] sm:min-w-[60%] md:min-w-0 snap-center flex-shrink-0">
                <StatCard icon={<Trophy size={24} />} label="Certifications Earned" value="08" trend="Gold Tier" trendType="reward" />
            </div>
            <div className="min-w-[85%] sm:min-w-[60%] md:min-w-0 snap-center flex-shrink-0">
                <ProgressStatsCard />
            </div>
        </div>
    );
};

export default DashboardStats;
