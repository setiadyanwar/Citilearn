import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';
import QuizStats from './quiz/QuizStats';
import QuizRules from './quiz/QuizRules';
import QuizHistory from './quiz/QuizHistory';

const QuizLanding = ({ activeLesson }) => {
    const navigate = useNavigate();
    const { id: courseId } = useParams();
    // Mock data for history or retrieve from localStorage
    const [history, setHistory] = useState([]);
    const [stats, setStats] = useState({ passed: false, bestScore: 0 });

    useEffect(() => {
        // Load history from localStorage
        const storageKey = `quiz_history_${activeLesson.id}`;
        const storedHistory = localStorage.getItem(storageKey);

        // Also check if we have some dummy history for demonstration if empty
        if (storedHistory) {
            const parsed = JSON.parse(storedHistory);
            // Sort by date descending
            const sorted = parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
            setHistory(sorted);

            // Calculate stats
            const best = parsed.reduce((max, item) => Math.max(max, item.score), 0);
            const passed = parsed.some(item => item.passed);
            setStats({ passed, bestScore: best });
        } else {
            setHistory([]);
            setStats({ passed: false, bestScore: 0 });
        }
    }, [activeLesson.id]);

    const handleStart = () => {
        navigate(`/exam/${courseId}/${activeLesson.id}`);
    };

    const isPreTest = activeLesson.id.includes('pre');

    // Determine title context
    const getContextTitle = () => {
        if (isPreTest) return "Initial Assessment";
        if (activeLesson.id.includes('final') || activeLesson.title.toLowerCase().includes('post')) return "Final Knowledge Check";
        return "Module Assessment";
    };

    const contextTitle = getContextTitle();
    const questionCount = activeLesson.assignments ? activeLesson.assignments.length : 0;

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 px-4 sm:px-6">
            {/* Header Section */}
            <div className="bg-white dark:bg-slate-900/50 rounded-2xl py-2 px-4 border border-gray-100 dark:border-gray-800">
                <div className="flex flex-row justify-between items-center gap-4">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg md:text-2xl font-bold text-main dark:text-white mb-1 md:mb-2 truncate">
                            {contextTitle}
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 truncate">
                            {isPreTest
                                ? "Assess your baseline knowledge to personalize your learning path."
                                : "Prove your progress and celebrate your achievement."}
                        </p>
                    </div>

                    <QuizStats bestScore={stats.bestScore} />
                </div>
            </div>

            {/* Content Grid */}
            <div className="space-y-8 px-2">
                <div className="space-y-6">
                    <QuizRules
                        title={activeLesson.title}
                        questionCount={questionCount}
                    />

                    <div className="pt-2">
                        <Button
                            onClick={handleStart}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[160px] h-11 text-base active:scale-95 transition-all"
                        >
                            {history.length > 0 ? (
                                <>
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Re-Attempt
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4 mr-2 fill-current" />
                                    Start Quiz
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* History Section */}
                {history.length > 0 && (
                    <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                        <QuizHistory history={history} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizLanding;
