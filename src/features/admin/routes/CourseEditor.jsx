import React, { useState, useEffect } from 'react';
import {
    Save, ArrowLeft, Image as ImageIcon, Plus, Trash2, GripVertical,
    Video, FileText, HelpCircle, Users, CheckSquare, Clock, Upload,
    Settings, Layout, BookOpen, GraduationCap, Building, Search, Eye,
    Calendar as CalendarIcon,
    Info, MonitorPlay, AlertCircle, Check, ChevronsUpDown
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import CurriculumTab from '@/features/admin/components/CurriculumTab';
import CourseCard from '@/features/dashboard/components/CourseCard';
import Tabs from '@/components/common/Tabs';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import LearnersTab from '@/features/admin/components/LearnersTab';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const CourseEditor = () => {
    const { id } = useParams();
    const isEditing = !!id;
    const [activeTab, setActiveTab] = useState('basic');
    const [categories, setCategories] = useState(["Safety", "Technical", "Soft Skill", "Leadership", "Service"]);
    const [categorySearch, setCategorySearch] = useState("");
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const [courseData, setCourseData] = useState({
        title: isEditing ? "Safety Procedures V2" : "",
        description: isEditing ? "Comprehensive guide to workplace safety." : "",
        category: "Safety",
        type: "Mandatory",
        thumbnail: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
        status: "Draft",
        startDate: undefined,
        endDate: undefined,
        isLifetime: false,
        duration: "2h 15m",
        modulesCount: 5,
        learningObjectives: isEditing ? [
            "Implement hazard identification and risk assessment (HIRA) in airport operations.",
            "Develop robust aviation safety policies aligned with Citilink standards.",
            "Execute reactive and proactive safety monitoring methods and safety assurance."
        ] : [],
    });

    // Preview Object (Reactive)
    const previewCourse = {
        id: 'preview',
        title: courseData.title || 'Untitled Course',
        description: courseData.description || 'No description provided yet.',
        category: courseData.category,
        thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
        status: 'Not Started',
        availableAt: courseData.isLifetime ? null : courseData.startDate,
        progress: 0,
        duration: courseData.duration, // Dynamic later
        modulesCount: courseData.modulesCount,
    };

    const tabItems = [
        { id: 'basic', label: 'Basic Info', icon: Settings },
        { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
        { id: 'learners', label: 'Learners', icon: Users },
    ];

    return (
        <div className="pb-20 animate-fade-in">
            {/* Top Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-3 md:gap-4">
                    <Link to="/admin/courses">
                        <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10 text-muted-foreground hover:text-foreground rounded-xl shrink-0">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight truncate">
                                {isEditing ? 'Edit Course' : 'Create New Course'}
                            </h1>
                            <span className={`px-2.5 py-0.5 text-3xs md:text-xs font-bold rounded-full border shrink-0 ${courseData.status === 'Published'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                : 'bg-slate-100 text-muted-foreground border-border'
                                }`}>
                                {courseData.status}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <Button variant="outline" className="font-bold h-10 px-4 rounded-xl flex-1 sm:flex-none text-sm md:text-base">
                        Save Draft
                    </Button>
                    <Button className="font-bold h-10 px-5 rounded-xl flex items-center justify-center gap-2 flex-1 sm:flex-none text-sm md:text-base">
                        <Save size={18} />
                        Publish
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">

                {/* Main Form Area */}
                <div className={cn(
                    "flex flex-col gap-6 md:gap-8",
                    activeTab === 'basic' ? "lg:col-span-8" : "lg:col-span-12"
                )}>

                    <Tabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        tabs={tabItems}
                        className="mb-0"
                    />

                    <div>
                        {activeTab === 'basic' && (
                            <div className="space-y-10 animate-fade-in outline-none">
                                {/* Thumbnail */}
                                <div className="space-y-3">
                                    <Label className="text-sm md:text-base font-bold text-foreground">Thumbnail Image</Label>
                                    <div className="border-2 border-dashed border-slate-200 hover:border-slate-400 hover:bg-slate-50/50 rounded-2xl h-48 md:h-56 flex flex-col items-center justify-center cursor-pointer transition-all group relative overflow-hidden bg-slate-50/30">
                                        {courseData.thumbnail ? (
                                            <img src={courseData.thumbnail} alt="Thumbnail course" className="w-full h-full object-cover opacity-100 group-hover:opacity-90 transition-opacity" />
                                        ) : (
                                            <>
                                                <div className="p-4 bg-white rounded-full border border-slate-200 mb-3 group-hover:scale-110 transition-transform">
                                                    <Upload className="text-muted-foreground group-hover:text-foreground" size={24} />
                                                </div>
                                                <p className="text-sm font-bold text-muted-foreground group-hover:text-foreground">Click to upload thumbnail</p>
                                                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Title & Category */}
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-sm md:text-base font-bold text-foreground">Course Title</Label>
                                        <Input
                                            value={courseData.title}
                                            onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                                            placeholder="e.g., Aviation Safety Fundamentals"
                                            className="text-lg md:text-xl font-bold h-12 md:h-14 px-4 md:px-5 rounded-xl md:rounded-2xl bg-white focus:ring-4 focus:ring-primary/10 transition-all border-slate-200"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label className="text-sm font-bold text-muted-foreground">Category</Label>
                                            <Popover open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={isCategoryOpen}
                                                        className="w-full h-12 justify-between rounded-xl bg-white border-slate-200 font-medium text-slate-700 hover:bg-slate-50 focus:ring-0 focus-visible:ring-0"
                                                    >
                                                        {courseData.category
                                                            ? courseData.category
                                                            : "Select Category"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[300px] p-0 rounded-xl shadow-sm border-slate-200" align="start">
                                                    <div className="flex items-center border-b border-slate-100 p-3 bg-slate-50/50">
                                                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-40 text-slate-400" />
                                                        <input
                                                            placeholder="Search or add category..."
                                                            className="flex h-8 w-full rounded-md bg-transparent text-sm outline-none border-none focus:ring-0 placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                                                            value={categorySearch}
                                                            onChange={(e) => setCategorySearch(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter' && categorySearch && !categories.includes(categorySearch)) {
                                                                    setCategories([...categories, categorySearch]);
                                                                    setCourseData({ ...courseData, category: categorySearch });
                                                                    setCategorySearch("");
                                                                    setIsCategoryOpen(false);
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="max-h-[300px] overflow-y-auto p-1">
                                                        {categories
                                                            .filter(c => c.toLowerCase().includes(categorySearch.toLowerCase()))
                                                            .map((cat) => (
                                                                <div
                                                                    key={cat}
                                                                    className={cn(
                                                                        "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm font-medium outline-none transition-colors",
                                                                        courseData.category === cat ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                                                                    )}
                                                                    onClick={() => {
                                                                        setCourseData({ ...courseData, category: cat });
                                                                        setIsCategoryOpen(false);
                                                                        setCategorySearch("");
                                                                    }}
                                                                >
                                                                    <div className="flex items-center gap-2 flex-1">
                                                                        <div className={cn(
                                                                            "h-2 w-2 rounded-full",
                                                                            courseData.category === cat ? "bg-primary" : "bg-slate-300"
                                                                        )} />
                                                                        {cat}
                                                                    </div>
                                                                    {courseData.category === cat && (
                                                                        <Check className="h-4 w-4 text-primary" />
                                                                    )}
                                                                </div>
                                                            ))}
                                                        {categorySearch && !categories.some(c => c.toLowerCase() === categorySearch.toLowerCase()) && (
                                                            <div
                                                                className="flex cursor-pointer items-center rounded-lg px-3 py-3 text-sm font-bold text-primary bg-primary/5 hover:bg-primary/10 transition-all border border-dashed border-primary/20 mt-1 mx-1 mb-1"
                                                                onClick={() => {
                                                                    const newCat = categorySearch.charAt(0).toUpperCase() + categorySearch.slice(1);
                                                                    setCategories([...categories, newCat]);
                                                                    setCourseData({ ...courseData, category: newCat });
                                                                    setCategorySearch("");
                                                                    setIsCategoryOpen(false);
                                                                }}
                                                            >
                                                                <Plus className="mr-2 h-4 w-4" />
                                                                Add "{categorySearch}"
                                                            </div>
                                                        )}
                                                        {categories.filter(c => c.toLowerCase().includes(categorySearch.toLowerCase())).length === 0 && !categorySearch && (
                                                            <div className="py-6 text-center text-sm text-muted-foreground">
                                                                No category found.
                                                            </div>
                                                        )}
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-bold text-muted-foreground">Estimated Duration</Label>
                                                <div className="text-3xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium border border-slate-200 flex items-center gap-1">
                                                    Auto-calculated
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                                    <Clock size={18} />
                                                </div>
                                                <Input
                                                    value={courseData.duration}
                                                    disabled
                                                    className="h-12 rounded-xl pl-11 bg-slate-50 text-muted-foreground font-bold border-slate-200"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-3">
                                    <Label className="text-sm md:text-base font-bold text-foreground">Description</Label>
                                    <Textarea
                                        value={courseData.description}
                                        onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                                        className="min-h-[140px] rounded-xl text-sm md:text-base leading-relaxed p-4 bg-white focus:ring-4 focus:ring-primary/10 border-slate-200"
                                        placeholder="Write a compelling description for your learners..."
                                    />
                                </div>

                                {/* Course Availability */}
                                <div className="p-0 space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/60 pb-4 gap-4">
                                        <div className="space-y-1">
                                            <Label className="text-sm md:text-base font-bold text-foreground">Course Availability</Label>
                                            <p className="text-xs md:text-sm text-muted-foreground">Set time limits or allow lifetime access</p>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <Label htmlFor="lifetime-mode" className="text-xs md:text-sm font-bold text-muted-foreground cursor-pointer">Lifetime Access</Label>
                                            <Switch
                                                id="lifetime-mode"
                                                checked={courseData.isLifetime}
                                                onCheckedChange={(checked) => setCourseData({ ...courseData, isLifetime: checked })}
                                            />
                                        </div>
                                    </div>

                                    {courseData.isLifetime ? (
                                        <div className="rounded-xl border border-[#36BFFA]/20 bg-[#EDF7FE] p-4 flex gap-3 text-[#007cb2]">
                                            <Info className="h-5 w-5 text-[#36BFFA] mt-0.5" />
                                            <div>
                                                <h5 className="font-bold text-[#008CC9] mb-1">Lifetime Access Enabled</h5>
                                                <p className="text-sm opacity-90">
                                                    This course will be permanently available to assigned learners without any time restrictions.
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-muted-foreground">Start Date</Label>
                                                <DatePicker
                                                    date={courseData.startDate}
                                                    setDate={(date) => setCourseData({ ...courseData, startDate: date })}
                                                    placeholder="Pick a start date"
                                                    className="bg-white border-slate-200"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-muted-foreground">End Date</Label>
                                                <DatePicker
                                                    date={courseData.endDate}
                                                    setDate={(date) => setCourseData({ ...courseData, endDate: date })}
                                                    placeholder="Pick an end date"
                                                    className="bg-white border-slate-200"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Learning Objectives */}
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
                                        <div className="space-y-1">
                                            <Label className="text-sm md:text-base font-bold text-foreground">Learning Objectives</Label>
                                            <p className="text-xs text-muted-foreground font-medium">What knowledge/skills will the students gain?</p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                const currentObjectives = courseData.learningObjectives || [];
                                                setCourseData({
                                                    ...courseData,
                                                    learningObjectives: [...currentObjectives, ""]
                                                });
                                            }}
                                            className="h-8 px-3 rounded-lg border-primary/20 text-primary hover:bg-primary/5 font-bold text-xs flex items-center gap-1.5 shrink-0"
                                        >
                                            <Plus size={14} />
                                            Add Objective
                                        </Button>
                                    </div>

                                    {(courseData.learningObjectives || []).length > 0 ? (
                                        <div className="space-y-3">
                                            {(courseData.learningObjectives || []).map((objective, index) => (
                                                <div key={index} className="group relative flex items-start gap-3 animate-in fade-in slide-in-from-top-1 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-slate-200 transition-all">
                                                    <div className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" />
                                                    <Input
                                                        value={objective}
                                                        onChange={(e) => {
                                                            const newObjectives = [...courseData.learningObjectives];
                                                            newObjectives[index] = e.target.value;
                                                            setCourseData({ ...courseData, learningObjectives: newObjectives });
                                                        }}
                                                        placeholder="e.g., Implement hazard identification and risk assessment..."
                                                        className="border-none bg-transparent h-auto p-0 focus-visible:ring-0 text-sm font-medium shadow-none placeholder:text-slate-400 leading-relaxed"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            const newObjectives = courseData.learningObjectives.filter((_, i) => i !== index);
                                                            setCourseData({ ...courseData, learningObjectives: newObjectives });
                                                        }}
                                                        className="h-7 w-7 rounded-lg text-slate-300 hover:text-destructive hover:bg-destructive/5 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                                                    >
                                                        <Trash2 size={14} />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => {
                                                setCourseData({ ...courseData, learningObjectives: [""] });
                                            }}
                                            className="h-24 rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-slate-200 hover:bg-slate-50/50 transition-all group"
                                        >
                                            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors text-slate-400">
                                                <Plus size={20} />
                                            </div>
                                            <span className="text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">Add your first objective</span>
                                        </div>
                                    )}
                                </div>


                            </div>
                        )}

                        {activeTab === 'curriculum' && (
                            <div className="mt-0 outline-none">
                                <CurriculumTab courseId={id} />
                            </div>
                        )}



                        {activeTab === 'learners' && (
                            <LearnersTab courseId={id} />
                        )}
                    </div>
                </div>

                {/* Right Sidebar - Preview (Sticky with proper container) */}
                {activeTab === 'basic' && (
                    <div className="lg:col-span-4 hidden lg:block relative h-full animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="sticky top-24 space-y-8 scale-95 origin-top-right transition-all duration-300">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                    <Eye size={16} /> Live Preview
                                </h3>
                                <div className="flex items-center gap-2 text-3xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Student View
                                </div>
                            </div>

                            {/* The Card Component - Floating clean style (No box) */}
                            <div className="pointer-events-none select-none transform transition-all duration-500 hover:scale-[1.02]">
                                <CourseCard course={previewCourse} disabled={true} />
                            </div>

                            {/* Helper / Tips - Custom Blue */}
                            <div className="bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100/50 dark:border-blue-500/10 p-6 rounded-3xl">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400">
                                        <Info size={20} />
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="font-bold text-blue-900 dark:text-blue-300 text-sm leading-none">
                                            Course Editor Tips
                                        </h4>
                                        <ul className="text-xs text-blue-700/80 dark:text-blue-400/80 space-y-2.5 list-none leading-relaxed">
                                            <li className="flex gap-2">
                                                <span className="text-blue-400">•</span>
                                                <span><strong>Thumbnail:</strong> Use 16:9 high-resolution images for professional look.</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-blue-400">•</span>
                                                <span><strong>Title:</strong> Keep it concise and action-oriented for better engagement.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseEditor;
