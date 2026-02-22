import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import data from '@/data.json';
import { generateMockGrades } from '@/utils/mockDataGenerators';

// Standard Admin Components
import AdminPageShell from '../components/layout/AdminPageShell';

// Sub-components
import GradingDetailView from '../components/grading/GradingDetailView';

/**
 * GradingDetail - Route: /admin/assessment/:gradeId
 *
 * Reads the grade from sessionStorage cache set by GradingReview.
 * Fallback: Regenerates mock data if cache is missing (e.g. direct URL access).
 */
const GradingDetail = () => {
    const { gradeId } = useParams();
    const navigate = useNavigate();

    const [grade, setGrade] = useState(null);
    const [attemptDetails, setAttemptDetails] = useState({ questions: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGradeDetail = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Simulate network latency
                await new Promise(resolve => setTimeout(resolve, 500));

                let foundGrade = null;

                // 1. Try reading from sessionStorage cache
                const cached = sessionStorage.getItem('admin_grades_cache');

                if (cached) {
                    const allGrades = JSON.parse(cached);
                    foundGrade = allGrades.find(g => String(g.id) === String(gradeId));
                }

                // 2. Fallback: Regenerate mock data if not found in cache
                if (!foundGrade) {
                    const students = [
                        { id: 'S-7721', name: 'Budi Setiadi' },
                        { id: 'S-8832', name: 'Ani Wijaya' },
                        { id: 'S-1293', name: 'Iwan Pratama' },
                        { id: 'S-4482', name: 'Siti Aminah' },
                        { id: 'S-9012', name: 'Rudi Hartono' },
                        { id: 'S-2231', name: 'Dewi Lestari' },
                        { id: 'S-5562', name: 'Bambang Subiakto' }
                    ];
                    const generatedGrades = generateMockGrades(students);
                    foundGrade = generatedGrades.find(g => String(g.id) === String(gradeId));
                }

                if (!foundGrade) throw new Error(`Attempt #${gradeId} not found.`);

                setGrade(foundGrade);

                // Fetch the actual questions from data.json using _meta info
                if (foundGrade._meta) {
                    const { courseId, lessonId } = foundGrade._meta;
                    const course = data.courses.find(c => c.id === courseId);
                    let targetLesson = null;

                    if (course) {
                        course.modules.forEach(m => {
                            const lesson = m.lessons.find(l => l.id === lessonId);
                            if (lesson) targetLesson = lesson;
                        });
                    }

                    let questionsData = targetLesson?.assignments;

                    // FALLBACK: If no explicit assignments found
                    if (!questionsData || questionsData.length === 0) {
                        const type = foundGrade.assessment.type;
                        questionsData = [
                            {
                                question: `Fundamental concept check for ${type}`,
                                options: ["Strongly Disagree", "Disagree", "Agree", "Strongly Agree"],
                                correctAnswer: 2
                            },
                            {
                                question: `How would you handle a standard procedure in ${foundGrade.course.title}?`,
                                options: ["Option A (Standard)", "Option B (Incorrect)", "Option C (Partial)", "Option D (Legacy)"],
                                correctAnswer: 0
                            },
                            {
                                question: `What is the primary indicator of success in this ${type}?`,
                                options: ["Speed of completion", "Accuracy of answers", "Compliance with manuals", "Peer review"],
                                correctAnswer: 1
                            }
                        ];

                        if (type === 'Post-test') {
                            questionsData.push({
                                question: "Select the most appropriate action for emergency scenarios.",
                                options: ["Wait for orders", "Follow SOP strictly", "Consult colleague", "Abort mission"],
                                correctAnswer: 1
                            });
                        }
                    }

                    if (questionsData) {
                        const targetCorrectCount = Math.round((foundGrade.score / 100) * questionsData.length);
                        let currentCorrect = 0;

                        setAttemptDetails({
                            questions: questionsData.map((q, idx) => {
                                let isCorrect = false;
                                let studentAnswer;

                                // Force correct/incorrect based on target count
                                if (currentCorrect < targetCorrectCount) {
                                    studentAnswer = q.correctAnswer;
                                    isCorrect = true;
                                    currentCorrect++;
                                } else {
                                    studentAnswer = (q.correctAnswer + 1) % q.options.length;
                                    isCorrect = false;
                                }

                                return {
                                    id: idx + 1,
                                    text: q.question,
                                    options: q.options,
                                    studentAnswer,
                                    correctAnswer: q.correctAnswer,
                                    isCorrect
                                };
                            })
                        });
                    }
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGradeDetail();
    }, [gradeId]);

    return (
        <AdminPageShell>
            {isLoading ? (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                        <div className="space-y-3">
                            <Skeleton className="h-8 w-64" />
                            <Skeleton className="h-4 w-96" />
                        </div>
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-32 rounded-xl" />
                            <Skeleton className="h-10 w-32 rounded-xl" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl space-y-4">
                                    <Skeleton className="h-5 w-full" />
                                    <div className="space-y-3">
                                        <Skeleton className="h-10 w-full rounded-xl" />
                                        <Skeleton className="h-10 w-full rounded-xl" />
                                        <Skeleton className="h-10 w-full rounded-xl" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-6">
                            <Skeleton className="h-64 w-full rounded-2xl" />
                            <Skeleton className="h-48 w-full rounded-2xl" />
                        </div>
                    </div>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center h-96 gap-4 text-center">
                    <p className="text-secondary font-bold text-lg tracking-tight">Something went wrong</p>
                    <p className="text-tertiary text-sm font-medium">{error}</p>
                    <button
                        onClick={() => navigate('/admin/assessment')}
                        className="text-sm font-bold text-primary underline mt-2"
                    >
                        ← Back to Assessment & Grading
                    </button>
                </div>
            ) : (
                <GradingDetailView
                    selectedGrade={grade}
                    attemptDetails={attemptDetails}
                    onBack={() => navigate('/admin/assessment')}
                />
            )}
        </AdminPageShell>
    );
};

export default GradingDetail;
