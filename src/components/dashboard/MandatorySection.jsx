import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, Calendar } from 'lucide-react';
import DashboardCourseCard from './DashboardCourseCard';

const MandatorySection = ({ courses = [] }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            scrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 relative overflow-hidden group/section h-full flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-lg font-bold text-main dark:text-white flex items-center gap-3">
                        Mandatory Courses
                        <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-500 border border-red-100 dark:bg-red-500/10 dark:border-red-500/20 text-xs font-bold">
                            High Priority
                        </span>
                    </h2>
                    <p className="text-sm text-secondary dark:text-slate-400 mt-1 flex items-center gap-2">
                        Mandatory Roadmap compliance for Q4
                        <button className="text-primary font-bold hover:underline">Show All</button>
                    </p>
                </div>

                <div className="hidden sm:flex items-center gap-3">
                    <div className="text-right">
                        <div className="text-sm text-secondary dark:text-slate-400">Finish</div>
                        <div className="text-sm text-secondary dark:text-slate-400">before</div>
                    </div>
                    <div className="border border-primary rounded-xl overflow-hidden w-16 text-center">
                        <div className="bg-white dark:bg-slate-900 py-1 text-sm font-semibold text-main dark:text-white border-b border-gray-100 dark:border-slate-700">
                            Jan
                        </div>
                        <div className="bg-white dark:bg-slate-900 py-1 text-xl font-bold text-primary">
                            24
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative">
                {/* Scroll Buttons */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-md text-tertiary hover:text-primary transition-all opacity-0 group-hover/section:opacity-100 disabled:opacity-0 -ml-3"
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-md text-tertiary hover:text-primary transition-all opacity-0 group-hover/section:opacity-100 disabled:opacity-0 -mr-3"
                >
                    <ChevronRight size={18} />
                </button>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-4 pb-4 -mx-2 px-2 snap-x no-scrollbar scroll-smooth"
                >
                    {courses.map(course => (
                        <div key={course.id} className="min-w-[300px] md:min-w-[441px] md:w-[441px] snap-center shrink-0">
                            <DashboardCourseCard course={course} variant="mandatory" />
                        </div>
                    ))}
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-1.5 mt-2">
                    {courses.slice(0, 3).map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all ${idx === 0 ? 'w-6 bg-primary' : 'w-1.5 bg-gray-200 dark:bg-slate-700'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MandatorySection;
