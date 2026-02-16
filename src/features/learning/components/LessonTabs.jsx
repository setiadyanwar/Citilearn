import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Globe, FileText, Download, BookOpen } from 'lucide-react';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import UserProfile from '@/components/common/UserProfile';
import LessonListItem from './LessonListItem';

const LessonTabs = ({ activeTab, setActiveTab, activeLesson, course, setActiveLesson, completedLessons }) => {
    return (
        <div className="max-w-3xl">
            <div className="flex items-center overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-slate-800 mb-6 gap-2">
                {/* Mobile-only Curriculum Tab */}
                <button
                    onClick={() => setActiveTab('curriculum')}
                    className={`lg:hidden px-6 py-3 text-xs font-bold border-b-2 transition-colors shrink-0 ${activeTab === 'curriculum'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-secondary dark:text-slate-500 hover:text-gray-700 dark:hover:text-white'
                        }`}
                >
                    Syllabus (RPS)
                </button>

                {['Overview', 'Resources', 'Instructor'].map((tab) => (
                    <button
                        key={tab.toLowerCase()}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`px-6 py-3 text-xs font-bold border-b-2 transition-colors shrink-0 ${activeTab === tab.toLowerCase()
                            ? 'border-primary text-primary'
                            : 'border-transparent text-secondary dark:text-slate-500 hover:text-gray-700 dark:hover:text-white'
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
                                <Card key={module.id} padding="p-0" className="overflow-hidden">
                                    <div className="px-4 py-3 bg-gray-50/30 dark:bg-slate-800/30 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between">
                                        <span className="text-3xs font-bold text-tertiary dark:text-slate-500 uppercase">Module {mIdx + 1}</span>
                                        <span className="text-3xs font-bold text-tertiary dark:text-slate-600">{module.lessons.length} Item</span>
                                    </div>
                                    <div className="divide-y divide-gray-50 dark:divide-slate-800">
                                        {module.lessons.map((lesson) => (
                                            <LessonListItem
                                                key={lesson.id}
                                                lesson={lesson}
                                                isActive={activeLesson?.id === lesson.id}
                                                isCompleted={completedLessons?.has(lesson.id)}
                                                onClick={() => {
                                                    setActiveLesson(lesson);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                            />
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-[13px] font-bold">
                                <div className="flex items-center gap-2 text-tertiary font-bold">
                                    <span>Source:</span>
                                    <Badge variant="secondary">Youtube</Badge>
                                </div>
                                <div className="flex items-center gap-2 text-tertiary">
                                    <Clock size={16} />
                                    <span>Duration:</span>
                                    <span className="text-secondary dark:text-slate-300">15m</span>
                                </div>
                                <div className="flex items-center gap-2 text-tertiary">
                                    <Globe size={16} />
                                    <span>Language:</span>
                                    <span className="text-secondary dark:text-slate-300">English</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-main dark:text-white mb-3">About This Lesson</h3>
                                <p className="text-secondary dark:text-slate-400 text-sm leading-relaxed font-medium">
                                    This module covers critical aspects of <strong>{activeLesson?.title}</strong>.
                                    In this session, we will explore the fundamental procedures required for maintaining high safety standards.
                                    Please ensure you watch the entire video and complete the assessment to validate your understanding.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-main dark:text-white">Learning Outcomes</h3>
                                <div className="space-y-3">
                                    {(course.learningOutcomes || [
                                        "Implement hazard identification and risk assessment (HIRA) in airport operations.",
                                        "Develop robust aviation safety policies aligned with Citilink standards.",
                                        "Execute reactive and proactive safety monitoring methods and safety assurance."
                                    ]).map((outcome, index) => (
                                        <div key={index} className="flex items-start gap-3.5 text-secondary dark:text-slate-400">
                                            <div className="mt-1 shrink-0 text-tertiary"><BookOpen size={20} /></div>
                                            <span className="text-sm font-medium leading-relaxed">{outcome}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'resources' && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-main dark:text-white mb-4">Downloadable Materials</h3>
                            <ResourceItem
                                title="Lesson Slide Deck.pdf"
                                size="2.4 MB"
                                type="PDF Document"
                                iconColor="bg-red-50 text-red-500"
                            />
                            <ResourceItem
                                title="Safety Checklist.xlsx"
                                size="1.1 MB"
                                type="Spreadsheet"
                                iconColor="bg-emerald-50 text-emerald-500"
                            />
                        </div>
                    )}

                    {activeTab === 'instructor' && (
                        <div className="space-y-6">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {(activeLesson?.instructors || (activeLesson?.instructor ? [activeLesson.instructor] : [])).length > 0 ? (
                                    (activeLesson?.instructors || [activeLesson.instructor]).map((ins, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-slate-800/20 border border-gray-100 dark:border-slate-800">
                                            <UserProfile
                                                imageUrl={ins.avatar}
                                                name={ins.name}
                                                size="sm"
                                                showBorder={true}
                                                className="shrink-0"
                                            />
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-bold text-main dark:text-white truncate">{ins.name}</h4>
                                                <p className="text-3xs text-tertiary dark:text-slate-500 font-bold">Instructor</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-slate-800/20 border border-gray-100 dark:border-slate-800">
                                        <UserProfile
                                            imageUrl={null}
                                            name="Citilink Academy"
                                            size="sm"
                                            showBorder={true}
                                            className="shrink-0"
                                        />
                                        <div>
                                            <h4 className="text-sm font-bold text-main dark:text-white">Citilink Academy</h4>
                                            <p className="text-3xs text-tertiary dark:text-slate-500 font-bold">Instructor</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const ResourceItem = ({ title, size, type, iconColor }) => (
    <Card padding="p-4" className="flex items-center justify-between hover:border-primary/30 transition-all group cursor-pointer">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 ${iconColor} rounded-lg flex items-center justify-center shrink-0`}>
                <FileText size={20} />
            </div>
            <div>
                <div className="text-xs font-bold text-secondary dark:text-slate-300 group-hover:text-primary transition-colors">{title}</div>
                <div className="text-3xs text-tertiary dark:text-slate-500 font-medium">{size} • {type}</div>
            </div>
        </div>
        <button className="p-2 text-tertiary dark:text-slate-600 group-hover:text-primary transition-colors">
            <Download size={18} />
        </button>
    </Card>
);

export default LessonTabs;
