import React from 'react';
import { Label } from '@/components/ui/label';
import { TextEditor } from '@/components/ui/text-editor';
import ImageUploader from '@/components/common/ImageUploader';

const QuestionContent = ({ question, image, onChange }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-none space-y-6">
            <h3 className="text-lg font-bold text-main border-b border-slate-100 pb-4">
                Question Details
            </h3>

            <div className="space-y-5">
                {/* Optional Image - Moved to Top */}
                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-main">Attachment (Optional)</Label>
                    <ImageUploader
                        value={image}
                        onChange={(val) => onChange({ image: val })}
                        aspectRatio="h-40"
                        className="w-full"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-main">Question Text</Label>
                    <TextEditor
                        rows={5}
                        value={question}
                        onChange={(e) => onChange({ question: e.target.value })}
                        placeholder="Type your question here..."
                        className="rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default QuestionContent;
