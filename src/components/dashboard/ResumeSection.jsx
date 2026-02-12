import MandatoryIllustration from './MandatoryIllustration';
import DashboardCourseCard from './DashboardCourseCard';

const ResumeSection = ({ courses = [] }) => {
    const isEmpty = courses.length === 0;

    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <h2 className="text-lg font-bold text-main dark:text-white">Resume Training</h2>
                <button className="text-sm font-bold text-primary hover:underline">Show All</button>
            </div>

            <div className={`relative ${isEmpty ? 'flex-1 flex flex-col items-center justify-center' : 'h-[260px]'}`}>
                {isEmpty ? (
                    <div className="flex flex-col items-center justify-center -mt-4">
                        <div className="w-32 aspect-194/148 mb-6">
                            <MandatoryIllustration />
                        </div>
                        <div className="text-center px-4">
                            <h3 className="text-base font-bold text-main dark:text-white mb-2 leading-tight">
                                No active training found
                            </h3>
                            <p className="text-xs text-secondary dark:text-slate-400">
                                You're all caught up! Ready to pick a new skill?
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="h-full overflow-y-auto no-scrollbar pr-1 pb-4 flex flex-col gap-4">
                        {courses.map(course => (
                            <div key={course.id}>
                                <DashboardCourseCard course={course} variant="resume" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Bottom Fade Mask - Only show if not empty */}
                {!isEmpty && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white dark:from-slate-900 to-transparent pointer-events-none z-10 rounded-b-3xl" />
                )}
            </div>
        </div>
    );
};

export default ResumeSection;
