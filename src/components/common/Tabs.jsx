import React from 'react';

const Tabs = ({ tabs, activeTab, onTabChange, className = "" }) => {
    return (
        <div className={`flex items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-full border border-gray-100 dark:border-slate-700 w-fit ${className}`}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${isActive
                            ? 'bg-citilearn-green text-white'
                            : 'text-secondary hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                            }`}
                    >
                        {tab.label}
                        {tab.count !== undefined && (
                            <span className={`px-2 py-0.5 rounded-full text-3xs font-extrabold ml-1 ${isActive
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
