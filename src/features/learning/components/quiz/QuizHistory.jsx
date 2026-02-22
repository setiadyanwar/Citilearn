import React, { useState } from 'react';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import { RotateCcw } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const QuizHistory = ({ history }) => {
    const [showAll, setShowAll] = useState(false);
    const displayedHistory = showAll ? history : history.slice(0, 5);

    return (
        <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-main dark:text-white mb-4 flex items-center gap-2">
                History
                <Badge variant="outline" size="xs" className="text-gray-500 rounded-full px-2 py-0.5 font-normal bg-gray-100 dark:bg-slate-800 border-none">
                    {history.length}
                </Badge>
            </h3>

            {history.length > 0 ? (
                <>
                    <div className="rounded-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-50 dark:bg-slate-900/50">
                                <TableRow>
                                    <TableHead className="w-[180px]">Date</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {displayedHistory.map((item, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col">
                                                <span>
                                                    {new Date(item.date).toLocaleDateString('en-GB', {
                                                        day: 'numeric', month: 'short', year: 'numeric'
                                                    })}
                                                </span>
                                                <span className="text-xs text-gray-500 font-normal">
                                                    {new Date(item.date).toLocaleTimeString('en-GB', {
                                                        hour: '2-digit', minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-bold text-main dark:text-white">
                                                {item.score}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={item.passed ? "passed" : "failed"}
                                                size="xs"
                                                className=" font-bold"
                                            >
                                                {item.passed ? 'PASSED' : 'FAILED'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <button className="text-xs font-semibold text-gray-400 hover:text-emerald-600 dark:text-slate-500 dark:hover:text-emerald-400 transition-colors">
                                                View Details
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {history.length > 5 && (
                        <div className="mt-4 text-center">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 hover:underline transition-all"
                            >
                                {showAll ? "Show Less" : "Show All History"}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <Card
                    className="bg-gray-50 dark:bg-slate-800/50 border-2 border-dashed border-gray-200 dark:border-slate-700 text-center"
                    padding="p-8"
                    rounded="rounded-xl"
                >
                    <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <RotateCcw className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        No attempts yet.
                    </p>
                </Card>
            )}
        </div>
    );
};

export default QuizHistory;
