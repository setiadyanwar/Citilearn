import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Reusable Header for Admin Pages
 */
const AdminHeader = ({
    title,
    backLabel = "Back",
    backUrl = "/admin/courses",
    status,
    statusVariant = "default", // published, draft, default
    onSave,
    onPublish,
    saveLoading = false,
    publishLoading = false,
    className
}) => {
    return (
        <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8", className)}>
            <div className="flex items-center gap-3 md:gap-4">
                <Link to={backUrl}>
                    <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10 text-muted-foreground hover:text-foreground rounded-xl shrink-0">
                        <ArrowLeft size={20} />
                    </Button>
                </Link>
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight truncate">
                            {title}
                        </h1>
                        {status && (
                            <span className={cn(
                                "px-2.5 py-0.5 text-3xs md:text-xs font-bold rounded-full border shrink-0",
                                statusVariant === 'published'
                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                    : 'bg-slate-100 text-muted-foreground border-border'
                            )}>
                                {status}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <Button
                    variant="outline"
                    className="font-bold h-10 px-4 rounded-xl flex-1 sm:flex-none text-sm md:text-base"
                    onClick={onSave}
                    disabled={saveLoading}
                >
                    Save Draft
                </Button>
                <Button
                    className="font-bold h-10 px-5 rounded-xl flex items-center justify-center gap-2 flex-1 sm:flex-none text-sm md:text-base"
                    onClick={onPublish}
                    disabled={publishLoading}
                >
                    <Save size={18} />
                    Publish
                </Button>
            </div>
        </div>
    );
};

export default AdminHeader;
