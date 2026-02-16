import React, { useMemo, useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const weeklyData = [
    { name: 'Mon', value: 340 },
    { name: 'Tue', value: 450 },
    { name: 'Wed', value: 380 },
    { name: 'Thu', value: 590 },
    { name: 'Fri', value: 420 },
    { name: 'Sat', value: 710 },
    { name: 'Sun', value: 680 },
];

const monthlyData = [
    { name: 'Jan', value: 12400 },
    { name: 'Feb', value: 15600 },
    { name: 'Mar', value: 13200 },
    { name: 'Apr', value: 18900 },
    { name: 'May', value: 14200 },
    { name: 'Jun', value: 21000 },
    { name: 'Jul', value: 24500 },
    { name: 'Aug', value: 22100 },
    { name: 'Sep', value: 19800 },
    { name: 'Oct', value: 25600 },
    { name: 'Nov', value: 28400 },
    { name: 'Dec', value: 32000 },
];

const yearlyData = [
    { name: '2022', value: 185000 },
    { name: '2023', value: 242000 },
    { name: '2024', value: 310000 },
    { name: '2025', value: 385000 },
    { name: '2026', value: 420000 },
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-800 rounded-xl shadow-none animate-in fade-in zoom-in duration-200">
                <p className="text-3xs font-bold text-tertiary uppercase tracking-wider mb-0.5">{payload[0].payload.name}</p>
                <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <p className="text-sm font-bold text-main dark:text-white leading-none">
                        {payload[0].value.toLocaleString()} <span className="text-3xs font-medium text-secondary ml-0.5">Activities</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

const EngagementChart = () => {
    const [chartView, setChartView] = useState('weekly');

    const currentData = useMemo(() => {
        if (chartView === 'monthly') return monthlyData;
        if (chartView === 'yearly') return yearlyData;
        return weeklyData;
    }, [chartView]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-main leading-none">Learning Engagement</h3>
                    <p className="text-2xs text-secondary mt-1.5 font-medium tracking-tight">Daily activity tracking across all modules</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setChartView('weekly')}
                        className={`px-4 py-1.5 text-2xs font-bold rounded-lg transition-all ${chartView === 'weekly' ? 'bg-white text-main shadow-sm' : 'text-tertiary hover:text-secondary'}`}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setChartView('monthly')}
                        className={`px-4 py-1.5 text-2xs font-bold rounded-lg transition-all ${chartView === 'monthly' ? 'bg-white text-main shadow-sm' : 'text-tertiary hover:text-secondary'}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setChartView('yearly')}
                        className={`px-4 py-1.5 text-2xs font-bold rounded-lg transition-all ${chartView === 'yearly' ? 'bg-white text-main shadow-sm' : 'text-tertiary hover:text-secondary'}`}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            <div className="bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-none">
                <div className="h-[260px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.12} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.01} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={true}
                                horizontal={true}
                                stroke="#f1f5f9"
                            />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis
                                domain={['dataMin - 50', 'dataMax + 50']}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: 500 }}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#10b981"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                                animationDuration={1000}
                                activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2, fill: '#10b981' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default EngagementChart;
