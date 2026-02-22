import React from 'react';
import { Eye, Info } from 'lucide-react';
import CourseCard from '@/features/dashboard/components/CourseCard';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const CourseEditorPreview = ({ previewCourse }) => {
    return (
        <div className="lg:col-span-4 hidden lg:block relative h-full animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="sticky top-24 space-y-8 scale-95 origin-top-right transition-all duration-300">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm font-bold text-secondary flex items-center gap-2">
                        <Eye size={16} /> Live Preview
                    </h3>
                    <div className="flex items-center gap-2 text-3xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Student View
                    </div>
                </div>

                {/* The Card Component - Floating clean style (No box) */}
                <div className="pointer-events-none select-none transform transition-all duration-500 hover:scale-[1.02]">
                    <CourseCard course={previewCourse} disabled={true} />
                </div>

                {/* Helper / Tips - Using shared Alert component with info variant */}
                <Alert variant="info" className="p-6 rounded-3xl shadow-none">
                    <Info className="h-5 w-5" />
                    <AlertTitle className="font-bold text-blue-950 text-sm mb-3">
                        Course Editor Tips
                    </AlertTitle>
                    <AlertDescription>
                        <ul className="text-xs text-blue-900/70 space-y-2.5 list-none leading-relaxed">
                            <li className="flex gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span className="font-medium">
                                    <span className="text-blue-950 font-semibold">Thumbnail:</span> Use 16:9 high-resolution images for professional look.
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span className="font-medium">
                                    <span className="text-blue-950 font-semibold">Title:</span> Keep it concise and action-oriented for better engagement.
                                </span>
                            </li>
                        </ul>
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
};

export default CourseEditorPreview;
