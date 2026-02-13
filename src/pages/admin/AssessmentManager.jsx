import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2, Settings, Clock, CheckCircle, XCircle, Edit, GripVertical } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const AssessmentManager = () => {
    const { courseId, assessmentType } = useParams(); // assessmentType: pre-test, quiz, post-test
    const navigate = useNavigate();

    const [assessmentData, setAssessmentData] = useState({
        title: assessmentType === 'pre-test' ? 'Pre-Test' : assessmentType === 'post-test' ? 'Post-Test' : 'Module Quiz',
        enabled: true,
        passingGrade: 80,
        timeLimit: 30, // minutes
        maxAttempts: 3,
        showResults: true,
        shuffleQuestions: false,
        shuffleAnswers: true,
        allowReview: true
    });

    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "What is the primary purpose of safety equipment?",
            type: "multiple-choice",
            points: 10,
            answers: ["Protection", "Decoration", "Comfort", "Style"],
            correctAnswer: 0
        },
        {
            id: 2,
            question: "Describe the emergency evacuation procedure.",
            type: "essay",
            points: 20,
            minWords: 50
        }
    ]);

    const getAssessmentTitle = () => {
        switch (assessmentType) {
            case 'pre-test': return 'Pre-Test';
            case 'post-test': return 'Post-Test';
            case 'quiz': return 'Module Quiz';
            default: return 'Assessment';
        }
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
                        <h1 className="text-2xl font-bold text-main">{getAssessmentTitle()} Settings</h1>
                        <p className="text-sm text-secondary font-medium">Configure assessment rules and manage questions</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link
                        to={`/admin/course/${courseId}/assessment/${assessmentType}/question/new`}
                        className="px-4 py-2 text-sm font-bold text-white bg-main rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Add Question
                    </Link>
                    <button className="px-5 py-2 text-sm font-bold text-white bg-citilearn-green rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2">
                        <Save size={16} />
                        Save Settings
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Settings Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-6">
                        <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2 flex items-center gap-2">
                            <Settings size={18} />
                            Assessment Settings
                        </h3>

                        {/* Enable/Disable */}
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-bold text-main">Enable Assessment</label>
                                <p className="text-xs text-secondary">Make this assessment active</p>
                            </div>
                            <button
                                onClick={() => setAssessmentData({ ...assessmentData, enabled: !assessmentData.enabled })}
                                className={`relative w-12 h-6 rounded-full transition-colors ${assessmentData.enabled ? 'bg-citilearn-green' : 'bg-gray-200'}`}
                            >
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${assessmentData.enabled ? 'translate-x-6' : ''}`}></div>
                            </button>
                        </div>

                        {/* Passing Grade */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Passing Grade (%)</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={assessmentData.passingGrade}
                                onChange={(e) => setAssessmentData({ ...assessmentData, passingGrade: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                            />
                        </div>

                        {/* Time Limit */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main flex items-center gap-2">
                                <Clock size={16} />
                                Time Limit (minutes)
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={assessmentData.timeLimit}
                                onChange={(e) => setAssessmentData({ ...assessmentData, timeLimit: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                                placeholder="0 = No limit"
                            />
                            <p className="text-xs text-secondary">Set to 0 for unlimited time</p>
                        </div>

                        {/* Max Attempts */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Maximum Attempts</label>
                            <input
                                type="number"
                                min="1"
                                value={assessmentData.maxAttempts}
                                onChange={(e) => setAssessmentData({ ...assessmentData, maxAttempts: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                            />
                        </div>

                        {/* Additional Options */}
                        <div className="space-y-3 pt-4 border-t border-gray-100">
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-sm font-medium text-main group-hover:text-primary">Show Results Immediately</span>
                                <input
                                    type="checkbox"
                                    checked={assessmentData.showResults}
                                    onChange={(e) => setAssessmentData({ ...assessmentData, showResults: e.target.checked })}
                                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-sm font-medium text-main group-hover:text-primary">Shuffle Questions</span>
                                <input
                                    type="checkbox"
                                    checked={assessmentData.shuffleQuestions}
                                    onChange={(e) => setAssessmentData({ ...assessmentData, shuffleQuestions: e.target.checked })}
                                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-sm font-medium text-main group-hover:text-primary">Shuffle Answer Options</span>
                                <input
                                    type="checkbox"
                                    checked={assessmentData.shuffleAnswers}
                                    onChange={(e) => setAssessmentData({ ...assessmentData, shuffleAnswers: e.target.checked })}
                                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-sm font-medium text-main group-hover:text-primary">Allow Review After Submit</span>
                                <input
                                    type="checkbox"
                                    checked={assessmentData.allowReview}
                                    onChange={(e) => setAssessmentData({ ...assessmentData, allowReview: e.target.checked })}
                                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100">
                        <h4 className="text-sm font-bold text-main mb-4">Assessment Summary</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-secondary">Total Questions</span>
                                <span className="text-sm font-bold text-main">{questions.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-secondary">Total Points</span>
                                <span className="text-sm font-bold text-main">{questions.reduce((sum, q) => sum + (q.points || 0), 0)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-secondary">Estimated Time</span>
                                <span className="text-sm font-bold text-main">{assessmentData.timeLimit} min</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Questions List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-main">Questions ({questions.length})</h3>
                            <div className="text-xs text-secondary bg-gray-50 px-3 py-1.5 rounded-lg font-medium">
                                Drag to reorder
                            </div>
                        </div>

                        {questions.length > 0 ? (
                            <div className="space-y-3">
                                {questions.map((question, index) => (
                                    <div key={question.id} className="group p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                                        <div className="flex items-start gap-4">
                                            <button className="mt-1 text-gray-300 hover:text-main cursor-move">
                                                <GripVertical size={20} />
                                            </button>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4 mb-2">
                                                    <h4 className="text-sm font-bold text-main">
                                                        {index + 1}. {question.question}
                                                    </h4>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                                                            {question.points} pts
                                                        </span>
                                                        <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200 capitalize">
                                                            {question.type.replace('-', ' ')}
                                                        </span>
                                                    </div>
                                                </div>
                                                {question.type === 'multiple-choice' && question.answers && (
                                                    <div className="mt-3 space-y-1.5">
                                                        {question.answers.map((answer, idx) => (
                                                            <div key={idx} className="flex items-center gap-2 text-xs">
                                                                {idx === question.correctAnswer ? (
                                                                    <CheckCircle size={14} className="text-green-500" />
                                                                ) : (
                                                                    <XCircle size={14} className="text-gray-300" />
                                                                )}
                                                                <span className={idx === question.correctAnswer ? 'text-green-700 font-medium' : 'text-gray-500'}>
                                                                    {answer}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {question.type === 'essay' && (
                                                    <p className="text-xs text-secondary mt-2">Minimum {question.minWords} words required</p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    to={`/admin/course/${courseId}/assessment/${assessmentType}/question/${question.id}`}
                                                    className="p-2 text-secondary hover:text-primary hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button className="p-2 text-red-400 hover:text-red-500 hover:bg-white rounded-lg border border-transparent hover:border-red-100 transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                    <Settings className="text-gray-300" size={32} />
                                </div>
                                <h4 className="text-main font-bold mb-1">No questions yet</h4>
                                <p className="text-sm text-secondary mb-4">Start by adding your first question</p>
                                <Link
                                    to={`/admin/course/${courseId}/assessment/${assessmentType}/question/new`}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-main text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors"
                                >
                                    <Plus size={16} />
                                    Add Question
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentManager;
