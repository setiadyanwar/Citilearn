import React from 'react';
import {
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    XCircle,
    BookOpen,
    Calendar,
    Trophy,
    FileText,
    User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GradeBadge } from './GradingBadges';

const GradingDetailView = ({ selectedGrade, attemptDetails, onBack }) => {
    const questions = attemptDetails?.questions || [];

    return (
        <div className="space-y-6 animate-fade-in pb-20 max-w-7xl mx-auto px-4 md:px-0">
            {/* Detail Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onBack}
                        className="rounded-xl border border-slate-200 h-10 w-10 text-slate-500 hover:bg-slate-50 transition-all shadow-none"
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                            <BookOpen size={14} />
                            <span className="text-xs font-medium">{selectedGrade.course.title}</span>
                            <ChevronRight size={12} className="text-slate-300" />
                            <span className="text-xs font-bold text-primary">{selectedGrade.assessment.title}</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Review Attempt Details</h1>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Summary Info Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-none">
                        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-100 font-bold text-sm uppercase">
                                {selectedGrade.student.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 leading-none">{selectedGrade.student.name}</h3>
                                <p className="text-2xs text-slate-500 mt-1.5 font-medium tracking-tight">CID-{selectedGrade.student.id.toUpperCase()}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-500">Final score</span>
                                <span className={cn(
                                    "text-xl font-bold tracking-tight",
                                    selectedGrade.score >= selectedGrade.passingScore ? "text-emerald-600" : "text-red-500"
                                )}>{selectedGrade.score}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-500">Passing score</span>
                                <span className="text-xs font-bold text-slate-700">{selectedGrade.passingScore}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-500">Status</span>
                                <GradeBadge status={selectedGrade.status} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-500">Attempt count</span>
                                <span className="text-xs font-bold text-slate-700">{selectedGrade.attempts} / {selectedGrade.maxAttempts}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-500">Taken on</span>
                                <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold text-right">
                                    <Calendar size={14} className="text-slate-400" />
                                    {new Date(selectedGrade.date).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <p className="text-2xs text-slate-400 font-medium leading-relaxed tracking-tight">
                                Reviewing submission helps identifying knowledge gaps and areas for improvement.
                            </p>
                        </div>
                    </div>

                    <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 flex items-center gap-4 shadow-none">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200">
                            <Trophy size={18} />
                        </div>
                        <div>
                            <p className="text-3xs font-bold text-emerald-600 tracking-wider uppercase">Performance</p>
                            <p className="text-xs font-bold text-slate-700 mt-0.5">Above average class score</p>
                        </div>
                    </div>
                </div>

                {/* Questions & Answers Detail */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between shadow-none">
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <FileText size={18} className="text-slate-400" />
                            Submission review
                        </h3>
                        <div className="text-3xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-wider">
                            {questions.filter(q => q.isCorrect).length} of {questions.length} correct
                        </div>
                    </div>

                    <div className="space-y-4">
                        {questions.map((q, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "bg-white p-6 rounded-2xl border transition-all shadow-none",
                                    q.isCorrect ? "border-emerald-100 hover:border-emerald-200" : "border-red-100 hover:border-red-200"
                                )}
                            >
                                <div className="flex items-start gap-4 mb-5">
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs border transition-colors",
                                        q.isCorrect
                                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                            : "bg-red-50 text-red-600 border-red-100"
                                    )}>
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-slate-800 leading-snug">{q.text}</h4>
                                        <div className="flex items-center gap-2 mt-2">
                                            {q.isCorrect ? (
                                                <span className="flex items-center gap-1.5 text-3xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md tracking-tight uppercase border border-emerald-100">
                                                    <CheckCircle2 size={10} /> Correct answer
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-3xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md tracking-tight uppercase border border-red-100">
                                                    <XCircle size={10} /> Incorrect answer
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-12">
                                    {q.options.map((option, optIdx) => {
                                        const isStudentChoice = q.studentAnswer === optIdx;
                                        const isCorrectAnswer = q.correctAnswer === optIdx;

                                        return (
                                            <div
                                                key={optIdx}
                                                className={cn(
                                                    "p-3 rounded-xl border text-xs font-medium transition-all relative flex items-center gap-3",
                                                    isCorrectAnswer
                                                        ? "bg-emerald-50 border-emerald-200 text-emerald-900 font-bold"
                                                        : isStudentChoice && !q.isCorrect
                                                            ? "bg-red-50 border-red-200 text-red-900 font-bold"
                                                            : "bg-slate-50/50 border-slate-100 text-slate-500"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center",
                                                    isCorrectAnswer
                                                        ? "border-emerald-500 bg-emerald-500"
                                                        : isStudentChoice
                                                            ? "border-red-500 bg-red-500"
                                                            : "border-slate-300"
                                                )}>
                                                    {(isCorrectAnswer || isStudentChoice) && (
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                                    )}
                                                </div>
                                                <span className="flex-1 leading-tight">{option}</span>

                                                {isStudentChoice && (
                                                    <span className="absolute -top-2 -right-1 bg-slate-900 text-white text-3xs px-2 py-0.5 rounded-full font-bold shadow-none">
                                                        Student choice
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradingDetailView;
