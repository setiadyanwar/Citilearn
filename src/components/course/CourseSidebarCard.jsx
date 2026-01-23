import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle2, Share2, BookOpen } from 'lucide-react';

const CourseSidebarCard = ({ course }) => {
    const navigate = useNavigate();

    return (
        <div className="relative">
            <div className="space-y-6">
                {/* Main Course Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-none overflow-hidden transition-colors">
                    <div className="relative h-56 group cursor-pointer overflow-hidden">
                        <img
                            src={course.thumbnail}
                            alt="Thumbnail"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 transform scale-90 group-hover:scale-110 transition-transform duration-300">
                                <Play size={24} fill="currentColor" className="ml-1" />
                            </div>
                        </div>
                        {/* Status Badge */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                            <span className="text-[10px] font-bold text-slate-700">In Progress</span>
                        </div>
                    </div>

                    <div className="p-10">
                        <div className="flex items-center justify-between mb-3 px-0.5 text-gray-400 dark:text-slate-500">
                            <span className="text-xs font-bold font-inter tracking-tight">Your Progress</span>
                            <span className="text-sm font-black text-[#059669]">{course.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#F1F5F9] dark:bg-slate-800 rounded-full overflow-hidden mb-8">
                            <div className="h-full bg-[#059669] rounded-full" style={{ width: `${course.progress}%` }} />
                        </div>

                        <button
                            onClick={() => navigate(`/learn/${course.id}`)}
                            className="w-full h-14 bg-[#059669] hover:bg-[#047857] text-white font-bold text-lg rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/10 hover:-translate-y-0.5 transition-all mb-4"
                        >
                            {course.progress === 0 ? 'Start Learning Now' : 'Continue Leaning'}
                        </button>

                        <p className="text-center text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-medium tracking-tight">
                            Ready to advance your skills? Let's start learning!
                        </p>
                    </div>
                </div>

                {/* Secondary Card (Learning Objectives) */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-10 shadow-sm">
                    <h4 className="font-bold text-base text-citilink-dark dark:text-white mb-6">Learning Objectives & Syllabus (RPS)</h4>
                    <ul className="space-y-5">
                        {(course.learningOutcomes || [
                            "Industry-standard aviation courseware",
                            "Flexible 24/7 multi-device access",
                            "Internal training completion record"
                        ]).map((outcome, index) => (
                            <li key={index} className="flex items-start gap-3.5 text-slate-600 dark:text-slate-400">
                                <BookOpen size={20} className="text-gray-300 dark:text-slate-700 mt-0.5 shrink-0" />
                                <span className="text-sm font-medium leading-relaxed">{outcome}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CourseSidebarCard;
