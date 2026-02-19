import React, { useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import data from '@/data.json';

// Standard Admin Components
import AdminPageShell from '../components/layout/AdminPageShell';
import ManagementHeader from '../components/layout/ManagementHeader';

// Sub-components
import AssessmentSettings from '../components/assessment/AssessmentSettings';
import AssessmentQuestionsList from '../components/assessment/AssessmentQuestionsList';
import AssessmentSummary from '../components/assessment/AssessmentSummary';
import QuestionBankPicker from '../components/assessment/QuestionBankPicker';

const AssessmentManager = () => {
    const { courseId, assessmentType } = useParams(); // assessmentType: pre-test, quiz, post-test

    const [searchParams] = useSearchParams();
    const moduleId = searchParams.get('moduleId');
    const lessonId = searchParams.get('lessonId');

    const [isBankOpen, setIsBankOpen] = useState(false);

    const [assessmentData, setAssessmentData] = useState({
        title: '',
        enabled: true,
        passingGrade: 80,
        timeLimit: 30,
        maxAttempts: 3,
        showResults: true,
        shuffleQuestions: false,
        shuffleAnswers: true,
        allowReview: true,
        requireCamera: false,
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

    const handleAddFromBank = (selectedQuestions) => {
        setQuestions(prev => {
            const maxId = prev.reduce((max, q) => Math.max(max, typeof q.id === 'number' ? q.id : 0), 0);
            const newQs = selectedQuestions.map((q, idx) => ({
                ...q,
                id: maxId + idx + 1,
            }));
            return [...prev, ...newQs];
        });
    };

    const handleRemoveQuestion = (questionId) => {
        setQuestions(prev => prev.filter(q => q.id !== questionId));
    };

    // IDs already in this assessment (bankId if from bank, or id if manual)
    const alreadyAddedBankIds = questions
        .filter(q => q.bankId)
        .map(q => q.bankId);

    return (
        <AdminPageShell>
            <ManagementHeader
                title={`${getAssessmentTitle()} Settings`}
                description="Configure assessment rules and manage questions"
            >
                <div className="flex items-center gap-3">
                    {/* From Question Bank button */}
                    <Button
                        variant="secondary"
                        className="rounded-xl font-bold h-11 px-5 shadow-none gap-2"
                        onClick={() => setIsBankOpen(true)}
                    >
                        <BookOpen size={16} />
                        Question Bank
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        className="rounded-xl font-bold h-11 px-5 shadow-none"
                    >
                        <Link to={`/admin/course/${courseId}/test/${assessmentType}/question/new${moduleId ? `?moduleId=${moduleId}` : ''}${lessonId ? `${moduleId ? '&' : '?'}lessonId=${lessonId}` : ''}`}>
                            <Plus size={16} className="mr-2" />
                            Add Question
                        </Link>
                    </Button>
                    <Button
                        variant="default"
                        className="rounded-xl font-bold h-11 px-6 shadow-none"
                    >
                        Save Test
                    </Button>
                </div>
            </ManagementHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                        <div className="bg-white p-12 rounded-3xl border border-slate-200 flex items-center justify-center h-64">
                            <p className="text-slate-400 font-medium">Loading assessment...</p>
                        </div>
                    ) : (
                        <AssessmentQuestionsList
                            questions={questions}
                            onReorder={setQuestions}
                            onRemove={handleRemoveQuestion}
                            courseId={courseId}
                            assessmentType={assessmentType}
                            moduleId={moduleId}
                            lessonId={lessonId}
                        />
                    )}
                </div>
            </div>

            {/* Question Bank Picker Modal */}
            <QuestionBankPicker
                isOpen={isBankOpen}
                onClose={() => setIsBankOpen(false)}
                onSelect={handleAddFromBank}
                alreadyAddedIds={alreadyAddedBankIds}
            />
        </AdminPageShell>
    );
};

export default AssessmentManager;
