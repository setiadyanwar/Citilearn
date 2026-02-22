import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, GripVertical, Video, FileText, HelpCircle, Trash2, Edit, ChevronDown, ChevronRight, Clock, Save, X, CheckSquare, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reorder } from 'framer-motion';


const ModuleEditModal = ({ module, onSave, onClose }) => {
    const [editData, setEditData] = useState({
        title: module?.title || '',
        description: module?.description || ''
    });

    // Use Portal for Module Modal as well to avoid z-index/overflow issues
    return createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-100 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all scale-100">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-bold text-main">
                            {module ? 'Edit Module' : 'New Module'}
                        </h3>
                        <button onClick={onClose} className="text-tertiary hover:text-main transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-2.5">
                            <div className="space-y-0.5">
                                <label className="text-sm font-bold text-main tracking-tight">Module Title</label>
                                <p className="text-xs text-secondary font-medium">Use a clear title for this learning section.</p>
                            </div>
                            <input
                                type="text"
                                value={editData.title}
                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                placeholder="e.g., Module 1: Introduction"
                                className="w-full px-0 py-2 border-b-2 border-slate-100 focus:border-primary focus:outline-none text-lg font-bold transition-all placeholder-slate-200 bg-transparent text-main"
                                autoFocus
                            />
                        </div>

                        <div className="space-y-2.5">
                            <div className="space-y-0.5">
                                <label className="text-sm font-bold text-main tracking-tight">Module Description</label>
                                <p className="text-xs text-secondary font-medium">Explain the objectives and what learners will achieve.</p>
                            </div>
                            <textarea
                                value={editData.description}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                placeholder="Write 1-2 sentences about this module..."
                                rows={3}
                                className="w-full px-5 py-4 bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-slate-200 rounded-2xl focus:outline-none transition-all resize-none text-sm placeholder-slate-300 font-medium text-main"
                            />
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-5 py-2 text-sm font-bold text-secondary hover:text-main transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => onSave(editData)}
                                className="px-6 py-2 bg-citilearn-green text-white text-sm font-bold rounded-xl hover:bg-emerald-600 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

