import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Video, FileText, Settings, Upload } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const LessonEditor = () => {
    const { courseId, moduleId, lessonId } = useParams();
    const navigate = useNavigate();
    const isNew = lessonId === 'new';

    const [lessonData, setLessonData] = useState({
        title: '',
        type: 'youtube', // youtube, pdf
        content: ''
    });

    // Mock load data
    useEffect(() => {
        if (!isNew) {
            // Simulate fetch
            setLessonData({
                title: "Existing Lesson",
                type: "youtube",
                content: "https://youtube.com/embed/weird_code"
            });
        }
    }, [lessonId]);

    const handleSave = () => {
        console.log('Saving lesson:', lessonData);
        navigate(`/admin/course/${courseId}/edit?tab=curriculum`);
    };

    // Flattened Content Type Card
    const ContentTypeCard = ({ type, label, icon: Icon, description }) => (
        <button
            onClick={() => setLessonData({ ...lessonData, type })}
            className={`flex flex-col items-start gap-3 p-5 rounded-2xl border transition-all w-full text-left group ${lessonData.type === type
                ? 'border-citilearn-green bg-emerald-50/30 ring-1 ring-citilearn-green/20'
                : 'border-transparent bg-gray-50 hover:bg-white hover:border-gray-200'
                }`}
        >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${lessonData.type === type ? 'bg-white text-citilearn-green' : 'bg-white text-gray-400 group-hover:text-gray-600'
                }`}>
                <Icon size={20} />
            </div>
            <div>
                <span className={`block text-base font-bold ${lessonData.type === type ? 'text-main' : 'text-secondary group-hover:text-main'}`}>
                    {label}
                </span>
                <span className="text-xs text-secondary mt-1 block font-medium opacity-80">
                    {description}
                </span>
            </div>
        </button>
    );

    return (
        <div className="pb-20 animate-fade-in relative min-h-screen">
            {/* Header - Static & Clean */}
            <div className="flex items-center justify-between mb-8 pt-4 px-1">
                <div className="flex items-center gap-4">
                    <Link
                        to={`/admin/course/${courseId}/edit?tab=curriculum`}
                        className="p-2 rounded-xl hover:bg-white text-secondary hover:text-primary transition-colors border border-transparent hover:border-gray-200"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-main">
                            {isNew ? 'New Lesson' : 'Edit Lesson'}
                        </h1>
                        <p className="text-sm text-secondary font-medium">Manage learning content</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 bg-citilearn-green text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors"
                >
                    <Save size={18} />
                    Save Lesson
                </button>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
                {/* 1. Basic Info & Type */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100/50">
                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-bold text-main mb-3">Lesson Title</label>
                            <input
                                type="text"
                                value={lessonData.title}
                                onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                                placeholder="e.g., Introduction to Safety Protocols"
                                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-citilearn-green focus:outline-none text-lg font-bold transition-all placeholder-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-main mb-3">Content Type</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <ContentTypeCard
                                    type="youtube"
                                    label="Video Lesson"
                                    icon={Video}
                                    description="Embed content from YouTube"
                                />
                                <ContentTypeCard
                                    type="pdf"
                                    label="Document"
                                    icon={FileText}
                                    description="Upload PDF guides or slides"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Content Editor */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100/50 space-y-6">
                    <h3 className="text-lg font-bold text-main flex items-center gap-2">
                        {lessonData.type === 'youtube' ? <Video size={20} className="text-blue-500" /> : <FileText size={20} className="text-orange-500" />}
                        {lessonData.type === 'youtube' ? 'Video Configuration' : 'Document Configuration'}
                    </h3>

                    {lessonData.type === 'youtube' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-main mb-2">YouTube Video URL</label>
                                <input
                                    type="text"
                                    value={lessonData.content}
                                    onChange={(e) => setLessonData({ ...lessonData, content: e.target.value })}
                                    placeholder="Paste YouTube link here..."
                                    className="w-full px-5 py-3 bg-white border border-gray-200 rounded-xl focus:border-citilearn-green focus:outline-none font-medium transition-colors"
                                />
                            </div>

                            {/* Video Preview */}
                            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center relative group">
                                {lessonData.content ? (
                                    <iframe
                                        src={lessonData.content.replace('watch?v=', 'embed/')}
                                        className="w-full h-full"
                                        title="Preview"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                                            <Video size={32} />
                                        </div>
                                        <p className="text-gray-500 font-medium">Enter a URL to preview video</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {lessonData.type === 'pdf' && (
                        <div className="space-y-6">
                            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Upload size={32} />
                                </div>
                                <h4 className="text-lg font-bold text-main mb-1">Upload Document</h4>
                                <p className="text-sm text-secondary mb-6">Drag & drop your PDF here or browse files</p>
                                <button className="px-6 py-2.5 bg-white border border-gray-200 text-secondary font-bold rounded-xl hover:border-gray-300 hover:text-main transition-all">
                                    Browse Files
                                </button>
                            </div>

                            {/* File Path Input (Manual Override) */}
                            <div>
                                <label className="block text-sm font-bold text-main mb-2">Or enter file path</label>
                                <input
                                    type="text"
                                    value={lessonData.content}
                                    onChange={(e) => setLessonData({ ...lessonData, content: e.target.value })}
                                    placeholder="/docs/manuals/guide.pdf"
                                    className="w-full px-5 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-citilearn-green focus:outline-none font-medium transition-colors"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LessonEditor;
