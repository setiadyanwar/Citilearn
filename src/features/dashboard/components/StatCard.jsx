import React from 'react';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const StatCard = ({ icon, label, value, trend, trendType = 'neutral', progress, variant = 'default' }) => {
    const getTrendStyles = () => {
        switch (trendType) {
            case 'reward': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50';
            case 'success': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50';
            default: return 'bg-gray-100 dark:bg-slate-800 text-secondary dark:text-slate-400 border-gray-200 dark:border-slate-700';
        }
    };

    if (variant === 'admin') {
        return (
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl transition-all hover:border-slate-200 dark:hover:border-slate-700 group shadow-none">
                <p className="text-xs font-bold text-tertiary leading-none uppercase tracking-wider">{label}</p>
                <div className="flex items-baseline gap-2 mt-3">
                    <h4 className="text-2xl font-bold text-main dark:text-white tracking-tight leading-none">{value}</h4>
                </div>
                {trend && (
                    <p className="text-2xs font-bold text-emerald-600 mt-4 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <TrendingUp size={12} />
                        {trend}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:border-primary dark:hover:border-primary group cursor-default relative overflow-hidden">
            <div className="flex flex-col gap-1 w-full relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-secondary dark:text-slate-400 group-hover:text-primary transition-colors">{label}</span>
                        {trend && (
                            <div className={`text-3xs font-bold px-2 py-0.5 rounded-full border transition-colors ${getTrendStyles()}`}>
                                {trend}
                            </div>
                        )}
                    </div>
                    <div className="text-tertiary dark:text-slate-600 group-hover:text-primary transition-colors shrink-0 ml-4">
                        {icon}
                    </div>
                </div>

                <div className="text-3xl font-bold text-main dark:text-white tracking-tight mt-1">{value}</div>

                {progress !== undefined && (
                    <div className="w-full h-2.5 bg-gray-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden max-w-[85%] relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-size-[10px_10px] bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.05)_75%,rgba(0,0,0,0.05))] opacity-10" />
                        <div
                            className="h-full bg-linear-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700 relative"
                            style={{ width: `${progress}%` }}
                        >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
