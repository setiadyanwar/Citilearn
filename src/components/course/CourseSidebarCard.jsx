import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle2, Share2 } from 'lucide-react';

const CourseSidebarCard = ({ course }) => {
    const navigate = useNavigate();

    return (
        <div className="relative">
            <div className="sticky top-28 space-y-6">
                {/* Main Course Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none overflow-hidden transition-colors">
                    <div className="relative h-56 group cursor-pointer overflow-hidden">
                        <img
                            src={course.thumbnail}
                            alt="Thumbnail"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 dark:group-hover:bg-black/60 transition-colors flex items-center justify-center">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 transform scale-90 group-hover:scale-110 transition-transform duration-300">
                                <Play size={24} fill="currentColor" className="ml-1" />
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wide">Your Progress</span>
                            <span className="text-xl font-black text-primary">{course.progress}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden mb-8">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }} />
                        </div>

                        <button
                            onClick={() => navigate(`/learn/${course.id}`)}
                            className="w-full btn-primary !h-14 !text-lg !rounded-xl justify-center shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                        >
                            {course.progress === 0 ? 'Start Learning Now' : 'Continue Learning'}
                        </button>

                        <p className="text-center text-xs text-gray-400 dark:text-slate-500 font-medium mt-4">
                            30-Day Money-Back Guarantee
                        </p>
                    </div>
                </div>

                {/* Secondary Card */}
                <div className="bg-gray-50 dark:bg-slate-800/40 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 transition-colors">
                    <h4 className="font-bold text-base text-citilink-dark dark:text-white mb-4">Training Includes:</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-gray-600 dark:text-slate-400">
                            <CheckCircle2 size={20} className="text-primary mt-0.5 shrink-0" />
                            <span className="text-sm font-medium">Access on mobile and TV</span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-600 dark:text-slate-400">
                            <CheckCircle2 size={20} className="text-primary mt-0.5 shrink-0" />
                            <span className="text-sm font-medium">Full lifetime access</span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-600 dark:text-slate-400">
                            <CheckCircle2 size={20} className="text-primary mt-0.5 shrink-0" />
                            <span className="text-sm font-medium">Certificate of Completion</span>
                        </li>
                    </ul>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between gap-4">
                        <button className="flex-1 py-3 rounded-lg border border-gray-200 dark:border-slate-800 text-sm font-bold text-gray-600 dark:text-slate-400 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                            Asset
                        </button>
                        <button className="flex-1 py-3 rounded-lg border border-gray-200 dark:border-slate-800 text-sm font-bold text-gray-600 dark:text-slate-400 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors">
                            <Share2 size={18} /> Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseSidebarCard;
