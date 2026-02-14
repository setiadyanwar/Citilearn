import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const QuestionEditor = () => {
    const { courseId, assessmentType, questionId } = useParams();
    const navigate = useNavigate();
    const isEditing = !!questionId && questionId !== 'new';

    const [questionData, setQuestionData] = useState({
        question: isEditing ? "What is the primary purpose of safety equipment?" : "",
        type: "multiple-choice", // multiple-choice, true-false, essay, fill-blank
        points: 10,
        explanation: "",
        image: null,
        answers: isEditing ? [
            { text: "Protection", isCorrect: true },
            { text: "Decoration", isCorrect: false },
            { text: "Comfort", isCorrect: false },
            { text: "Style", isCorrect: false }
        ] : [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false }
        ],
        // For essay questions
        minWords: 50,
        maxWords: 500,
        // For fill-in-the-blank
        correctAnswers: [""]
    });

    const addAnswer = () => {
        setQuestionData({
            ...questionData,
            answers: [...questionData.answers, { text: "", isCorrect: false }]
        });
    };

    const removeAnswer = (index) => {
        const newAnswers = questionData.answers.filter((_, i) => i !== index);
        setQuestionData({ ...questionData, answers: newAnswers });
    };

    const updateAnswer = (index, field, value) => {
        const newAnswers = [...questionData.answers];
        newAnswers[index][field] = value;

        // For single-answer questions, uncheck others when one is checked
        if (field === 'isCorrect' && value && questionData.type !== 'multiple-answer') {
            newAnswers.forEach((ans, i) => {
                if (i !== index) ans.isCorrect = false;
            });
        }

        setQuestionData({ ...questionData, answers: newAnswers });
    };

    const handleSave = () => {
        // Save logic here
        navigate(`/admin/course/${courseId}/assessment/${assessmentType}`);
    };

    return (
        <div className="space-y-6 pb-20 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        to={`/admin/course/${courseId}/assessment/${assessmentType}`}
                        className="p-2 rounded-xl hover:bg-white text-secondary hover:text-primary transition-colors border border-transparent hover:border-gray-200"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-main">
                            {isEditing ? 'Edit Question' : 'Add New Question'}
                        </h1>
                        <p className="text-sm text-secondary font-medium">
                            {assessmentType === 'pre-test' ? 'Pre-Test' : assessmentType === 'post-test' ? 'Post-Test' : 'Module Quiz'}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(`/admin/course/${courseId}/assessment/${assessmentType}`)}
                        className="px-4 py-2 text-sm font-bold text-secondary bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2 text-sm font-bold text-white bg-citilearn-green rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2"
                    >
                        <Save size={16} />
                        Save Question
                    </button>
                </div>
            </div>

            {/* Question Form */}
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Question Type & Points */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Question Type</label>
                            <select
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                                value={questionData.type}
                                onChange={(e) => setQuestionData({ ...questionData, type: e.target.value })}
                            >
                                <option value="multiple-choice">Multiple Choice (Single Answer)</option>
                                <option value="multiple-answer">Multiple Choice (Multiple Answers)</option>
                                <option value="true-false">True/False</option>
                                <option value="essay">Essay/Long Answer</option>
                                <option value="fill-blank">Fill in the Blank</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Points</label>
                            <input
                                type="number"
                                min="1"
                                value={questionData.points}
                                onChange={(e) => setQuestionData({ ...questionData, points: parseInt(e.target.value) })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Question Text */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2">Question</h3>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-main">Question Text</label>
                        <textarea
                            rows="4"
                            value={questionData.question}
                            onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium resize-none"
                            placeholder="Enter your question here..."
                        />
                    </div>

                    {/* Optional Image */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-main">Image (Optional)</label>
                        <div className="border-2 border-dashed border-gray-200 hover:border-primary/50 bg-gray-50 hover:bg-primary/5 rounded-2xl h-32 flex flex-col items-center justify-center cursor-pointer transition-all group">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform border border-gray-100">
                                <ImageIcon className="text-secondary group-hover:text-primary" size={20} />
                            </div>
                            <span className="text-xs font-bold text-secondary group-hover:text-primary">Click to upload image</span>
                            <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</span>
                        </div>
                    </div>
                </div>

                {/* Answer Options - Multiple Choice / Multiple Answer */}
                {(questionData.type === 'multiple-choice' || questionData.type === 'multiple-answer') && (
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <h3 className="text-lg font-bold text-main">Answer Options</h3>
                            <button
                                onClick={addAnswer}
                                className="px-3 py-1.5 bg-gray-100 text-main text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1"
                            >
                                <Plus size={14} /> Add Option
                            </button>
                        </div>

                        <div className="space-y-3">
                            {questionData.answers.map((answer, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl group">
                                    <input
                                        type={questionData.type === 'multiple-answer' ? 'checkbox' : 'radio'}
                                        name="correct-answer"
                                        checked={answer.isCorrect}
                                        onChange={(e) => updateAnswer(index, 'isCorrect', e.target.checked)}
                                        className="w-4 h-4 text-citilearn-green border-gray-300 focus:ring-citilearn-green"
                                    />
                                    <input
                                        type="text"
                                        value={answer.text}
                                        onChange={(e) => updateAnswer(index, 'text', e.target.value)}
                                        placeholder={`Option ${index + 1}`}
                                        className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary font-medium text-sm"
                                    />
                                    {questionData.answers.length > 2 && (
                                        <button
                                            onClick={() => removeAnswer(index)}
                                            className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-secondary">
                            {questionData.type === 'multiple-choice'
                                ? 'Select the radio button for the correct answer'
                                : 'Check all correct answers (multiple selections allowed)'}
                        </p>
                    </div>
                )}

                {/* True/False */}
                {questionData.type === 'true-false' && (
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6">
                        <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2">Correct Answer</h3>
                        <div className="flex gap-4">
                            <label className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${questionData.answers[0]?.isCorrect
                                    ? 'border-green-500 bg-green-50 text-green-900'
                                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                                }`}>
                                <input
                                    type="radio"
                                    name="true-false"
                                    className="hidden"
                                    onChange={() => setQuestionData({
                                        ...questionData,
                                        answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }]
                                    })}
                                />
                                <span className="font-bold text-lg">True</span>
                            </label>
                            <label className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${questionData.answers[1]?.isCorrect
                                    ? 'border-red-500 bg-red-50 text-red-900'
                                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                                }`}>
                                <input
                                    type="radio"
                                    name="true-false"
                                    className="hidden"
                                    onChange={() => setQuestionData({
                                        ...questionData,
                                        answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }]
                                    })}
                                />
                                <span className="font-bold text-lg">False</span>
                            </label>
                        </div>
                    </div>
                )}

                {/* Essay Question Settings */}
                {questionData.type === 'essay' && (
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6">
                        <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2">Essay Settings</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-main">Minimum Words</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={questionData.minWords}
                                    onChange={(e) => setQuestionData({ ...questionData, minWords: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-main">Maximum Words</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={questionData.maxWords}
                                    onChange={(e) => setQuestionData({ ...questionData, maxWords: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-secondary bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-lg">
                            ⚠️ Essay questions require manual grading by instructors
                        </p>
                    </div>
                )}

                {/* Fill in the Blank */}
                {questionData.type === 'fill-blank' && (
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6">
                        <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2">Correct Answers</h3>
                        <div className="space-y-3">
                            {questionData.correctAnswers.map((answer, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        value={answer}
                                        onChange={(e) => {
                                            const newAnswers = [...questionData.correctAnswers];
                                            newAnswers[index] = e.target.value;
                                            setQuestionData({ ...questionData, correctAnswers: newAnswers });
                                        }}
                                        placeholder={`Acceptable answer ${index + 1}`}
                                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                                    />
                                    {questionData.correctAnswers.length > 1 && (
                                        <button
                                            onClick={() => {
                                                const newAnswers = questionData.correctAnswers.filter((_, i) => i !== index);
                                                setQuestionData({ ...questionData, correctAnswers: newAnswers });
                                            }}
                                            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setQuestionData({ ...questionData, correctAnswers: [...questionData.correctAnswers, ""] })}
                            className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-sm font-bold text-secondary hover:border-primary hover:text-primary transition-colors"
                        >
                            + Add Alternative Answer
                        </button>
                        <p className="text-xs text-secondary">Add multiple acceptable answers (case-insensitive matching)</p>
                    </div>
                )}

                {/* Explanation */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2">Explanation (Optional)</h3>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-main">Answer Explanation</label>
                        <textarea
                            rows="3"
                            value={questionData.explanation}
                            onChange={(e) => setQuestionData({ ...questionData, explanation: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium resize-none"
                            placeholder="Explain why this is the correct answer (shown after submission)..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionEditor;
