import React, { useMemo } from 'react';
import {
    Users,
    BookOpen,
    TrendingUp,
    Clock,
    ChevronRight,
    Download,
} from 'lucide-react';
import Card from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/ui/button';
import data from '@/data.json';

const AdminDashboard = () => {
    // Compute stats from data.json
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

    const recentActivities = [
        { id: 1, user: 'Budi Pratama', action: 'Completed', target: 'Aviation Safety', time: '2 mins ago', type: 'primary', avatar: 'https://i.pravatar.cc/150?u=budi' },
        { id: 2, user: 'Siti Nurhaliza', action: 'Started', target: 'Customer Service', time: '15 mins ago', type: 'slate', avatar: 'https://i.pravatar.cc/150?u=siti' },
        { id: 3, user: 'Ahmad Yani', action: 'Failed Quiz', target: 'Airbus A320 Tech', time: '1 hour ago', type: 'slate', avatar: 'https://i.pravatar.cc/150?u=ahmad' },
        { id: 4, user: 'Dewi Lestari', action: 'Enrolled', target: 'Meteorology', time: '3 hours ago', type: 'secondary', avatar: 'https://i.pravatar.cc/150?u=dewi' },
    ];

    return (
        <div className="space-y-12 animate-fade-in pb-20 max-w-7xl mx-auto px-4 md:px-0">
            {/* Minimal Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-main tracking-tight">System Overview</h1>
                    <p className="text-base text-secondary mt-1.5 font-medium">Monitoring Citilink's digital learning performance and student engagement.</p>
                </div>
                <div>
                    <Button variant="secondary" className="flex items-center gap-2">
                        <Download size={18} />
                        Download Reports
                    </Button>
                </div>
            </div>

            {/* Simple Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Active Courses" value={stats.totalCourses} trend="+2 this month" />
                <StatCard label="Total Students" value={stats.activeStudents} trend="+12.5% growth" />
                <StatCard label="Completion Rate" value={stats.completionRate} trend="+5.4% improvement" />
                <StatCard label="Average Progress" value={`${stats.avgProgress}%`} trend="Overall performance" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content (Left) */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Minimal Chart Section */}
                    <div>
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h3 className="text-xl font-semibold text-main">Learning Engagement</h3>
                                <p className="text-sm text-secondary mt-1 font-medium">Daily activity tracking across all modules</p>
                            </div>
                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                <button className="px-6 py-2 text-xs font-semibold bg-white text-main rounded-lg shadow-none">Weekly</button>
                                <button className="px-6 py-2 text-xs font-semibold text-tertiary hover:text-secondary rounded-lg transition-colors">Monthly</button>
                            </div>
                        </div>

                        <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-8">
                            <div className="h-64 w-full relative">
                                <svg viewBox="0 0 1000 200" className="w-full h-full overflow-visible">
                                    <path
                                        d="M 0,120 L 100,70 L 200,110 L 300,40 L 400,90 L 500,20 L 600,50 L 700,80 L 800,30 L 900,10 L 1000,40"
                                        fill="none"
                                        stroke="#e2e8f0"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M 0,120 L 100,70 L 200,110 L 300,40 L 400,90 L 500,20 L 600,50 L 700,80 L 800,30 L 900,10 L 1000,40"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    {[{ x: 300, y: 40 }, { x: 500, y: 20 }, { x: 800, y: 30 }].map((p, i) => (
                                        <circle key={i} cx={p.x} cy={p.y} r="5" fill="white" stroke="#10b981" strokeWidth="3" />
                                    ))}
                                </svg>
                            </div>
                            <div className="flex justify-between mt-8 pt-4 border-t border-slate-100 px-2">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                                    <span key={d} className="text-sm font-medium text-tertiary">{d}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Simple Course List */}
                    <div className="space-y-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold text-main">Recent Courses</h3>
                                <p className="text-sm text-secondary mt-1 font-medium">Real-time completion and status overview</p>
                            </div>
                            <button className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">See all courses</button>
                        </div>
                        <div className="divide-y divide-slate-100 border-y border-slate-100">
                            {data.courses.slice(0, 4).map((course) => (
                                <CourseRow key={course.id} course={course} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Side Panel (Right) */}
                <div className="lg:col-span-4 space-y-12">
                    {/* Clean Activity Feed */}
                    <div>
                        <h3 className="text-xl font-semibold text-main mb-8">Activity Feed</h3>
                        <div className="flow-root">
                            <ul className="-mb-8">
                                {recentActivities.map((activity, idx) => (
                                    <li key={activity.id}>
                                        <div className="relative pb-8">
                                            {idx !== recentActivities.length - 1 ? (
                                                <span className="absolute top-5 left-5 -ml-px h-full w-px bg-slate-100" aria-hidden="true" />
                                            ) : null}
                                            <div className="relative flex items-start space-x-4">
                                                <div className="mt-1 h-10 w-10 rounded-xl overflow-hidden border border-slate-100 shrink-0">
                                                    <img src={activity.avatar} alt={activity.user} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <p className="text-sm font-semibold text-main">{activity.user}</p>
                                                        <span className="text-[11px] font-medium text-tertiary">{activity.time}</span>
                                                    </div>
                                                    <p className="text-sm text-secondary mt-0.5 leading-relaxed font-medium">
                                                        {activity.action} <span className="font-semibold text-main">{activity.target}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="w-full mt-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-secondary font-semibold text-sm h-12 shadow-none border border-slate-100 transition-colors">
                            View Detailed Logs
                        </button>
                    </div>

                    {/* Minimal System Card */}
                    <div className="bg-slate-50/50 rounded-2xl p-8 border border-slate-100 space-y-6">
                        <h4 className="text-sm font-semibold text-main">System Monitoring</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-secondary">Database Sync</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-emerald-600">Active</span>
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-secondary">Compute Status</span>
                                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 leading-none">Optimal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-components
const StatCard = ({ label, value, trend }) => (
    <div className="p-8 bg-white border border-slate-100 rounded-2xl transition-all hover:border-slate-300 group">
        <p className="text-sm font-medium text-tertiary leading-none">{label}</p>
        <div className="flex items-baseline gap-3 mt-4">
            <h4 className="text-3xl font-semibold text-main tracking-tight leading-none">{value}</h4>
        </div>
        <p className="text-xs font-semibold text-emerald-600 mt-5 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
            <TrendingUp size={14} />
            {trend}
        </p>
    </div>
);

const CourseRow = ({ course }) => (
    <div className="py-6 flex items-center justify-between group px-1">
        <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                <img src={course.thumbnail} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div>
                <h4 className="text-base font-semibold text-main leading-tight group-hover:text-primary transition-colors">{course.title}</h4>
                <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-sm font-medium text-tertiary">{course.category}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-200" />
                    <span className="text-sm font-medium text-tertiary">124 Students</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-10">
            <div className="hidden md:block text-right">
                <div className="flex justify-between items-center mb-1.5 w-36">
                    <span className="text-xs font-medium text-tertiary">Completion Rate</span>
                    <span className="text-sm font-semibold text-main">{course.progress}%</span>
                </div>
                <div className="w-36 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary/80" style={{ width: `${course.progress}%` }} />
                </div>
            </div>
            <button className="w-11 h-11 rounded-xl flex items-center justify-center text-tertiary hover:text-main hover:bg-slate-50 transition-all">
                <ChevronRight size={22} />
            </button>
        </div>
    </div>
);

export default AdminDashboard;

