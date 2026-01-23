import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Globe, Info, FileText, Download, Play, CheckCircle2 } from 'lucide-react';

const LessonTabs = ({ activeTab, setActiveTab, activeLesson, course, setActiveLesson, completedLessons }) => {
    return (
        <div className="max-w-3xl">
            <div className="flex items-center overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-slate-800 mb-6 gap-2">
                {/* Mobile-only Curriculum Tab */}
                <button
                    onClick={() => setActiveTab('curriculum')}
                    className={`lg:hidden px-6 py-3 text-xs font-bold capitalize border-b-2 transition-colors flex-shrink-0 ${activeTab === 'curriculum'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 dark:text-slate-500 hover:text-gray-700 dark:hover:text-white'
                        }`}
                >
                    Syllabus (RPS)
                </button>

                {['overview', 'resources', 'instructor'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 text-xs font-bold capitalize border-b-2 transition-colors flex-shrink-0 ${activeTab === tab
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 dark:text-slate-500 hover:text-gray-700 dark:hover:text-white'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'curriculum' && (
                        <div className="space-y-4 lg:hidden">
                            {course.modules.map((module, mIdx) => (
                                <div key={module.id} className="rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                                    <div className="px-4 py-3 bg-gray-50/30 dark:bg-slate-800/30 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase">Module {mIdx + 1}</span>
                                        <span className="text-[10px] font-bold text-gray-300 dark:text-slate-600">{module.lessons.length} Item</span>
                                    </div>
                                    <div className="divide-y divide-gray-50 dark:divide-slate-800">
                                        {module.lessons.map((lesson) => {
                                            const isActive = activeLesson?.id === lesson.id;
                                            const isCompleted = completedLessons?.has(lesson.id);
                                            return (
                                                <button
                                                    key={lesson.id}
                                                    onClick={() => {
                                                        setActiveLesson(lesson);
                                                        // Scroll to top to view video?
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className={`
                                                    w-full px-4 py-3 flex items-start gap-3 transition-colors text-left
                                                    ${isActive ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-gray-50 dark:hover:bg-slate-800'}
                                                `}
                                                >
                                                    <div className={`mt-0.5 ${isActive ? 'text-primary' : 'text-gray-300 dark:text-slate-700'}`}>
                                                        {isActive ? <Play size={14} fill="currentColor" /> : (lesson.type === 'video' ? <Play size={14} /> : <FileText size={14} />)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className={`text-xs font-bold leading-snug mb-0.5 ${isActive ? 'text-primary' : 'text-gray-600 dark:text-slate-400'}`}>
                                                            {lesson.title}
                                                        </div>
                                                        <div className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">15 min</div>
                                                    </div>
                                                    {isCompleted && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                    {activeLesson?.type}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-slate-500">
                                    <Clock size={14} /> 15m Duration
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-slate-500">
                                    <Globe size={14} /> English
                                </span>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-citilink-dark dark:text-white mb-3">About this Lesson</h3>
                                <p className="text-gray-600 dark:text-slate-400 text-sm leading-7">
                                    This module covers critical aspects of <strong>{activeLesson?.title}</strong>.
                                    In this session, we will explore the fundamental procedures required for maintaining high safety standards.
                                    Please ensure you watch the entire video and complete the assessment to validate your understanding.
                                </p>
                            </div>

                            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 flex gap-4">
                                <div className="mt-1 text-blue-500 dark:text-blue-400"><Info size={18} /></div>
                                <div>
                                    <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 mb-1">Learning Outcomes & Objectives (RPS)</h4>
                                    <ul className="text-xs text-blue-800 dark:text-slate-400 space-y-1 list-disc pl-4">
                                        {(course.learningOutcomes || [
                                            `Comprehend core principles of ${course.title}`,
                                            "Identify key aviation safety protocols and compliance requirements",
                                            "Master operational procedures for standard flight operations"
                                        ]).map((outcome, index) => (
                                            <li key={index}>{outcome}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'resources' && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-citilink-dark dark:text-white mb-4">Downloadable Materials</h3>
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl hover:border-primary/30 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-lg flex items-center justify-center">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-700 dark:text-slate-300 group-hover:text-primary transition-colors">Lesson Slide Deck.pdf</div>
                                        <div className="text-[10px] text-gray-400 dark:text-slate-500">2.4 MB • PDF Document</div>
                                    </div>
                                </div>
                                <button className="p-2 text-gray-400 dark:text-slate-600 group-hover:text-primary transition-colors">
                                    <Download size={18} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl hover:border-primary/30 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 rounded-lg flex items-center justify-center">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-700 dark:text-slate-300 group-hover:text-primary transition-colors">Safety Checklist.xlsx</div>
                                        <div className="text-[10px] text-gray-400 dark:text-slate-500">1.1 MB • Spreadsheet</div>
                                    </div>
                                </div>
                                <button className="p-2 text-gray-400 dark:text-slate-600 group-hover:text-primary transition-colors">
                                    <Download size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'instructor' && (
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                                <img src="https://ui-avatars.com/api/?name=Citilink+Academy&background=random" alt="Instructor" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-citilink-dark dark:text-white">Citilink Academy Team</h3>
                                <p className="text-xs text-primary font-bold mb-3">Official Training Partner</p>
                                <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed max-w-lg">
                                    The Citilink Academy Team consists of experienced senior flight instructors and safety experts dedicated to maintaining the highest standards of aviation safety and service excellence.
                                </p>
                                <button className="mt-4 px-4 py-2 border border-blue-100 dark:border-slate-800 text-primary text-xs font-bold rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">
                                    View Instructor Profile
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default LessonTabs;
