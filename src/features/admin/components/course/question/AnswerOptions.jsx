import React from 'react';
import { Plus, Trash2, Circle, CheckCircle2, Image as ImageIcon, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { MAX_ANSWER_IMAGE_SIZE_BYTES, MAX_ANSWER_IMAGE_SIZE_MB } from '@/constants/fileUpload';

const AnswerOptions = ({
    type,
    answers,
    onAddAnswer,
    onRemoveAnswer,
    onUpdateAnswer,
    onSetTrueFalse
}) => {
    const inputRefs = React.useRef([]);
    const fileInputRef = React.useRef(null);
    const [activeIndex, setActiveIndex] = React.useState(null);

    const handleUploadClick = (index) => {
        setActiveIndex(index);
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && activeIndex !== null) {
            if (file.size > MAX_ANSWER_IMAGE_SIZE_BYTES) {
                toast.error(`Image too large (max ${MAX_ANSWER_IMAGE_SIZE_MB}MB)`);
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdateAnswer(activeIndex, 'image', reader.result);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = ''; // Reset input
    };

    // Multiple Choice / Multiple Answer
    if (type === 'multiple-choice' || type === 'multiple-answer') {
        const isMultiple = type === 'multiple-answer';

        const handleKeyDown = (e, index) => {
            if (e.key === 'Enter') {
                e.preventDefault();

                if (index < answers.length - 1) {
                    // Move to next input
                    inputRefs.current[index + 1]?.focus();
                } else {
                    // Add new option
                    onAddAnswer();
                    // Focus new input after render
                    setTimeout(() => {
                        inputRefs.current[index + 1]?.focus();
                    }, 0);
                }
            }
        };

        return (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-none space-y-6">
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <h3 className="text-lg font-bold text-slate-800">Answer Options</h3>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={onAddAnswer}
                        className="text-primary hover:text-primary hover:bg-primary/5 font-bold h-8"
                    >
                        <Plus size={16} className="mr-1" /> Add Option
                    </Button>
                </div>

                <div className="space-y-4">
                    {answers.map((answer, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <div className="flex items-start gap-3">
                                <div className="pt-3">
                                    {isMultiple ? (
                                        <Checkbox
                                            id={`ans-${index}`}
                                            checked={answer.isCorrect}
                                            onCheckedChange={(checked) => onUpdateAnswer(index, 'isCorrect', !!checked)}
                                            className="h-5 w-5 rounded border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        />
                                    ) : (
                                        <div
                                            onClick={() => onUpdateAnswer(index, 'isCorrect', true)}
                                            className="cursor-pointer"
                                        >
                                            {answer.isCorrect ? (
                                                <CheckCircle2 className="h-5 w-5 text-primary fill-current" />
                                            ) : (
                                                <Circle className="h-5 w-5 text-slate-300 hover:text-slate-400" />
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="relative group flex items-center gap-2">
                                        <Input
                                            ref={el => inputRefs.current[index] = el}
                                            value={answer.text}
                                            onChange={(e) => onUpdateAnswer(index, 'text', e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            placeholder={`Option ${index + 1}`}
                                            className="bg-slate-50 border-none focus:bg-white focus:ring-1 focus:ring-primary/30 h-11 shadow-none text-slate-700 font-medium pr-24"
                                        />

                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleUploadClick(index)}
                                                className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/10 rounded"
                                                title="Add Image"
                                            >
                                                <ImageIcon size={16} />
                                            </Button>

                                            {answers.length > 2 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => onRemoveAnswer(index)}
                                                    className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Image Preview if exists */}
                                    {answer.image && (
                                        <div className="relative inline-block group/image">
                                            <img
                                                src={answer.image}
                                                alt={`Option ${index + 1}`}
                                                className="h-24 w-auto object-contain rounded-lg border border-slate-200 bg-slate-50"
                                            />
                                            <button
                                                onClick={() => onUpdateAnswer(index, 'image', null)}
                                                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-slate-200 text-slate-400 hover:text-red-500 opacity-0 group-hover/image:opacity-100 transition-all"
                                                title="Remove Image"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-50/50 px-4 py-3 rounded-lg border border-blue-100/50 flex gap-3 text-xs text-blue-700 font-medium">
                    <div className="shrink-0 mt-0.5">ℹ️</div>
                    <p>
                        {isMultiple
                            ? 'Check all boxes that apply as correct answers.'
                            : 'Select the circle next to the correct answer.'}
                    </p>
                </div>
            </div>
        );
    }

    // True / False
    if (type === 'true-false') {
        return (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-none space-y-6">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Correct Answer</h3>

                <div className="grid grid-cols-2 gap-6">
                    <div
                        onClick={() => onSetTrueFalse(true)}
                        className={`
                            relative flex items-center justify-center gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all
                            ${answers[0]?.isCorrect
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200 hover:bg-white'
                            }
                        `}
                    >
                        <span className="font-bold text-xl">True</span>
                        {answers[0]?.isCorrect && (
                            <div className="absolute top-2 right-2">
                                <CheckCircle2 size={18} className="text-primary" />
                            </div>
                        )}
                    </div>

                    <div
                        onClick={() => onSetTrueFalse(false)}
                        className={`
                            relative flex items-center justify-center gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all
                            ${answers[1]?.isCorrect
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200 hover:bg-white'
                            }
                        `}
                    >
                        <span className="font-bold text-xl">False</span>
                        {answers[1]?.isCorrect && (
                            <div className="absolute top-2 right-2">
                                <CheckCircle2 size={18} className="text-primary" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default AnswerOptions;
