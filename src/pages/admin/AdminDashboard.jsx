import React, { useMemo } from 'react';
import {
    Users,
    BookOpen,
    TrendingUp,
    Clock,
    ChevronRight,
} from 'lucide-react';
import Card from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/ui/button';
import data from '../../data.json';

const AdminDashboard = () => {
    // Compute stats from data.json
    const stats = useMemo(() => {
        const courses = data.courses || [];
        const totalCourses = courses.length;

        // Mocked numbers for students and completion rate based on data patterns
        return {
            totalCourses,
            activeStudents: 1248,
            completionRate: '72%',
            avgProgress: Math.round(courses.reduce((acc, c) => acc + (c.progress || 0), 0) / (totalCourses || 1))
        };
    }, []);

    const recentActivities = [
        { id: 1, user: 'Budi Pratama', action: 'Completed', target: 'Aviation Safety', time: '2 mins ago', type: 'primary' },
        { id: 2, user: 'Siti Nurhaliza', action: 'Started', target: 'Customer Service', time: '15 mins ago', type: 'slate' },
        { id: 3, user: 'Ahmad Yani', action: 'Failed Quiz', target: 'Airbus A320 Tech', time: '1 hour ago', type: 'slate' },
        { id: 4, user: 'Dewi Lestari', action: 'Enrolled', target: 'Meteorology', time: '3 hours ago', type: 'secondary' },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* 1. Header & Welcome Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-main tracking-tight">System Overview</h1>
                    <div className="flex items-center gap-2 mt-1 text-slate-500 font-medium">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">Daily insight for Citilink e-learning performance</span>
                    </div>
                </div>


            </div>

            {/* 2. Key Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={BookOpen}
                    label="Active Courses"
                    value={stats.totalCourses}
                    trend="+2 this month"
                    variant="primary"
                />
                <StatCard
                    icon={Users}
                    label="Total Students"
                    value={stats.activeStudents}
                    trend="+12% growth"
                    variant="slate"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Completion Rate"
                    value={stats.completionRate}
                    trend="Up 5.4%"
                    variant="slate"
                />
                <StatCard
                    icon={Clock}
                    label="Avg. Progress"
                    value={`${stats.avgProgress}%`}
                    trend="Team average"
                    variant="secondary"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* 3. Main Dashboard Content (Left) */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Activity Chart Placeholder */}
                    <Card className="p-8 border-slate-100 bg-white">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-lg font-bold text-main">Learning Engagement</h3>
                                <p className="text-sm text-slate-500 font-medium">Course activity and completions over time</p>
                            </div>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="bg-slate-50 border-transparent text-slate-600">Weekly</Badge>
                                <Badge variant="outline" className="text-slate-400 cursor-pointer hover:bg-slate-50">Monthly</Badge>
                            </div>
                        </div>

                        {/* Visual Mock of Trending Chart - Line Chart */}
                        <div className="h-64 w-full relative group">
                            <svg viewBox="0 0 1000 200" className="w-full h-full overflow-visible">
                                <defs>
                                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Grid Lines (Horizontal) */}
                                {[0, 50, 100, 150, 200].map((y) => (
                                    <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#f8fafc" strokeWidth="1" />
                                ))}

                                {/* Area Fill */}
                                <path
                                    d="M 0,120 L 90.9,70 L 181.8,110 L 272.7,40 L 363.6,90 L 454.5,20 L 545.4,50 L 636.3,80 L 727.2,30 L 818.1,10 L 909,60 L 1000,40 L 1000,200 L 0,200 Z"
                                    fill="url(#areaGradient)"
                                    className="animate-pulse-slow"
                                />

                                {/* The Line */}
                                <path
                                    d="M 0,120 L 90.9,70 L 181.8,110 L 272.7,40 L 363.6,90 L 454.5,20 L 545.4,50 L 636.3,80 L 727.2,30 L 818.1,10 L 909,60 L 1000,40"
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="drop-shadow-[0_4px_8px_rgba(16,185,129,0.2)]"
                                />

                                {/* Data Points */}
                                {[
                                    { x: 0, y: 120 }, { x: 90.9, y: 70 }, { x: 181.8, y: 110 },
                                    { x: 272.7, y: 40 }, { x: 363.6, y: 90 }, { x: 454.5, y: 20 },
                                    { x: 545.4, y: 50 }, { x: 636.3, y: 80 }, { x: 727.2, y: 30 },
                                    { x: 818.1, y: 10 }, { x: 909, y: 60 }, { x: 1000, y: 40 }
                                ].map((p, i) => (
                                    <g key={i} className="cursor-pointer">
                                        <circle
                                            cx={p.x} cy={p.y} r="4"
                                            fill="white" stroke="#10b981" strokeWidth="2.5"
                                            className="transition-all duration-300 hover:r-6"
                                        />
                                        <rect
                                            x={p.x - 20} y={p.y - 35} width="40" height="20" rx="4"
                                            className="fill-slate-800 opacity-0 group-hover:opacity-0 hover:opacity-100! transition-opacity"
                                        />
                                        <text
                                            x={p.x} y={p.y - 21} textAnchor="middle"
                                            className="fill-white text-3xs font-bold opacity-0 group-hover:opacity-0 hover:opacity-100! pointer-events-none transition-opacity"
                                        >
                                            {Math.round((200 - p.y) / 2)}%
                                        </text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                        <div className="flex justify-between mt-6 px-1">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                                <span key={m} className="text-3xs font-bold text-slate-400 uppercase tracking-widest">{m}</span>
                            ))}
                        </div>
                    </Card>

                    {/* Course Popularity List */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-main">Course Performance</h3>
                            <Button variant="ghost" className="text-slate-600 font-bold text-sm gap-1 hover:bg-slate-100 rounded-xl">
                                Full Reports <ChevronRight size={16} />
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {data.courses.slice(0, 4).map((course) => (
                                <CourseRow key={course.id} course={course} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Side Info Panel (Right) */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Notification/Activity Stream */}
                    <Card className="p-6 bg-white border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-main">Live Updates</h3>
                            <div className="w-2 h-2 rounded-full bg-slate-300" />
                        </div>
                        <div className="space-y-6">
                            {recentActivities.map(activity => (
                                <div key={activity.id} className="flex gap-4 group">
                                    <div className={`w-1 font-bold rounded-full transition-all group-hover:scale-y-125 ${activity.type === 'primary' ? 'bg-primary' :
                                        activity.type === 'secondary' ? 'bg-citilearn-secondary' : 'bg-slate-200'
                                        }`} />
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-main line-clamp-1">{activity.user}</p>
                                        <p className="text-xs text-slate-500 font-medium mt-0.5 leading-tight">
                                            <span className="text-main font-bold">{activity.action}</span> {activity.target}
                                        </p>
                                        <span className="text-3xs text-slate-400 font-bold uppercase tracking-tighter mt-1 block">{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-6 rounded-xl text-xs font-bold border-slate-100 text-slate-600 bg-white hover:bg-slate-50">
                            System Logs
                        </Button>
                    </Card>

                </div>
            </div>
        </div>
    );
};

// Sub-components for cleaner structure
const StatCard = ({ icon: Icon, label, value, trend, variant }) => {
    const styles = {
        primary: 'bg-primary text-white',
        secondary: 'bg-citilearn-secondary text-main',
        slate: 'bg-slate-100 text-slate-600'
    };

    return (
        <Card className="p-6 bg-white border-slate-100 hover:border-slate-200 transition-all duration-300 group">
            <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl ${styles[variant]} transition-transform group-hover:scale-105`}>
                    <Icon size={22} />
                </div>
                <div className="flex flex-col items-end text-right">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{label}</span>
                    <span className="text-3xl font-black text-main mt-2 tracking-tight leading-none">{value}</span>
                </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2">
                <span className={`text-3xs font-bold uppercase tracking-wider ${variant === 'primary' ? 'text-primary' : 'text-slate-400'}`}>
                    {trend}
                </span>
            </div>
        </Card>
    );
};

const CourseRow = ({ course }) => (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50/50 hover:border-slate-200 transition-all group">
        <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <img src={course.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="min-w-0">
                <h4 className="font-bold text-main text-sm md:text-base truncate">{course.title}</h4>
                <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-3xs font-bold text-slate-400 uppercase tracking-widest">{course.category}</span>
                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                    <span className="flex items-center gap-1 text-3xs font-bold text-slate-400">
                        <Users size={10} /> {Math.floor(Math.random() * 200) + 50} Students
                    </span>
                </div>
            </div>
        </div>

        <div className="hidden sm:flex items-center gap-8 px-6">
            <div className="w-24">
                <div className="flex justify-between text-3xs font-bold text-slate-400 mb-1.5 uppercase tracking-tighter">
                    <span>Progress</span>
                    <span className="text-main">{course.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-700 ${course.progress === 100 ? 'bg-primary' : (course.progress > 0 ? 'bg-primary/60' : 'bg-slate-200')}`}
                        style={{ width: `${course.progress}%` }}
                    />
                </div>
            </div>
            <div className="w-[100px] flex justify-end">
                {course.progress === 100 ? (
                    <Badge variant="completed" size="xs" className="border-primary/20 text-primary bg-primary/5 rounded-lg font-black uppercase">
                        Active
                    </Badge>
                ) : (
                    <Badge variant="not-started" size="xs" className="border-slate-200 text-slate-400 rounded-lg font-black uppercase">
                        Draft
                    </Badge>
                )}
            </div>
        </div>

        <Button variant="ghost" size="icon" className="rounded-xl text-slate-300 hover:text-primary hover:bg-white border border-transparent hover:border-slate-100">
            <ChevronRight size={18} />
        </Button>
    </div>
);

export default AdminDashboard;
