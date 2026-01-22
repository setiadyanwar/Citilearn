import React from 'react';
import { Play, FileText, CheckCircle2 } from 'lucide-react';

const CourseCurriculum = ({ course }) => {
    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
                <h2 className="text-xl md:text-2xl font-bold text-citilink-dark dark:text-white">Course Curriculum</h2>
                <span className="text-sm font-bold text-gray-400 dark:text-slate-500">{course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons Total</span>
            </div>

            <div className="space-y-4">
                {course.modules.map((module, mIdx) => (
                    <div key={module.id} className="border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 hover:border-primary/30 dark:hover:border-primary/50 transition-all group">
                        <div className="bg-gray-50/50 dark:bg-slate-800/50 px-4 md:px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-xs md:text-sm font-bold text-gray-500 dark:text-slate-400 shadow-sm shrink-0">
                                    {String(mIdx + 1).padStart(2, '0')}
                                </div>
                                <h3 className="font-bold text-base md:text-lg text-citilink-dark dark:text-white line-clamp-1">{module.title}</h3>
                            </div>
                            <span className="text-[10px] md:text-xs font-bold text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-gray-100 dark:border-slate-800 shrink-0">{module.lessons.length} Lessons</span>
                        </div>
                        <div className="divide-y divide-gray-50 dark:divide-slate-800">
                            {module.lessons.map((lesson, lIdx) => (
                                <div key={lesson.id} className="px-4 md:px-6 py-3 md:py-4 flex items-center justify-between hover:bg-green-50/30 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group/lesson">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className="text-gray-300 dark:text-slate-700 group-hover/lesson:text-primary transition-colors shrink-0">
                                            {lesson.type === 'video' ? <Play size={18} fill="currentColor" /> : <FileText size={18} />}
                                        </div>
                                        <span className="text-sm md:text-base font-medium text-gray-600 dark:text-slate-300 group-hover/lesson:text-gray-900 dark:group-hover:text-white transition-colors line-clamp-1">{lesson.title}</span>
                                    </div>
                                    {course.progress > (mIdx * 30 + lIdx * 10) ? (
                                        <CheckCircle2 size={18} className="text-emerald-500" />
                                    ) : (
                                        <div className="text-xs font-bold text-gray-300 dark:text-slate-600 border border-gray-100 dark:border-slate-800 px-2 py-1 rounded-full group-hover/lesson:border-primary/20 group-hover/lesson:text-primary transition-colors">
                                            10:00
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CourseCurriculum;
