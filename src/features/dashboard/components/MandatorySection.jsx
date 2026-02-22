import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, Calendar } from 'lucide-react';
import MandatoryIllustration from './MandatoryIllustration';
import Badge from '@/components/common/Badge';
import CourseCard from './CourseCard';

const MandatorySection = ({ courses = [] }) => {
    const isEmpty = !courses || courses.length === 0;
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
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-4 sm:p-6 relative overflow-hidden group/section h-full flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-lg font-bold text-main dark:text-white flex items-center gap-3">
                        Mandatory Courses
                        <Badge variant={isEmpty ? "outline" : "mandatory"}>
                            {isEmpty ? "Not available" : "High Priority"}
                        </Badge>
                    </h2>
                    <p className="text-sm text-secondary dark:text-slate-400 mt-1 flex items-center gap-2">
                        Mandatory Roadmap compliance for Q4
                        <button className="text-primary font-bold hover:underline">Show All</button>
                    </p>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                    <div className="text-right">
                        <div className="text-xs text-secondary dark:text-slate-400 font-medium">Finish</div>
                        <div className="text-xs text-secondary dark:text-slate-400 font-medium">before</div>
                    </div>
                    <div className="border border-primary rounded-lg overflow-hidden w-12 text-center shadow-sm">
                        <div className="bg-primary/5 dark:bg-slate-900 py-0.5 text-3xs font-bold text-primary uppercase border-b border-primary/20">
                            Jan
                        </div>
                        <div className="bg-white dark:bg-slate-900 py-0.5 text-base font-bold text-main dark:text-white">
                            -
                        </div>
                    </div>
                </div>
            </div>

            {isEmpty ? (
                <div className="flex flex-col items-center justify-center py-6">
                    <div className="w-44 aspect-194/148 mb-6">
                        <MandatoryIllustration />
                    </div>
                    <div className="text-center">
                        <h3 className="text-base font-bold text-main dark:text-white mb-2">
                            No mandatory courses available.
                        </h3>
                        <p className="text-sm text-secondary dark:text-slate-400">
                            Oops... looks like you're off the hook for now
                        </p>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full text-tertiary hover:text-primary transition-all opacity-0 group-hover/section:opacity-100 disabled:opacity-0 -ml-3 border border-gray-100"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full text-tertiary hover:text-primary transition-all opacity-0 group-hover/section:opacity-100 disabled:opacity-0 -mr-3 border border-gray-100"
                    >
                        <ChevronRight size={18} />
                    </button>

                    <div className="absolute -right-6 top-0 bottom-4 w-32 bg-linear-to-l from-white from-20% dark:from-slate-900 to-transparent pointer-events-none z-5" />

                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x no-scrollbar scroll-smooth"
                    >
                        {courses.map(course => (
                            <div key={course.id} className="w-[330px] sm:w-[360px] md:w-[400px] snap-center shrink-0">
                                <CourseCard course={course} variant="mandatory" />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-1.5 mt-4">
                        {courses.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all ${idx === 0 ? 'w-6 bg-primary' : 'w-1.5 bg-gray-200 dark:bg-slate-700'}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MandatorySection;
