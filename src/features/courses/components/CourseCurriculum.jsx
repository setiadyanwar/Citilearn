import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, FileText, CheckCircle2 } from 'lucide-react';

const CourseCurriculum = ({ course }) => {
    const navigate = useNavigate();
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

    const handleLessonClick = (lesson) => {
        // Navigate to the learning page with the specific lesson active
        navigate(`/profile/learning/${course.id}`, { state: { targetLessonId: lesson.id } });
    };

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between pb-2">
                <h2 className="text-xl md:text-2xl font-bold text-main dark:text-white">Course Curriculum</h2>
                <span className="text-base font-medium text-secondary dark:text-slate-500">{totalLessons} Lesson Total</span>
            </div>

            <div className="space-y-6">
                {(() => {
                    // Load completed lessons from localStorage
                    const savedCompleted = localStorage.getItem(`course_progress_${course.id}`);
                    const completedSet = savedCompleted ? new Set(JSON.parse(savedCompleted)) : new Set();
                    let lastIncompleteFound = false;

                    return course.modules.map((module, mIdx) => (
                        <div key={module.id} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden transition-all">
                            <div className="px-10 py-5 flex items-center justify-between bg-white dark:bg-slate-900 border-b border-gray-50 dark:border-slate-800">
                                <div className="flex items-center gap-5">
                                    <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-slate-700 flex items-center justify-center text-sm font-bold text-main dark:text-slate-500 shrink-0">
                                        {String(mIdx + 1).padStart(2, '0')}
                                    </div>
                                    <h3 className="font-bold text-base md:text-lg text-main dark:text-white">{module.title}</h3>
                                </div>
                                <span className="text-xs font-bold text-tertiary dark:text-slate-600 bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-gray-50 dark:border-slate-800 shrink-0">{module.lessons.length} Lessons</span>
                            </div>
                            <div className="divide-y divide-gray-50 dark:divide-slate-800 bg-white dark:bg-slate-900">
                                {module.lessons.map((lesson, lIdx) => {
                                    const isCompleted = completedSet.has(lesson.id);
                                    const isLocked = lastIncompleteFound;

                                    if (!isCompleted) {
                                        lastIncompleteFound = true;
                                    }

                                    return (
                                        <div key={lesson.id}
                                            onClick={() => !isLocked && handleLessonClick(lesson)}
                                            className={`px-10 py-5 flex items-center justify-between transition-colors ${isLocked ? 'opacity-50 cursor-not-allowed bg-gray-50/30' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30 cursor-pointer group/lesson'}`}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`transition-colors shrink-0 ${isLocked ? 'text-gray-300' : 'text-tertiary dark:text-white group-hover/lesson:text-primary'}`}>
                                                    {lesson.type === 'video' ? <Play size={18} /> : <FileText size={18} />}
                                                </div>
                                                <span className={`text-sm md:text-base font-medium transition-colors ${isLocked ? 'text-gray-400' : 'text-secondary dark:text-slate-400 group-hover/lesson:text-main dark:group-hover:text-white'}`}>
                                                    {lesson.title}
                                                </span>
                                            </div>
                                            {isCompleted ? (
                                                <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500">
                                                    <CheckCircle2 size={18} />
                                                </div>
                                            ) : (
                                                <div className={isLocked ? "text-gray-200" : "text-gray-200 dark:text-main"}>
                                                    <CheckCircle2 size={18} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ));
                })()}
            </div>
        </section>
    );
};

export default CourseCurriculum;
