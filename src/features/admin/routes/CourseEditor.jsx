import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import data from '@/data.json';
import { Settings, BookOpen, Users, Clock } from 'lucide-react';
import AdminHeader from '@/features/admin/components/layout/AdminHeader';
import CategoryPicker from '@/features/admin/components/course/editor/CategoryPicker';
import LearningObjectivesManager from '@/features/admin/components/course/editor/LearningObjectivesManager';
import ImageUploader from '@/components/common/ImageUploader';
import CurriculumTab from '@/features/admin/components/course/editor/CurriculumTab';
import LearnersTab from '@/features/admin/components/course/editor/LearnersTab';
import Tabs from '@/components/common/Tabs';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Standard Admin Components
import AdminPageShell from '../components/layout/AdminPageShell';

// Sub-components
import CourseAvailabilitySettings from '../components/course/editor/CourseAvailabilitySettings';
import CourseEditorPreview from '../components/course/editor/CourseEditorPreview';

const CourseEditor = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const isEditing = !!id;

    // FIND EXISTING COURSE
    const existingCourse = isEditing ? data.courses.find(c => c.id === id) : null;

    const validTabs = ['basic', 'curriculum', 'learners'];
    const tabFromUrl = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(
        validTabs.includes(tabFromUrl) ? tabFromUrl : 'basic'
    );
    const [categories, setCategories] = useState(["Safety", "Technical", "Soft Skill", "Leadership", "Service"]);

    // Handle tab change from URL manually if needed
    useEffect(() => {
        if (validTabs.includes(tabFromUrl)) {
            setActiveTab(tabFromUrl);
        }
    }, [tabFromUrl]);

    const [courseData, setCourseData] = useState({
        title: existingCourse?.title || "",
        description: existingCourse?.description || "",
        category: existingCourse?.category || "",
        type: existingCourse?.type || "Mandatory",
        thumbnail: existingCourse?.thumbnail || "",
        status: existingCourse?.status || "Draft",
        startDate: existingCourse?.availableAt ? new Date(existingCourse.availableAt) : undefined,
        endDate: undefined,
        isLifetime: false,
        duration: existingCourse?.duration || "0h 0m",
        modulesCount: existingCourse?.modules?.length || 0,
        learningObjectives: existingCourse?.learningObjectives || [],
    });

    // Preview Object (Reactive)
    const previewCourse = {
        id: 'preview',
        title: courseData.title || 'Untitled Course',
        description: courseData.description || 'No description provided yet.',
        category: courseData.category,
        thumbnail: courseData.thumbnail,
        status: 'Not Started',
        availableAt: courseData.isLifetime ? null : courseData.startDate,
        progress: 0,
        duration: courseData.duration,
        modulesCount: courseData.modulesCount,
    };

    const tabItems = [
        { id: 'basic', label: 'Basic Info', icon: Settings },
        { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
        { id: 'learners', label: 'Learners', icon: Users },
    ];

    const handleUpdateData = (newData) => {
        setCourseData(prev => ({ ...prev, ...newData }));
    };

    return (
        <AdminPageShell>
            <AdminHeader
                title={isEditing ? 'Edit Course' : 'Create New Course'}
                status={courseData.status}
                statusVariant={courseData.status === 'Published' ? 'published' : 'draft'}
                backUrl="/admin/courses"
                onSave={() => { /* TODO: wire to save draft API */ }}
                onPublish={() => { /* TODO: wire to publish API */ }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative mt-8">

                {/* Main Form Area */}
                <div className={cn(
                    "flex flex-col gap-10",
                    activeTab === 'basic' ? "lg:col-span-8" : "lg:col-span-12"
                )}>

                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <Tabs
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            tabs={tabItems}
                            className="bg-transparent border-transparent p-0"
                        />
                    </div>

                    <div className="min-h-[500px]">
                        {activeTab === 'basic' && (
                            <div className="space-y-12 animate-fade-in outline-none">
                                {/* Thumbnail */}
                                <ImageUploader
                                    label="Thumbnail Image"
                                    value={courseData.thumbnail}
                                    onChange={(val) => handleUpdateData({ thumbnail: val })}
                                />

                                {/* Title & Category */}
                                <div className="space-y-8">
                                    <div className="flex flex-col gap-3">
                                        <Label className="text-sm md:text-base font-bold text-slate-900 tracking-tight">Course Title</Label>
                                        <Input
                                            value={courseData.title}
                                            onChange={(e) => handleUpdateData({ title: e.target.value })}
                                            placeholder="e.g., Aviation Safety Fundamentals"
                                            className="text-lg md:text-xl font-bold h-14 px-6 rounded-2xl bg-white focus-visible:ring-primary/10 transition-all border-slate-200 shadow-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <CategoryPicker
                                            value={courseData.category}
                                            categories={categories}
                                            onChange={(val) => handleUpdateData({ category: val })}
                                            onAddCategory={(newCat) => setCategories([...categories, newCat])}
                                        />
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-bold text-slate-500">Estimated Duration</Label>
                                                <div className="text-3xs bg-slate-50 text-slate-400 px-2 py-1 rounded-lg font-bold border border-slate-100 uppercase tracking-widest">
                                                    Auto-calculated
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                    <Clock size={18} />
                                                </div>
                                                <Input
                                                    value={courseData.duration}
                                                    disabled
                                                    className="h-12 rounded-xl pl-11 bg-slate-50/50 text-slate-400 font-bold border-slate-200 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="flex flex-col gap-3">
                                    <Label className="text-sm md:text-base font-bold text-slate-900 tracking-tight">Description</Label>
                                    <Textarea
                                        value={courseData.description}
                                        onChange={(e) => handleUpdateData({ description: e.target.value })}
                                        className="min-h-[160px] rounded-2xl text-sm md:text-base leading-relaxed p-6 bg-white focus-visible:ring-primary/10 border-slate-200 shadow-none font-medium"
                                        placeholder="Write a compelling description for your learners..."
                                    />
                                </div>

                                {/* Course Availability */}
                                <CourseAvailabilitySettings
                                    isLifetime={courseData.isLifetime}
                                    startDate={courseData.startDate}
                                    endDate={courseData.endDate}
                                    onChange={handleUpdateData}
                                />

                                {/* Learning Objectives */}
                                <div className="pt-4 border-t border-slate-100">
                                    <LearningObjectivesManager
                                        objectives={courseData.learningObjectives}
                                        onChange={(newObjectives) => handleUpdateData({ learningObjectives: newObjectives })}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'curriculum' && (
                            <div className="animate-fade-in">
                                <CurriculumTab courseId={id} />
                            </div>
                        )}

                        {activeTab === 'learners' && (
                            <div className="animate-fade-in">
                                <LearnersTab courseId={id} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar - Preview */}
                {activeTab === 'basic' && (
                    <CourseEditorPreview previewCourse={previewCourse} />
                )}
            </div>
        </AdminPageShell>
    );
};

export default CourseEditor;
