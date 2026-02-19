import { useState, useEffect } from 'react';
import {
    ArrowLeft, Save, Video, FileText, Settings, Upload,
    Plus, Trash2, Link as LinkIcon, Search, Check,
    User, BookOpen, Clock, Globe, Download, X, Eye
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import data from '@/data.json';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Tabs from '@/components/common/Tabs';
import UserProfile from '@/components/common/UserProfile';

const LessonEditor = () => {
    const { courseId, moduleId, lessonId } = useParams();
    const navigate = useNavigate();
    const isNew = lessonId === 'new';

    const [activeTab, setActiveTab] = useState('config');
    const [lessonData, setLessonData] = useState({
        title: '',
        type: 'youtube', // youtube, pdf
        content: '',
        overview: '',
        resources: [],
        instructors: []
    });

    // Mock load data
    useEffect(() => {
        if (!isNew) {
            const course = data.courses.find(c => c.id === courseId);
            if (course) {
                const module = course.modules.find(m => m.id === moduleId);
                if (module) {
                    const lesson = module.lessons.find(l => l.id === lessonId);
                    if (lesson) {
                        setLessonData({
                            title: lesson.title || '',
                            type: lesson.type || 'youtube',
                            content: lesson.content || '',
                            overview: lesson.overview || '',
                            resources: lesson.resources || [],
                            instructors: Array.isArray(lesson.instructor) ? lesson.instructor : (lesson.instructor ? [lesson.instructor] : [])
                        });
                    }
                }
            }
        }
    }, [courseId, moduleId, lessonId, isNew]);

    const handleSave = () => {
        // TODO: Replace with API call when BE is ready
        navigate(`/admin/course/${courseId}/edit?tab=curriculum`);
    };

    // Refined Content Type Card
    const ContentTypeCard = ({ type, label, icon: Icon, description }) => (
        <button
            onClick={() => setLessonData({ ...lessonData, type })}
            className={cn(
                "flex items-center gap-4 p-4 rounded-xl border transition-all w-full text-left group",
                lessonData.type === type
                    ? 'border-primary bg-primary/5 ring-1 ring-primary/10'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
            )}
        >
            <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0",
                lessonData.type === type ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400 group-hover:text-primary'
            )}>
                <Icon size={20} />
            </div>
            <div className="min-w-0">
                <span className={cn(
                    "block text-sm font-bold transition-colors",
                    lessonData.type === type ? 'text-primary' : 'text-slate-700'
                )}>
                    {label}
                </span>
                <span className="text-3xs text-slate-500 font-medium truncate block">
                    {description}
                </span>
            </div>
        </button>
    );

    const tabItems = [
        { id: 'config', label: 'Content Config', icon: Settings },
        { id: 'details', label: 'Overview & Metadata', icon: FileText },
    ];

    return (
        <div className="pb-20 animate-fade-in max-w-5xl mx-auto px-4">
            {/* Top Navigation - Flat & Integrated */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 pt-6">
                <div className="flex items-center gap-4">
                    <Link to={`/admin/course/${courseId}/edit?tab=curriculum`}>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-600 rounded-xl bg-slate-50 border border-slate-100">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                {isNew ? 'New Lesson' : 'Edit Lesson'}
                            </h1>
                        </div>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">Course Administration &bull; Lesson Editor</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(`/admin/course/${courseId}/edit?tab=curriculum`)}
                        className="font-bold text-slate-500 hover:text-slate-900 h-11 px-6 rounded-xl"
                    >
                        Discard
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="h-11 px-8 rounded-xl font-bold shadow-none border border-primary/20 flex items-center gap-2"
                    >
                        <Save size={18} />
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="space-y-12">
                <Tabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    tabs={tabItems}
                    className="bg-transparent border-b border-slate-100 rounded-none mb-0"
                    itemClassName="px-0 mr-10 py-4 rounded-none border-b-2 bg-transparent shadow-none"
                    activeItemClassName="border-primary text-primary"
                    inactiveItemClassName="border-transparent text-slate-400 hover:text-slate-600"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-10">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-12">
                        {activeTab === 'config' && (
                            <div className="space-y-12 animate-fade-in outline-none">
                                {/* Title Section - Clean Focus */}
                                <div className="space-y-3">
                                    <Label className="text-3xs font-bold text-slate-400 uppercase tracking-widest pl-1">Lesson Title</Label>
                                    <Input
                                        value={lessonData.title}
                                        onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                                        placeholder="Enter lesson title..."
                                        className="h-12 border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 focus:bg-white transition-all shadow-none font-bold"
                                    />
                                </div>

                                {/* Content Type Section */}
                                <div className="space-y-4">
                                    <Label className="text-3xs font-bold text-slate-400 uppercase tracking-widest pl-1">Selection Type</Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <ContentTypeCard
                                            type="youtube"
                                            label="YouTube Video"
                                            icon={Video}
                                            description="Embed shared video content"
                                        />
                                        <ContentTypeCard
                                            type="pdf"
                                            label="PDF Document"
                                            icon={FileText}
                                            description="Materials for offline reading"
                                        />
                                    </div>
                                </div>

                                {/* Dynamic Content Configuration */}
                                <div className="pt-8 border-t border-slate-100 space-y-8">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-9 h-9 rounded-lg flex items-center justify-center",
                                            lessonData.type === 'youtube' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'
                                        )}>
                                            {lessonData.type === 'youtube' ? <Video size={18} /> : <FileText size={18} />}
                                        </div>
                                        <h3 className="font-bold text-slate-900">
                                            {lessonData.type === 'youtube' ? 'Video Integration' : 'Document Setup'}
                                        </h3>
                                    </div>

                                    {lessonData.type === 'youtube' && (
                                        <div className="space-y-6">
                                            <div className="group">
                                                <Label className="text-xs font-bold text-slate-500 mb-2 block group-focus-within:text-primary transition-colors">Video Source URL</Label>
                                                <Input
                                                    value={lessonData.content}
                                                    onChange={(e) => setLessonData({ ...lessonData, content: e.target.value })}
                                                    placeholder="https://www.youtube.com/watch?v=..."
                                                    className="h-12 border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 focus:bg-white transition-all shadow-none"
                                                />
                                            </div>

                                            <div className="aspect-video rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 relative group flex items-center justify-center">
                                                {lessonData.content ? (
                                                    <iframe
                                                        src={lessonData.content.includes('embed') ? lessonData.content : lessonData.content.replace('watch?v=', 'embed/')}
                                                        className="w-full h-full"
                                                        title="Preview"
                                                        allowFullScreen
                                                    />
                                                ) : (
                                                    <div className="text-center space-y-4">
                                                        <div className="w-16 h-16 bg-slate-200 rounded-3xl flex items-center justify-center mx-auto text-slate-400 scale-90 opacity-50 group-hover:scale-100 group-hover:opacity-100 transition-all">
                                                            <Video size={32} />
                                                        </div>
                                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest opacity-80">Waiting for source...</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {lessonData.type === 'pdf' && (
                                        <div className="space-y-8 animate-fade-in">
                                            <div className="border border-dashed border-slate-200 bg-slate-50/50 rounded-3xl p-12 text-center group hover:bg-slate-50 hover:border-primary/20 transition-all">
                                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform text-slate-300 group-hover:text-primary">
                                                    <Upload size={28} />
                                                </div>
                                                <h4 className="text-lg font-bold text-slate-900 mb-2">Library Upload</h4>
                                                <p className="text-xs text-slate-400 mb-8 max-w-[240px] mx-auto leading-relaxed">Select PDF materials to be processed for this learning session.</p>
                                                <Button variant="outline" className="h-10 px-6 rounded-xl font-bold border-slate-200 bg-white hover:bg-slate-100 shadow-sm">
                                                    Browse Local Files
                                                </Button>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-slate-500">Asset Path (Legacy)</Label>
                                                <Input
                                                    value={lessonData.content}
                                                    onChange={(e) => setLessonData({ ...lessonData, content: e.target.value })}
                                                    placeholder="/docs/manual.pdf"
                                                    className="h-11 border-slate-200 rounded-xl bg-slate-50/50"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'details' && (
                            <div className="space-y-16 animate-fade-in outline-none">
                                {/* Lesson Overview */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                            <BookOpen size={18} />
                                        </div>
                                        <h3 className="font-bold text-slate-900 tracking-tight">Educational Overview</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <Label className="text-3xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description & Context</Label>
                                        <Textarea
                                            value={lessonData.overview}
                                            onChange={(e) => setLessonData({ ...lessonData, overview: e.target.value })}
                                            placeholder="What will learners achieve in this lesson?"
                                            className="min-h-[180px] border-slate-100 rounded-2xl leading-relaxed bg-slate-50/30 p-6 focus:bg-white focus:border-slate-200 transition-all shadow-none placeholder:italic"
                                        />
                                    </div>
                                </div>

                                {/* Resources Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                                                <Download size={18} />
                                            </div>
                                            <h3 className="font-bold text-slate-900 tracking-tight">Supplemental Assets</h3>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setLessonData({
                                                ...lessonData,
                                                resources: [...lessonData.resources, { title: '', url: '' }]
                                            })}
                                            className="h-8 px-3 rounded-lg border-primary/20 text-primary font-bold hover:bg-primary/5 gap-1.5 transition-all bg-transparent shadow-none"
                                        >
                                            <Plus size={14} />
                                            Add
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        {lessonData.resources.map((res, idx) => (
                                            <div key={idx} className="flex flex-col sm:flex-row gap-4 p-5 bg-transparent border border-slate-100 rounded-2xl relative group/res hover:border-slate-200 hover:bg-slate-50/30 transition-all">
                                                <button
                                                    onClick={() => {
                                                        const newR = lessonData.resources.filter((_, i) => i !== idx);
                                                        setLessonData({ ...lessonData, resources: newR });
                                                    }}
                                                    className="absolute -top-3 -right-3 h-8 w-8 bg-white border border-slate-100 text-slate-300 hover:text-destructive hover:border-destructive/20 opacity-0 group-hover/res:opacity-100 transition-all rounded-full flex items-center justify-center shadow-sm"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                                <div className="flex-1 space-y-2 text-left">
                                                    <Label className="text-3xs font-bold text-slate-400 uppercase tracking-widest pl-1">Display Title</Label>
                                                    <Input
                                                        value={res.title}
                                                        onChange={(e) => {
                                                            const newR = [...lessonData.resources];
                                                            newR[idx].title = e.target.value;
                                                            setLessonData({ ...lessonData, resources: newR });
                                                        }}
                                                        placeholder="e.g., Training Deck Phase 1"
                                                        className="bg-white border-slate-200 h-11 rounded-lg text-sm shadow-none"
                                                    />
                                                </div>
                                                <div className="flex-1 space-y-2 text-left">
                                                    <Label className="text-3xs font-bold text-slate-400 uppercase tracking-widest pl-1">External Link/Path</Label>
                                                    <div className="relative">
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300">
                                                            <LinkIcon size={14} />
                                                        </div>
                                                        <Input
                                                            value={res.url}
                                                            onChange={(e) => {
                                                                const newR = [...lessonData.resources];
                                                                newR[idx].url = e.target.value;
                                                                setLessonData({ ...lessonData, resources: newR });
                                                            }}
                                                            placeholder="https://cloud.storage/..."
                                                            className="pl-9 bg-white border-slate-200 h-11 rounded-lg text-sm shadow-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {lessonData.resources.length === 0 && (
                                            <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-300 hover:border-slate-200 hover:text-slate-400 transition-all cursor-pointer bg-slate-50/20 group">
                                                <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-all">
                                                    <Plus size={20} />
                                                </div>
                                                <p className="text-xs font-bold uppercase tracking-widest">Add First Attachment</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - Instructor Search */}
                    <div className="lg:col-span-4 sticky top-10">
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                                    <User size={18} />
                                </div>
                                <h3 className="font-bold text-slate-900 tracking-tight">Assignment</h3>
                            </div>

                            <div className="space-y-6">
                                <Label className="text-3xs font-bold text-slate-400 uppercase tracking-widest block pl-1">Assign Instructors</Label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                        <Search size={18} />
                                    </div>
                                    <Input
                                        placeholder="Find by name..."
                                        className="pl-12 h-12 border-slate-200 rounded-2xl bg-slate-50/50 focus:bg-white transition-all shadow-none"
                                    />
                                </div>
                                <p className="text-3xs text-slate-400 italic font-medium px-1">
                                    Add multiple subject matter experts to this lesson.
                                </p>
                            </div>

                            {/* Active Selection List */}
                            <div className="space-y-3">
                                {lessonData.instructors.length > 0 ? (
                                    lessonData.instructors.map((ins, idx) => (
                                        <div key={idx} className="p-3 rounded-2xl border border-slate-100 bg-slate-50/30 flex items-center gap-4 animate-fade-in group hover:border-primary/20 hover:bg-primary/5 transition-all">
                                            <UserProfile
                                                imageUrl={ins.avatar}
                                                name={ins.name}
                                                size="sm"
                                                className="shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-slate-900 truncate text-sm">{ins.name}</h4>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    const newIn = lessonData.instructors.filter((_, i) => i !== idx);
                                                    setLessonData({ ...lessonData, instructors: newIn });
                                                }}
                                                className="h-8 w-8 text-slate-300 hover:text-destructive hover:bg-destructive/5 rounded-lg transition-all"
                                            >
                                                <X size={16} />
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 rounded-3xl border-2 border-dashed border-slate-100 text-center bg-slate-50/20">
                                        <div className="w-14 h-14 rounded-full bg-white border border-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm">
                                            <User size={24} />
                                        </div>
                                        <p className="text-sm font-bold text-slate-300">Unassigned</p>
                                    </div>
                                )}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonEditor;
