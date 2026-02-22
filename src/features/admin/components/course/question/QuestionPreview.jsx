import React, { useMemo } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const MarkdownText = ({ content }) => {
    const elements = useMemo(() => {
        if (!content) return null;

        const parts = content.split(/(```[\s\S]*?```)/g);

        return parts.map((part, index) => {
            if (part.startsWith('```') && part.endsWith('```')) {
                const codeContent = part.replace(/^```|```$/g, '').trim();
                return (
                    <div key={index} className="my-3 rounded-md overflow-hidden border border-slate-200 bg-slate-50">
                        <pre className="p-4 text-sm font-mono text-main overflow-x-auto leading-relaxed">
                            <code>{codeContent}</code>
                        </pre>
                    </div>
                );
            }

            const inlineParts = part.split(/(`[^`]+`|\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\([^)]+\)|<https?:\/\/[^>]+>)/g);

            return (
                <span key={index} className="whitespace-pre-wrap text-main leading-relaxed">
                    {inlineParts.map((subPart, subIndex) => {
                        if (subPart.startsWith('`') && subPart.endsWith('`') && subPart.length > 2) {
                            return (
                                <code key={subIndex} className="bg-slate-100 text-main px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200">
                                    {subPart.slice(1, -1)}
                                </code>
                            );
                        }
                        if (subPart.startsWith('**') && subPart.endsWith('**')) {
                            return <strong key={subIndex} className="font-bold text-main">{subPart.slice(2, -2)}</strong>;
                        }
                        if (subPart.startsWith('_') && subPart.endsWith('_')) {
                            return <em key={subIndex} className="italic">{subPart.slice(1, -1)}</em>;
                        }
                        if (subPart.startsWith('[') && subPart.includes('](') && subPart.endsWith(')')) {
                            const match = subPart.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
                            if (match) {
                                let url = match[2];
                                if (!url.match(/^(https?:\/\/|\/|#)/)) url = 'https://' + url;
                                return (
                                    <a key={subIndex} href={url} target="_blank" rel="noopener noreferrer"
                                        className="text-primary font-medium hover:underline cursor-pointer"
                                        onClick={(e) => e.stopPropagation()}>
                                        {match[1]}
                                    </a>
                                );
                            }
                        }
                        if (subPart.startsWith('<') && subPart.endsWith('>')) {
                            const url = subPart.slice(1, -1);
                            if (url.match(/^https?:\/\//)) {
                                const displayUrl = url.replace(/^https?:\/\//, '');
                                return (
                                    <a key={subIndex} href={url} target="_blank" rel="noopener noreferrer"
                                        className="text-primary font-medium hover:underline cursor-pointer"
                                        onClick={(e) => e.stopPropagation()}>
                                        {displayUrl}
                                    </a>
                                );
                            }
                        }
                        return subPart;
                    })}
                </span>
            );
        });
    }, [content]);

    return <div className="text-base">{elements}</div>;
};

const QuestionPreview = ({ question, image, answers, type }) => {
    const imagePreview = useMemo(() => {
        if (!image) return null;
        if (typeof image === 'string') return image;
        if (image instanceof File) return URL.createObjectURL(image);
        return null;
    }, [image]);

    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-none sticky top-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-lg font-bold text-main">Preview</h3>
                <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full ">
                    {type === 'multiple-choice' ? 'Single Choice' : type === 'true-false' ? 'True/False' : 'Multiple Select'}
                </span>
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="min-h-[60px]">
                        {question ? (
                            <MarkdownText content={question} />
                        ) : (
                            <p className="text-tertiary italic">Start typing your question...</p>
                        )}
                    </div>

                    {imagePreview && (
                        <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50 mt-4 aspect-video flex items-center justify-center">
                            <img
                                src={imagePreview}
                                alt="Question Attachment"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100/50">
                    <p className="text-xs font-bold text-tertiary  mb-2">Answer Choices</p>

                    {answers && answers.map((answer, index) => {
                        if (!answer.text && !answer.image && type !== 'true-false') return null;

                        if (type === 'true-false') {
                            const label = index === 0 ? 'True' : 'False';
                            return (
                                <div key={index} className={`flex items-center p-3 rounded-lg border cursor-not-allowed opacity-80 ${answer.isCorrect ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
                                    {answer.isCorrect
                                        ? <CheckCircle2 className="text-green-600 mr-3" size={18} />
                                        : <Circle className="text-tertiary mr-3" size={18} />}
                                    <span className={`font-medium ${answer.isCorrect ? 'text-green-700' : 'text-secondary'}`}>{label}</span>
                                </div>
                            );
                        }

                        return (
                            <div key={index} className={`flex items-start p-3 rounded-lg border transition-all ${answer.isCorrect ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
                                <div className="mt-0.5 mr-3 shrink-0">
                                    {answer.isCorrect
                                        ? <CheckCircle2 className="text-green-600" size={18} />
                                        : <Circle className="text-tertiary" size={18} />}
                                </div>
                                <div className="flex-1 w-full overflow-hidden">
                                    {answer.text && (
                                        <span className={`text-sm block mb-1 ${answer.isCorrect ? 'font-medium text-green-700' : 'text-secondary'}`}>
                                            {answer.text}
                                        </span>
                                    )}
                                    {!answer.text && !answer.image && <span className="text-tertiary italic text-sm">Option {index + 1}</span>}

                                    {answer.image && (
                                        <img
                                            src={answer.image}
                                            alt={`Option ${index + 1}`}
                                            className="h-20 w-auto object-contain rounded border border-slate-200 bg-white shadow-sm mt-1"
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuestionPreview;
