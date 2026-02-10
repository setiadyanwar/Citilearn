import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight, ChevronLeft } from 'lucide-react';

const Breadcrumb = ({ items, onBack, showBack = true }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center gap-2 md:gap-4 mb-8 w-full">
            {showBack && (
                <button
                    onClick={onBack || (() => navigate(-1))}
                    className="flex-shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full text-tertiary dark:text-slate-500 hover:text-primary dark:hover:text-primary hover:bg-primary/10 transition-all"
                    title="Go Back"
                >
                    <ChevronLeft size={20} />
                </button>
            )}

            {showBack && <div className="h-6 w-px bg-gray-200 dark:bg-slate-800 flex-shrink-0" />}

            <nav className="flex items-center gap-2 text-sm font-bold text-secondary dark:text-slate-400 overflow-x-auto whitespace-nowrap no-scrollbar flex-1 min-w-0 pr-4">
                <div
                    className="flex items-center gap-2 hover:text-main dark:hover:text-white cursor-pointer transition-colors flex-shrink-0"
                    onClick={() => navigate('/')}
                >
                    <Home size={16} />
                    <span className="hidden sm:inline">Dashboard</span>
                </div>

                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <ChevronRight size={14} className="text-tertiary dark:text-slate-700 flex-shrink-0" />
                        <div
                            className={
                                item.link
                                    ? "hover:text-main dark:hover:text-white cursor-pointer transition-colors flex-shrink-0"
                                    : "text-primary truncate"
                            }
                            onClick={item.link ? () => navigate(item.link) : undefined}
                        >
                            <span>{item.label}</span>
                        </div>
                    </React.Fragment>
                ))}
            </nav>
        </div>
    );
};

export default Breadcrumb;
