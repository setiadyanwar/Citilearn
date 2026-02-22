import React from 'react';
import {
    Clock,
    BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { GradeBadge, TypeBadge } from './GradingBadges';

const GradingTable = ({ grades, onReview }) => {
    return (
        <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-none">
            <Table>
                <TableHeader className="bg-slate-50/50 border-b border-slate-200">
                    <TableRow className="hover:bg-transparent border-none">
                        <TableHead className="px-6 h-12 text-3xs font-bold text-secondary ">Student info</TableHead>
                        <TableHead className="px-6 h-12 text-3xs font-bold text-secondary ">Assessment</TableHead>
                        <TableHead className="px-6 h-12 text-center text-3xs font-bold text-secondary ">Attempts</TableHead>
                        <TableHead className="px-6 h-12 text-center text-3xs font-bold text-secondary ">Grade</TableHead>
                        <TableHead className="px-6 h-12 text-center text-3xs font-bold text-secondary ">Status</TableHead>
                        <TableHead className="px-6 h-12 text-right text-3xs font-bold text-secondary  pr-6">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {grades.map((grade) => (
                        <TableRow key={grade.id} className="group hover:bg-slate-100/60 border-slate-100 transition-all duration-200">
                            <TableCell className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-tertiary shrink-0 border border-slate-200 group-hover:bg-white transition-colors font-bold text-sm ">
                                        {grade.student.name.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-main leading-tight truncate">{grade.student.name}</p>
                                        <p className="text-2xs text-secondary mt-0.5 font-medium tracking-tight">CID-{grade.student.id.toUpperCase()}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                <div>
                                    <p className="text-sm font-bold text-main leading-tight">{grade.assessment.title}</p>
                                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                        <TypeBadge type={grade.assessment.type} />
                                        <span className="text-3xs font-bold text-tertiary flex items-center gap-1 leading-none tracking-tight">
                                            <BookOpen size={10} /> {grade.course.title}
                                        </span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-4 text-center">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-white transition-all text-2xs font-bold text-main">
                                    <Clock size={12} className="text-tertiary" />
                                    {grade.attempts} / {grade.maxAttempts}
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-4 text-center">
                                <div className="flex flex-col items-center">
                                    <span className={cn(
                                        "text-lg font-bold tracking-tight leading-none",
                                        grade.score >= grade.passingScore ? "text-emerald-600" : "text-red-500"
                                    )}>
                                        {grade.score}%
                                    </span>
                                    <span className="text-3xs font-bold text-tertiary mt-1 ">Score</span>
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-4 text-center">
                                <GradeBadge status={grade.status} />
                            </TableCell>
                            <TableCell className="px-6 py-4 text-right pr-6">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => onReview(grade)}
                                >
                                    Review
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default GradingTable;
