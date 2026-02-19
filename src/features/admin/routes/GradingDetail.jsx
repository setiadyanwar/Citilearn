import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import data from '@/data.json';

// Standard Admin Components
import AdminPageShell from '../components/AdminPageShell';

// Sub-components
import GradingDetailView from '../components/grading/GradingDetailView';

/**
 * GradingDetail - Route: /admin/assessment/:gradeId
 *
 * Reads the grade from sessionStorage cache set by GradingReview.
 * On API integration, replace the useEffect body with:
 *   const response = await axios.get(`/api/admin/grading/${gradeId}`);
 *   setGrade(response.data);
 *   setAttemptDetails(response.data.attemptDetails);
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
                // REPLACE with: const response = await axios.get(`/api/admin/grading/${gradeId}`);
                await new Promise(resolve => setTimeout(resolve, 500));

                // Read from sessionStorage cache populated by GradingReview
                const cached = sessionStorage.getItem('admin_grades_cache');
                if (!cached) throw new Error('Session expired. Please go back and try again.');

                const allGrades = JSON.parse(cached);
                const found = allGrades.find(g => String(g.id) === String(gradeId));
                if (!found) throw new Error(`Attempt #${gradeId} not found.`);

                setGrade(found);

                // Fetch the actual questions from data.json using _meta info
                if (found._meta) {
                    const { courseId, lessonId } = found._meta;
                    const course = data.courses.find(c => c.id === courseId);
                    let targetLesson = null;

                    if (course) {
                        course.modules.forEach(m => {
                            const lesson = m.lessons.find(l => l.id === lessonId);
                            if (lesson) targetLesson = lesson;
                        });
                    }

                    let questionsData = targetLesson?.assignments;

                    // FALLBACK: If no explicit assignments found (e.g. for mock/newly created assessments)
                    // generate stable mock questions so the page isn't empty
                    if (!questionsData || questionsData.length === 0) {
                        const type = found.assessment.type;
                        questionsData = [
                            {
                                question: `Fundamental concept check for ${type}`,
                                options: ["Strongly Disagree", "Disagree", "Agree", "Strongly Agree"],
                                correctAnswer: 2
                            },
                            {
                                question: `How would you handle a standard procedure in ${found.course.title}?`,
                                options: ["Option A (Standard)", "Option B (Incorrect)", "Option C (Partial)", "Option D (Legacy)"],
                                correctAnswer: 0
                            },
                            {
                                question: `What is the primary indicator of success in this ${type}?`,
                                options: ["Speed of completion", "Accuracy of answers", "Compliance with manuals", "Peer review"],
                                correctAnswer: 1
                            }
                        ];

                        // For Post-tests, add more questions
                        if (type === 'Post-test') {
                            questionsData.push({
                                question: "Select the most appropriate action for emergency scenarios.",
                                options: ["Wait for orders", "Follow SOP strictly", "Consult colleague", "Abort mission"],
                                correctAnswer: 1
                            });
                        }
                    }

                    if (questionsData) {
                        const targetCorrectCount = Math.round((found.score / 100) * questionsData.length);
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
                                    // Pick any incorrect answer
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
                    <p className="text-slate-500 font-bold text-lg tracking-tight">Something went wrong</p>
                    <p className="text-slate-400 text-sm font-medium">{error}</p>
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
