import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2, GripVertical, Video, FileText, Clock, Upload, Link as LinkIcon, X } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ModuleEditor = () => {
    const { courseId, moduleId } = useParams();
    const navigate = useNavigate();
    const isEditing = !!moduleId;

    const [moduleData, setModuleData] = useState({
        title: isEditing ? "Introduction to Safety" : "",
        description: "",
        type: "video", // video, document, link
        duration: "",
        order: 1,
        content: {
            videoUrl: "",
            documentUrl: "",
            externalLink: ""
        }
    });

    const [lessons, setLessons] = useState([
        { id: 1, title: "Safety Overview", type: "video", duration: "5:00" },
        { id: 2, title: "Equipment Guide", type: "document", duration: "3:00" }
    ]);

    const handleSave = () => {
        // Save logic here
        navigate(`/admin/course/${courseId}/edit`);
    };

    return (
        <div className="space-y-6 pb-20 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to={`/admin/course/${courseId}/edit`} className="p-2 rounded-xl hover:bg-white text-secondary hover:text-primary transition-colors border border-transparent hover:border-gray-200">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-main">
                            {isEditing ? 'Edit Module' : 'Add New Module'}
                        </h1>
                        <p className="text-sm text-secondary font-medium">Configure module content and settings</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(`/admin/course/${courseId}/edit`)}
                        className="px-4 py-2 text-sm font-bold text-secondary bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2 text-sm font-bold text-white bg-citilearn-green rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2"
                    >
                        <Save size={16} />
                        Save Module
                    </button>
                </div>
            </div>

            {/* Module Form */}
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2">Module Information</h3>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-main">Module Title</label>
                        <input
                            type="text"
                            value={moduleData.title}
                            onChange={(e) => setModuleData({ ...moduleData, title: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                            placeholder="e.g., Introduction to Safety Procedures"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-main">Description</label>
                        <textarea
                            rows="3"
                            value={moduleData.description}
                            onChange={(e) => setModuleData({ ...moduleData, description: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium resize-none"
                            placeholder="Brief description of what this module covers..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Content Type</label>
                            <select
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                                value={moduleData.type}
                                onChange={(e) => setModuleData({ ...moduleData, type: e.target.value })}
                            >
                                <option value="video">Video</option>
                                <option value="document">Document/PDF</option>
                                <option value="link">External Link</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Estimated Duration (minutes)</label>
                            <input
                                type="number"
                                value={moduleData.duration}
                                onChange={(e) => setModuleData({ ...moduleData, duration: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                                placeholder="e.g., 15"
                            />
                        </div>
                    </div>
                </div>

                {/* Content Upload Section */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2">Module Content</h3>

                    {moduleData.type === 'video' && (
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-200 hover:border-primary/50 bg-gray-50 hover:bg-primary/5 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all group">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-gray-100">
                                    <Video className="text-secondary group-hover:text-primary" size={28} />
                                </div>
                                <span className="text-sm font-bold text-secondary group-hover:text-primary">Click to upload video or drag and drop</span>
                                <span className="text-xs text-gray-400 mt-1">MP4, WebM up to 500MB</span>
                            </div>
                            <div className="text-center text-sm text-secondary font-medium">OR</div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-main">Video URL (YouTube, Vimeo, etc.)</label>
                                <input
                                    type="url"
                                    value={moduleData.content.videoUrl}
                                    onChange={(e) => setModuleData({ ...moduleData, content: { ...moduleData.content, videoUrl: e.target.value } })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                                    placeholder="https://youtube.com/watch?v=..."
                                />
                            </div>
                        </div>
                    )}

                    {moduleData.type === 'document' && (
                        <div className="border-2 border-dashed border-gray-200 hover:border-primary/50 bg-gray-50 hover:bg-primary/5 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all group">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-gray-100">
                                <FileText className="text-secondary group-hover:text-primary" size={28} />
                            </div>
                            <span className="text-sm font-bold text-secondary group-hover:text-primary">Click to upload document</span>
                            <span className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX up to 50MB</span>
                        </div>
                    )}

                    {moduleData.type === 'link' && (
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">External Link URL</label>
                            <input
                                type="url"
                                value={moduleData.content.externalLink}
                                onChange={(e) => setModuleData({ ...moduleData, content: { ...moduleData.content, externalLink: e.target.value } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                                placeholder="https://example.com/resource"
                            />
                        </div>
                    )}
                </div>

                {/* Sub-lessons (Optional) */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <h3 className="text-lg font-bold text-main">Sub-Lessons (Optional)</h3>
                        <button className="px-3 py-1.5 bg-gray-100 text-main text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1">
                            <Plus size={14} /> Add Sub-Lesson
                        </button>
                    </div>

                    {lessons.length > 0 ? (
                        <div className="space-y-2">
                            {lessons.map((lesson, index) => (
                                <div key={lesson.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                                    <button className="text-gray-300 hover:text-main cursor-move">
                                        <GripVertical size={18} />
                                    </button>
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-secondary border border-gray-100">
                                        {lesson.type === 'video' ? <Video size={16} /> : <FileText size={16} />}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-main">{index + 1}. {lesson.title}</h4>
                                        <p className="text-xs text-secondary">{lesson.duration}</p>
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-white transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-secondary text-center py-4">No sub-lessons added yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModuleEditor;
