import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Globe, EyeOff, Check, X, Upload, Calendar, Maximize2, FileText } from 'lucide-react';
import AdminPageShell from '../components/layout/AdminPageShell';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Drawer } from "@/components/ui/drawer";
import BlockEditor from '@/components/editor/BlockEditor';

const CompanyHubEditor = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        category: type === 'culture' ? 'Core Values' : 'Team Tool',
        content: '',
        image: '',
        status: 'Published',
        date: new Date().toISOString().split('T')[0]
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        if (isEditing) {
            // Mock fetch – in real app this would fetch by ID
            setTimeout(() => {
                setFormData({
                    title: type === 'culture' ? 'Our Core Values' : 'Design System Guidelines',
                    category: type === 'culture' ? 'Values' : 'Design',
                    content: '<h2>Introduction</h2><p>Our organization is built on trust and innovation...</p>',
                    image: '',
                    status: 'Published',
                    date: '2024-01-15'
                });
                setIsLoading(false);
            }, 500);
        } else {
            setIsLoading(false);
        }
    }, [id, isEditing, type]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log("Saving Company Hub item:", formData);
        navigate(`/admin/cms/${type}`);
    };

    return (
        <AdminPageShell>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/admin/cms/${type}`)}
                        className="rounded-xl hover:bg-slate-100 text-slate-500"
                    >
                        <ArrowLeft size={20} />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight capitalize">
                            {isEditing ? `Edit ${type} Item` : `Create ${type} Item`}
                        </h1>
                        <p className="text-sm text-slate-500 font-medium">
                            {type === 'culture' ? 'Shape the company culture' : 'Empower your teams with resources'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" className="font-bold rounded-xl">
                        Save as Draft
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-6 shadow-none"
                    >
                        <Save size={18} className="mr-2" />
                        {isEditing ? 'Update Item' : 'Publish Item'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                        <div className="space-y-2">
                            <Label className="font-bold text-slate-900">Title</Label>
                            <Input
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                placeholder="Enter title..."
                                className="h-12 text-lg font-bold border-slate-200 focus-visible:ring-emerald-100"
                            />
                        </div>
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
                                    <p className="text-xs text-slate-500 font-medium">Write and structure your post below</p>
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
                                    onChange={(content) => handleChange('content', content)}
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

                    <Drawer
                        isOpen={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}
                        title="Content Editor"
                        subtitle={formData.title || `New ${type} post`}
                    >
                        <div className="bg-white min-h-[70vh]">
                            {!isLoading && (
                                <BlockEditor
                                    initialContent={formData.content}
                                    onChange={(content) => handleChange('content', content)}
                                />
                            )}
                        </div>
                    </Drawer>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
                        <h3 className="font-bold text-slate-900">Settings</h3>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <Label className="text-xs font-bold text-slate-500">Category</Label>
                                <Input
                                    value={formData.category}
                                    onChange={(e) => handleChange('category', e.target.value)}
                                    className="h-10 border-slate-200 focus-visible:ring-emerald-100"
                                />
                            </div>

                            <div className="space-y-1">
                                <Label className="text-xs font-bold text-slate-500">Publish Date</Label>
                                <DatePicker
                                    date={formData.date}
                                    setDate={(newDate) => handleChange('date', newDate.toISOString().split('T')[0])}
                                    className="h-11"
                                />
                            </div>

                            <div className="pt-2">
                                <Label className="text-xs font-bold text-slate-500 block mb-2">Status</Label>
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
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                        <h3 className="font-bold text-slate-900">Cover Image</h3>
                        {formData.image ? (
                            <div className="relative rounded-xl overflow-hidden group">
                                <img src={formData.image} className="w-full aspect-video object-cover" alt="Cover" />
                                <button
                                    onClick={() => handleChange('image', '')}
                                    className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-slate-100 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                                <Upload className="text-slate-300 mb-2" size={24} />
                                <span className="text-xs font-bold text-slate-500">Upload cover image</span>
                            </div>
                        )}
                        <Input
                            value={formData.image}
                            onChange={(e) => handleChange('image', e.target.value)}
                            placeholder="Image URL..."
                            className="bg-slate-50 h-9 text-xs border-slate-100"
                        />
                    </div>
                </div>
            </div>
        </AdminPageShell>
    );
};

export default CompanyHubEditor;
