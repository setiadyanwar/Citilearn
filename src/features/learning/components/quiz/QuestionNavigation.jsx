import React from 'react';
import Card from '@/components/common/Card';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const QuestionNavigation = ({
    questions,
    answers,
    scrollToQuestion,
    handleSubmit,
    showMobileNav,
    setShowMobileNav
}) => {

    const NavigationGrid = ({ isMobile = false }) => (
        <>
            <div className="grid grid-cols-5 gap-2 place-items-center">
                {questions.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            scrollToQuestion(idx);
                            if (isMobile) setShowMobileNav(false);
                        }}
                        className={cn(
                            "w-[38px] h-[38px] flex items-center justify-center rounded-lg text-sm font-bold transition-all",
                            answers[idx] !== undefined
                                ? "bg-emerald-600 text-white"
                                : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700"
                        )}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
                <button
                    onClick={handleSubmit}
                    className="w-full text-left text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-bold text-sm hover:underline"
                >
                    Finish Attempt
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Static Version */}
            <div className="hidden lg:block">
                <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
                    <div className="mb-4">
                        <h3 className="font-bold text-main dark:text-white text-sm">Navigation Question</h3>
                    </div>
                    <NavigationGrid />
                </Card>
            </div>

            {/* Mobile Drawer Version */}
            {showMobileNav && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden pointer-events-auto"
                    onClick={() => setShowMobileNav(false)}
                />
            )}

            <div className={cn(
                "fixed inset-y-0 right-0 w-80 z-[70] shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out bg-white dark:bg-slate-900 lg:hidden pointer-events-auto",
                showMobileNav ? "translate-x-0" : "translate-x-full"
            )}>
                <div className="mb-6 flex justify-between items-center">
                    <h3 className="font-bold text-main dark:text-white text-lg">Navigation Question</h3>
                    <button
                        onClick={() => setShowMobileNav(false)}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full dark:text-gray-400 dark:hover:bg-slate-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <NavigationGrid isMobile={true} />
            </div>
        </>
    );
};

export default QuestionNavigation;
