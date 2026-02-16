import React, { useMemo } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import data from '@/data.json';

// Modular Components
import StatCard from '@/features/dashboard/components/StatCard';
import CourseRow from '@/features/admin/components/CourseRow';
import EngagementChart from '@/features/admin/components/EngagementChart';
import ActivityFeed from '@/features/admin/components/ActivityFeed';
import Leaderboard from '@/features/admin/components/Leaderboard';

const AdminDashboard = () => {
    const stats = useMemo(() => {
        const courses = data.courses || [];
        const totalCourses = courses.length;

        return {
            totalCourses,
            activeStudents: 1248,
            completionRate: '72%',
            avgProgress: Math.round(courses.reduce((acc, c) => acc + (c.progress || 0), 0) / (totalCourses || 1))
        };
    }, []);

    return (
        <div className="space-y-10 animate-fade-in pb-20 max-w-7xl mx-auto px-4 md:px-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-main tracking-tight">System Overview</h1>
                    <p className="text-sm text-secondary mt-1 font-medium">Monitoring Citilink's digital learning performance.</p>
                </div>
                <div>
                    <Button variant="secondary" size="sm" className="flex items-center gap-2 h-10 px-4 rounded-xl shadow-none">
                        <Download size={16} />
                        Download Reports
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Active Courses" value={stats.totalCourses} trend="+2 this month" variant="admin" />
                <StatCard label="Total Students" value={stats.activeStudents} trend="+12.5% growth" variant="admin" />
                <StatCard label="Completion Rate" value={stats.completionRate} trend="+5.4% improvement" variant="admin" />
                <StatCard label="Average Progress" value={`${stats.avgProgress}%`} trend="Overall performance" variant="admin" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-4">
                {/* Main Content (Left) */}
                <div className="lg:col-span-8 space-y-10">
                    <EngagementChart />

                    {/* Course List */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-main leading-none">Recent Courses</h3>
                                <p className="text-2xs text-secondary mt-1.5 font-medium tracking-tight">Real-time completion and status overview</p>
                            </div>
                            <Button variant="link" size="sm" className="h-auto p-0 text-2xs font-bold text-primary">See all courses</Button>
                        </div>
                        <div className="divide-y divide-slate-100 border-y border-slate-100 shadow-none">
                            {data.courses.slice(0, 4).map((course) => (
                                <CourseRow key={course.id} course={course} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Side Panel (Right) */}
                <div className="lg:col-span-4 space-y-10">
                    <ActivityFeed />
                    <Leaderboard />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
