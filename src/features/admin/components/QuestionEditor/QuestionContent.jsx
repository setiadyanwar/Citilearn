import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const QuestionContent = ({ question, onChange }) => {
    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 space-y-6">
            <h3 className="text-lg font-bold text-main border-b border-gray-100 pb-2">Question</h3>

            <div className="space-y-2">
                <Label className="text-sm font-bold text-main">Question Text</Label>
                <Textarea
                    rows={4}
                    value={question}
                    onChange={(e) => onChange({ question: e.target.value })}
                    className="bg-gray-50 border-gray-200 focus:ring-citilearn-green/20 min-h-[120px]"
                    placeholder="Enter your question here..."
                />
            </div>

            {/* Optional Image */}
            <div className="space-y-2">
                <Label className="text-sm font-bold text-main">Image (Optional)</Label>
                <div className="border-2 border-dashed border-gray-200 hover:border-citilearn-green/50 bg-gray-50 hover:bg-emerald-50/30 rounded-2xl h-32 flex flex-col items-center justify-center cursor-pointer transition-all group">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform border border-gray-100">
                        <ImageIcon className="text-secondary group-hover:text-citilearn-green" size={20} />
                    </div>
                    <span className="text-xs font-bold text-secondary group-hover:text-citilearn-green">Click to upload image</span>
                    <span className="text-3xs text-gray-400 mt-1">PNG, JPG up to 2MB</span>
                </div>
            </div>
        </div>
    );
};

export default QuestionContent;
