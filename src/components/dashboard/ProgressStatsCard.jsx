import React from 'react';
import { Zap, TrendingUp } from 'lucide-react';

const ProgressStatsCard = () => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-4 rounded-xl flex flex-col justify-between transition-all duration-300 hover:border-primary dark:hover:border-primary group cursor-pointer relative overflow-hidden h-full shadow-sm shadow-gray-100 dark:shadow-none">
            <div className="flex items-start justify-between mb-2">
                <div className="flex flex-col gap-1">
                    <span className="text-3xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Daily Goal</span>
                    <div className="flex items-center gap-2">
                        <span className="text-3xl font-black text-citilink-dark dark:text-white tracking-tight">2/3</span>
                        <span className="text-sm font-bold text-gray-400 dark:text-slate-600 mt-1.5">Units</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-full border border-amber-100 dark:border-amber-900/30">
                    <Zap size={12} fill="currentColor" />
                    <span className="text-3xs font-bold">3 Day Streak</span>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between font-bold">
                    <span className="text-sm text-gray-600 dark:text-slate-400">Today's Progress</span>
                    <span className="text-base font-semibold text-primary dark:text-primary-light">66%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '66%' }} />
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400 dark:text-slate-500 font-medium">
                    <TrendingUp size={14} className="text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">On Track</span>
                    <span>to reach weekly target</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressStatsCard;
