import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const EditorHeader = ({
    isEditing,
    assessmentType,
    onCancel,
    onSave,
    backUrl
}) => {
    const getAssessmentTitle = () => {
        switch (assessmentType) {
            case 'pre-test': return 'Pre-Test';
            case 'post-test': return 'Post-Test';
            case 'quiz': return 'Module Quiz';
            default: return 'Assessment';
        }
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <Link
                    to={backUrl}
                    className="p-2.5 rounded-xl hover:bg-white text-secondary hover:text-primary transition-colors border border-transparent hover:border-gray-200"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-main">
                        {isEditing ? 'Edit Question' : 'Add New Question'}
                    </h1>
                    <p className="text-sm text-secondary font-medium">
                        {getAssessmentTitle()}
                    </p>
                </div>
            </div>
            <div className="flex gap-3">
                <Button
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onSave}
                    variant="default"
                    className="px-6"
                >
                    <Save size={16} className="mr-2" />
                    Save Question
                </Button>
            </div>
        </div>
    );
};

export default EditorHeader;
