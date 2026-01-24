import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    showPrevNext = true,
    className = ""
}) => {
    // Helper to generate page numbers
    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                range.push(i);
            }
        }

        let l;
        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={`flex items-center justify-center gap-3 mt-12 select-none ${className}`}>
            {/* Previous Button */}
            {showPrevNext && (
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`
                        w-11 h-11 flex items-center justify-center rounded-2xl border transition-all duration-300
                        ${currentPage === 1
                            ? 'bg-gray-50/50 dark:bg-slate-900/30 text-gray-300 dark:text-slate-700 border-gray-100 dark:border-slate-800 cursor-not-allowed'
                            : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 border-gray-100 dark:border-slate-800 hover:bg-primary/5 hover:border-primary/30 hover:text-primary dark:hover:text-primary active:scale-95'
                        }
                    `}
                    aria-label="Previous Page"
                >
                    <ChevronLeft size={20} strokeWidth={2.5} />
                </button>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-2 bg-gray-50/50 dark:bg-slate-900/30 p-1.5 rounded-2xl-m border border-gray-100 dark:border-slate-800">
                {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                        return (
                            <div key={`dots-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-400 dark:text-slate-600">
                                <MoreHorizontal size={18} />
                            </div>
                        );
                    }

                    const isActive = currentPage === page;

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`
                                min-w-10 h-10 px-4 flex items-center justify-center rounded-xl-p text-sm font-black transition-all duration-300
                                ${isActive
                                    ? 'bg-primary text-white transform scale-105'
                                    : 'text-gray-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary active:scale-95'
                                }
                            `}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* Next Button */}
            {showPrevNext && (
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`
                        w-11 h-11 flex items-center justify-center rounded-2xl border transition-all duration-300
                        ${currentPage === totalPages
                            ? 'bg-gray-50/50 dark:bg-slate-900/30 text-gray-300 dark:text-slate-700 border-gray-100 dark:border-slate-800 cursor-not-allowed'
                            : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 border-gray-100 dark:border-slate-800 hover:bg-primary/5 hover:border-primary/30 hover:text-primary dark:hover:text-primary active:scale-95'
                        }
                    `}
                    aria-label="Next Page"
                >
                    <ChevronRight size={20} strokeWidth={2.5} />
                </button>
            )}
        </div>
    );
};

export default Pagination;
