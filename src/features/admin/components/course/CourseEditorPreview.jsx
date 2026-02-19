import React from 'react';
import { Eye, Info } from 'lucide-react';
import CourseCard from '@/features/dashboard/components/CourseCard';

const CourseEditorPreview = ({ previewCourse }) => {
    return (
        <div className="lg:col-span-4 hidden lg:block relative h-full animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="sticky top-24 space-y-8 scale-95 origin-top-right transition-all duration-300">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Eye size={16} /> Live Preview
                    </h3>
                    <div className="flex items-center gap-2 text-3xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Student View
                    </div>
                </div>

                {/* The Card Component - Floating clean style (No box) */}
                <div className="pointer-events-none select-none transform transition-all duration-500 hover:scale-[1.02]">
                    <CourseCard course={previewCourse} disabled={true} />
                </div>

                {/* Helper / Tips - Custom Blue */}
                <div className="bg-slate-50/80 border border-slate-100 p-6 rounded-3xl shadow-none">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-white border border-slate-100 rounded-xl text-primary">
                            <Info size={20} />
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-slate-900 text-sm leading-none">
                                Course Editor Tips
                            </h4>
                            <ul className="text-xs text-slate-500 space-y-2.5 list-none leading-relaxed font-medium">
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span><strong>Thumbnail:</strong> Use 16:9 high-resolution images for professional look.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span><strong>Title:</strong> Keep it concise and action-oriented for better engagement.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseEditorPreview;
