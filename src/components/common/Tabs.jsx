import React from 'react';

const Tabs = ({ tabs, activeTab, onTabChange, className = "", variant = "default" }) => {
    return (
        <div className={`flex items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-full border border-gray-100 dark:border-slate-700 w-full md:w-fit overflow-x-auto no-scrollbar ${className}`}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${isActive
                            ? 'bg-citilearn-green text-white'
                            : 'text-secondary hover:text-main dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700'
                            }`}
                    >
                        {Icon && <Icon size={18} className={isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"} />}
                        <span className="truncate">{tab.label}</span>
                        {tab.count !== undefined && (
                            <span className={`px-2 py-0.5 rounded-full text-3xs font-semibold ml-1 ${isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-gray-100 dark:bg-slate-700 text-secondary'
                                }`}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;
