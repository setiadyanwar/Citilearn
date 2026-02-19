import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import data from '@/data.json';

// Sub-components
import AssessmentSettings from '../components/assessment/AssessmentSettings';
import AssessmentQuestionsList from '../components/assessment/AssessmentQuestionsList';
import AssessmentSummary from '../components/assessment/AssessmentSummary';

const AssessmentManager = () => {
    const { courseId, assessmentType } = useParams(); // assessmentType: pre-test, quiz, post-test
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const moduleId = searchParams.get('moduleId');
    const lessonId = searchParams.get('lessonId');

    const [assessmentData, setAssessmentData] = useState({
        title: '',
        enabled: true,
        passingGrade: 80,
        timeLimit: 30,
        maxAttempts: 3,
        showResults: true,
        shuffleQuestions: false,
        shuffleAnswers: true,
        allowReview: true
    });

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        // Find course
        const course = data.courses.find(c => c.id === courseId);
        if (!course) {
            setIsLoading(false);
            return;
        }

        let targetAssessment = null;

        if (lessonId) {
            // Edit existing lesson quiz
            course.modules.forEach(m => {
                const lesson = m.lessons.find(l => l.id === lessonId);
                if (lesson && lesson.type === 'quiz') {
                    targetAssessment = lesson;
                }
            });
        }

        // Fallback or specific type matching if lessonId not found or not provided
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

        if (targetAssessment) {
            setAssessmentData(prev => ({
                ...prev,
                title: targetAssessment.title || prev.title,
                passingGrade: targetAssessment.passingGrade || 80,
                timeLimit: targetAssessment.timeLimit || 30,
                maxAttempts: targetAssessment.maxAttempts || 3,
                showResults: targetAssessment.showResults !== undefined ? targetAssessment.showResults : true,
                shuffleQuestions: targetAssessment.shuffleQuestions || false,
                shuffleAnswers: targetAssessment.shuffleAnswers || true,
                allowReview: targetAssessment.allowReview !== undefined ? targetAssessment.allowReview : true
            }));

            // Map assignments to questions format
            if (targetAssessment.assignments) {
                const mappedQuestions = targetAssessment.assignments.map((q, idx) => ({
                    id: idx + 1, // Stable 1-indexed ID for linking
                    question: q.question,
                    type: q.type || "multiple-choice",
                    points: q.points || 1,
                    answers: q.options,
                    correctAnswer: q.correctAnswer,
                    explanation: q.explanation || "",
                    minWords: q.minWords,
                    maxWords: q.maxWords
                }));
                setQuestions(mappedQuestions);
            }
        } else {
            setQuestions([]);
        }

        setIsLoading(false);
    }, [courseId, assessmentType, moduleId, lessonId]);

    const getAssessmentTitle = () => {
        switch (assessmentType) {
            case 'pre-test': return 'Pre-Test';
            case 'post-test': return 'Post-Test';
            case 'quiz': return 'Module Quiz';
            default: return 'Assessment';
        }
    };

    const handleUpdateSettings = (newSettings) => {
        setAssessmentData(prev => ({ ...prev, ...newSettings }));
    };

    return (
        <div className="space-y-6 pb-20 animate-fade-in px-4 md:px-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link to={`/admin/course/${courseId}/edit`} className="p-2 rounded-xl hover:bg-white text-secondary hover:text-primary transition-colors border border-transparent hover:border-gray-200">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-main tracking-tight">{getAssessmentTitle()} Settings</h1>
                        <p className="text-sm text-secondary font-medium">Configure assessment rules and manage questions</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        asChild
                        variant="secondary"
                        className="rounded-xl font-bold h-10 px-5 shadow-none"
                    >
                        <Link to={`/admin/course/${courseId}/assessment/${assessmentType}/question/new${moduleId ? `?moduleId=${moduleId}` : ''}${lessonId ? `${moduleId ? '&' : '?'}lessonId=${lessonId}` : ''}`}>
                            <Plus size={16} />
                            Add Question
                        </Link>
                    </Button>
                    <Button
                        variant="default"
                        className="rounded-xl font-bold h-10 px-5 shadow-none"
                    >
                        Save Settings
                    </Button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Settings Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <AssessmentSettings
                        data={assessmentData}
                        onChange={handleUpdateSettings}
                    />

                    <AssessmentSummary
                        questions={questions}
                        timeLimit={assessmentData.timeLimit}
                    />
                </div>

                {/* Questions List */}
                <div className="lg:col-span-2">
                    {isLoading ? (
                        <div className="bg-white p-12 rounded-3xl border border-gray-100 flex items-center justify-center">
                            <p className="text-secondary font-medium">Loading assessment...</p>
                        </div>
                    ) : (
                        <AssessmentQuestionsList
                            questions={questions}
                            onReorder={setQuestions}
                            courseId={courseId}
                            assessmentType={assessmentType}
                            moduleId={moduleId}
                            lessonId={lessonId}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssessmentManager;
