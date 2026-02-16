import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import data from '@/data.json';

// Modular Components
import EditorHeader from '../components/QuestionEditor/EditorHeader';
import QuestionContent from '../components/QuestionEditor/QuestionContent';
import AnswerOptions from '../components/QuestionEditor/AnswerOptions';
import EditorSidebar from '../components/QuestionEditor/EditorSidebar';

const QuestionEditor = () => {
    const { courseId, assessmentType, questionId } = useParams();
    const navigate = useNavigate();
    const isEditing = !!questionId && questionId !== 'new';

    const [searchParams] = useSearchParams();
    const moduleId = searchParams.get('moduleId');
    const lessonId = searchParams.get('lessonId');

    const [questionData, setQuestionData] = useState({
        question: "",
        type: "multiple-choice",
        points: 1,
        explanation: "",
        image: null,
        answers: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false }
        ],
        minWords: 50,
        maxWords: 500
    });

    React.useEffect(() => {
        if (!isEditing) return;

        // Find question in data.json
        const course = data.courses.find(c => c.id === courseId);
        if (!course) return;

        let targetAssessment = null;
        if (lessonId) {
            course.modules.forEach(m => {
                const lesson = m.lessons.find(l => l.id === lessonId);
                if (lesson && lesson.type === 'quiz') targetAssessment = lesson;
            });
        }

        if (!targetAssessment) {
            if (assessmentType === 'pre-test') {
                const mPre = course.modules.find(m => m.id === 'm-pre' || m.id === 'pre-test' || m.title.toLowerCase().includes('pre'));
                targetAssessment = mPre?.lessons.find(l => l.type === 'quiz');
            } else if (assessmentType === 'post-test') {
                const mFinal = course.modules.find(m => m.id === 'm-final' || m.id === 'post-test' || m.title.toLowerCase().includes('final'));
                targetAssessment = mFinal?.lessons.find(l => l.type === 'quiz');
            } else if (moduleId) {
                const module = course.modules.find(m => m.id === moduleId);
                targetAssessment = module?.lessons.find(l => l.type === 'quiz');
            }
        }

        if (targetAssessment && targetAssessment.assignments) {
            const questionIdx = parseInt(questionId) - 1;
            const q = targetAssessment.assignments[questionIdx];

            if (q) {
                setQuestionData({
                    question: q.question,
                    type: q.type || "multiple-choice",
                    points: q.points || 1,
                    explanation: q.explanation || "",
                    image: q.image || null,
                    answers: q.options ? q.options.map((opt, idx) => ({
                        text: opt,
                        isCorrect: idx === q.correctAnswer
                    })) : [
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false }
                    ],
                    minWords: q.minWords || 50,
                    maxWords: q.maxWords || 500
                });
            }
        }
    }, [isEditing, courseId, assessmentType, moduleId, lessonId, questionId]);

    const handleUpdateData = (newData) => {
        setQuestionData(prev => ({ ...prev, ...newData }));
    };

    const addAnswer = () => {
        setQuestionData(prev => ({
            ...prev,
            answers: [...prev.answers, { text: "", isCorrect: false }]
        }));
    };

    const removeAnswer = (index) => {
        setQuestionData(prev => ({
            ...prev,
            answers: prev.answers.filter((_, i) => i !== index)
        }));
    };

    const updateAnswer = (index, field, value) => {
        const newAnswers = [...questionData.answers];
        newAnswers[index][field] = value;

        if (field === 'isCorrect' && value && questionData.type !== 'multiple-answer') {
            newAnswers.forEach((ans, i) => {
                if (i !== index) ans.isCorrect = false;
            });
        }

        setQuestionData(prev => ({ ...prev, answers: newAnswers }));
    };

    const setTrueFalse = (isTrueCorrect) => {
        setQuestionData(prev => ({
            ...prev,
            answers: [
                { text: "True", isCorrect: isTrueCorrect },
                { text: "False", isCorrect: !isTrueCorrect }
            ]
        }));
    };

    const handleSave = () => {
        navigate(`/admin/course/${courseId}/assessment/${assessmentType}${moduleId ? `?moduleId=${moduleId}` : ''}${lessonId ? `${moduleId ? '&' : '?'}lessonId=${lessonId}` : ''}`);
    };

    const backUrl = `/admin/course/${courseId}/assessment/${assessmentType}${moduleId ? `?moduleId=${moduleId}` : ''}${lessonId ? `${moduleId ? '&' : '?'}lessonId=${lessonId}` : ''}`;

    return (
        <div className="space-y-6 pb-20 animate-fade-in px-4 md:px-0">
            <EditorHeader
                isEditing={isEditing}
                assessmentType={assessmentType}
                backUrl={backUrl}
                onCancel={() => navigate(backUrl)}
                onSave={handleSave}
            />

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <QuestionContent
                        question={questionData.question}
                        onChange={handleUpdateData}
                    />

                    <AnswerOptions
                        type={questionData.type}
                        answers={questionData.answers}
                        onAddAnswer={addAnswer}
                        onRemoveAnswer={removeAnswer}
                        onUpdateAnswer={updateAnswer}
                        onSetTrueFalse={setTrueFalse}
                    />
                </div>

                <EditorSidebar
                    type={questionData.type}
                    points={questionData.points}
                    explanation={questionData.explanation}
                    minWords={questionData.minWords}
                    maxWords={questionData.maxWords}
                    onChange={handleUpdateData}
                />
            </div>
        </div>
    );
};

export default QuestionEditor;
