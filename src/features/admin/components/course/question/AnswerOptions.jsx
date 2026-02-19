import { Plus, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AnswerOptions = ({
    type,
    answers,
    onAddAnswer,
    onRemoveAnswer,
    onUpdateAnswer,
    onSetTrueFalse
}) => {
    // Multiple Choice / Multiple Answer
    if (type === 'multiple-choice' || type === 'multiple-answer') {
        return (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <h3 className="text-lg font-bold text-main">Answer Options</h3>
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={onAddAnswer}
                    >
                        <Plus size={14} className="mr-1" /> Add Option
                    </Button>
                </div>

                <div className="space-y-3">
                    {answers.map((answer, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl group hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                            <Checkbox
                                id={`ans-${index}`}
                                checked={answer.isCorrect}
                                onCheckedChange={(checked) => onUpdateAnswer(index, 'isCorrect', !!checked)}
                                className="h-5 w-5 rounded-md border-gray-300 data-[state=checked]:bg-citilearn-green data-[state=checked]:border-citilearn-green"
                            />
                            <Input
                                value={answer.text}
                                onChange={(e) => onUpdateAnswer(index, 'text', e.target.value)}
                                placeholder={`Option ${index + 1}`}
                                className="flex-1 bg-white border-gray-200 focus:ring-citilearn-green/20"
                            />
                            {answers.length > 2 && (
                                <button
                                    onClick={() => onRemoveAnswer(index)}
                                    className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <p className="text-xs text-secondary font-medium italic">
                    {type === 'multiple-choice'
                        ? 'Tip: Check the box for the correct answer. You can only select one.'
                        : 'Tip: Check all correct answers (multiple selections allowed).'}
                </p>
            </div>
        );
    }

    // True / False
    if (type === 'true-false') {
        return (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 space-y-6">
                <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2">Correct Answer</h3>
                <div className="flex gap-4">
                    <label className={`flex-1 flex items-center justify-center gap-3 p-6 rounded-2xl border-2 cursor-pointer transition-all ${answers[0]?.isCorrect
                        ? 'border-citilearn-green bg-emerald-50 text-citilearn-green'
                        : 'border-gray-50 bg-gray-50/50 text-gray-500 hover:border-gray-200 hover:bg-white'
                        }`}>
                        <Checkbox
                            className="hidden"
                            checked={answers[0]?.isCorrect}
                            onCheckedChange={() => onSetTrueFalse(true)}
                        />
                        <span className="font-bold text-lg">True</span>
                    </label>
                    <label className={`flex-1 flex items-center justify-center gap-3 p-6 rounded-2xl border-2 cursor-pointer transition-all ${answers[1]?.isCorrect
                        ? 'border-citilearn-green bg-emerald-50 text-citilearn-green'
                        : 'border-gray-50 bg-gray-50/50 text-gray-500 hover:border-gray-200 hover:bg-white'
                        }`}>
                        <Checkbox
                            className="hidden"
                            checked={answers[1]?.isCorrect}
                            onCheckedChange={() => onSetTrueFalse(false)}
                        />
                        <span className="font-bold text-lg">False</span>
                    </label>
                </div>
            </div>
        );
    }

    return null;
};

export default AnswerOptions;
