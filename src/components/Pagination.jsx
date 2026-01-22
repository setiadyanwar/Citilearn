import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    showFirstLast = true,
    showPrevNext = true
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
        <div className="flex items-center justify-center gap-2 mt-12 select-none">
            {/* Previous Button */}
            {showPrevNext && (
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`
                        w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-200
                        ${currentPage === 1
                            ? 'bg-gray-50 dark:bg-slate-900/50 text-gray-300 dark:text-slate-700 border-gray-200 dark:border-slate-800 cursor-not-allowed'
                            : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 border-gray-300 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary'
                        }
                    `}
                    aria-label="Previous Page"
                >
                    <ChevronLeft size={18} strokeWidth={2.5} />
                </button>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-1.5">
                {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                        return (
                            <div key={`dots-${index}`} className="w-8 h-8 flex items-center justify-center text-gray-400 dark:text-slate-600">
                                <MoreHorizontal size={16} />
                            </div>
                        );
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`
                                min-w-[36px] h-9 px-3 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-200 border
                                ${currentPage === page
                                    ? 'bg-primary text-white border-primary shadow-sm transform scale-105'
                                    : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-600'
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
                        w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-200
                        ${currentPage === totalPages
                            ? 'bg-gray-50 dark:bg-slate-900/50 text-gray-300 dark:text-slate-700 border-gray-200 dark:border-slate-800 cursor-not-allowed'
                            : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 border-gray-300 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary'
                        }
                    `}
                    aria-label="Next Page"
                >
                    <ChevronRight size={18} strokeWidth={2.5} />
                </button>
            )}
        </div>
    );
};

export default Pagination;
