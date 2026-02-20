import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { knowledgeData } from '@/data/knowledge';
import { DatePicker } from "@/components/ui/date-picker";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AdminPageShell from '../components/layout/AdminPageShell';
import { Maximize2, FileText, Globe, EyeOff, Check, Calendar, ArrowLeft, Save, Upload, Plus, X, User as UserIcon } from 'lucide-react';
import BlockEditor from '@/components/editor/BlockEditor';
import UserPicker from '../components/knowledge/editor/UserPicker';

const KnowledgeEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'UI/UX',
        image: '',
        authorName: 'Admin',
        authorRole: 'Administrator',
        status: 'Draft',
        publishDate: new Date().toISOString().split('T')[0]
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Initial Data Load
    useEffect(() => {
        if (isEditing) {
            // Find article in mock data
            const article = knowledgeData.find(a => a.id.toString() === id);
            if (article) {
                setFormData({
                    title: article.title,
                    slug: article.slug,
                    excerpt: article.excerpt || '',
                    content: article.content, // Raw HTML
                    category: article.category,
                    image: article.image,
                    authorName: article.author.name,
                    authorRole: article.author.role,
                    status: 'Published', // Mock existing as published
                    publishDate: article.date
                });
            }
        }
        setIsLoading(false);
    }, [id, isEditing]);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        // Mock save
        console.log("Saving article:", formData);
        navigate('/admin/knowledge');
    };

    return (
        <AdminPageShell>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/admin/knowledge')}
                        className="rounded-xl hover:bg-slate-100 text-slate-500"
                    >
                        <ArrowLeft size={20} />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {isEditing ? 'Edit Article' : 'Create New Article'}
                        </h1>
                        <p className="text-sm text-slate-500 font-medium">
                            {isEditing ? 'Update existing content' : 'Add a new article to the Knowledge Hub'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="secondary"
                        className="font-bold rounded-xl"
                    >
                        Save as Draft
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-6 shadow-none"
                    >
                        <Save size={18} className="mr-2" />
                        {isEditing ? 'Update Article' : 'Publish Article'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content (Left) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Title */}
                    <div className="space-y-2 bg-white p-6 rounded-2xl border border-slate-200">
                        <Label className="text-slate-900 font-bold">Article Title</Label>
                        <Input
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="Enter a catchy title..."
                            className="text-lg font-bold h-12 border-slate-200 focus-visible:ring-emerald-500/20"
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2 bg-white p-6 rounded-2xl border border-slate-200">
                        <Label className="text-slate-900 font-bold">Excerpt (Preview)</Label>
                        <Textarea
                            value={formData.excerpt}
                            onChange={(e) => handleChange('excerpt', e.target.value)}
                            placeholder="Short summary for preview cards..."
                            className="min-h-20 border-slate-200 focus-visible:ring-emerald-100 resize-none"
                        />
                        <p className="text-xs text-slate-400 text-right">{formData.excerpt.length}/150 characters</p>
                    </div>

                    {/* Content Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between px-6 py-6 border-b border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <Label className="text-slate-900 font-bold text-lg block leading-none mb-1">Content</Label>
                                    <p className="text-xs text-slate-500 font-medium">Write and structure your article below</p>
                                </div>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setIsDrawerOpen(true)}
                                className="h-8 px-3 rounded-lg gap-1.5 text-xs font-bold border-emerald-100 text-emerald-700 hover:bg-emerald-50 transition-all active:scale-95"
                            >
                                <Maximize2 size={14} />
                                Focus Mode
                            </Button>
                        </div>

                        <div className="bg-slate-50 min-h-[500px]">
                            {!isLoading ? (
                                <BlockEditor
                                    initialContent={formData.content}
                                    onChange={(html) => handleChange('content', html)}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-96">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-sm font-bold text-slate-400">Loading editor...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Optional Focus Drawer */}
                    <Drawer
                        isOpen={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}
                        title="Content Editor"
                        subtitle={formData.title || "Untitled Article"}
                    >
                        <div className="bg-white min-h-[70vh]">
                            {!isLoading && (
                                <BlockEditor
                                    initialContent={formData.content}
                                    onChange={(html) => handleChange('content', html)}
                                />
                            )}
                        </div>
                    </Drawer>
                </div>

                {/* Sidebar (Right) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Publishing */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                        <h3 className="font-bold text-slate-900">Publishing</h3>

                        <div className="space-y-3">
                            <div className="space-y-1">
                                <Label className="text-xs font-bold text-slate-500">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => handleChange('status', value)}
                                >
                                    <SelectTrigger className="w-full h-11 border-slate-200">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Published">Published</SelectItem>
                                        <SelectItem value="Draft">Draft</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-xs font-bold text-slate-500">Category</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => handleChange('category', value)}
                                >
                                    <SelectTrigger className="w-full h-11 border-slate-200">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="UI/UX">UI/UX Design</SelectItem>
                                        <SelectItem value="Engineering">Engineering</SelectItem>
                                        <SelectItem value="Safety">Safety</SelectItem>
                                        <SelectItem value="Leadership">Leadership</SelectItem>
                                        <SelectItem value="General">General</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-xs font-bold text-slate-500">Publish Date</Label>
                                <DatePicker
                                    date={formData.publishDate}
                                    setDate={(newDate) => handleChange('publishDate', newDate.toISOString().split('T')[0])}
                                    className="h-11"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                        <h3 className="font-bold text-slate-900">Featured Image</h3>

                        {formData.image ? (
                            <div className="relative group rounded-xl overflow-hidden border border-slate-200">
                                <img src={formData.image} alt="Featured" className="w-full aspect-video object-cover" />
                                <button
                                    onClick={() => handleChange('image', '')}
                                    className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-emerald-500/50 transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
                                    <Upload size={20} className="text-emerald-600" />
                                </div>
                                <span className="text-sm font-bold text-emerald-600 mb-1">Click to upload</span>
                                <span className="text-xs text-slate-400">SVG, PNG, JPG or GIF (max. 2MB)</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-500">Or Image URL</Label>
                            <Input
                                value={formData.image}
                                onChange={(e) => handleChange('image', e.target.value)}
                                placeholder="https://..."
                                className="h-9 text-xs border-slate-200"
                            />
                        </div>
                    </div>

                    {/* Author */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <UserIcon size={16} />
                            </div>
                            <h3 className="font-bold text-slate-900">Author Info</h3>
                        </div>

                        <div className="space-y-4">
                            <UserPicker
                                selectedName={formData.authorName}
                                label="Select Author"
                                placeholder="Choose who wrote this..."
                                onChange={({ name, role }) => {
                                    handleChange('authorName', name);
                                    handleChange('authorRole', role);
                                }}
                            />

                            {formData.authorName && (
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in slide-in-from-top-1 duration-300">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-400 leading-none mb-1 uppercase tracking-wider">Current Selection</span>
                                        <span className="text-sm font-bold text-slate-700">{formData.authorName}</span>
                                        <span className="text-xs text-slate-500 font-medium">{formData.authorRole}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminPageShell>
    );
};

export default KnowledgeEditor;
