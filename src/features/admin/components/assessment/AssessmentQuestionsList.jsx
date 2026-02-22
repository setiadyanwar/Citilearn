import React from 'react';
import { Link } from 'react-router-dom';
import { Reorder } from 'framer-motion';
import {
    Plus, Trash2, CheckCircle, XCircle, Edit,
    GripVertical, Settings, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AssessmentQuestionsList = ({
    questions,
    onReorder,
    onRemove,
    courseId,
    assessmentType,
    moduleId,
    lessonId
}) => {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-main">Questions ({questions.length})</h3>
                <div className="text-xs text-secondary bg-gray-50 px-3 py-1.5 rounded-lg font-medium">
                    Drag to reorder
                </div>
            </div>

            {questions.length > 0 ? (
                <Reorder.Group axis="y" values={questions} onReorder={onReorder} className="space-y-3">
                    {questions.map((question, index) => (
                        <Reorder.Item
                            key={question.id}
                            value={question}
                            className="group p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-1 text-tertiary group-hover:text-main cursor-grab active:cursor-grabbing">
                                    <GripVertical size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h4 className="text-sm font-bold text-main">
                                            {index + 1}. {question.question}
                                        </h4>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {question.fromBank && (
                                                <span className={cn(
                                                    "flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md",
                                                    "bg-violet-50 text-violet-600 border border-violet-100"
                                                )}>
                                                    <BookOpen size={10} />
                                                    Bank
                                                </span>
                                            )}
                                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                                                {question.points} point{question.points > 1 ? 's' : ''}
                                            </span>
                                            <span className="text-xs font-medium text-secondary bg-white px-2 py-1 rounded-md border border-gray-200 capitalize">
                                                {question.type.replace('-', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                    {question.type === 'multiple-choice' && question.answers && (
                                        <div className="mt-3 space-y-1.5">
                                            {question.answers.map((answer, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs">
                                                    {idx === question.correctAnswer ? (
                                                        <CheckCircle size={14} className="text-green-500" />
                                                    ) : (
                                                        <XCircle size={14} className="text-tertiary" />
                                                    )}
                                                    <span className={idx === question.correctAnswer ? 'text-green-700 font-medium' : 'text-secondary'}>
                                                        {answer}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {question.type === 'true-false' && question.answers && (
                                        <div className="mt-3 space-y-1.5">
                                            {question.answers.map((answer, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs">
                                                    {idx === question.correctAnswer ? (
                                                        <CheckCircle size={14} className="text-green-500" />
                                                    ) : (
                                                        <XCircle size={14} className="text-tertiary" />
                                                    )}
                                                    <span className={idx === question.correctAnswer ? 'text-green-700 font-medium' : 'text-secondary'}>
                                                        {answer}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {!question.fromBank && (
                                        <Link
                                            to={`/admin/course/${courseId}/test/${assessmentType}/question/${question.id}${moduleId ? `?moduleId=${moduleId}` : ''}${lessonId ? `${moduleId ? '&' : '?'}lessonId=${lessonId}` : ''}`}
                                            className="p-2 text-secondary hover:text-primary hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all"
                                        >
                                            <Edit size={16} />
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => onRemove?.(question.id)}
                                        className="p-2 text-red-400 hover:text-red-500 hover:bg-white rounded-lg border border-transparent hover:border-red-100 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                        <Settings className="text-tertiary" size={32} />
                    </div>
                    <h4 className="text-main font-bold mb-1">No questions yet</h4>
                    <p className="text-sm text-secondary mb-4">Start by adding your first question or picking from the bank</p>
                    <Button
                        asChild
                        variant="secondary"
                    >
                        <Link to={`/admin/course/${courseId}/test/${assessmentType}/question/new`}>
                            <Plus size={16} />
                            Add Question
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AssessmentQuestionsList;