const CurriculumTab = ({ courseId }) => {
    const [expandedModules, setExpandedModules] = useState(new Set(courseId ? [1] : []));
    const [editingModule, setEditingModule] = useState(null);
    const [showModuleModal, setShowModuleModal] = useState(false);
    const [testPickerModuleId, setTestPickerModuleId] = useState(null); // which module's Test picker is open

    // Sample data matching user request
    const [modules, setModules] = useState(courseId ? [
        {
            id: 1,
            title: "Pre-Assessment",
            description: "Initial knowledge check",
            lessons: [
                {
                    id: "pt1",
                    title: "Course Pre-Test",
                    type: "pre-test",
                    content: "Pre-test Assessment",
                    duration: "15 min",
                    hasAssignment: false
                }
            ]
        },
        {
            id: 2,
            title: "Module 1: UI Fundamentals",
            description: "Core principles of User Interface Design",
            lessons: [
                {
                    id: "l1",
                    title: "UI Design Principles",
                    type: "youtube",
                    content: "https://www.youtube.com/embed/weird_code",
                    duration: "15 min",
                    hasAssignment: false
                },
                {
                    id: "l2",
                    title: "Component Architecture",
                    type: "pdf",
                    content: "/docs/components.pdf",
                    duration: "20 min",
                    hasAssignment: false
                },
                {
                    id: "q1",
                    title: "Module 1 Quiz",
                    type: "quiz",
                    content: "Quiz Content",
                    duration: "10 min",
                    hasAssignment: false
                }
            ]
        },
        {
            id: 3,
            title: "Post-Assessment",
            description: "Final evaluation",
            lessons: [
                {
                    id: "final-test",
                    title: "Course Post-Test",
                    type: "post-test",
                    content: "Final Exam",
                    duration: "30 min",
                    hasAssignment: false
                }
            ]
        }
    ] : []);

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => {
            const newSet = new Set(prev);
            if (newSet.has(moduleId)) {
                newSet.delete(moduleId);
            } else {
                newSet.add(moduleId);
            }
            return newSet;
        });
    };

    const handleSaveModule = (data) => {
        if (editingModule) {
            // Update existing module
            setModules(prev => prev.map(m =>
                m.id === editingModule.id
                    ? { ...m, ...data }
                    : m
            ));
        } else {
            // Add new module
            const newModule = {
                id: Date.now(),
                ...data,
                lessons: []
            };
            setModules(prev => [...prev, newModule]);
            setExpandedModules(prev => new Set([...prev, newModule.id]));
        }
        setShowModuleModal(false);
        setEditingModule(null);
    };

    const handleDeleteModule = (moduleId) => {
        if (confirm('Are you sure you want to delete this module and all its lessons?')) {
            setModules(prev => prev.filter(m => m.id !== moduleId));
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'youtube': return <Video size={16} className="text-blue-600" />;
            case 'pdf': return <FileText size={16} className="text-orange-600" />;
            case 'quiz': return <HelpCircle size={16} className="text-purple-600" />;
            case 'pre-test': return <BookOpen size={16} className="text-indigo-600" />;
            case 'post-test': return <CheckSquare size={16} className="text-green-600" />;
            default: return <FileText size={16} className="text-secondary" />;
        }
    };

    // More subtle badges for minimalist look
    const getTypeBadge = (type) => {
        switch (type) {
            case 'youtube': return 'bg-blue-50/50 text-blue-600';
            case 'pdf': return 'bg-orange-50/50 text-orange-600';
            case 'quiz': return 'bg-purple-50/50 text-purple-600';
            case 'pre-test': return 'bg-indigo-50/50 text-indigo-600';
            case 'post-test': return 'bg-green-50/50 text-green-600';
            default: return 'bg-gray-100/50 text-secondary';
        }
    };

    return (
        <div className="space-y-8 pb-4">
            {/* Header - Minimalist Text Only */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gray-200 pb-4 gap-4">
                <div>
                    <h3 className="text-xl font-bold text-main">Curriculum</h3>
                    <p className="text-sm text-secondary mt-1">
                        {modules.length} modules • {modules.reduce((acc, m) => acc + m.lessons.length, 0)} items
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingModule(null);
                        setShowModuleModal(true);
                    }}
                    className="text-sm font-bold text-citilearn-green hover:text-emerald-700 flex items-center gap-2 px-3 py-2 hover:bg-emerald-50 rounded-lg transition-colors w-full sm:w-auto justify-center sm:justify-start border border-emerald-100 sm:border-transparent"
                >
                    <Plus size={18} /> Add Module
                </button>
            </div>

            {/* Modules List - Clean List Style (No Cards/Containers) */}
            {modules.length > 0 ? (
                <Reorder.Group axis="y" values={modules} onReorder={setModules} className="space-y-6">
                    {modules.map((module, moduleIndex) => {
                        const isExpanded = expandedModules.has(module.id);

                        return (
                            <Reorder.Item key={module.id} value={module} className="group">
                                {/* Module Header - Transparent */}
                                <div className="flex items-start gap-4 py-2 hover:bg-gray-50 px-2 rounded-xl transition-colors cursor-pointer" onClick={() => toggleModule(module.id)}>
                                    <div className="mt-1 text-tertiary hover:text-main cursor-grab active:cursor-grabbing" onClick={(e) => e.stopPropagation()}>
                                        <GripVertical size={20} />
                                    </div>

                                    <div className="mt-1 text-secondary group-hover:text-primary transition-colors">
                                        {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-3">
                                            <h4 className="text-base md:text-lg font-bold text-main group-hover:text-primary transition-colors truncate">
                                                {moduleIndex + 1}. {module.title}
                                            </h4>
                                            {/* Actions appear on hover on desktop, always visible or better toggle on mobile */}
                                            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                <button onClick={(e) => { e.stopPropagation(); setEditingModule(module); setShowModuleModal(true); }} className="p-1.5 text-secondary hover:text-primary rounded-lg hover:bg-gray-100">
                                                    <Edit size={14} />
                                                </button>
                                                <button onClick={(e) => { e.stopPropagation(); handleDeleteModule(module.id); }} className="p-1.5 text-secondary hover:text-red-500 rounded-lg hover:bg-red-50">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        {module.description && (
                                            <p className="text-sm text-secondary mt-1">{module.description}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Lessons List - Indented Clean List */}
                                {isExpanded && (
                                    <div className="pl-8 sm:pl-14 pt-2 space-y-1 relative">
                                        {/* Vertical Guide Line */}
                                        <div className="absolute left-[17px] sm:left-[29px] top-2 bottom-4 w-px bg-gray-200/50"></div>

                                        {module.lessons.map((lesson, lessonIndex) => (
                                            <div
                                                key={lesson.id}
                                                className="relative flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-white border border-transparent hover:border-gray-100 transition-all group/lesson"
                                            >
                                                {/* Horizontal Guide Line */}
                                                <div className="absolute -left-[15px] sm:-left-[27px] top-1/2 w-3 sm:w-4 h-px bg-gray-200/50"></div>

                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getTypeBadge(lesson.type)}`}>
                                                    {getTypeIcon(lesson.type)}
                                                </div>

                                                <div className="flex-1 min-w-0 flex items-center justify-between">
                                                    <div>
                                                        <h5 className="text-sm font-bold text-main group-hover/lesson:text-primary transition-colors">
                                                            {lesson.title}
                                                        </h5>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className="text-3xs  font-bold text-secondary opacity-60">
                                                                {lesson.type.replace('-', ' ')}
                                                            </span>
                                                            <span className="flex items-center gap-1 text-3xs font-bold text-secondary opacity-60">
                                                                <Clock size={10} /> {lesson.duration || '15 min'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover/lesson:opacity-100 transition-opacity">
                                                        <Link
                                                            to={['quiz', 'pre-test', 'post-test'].includes(lesson.type)
                                                                ? `/admin/course/${courseId}/test/${lesson.type}?moduleId=${module.id}&lessonId=${lesson.id}`
                                                                : `/admin/course/${courseId}/module/${module.id}/lesson/${lesson.id}`
                                                            }
                                                            className="text-3xs md:text-xs font-bold text-secondary hover:text-primary px-2 md:px-3 py-1 md:py-1.5 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button className="text-secondary hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Add Item Actions */}
                                        <div className="relative pt-2 pl-2 sm:pl-3">
                                            <div className="absolute -left-[15px] sm:-left-[27px] top-5 w-3 sm:w-4 h-px bg-gray-200/50"></div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <Link
                                                    to={`/admin/course/${courseId}/module/${module.id}/lesson/new?type=youtube`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-primary bg-white border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg transition-all"
                                                >
                                                    <Plus size={12} /> Lesson
                                                </Link>
                                                <Link
                                                    to={`/admin/course/${courseId}/test/quiz?moduleId=${module.id}`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-purple-600 bg-white border border-gray-200 hover:border-purple-200 px-3 py-1.5 rounded-lg transition-all"
                                                >
                                                    <Plus size={12} /> Quiz
                                                </Link>
                                                <div className="relative">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setTestPickerModuleId(testPickerModuleId === module.id ? null : module.id); }}
                                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-indigo-600 bg-white border border-gray-200 hover:border-indigo-200 px-3 py-1.5 rounded-lg transition-all"
                                                    >
                                                        <Plus size={12} /> Test
                                                    </button>

                                                    {/* Test type picker dropdown */}
                                                    {testPickerModuleId === module.id && (
                                                        <>
                                                            {/* Backdrop to close on outside click */}
                                                            <div
                                                                className="fixed inset-0 z-10"
                                                                onClick={() => setTestPickerModuleId(null)}
                                                            />
                                                            <div className="absolute bottom-full left-0 mb-1.5 z-20 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden min-w-[140px] animate-in fade-in slide-in-from-bottom-1 duration-150">
                                                                <Link
                                                                    to={`/admin/course/${courseId}/test/pre-test?moduleId=${module.id}`}
                                                                    onClick={() => setTestPickerModuleId(null)}
                                                                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-secondary hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                                                >
                                                                    <BookOpen size={13} className="text-indigo-500" />
                                                                    Pre-test
                                                                </Link>
                                                                <div className="h-px bg-gray-100 mx-2" />
                                                                <Link
                                                                    to={`/admin/course/${courseId}/test/post-test?moduleId=${module.id}`}
                                                                    onClick={() => setTestPickerModuleId(null)}
                                                                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-secondary hover:text-green-600 hover:bg-green-50 transition-colors"
                                                                >
                                                                    <CheckSquare size={13} className="text-green-500" />
                                                                    Post-test
                                                                </Link>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Reorder.Item>
                        );
                    })}
                </Reorder.Group>
            ) : (
                <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-gray-100/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Video className="text-tertiary" size={32} />
                    </div>
                    <h4 className="text-main font-bold mb-1">Start building curriculum</h4>
                    <p className="text-sm text-secondary mb-4">No modules added yet.</p>
                    <button
                        onClick={() => {
                            setEditingModule(null);
                            setShowModuleModal(true);
                        }}
                        className="text-sm font-bold text-citilearn-green hover:text-emerald-700 inline-flex items-center gap-2"
                    >
                        <Plus size={16} /> Create First Module
                    </button>
                </div>
            )}

            {/* Module Edit Modal - Simplified */}
            {showModuleModal && (
                <ModuleEditModal
                    module={editingModule}
                    onSave={handleSaveModule}
                    onClose={() => {
                        setShowModuleModal(false);
                        setEditingModule(null);
                    }}
                />
            )}
        </div>
    );
};

export default CurriculumTab;
