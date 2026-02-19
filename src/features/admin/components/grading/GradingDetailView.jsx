import React from 'react';
import {
    ArrowLeft,
    CheckCircle2,
    XCircle,
    Calendar,
    Trophy,
    FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GradeBadge, TypeBadge } from './GradingBadges';
import UserProfile from '@/components/common/UserProfile';
import CircularProgress from '@/components/common/CircularProgress';
import StatCard from '@/features/dashboard/components/StatCard';

const GradingDetailView = ({ selectedGrade, attemptDetails, onBack }) => {
    const questions = attemptDetails?.questions || [];

    return (
        <div className="space-y-6">
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
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-none">Review Attempt</h1>
                        <div className="mt-2">
                            <TypeBadge type={selectedGrade.assessment.type} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Summary Info Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-none">
                        <div className="flex items-center gap-4">
                            <UserProfile
                                imageUrl={null}
                                name={selectedGrade.student.name}
                                size="sm"
                                shape="square"
                            />
                            <div>
                                <h3 className="font-bold text-slate-900 leading-none">{selectedGrade.student.name}</h3>
                                <p className="text-2xs text-slate-500 mt-1.5 font-medium tracking-tight uppercase">CID-{selectedGrade.student.id.toUpperCase()}</p>
                            </div>
                        </div>

                        <div className="space-y-6 pt-2">
                            {/* Visual Score Header */}
                            <div className="flex flex-col items-center py-6 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                                <CircularProgress
                                    progress={selectedGrade.score}
                                    size="w-24 h-24"
                                    strokeWidth={8}
                                    textSize="text-xl"
                                    color={selectedGrade.score >= selectedGrade.passingScore ? 'text-emerald-500' : 'text-red-500'}
                                />
                                <div className="mt-4 text-center">
                                    <p className="text-3xs font-bold text-slate-400 uppercase tracking-widest">Final Score</p>
                                    <div className="mt-1">
                                        <GradeBadge status={selectedGrade.status} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-500 tracking-tight">Correct Answers</span>
                                    <span className="text-xs font-bold text-slate-700">
                                        {questions.filter(q => q.isCorrect).length} <span className="text-slate-300 mx-1">/</span> {questions.length}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-500 tracking-tight">Passing score</span>
                                    <span className="text-xs font-bold text-slate-700">{selectedGrade.passingScore}%</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-500 tracking-tight">Attempts used</span>
                                    <span className="text-xs font-bold text-slate-700">{selectedGrade.attempts} / {selectedGrade.maxAttempts}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-500 tracking-tight">Taken on</span>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                                        <Calendar size={13} className="text-slate-400" />
                                        {new Date(selectedGrade.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>
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
