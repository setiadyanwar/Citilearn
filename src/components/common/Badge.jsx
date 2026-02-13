import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Clock, BookOpen } from 'lucide-react';

const badgeVariants = cva(
    "inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                // Status (Outline with Dot usually)
                "not-started": "border-slate-300 text-slate-600 bg-white dark:border-slate-700 dark:text-slate-400 dark:bg-slate-900",
                "in-progress": "border-amber-400 text-amber-600 bg-white dark:border-amber-500 dark:text-amber-500 dark:bg-slate-900",
                "completed": "border-green-400 text-green-600 bg-white dark:border-green-500 dark:text-green-500 dark:bg-slate-900",
                "failed": "border-red-400 text-red-600 bg-white dark:border-red-500 dark:text-red-500 dark:bg-slate-900",
                "passed": "border-green-400 text-green-600 bg-white dark:border-green-500 dark:text-green-500 dark:bg-slate-900",

                // Filled
                "in-progress-filled": "border-amber-400 text-amber-700 bg-amber-50 dark:border-amber-500 dark:text-amber-400 dark:bg-amber-500/10",
                "completed-filled": "border-green-400 text-green-700 bg-green-50 dark:border-green-500 dark:text-green-400 dark:bg-green-500/10",

                // Special
                "points": "border-gray-200 text-gray-600 bg-gray-100 dark:border-slate-700 dark:text-slate-400 dark:bg-slate-800",
                "mandatory": "border-red-100 bg-red-50 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400",
                "continue": "border-amber-100 bg-amber-50 text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400",

                // Default / Neutral
                "outline": "border-gray-200 text-gray-600 dark:border-slate-700 dark:text-slate-400",
                "primary": "border-transparent bg-primary text-white hover:bg-primary/90",

                // Legacy Mappings (untuk kompatibilitas)
                "success": "bg-emerald-100 text-emerald-700 border-transparent",
                "warning": "bg-amber-100 text-amber-700 border-transparent",
                "danger": "bg-red-100 text-red-700 border-transparent",
            },
            size: {
                xs: "px-2 py-0.5 text-2xs",
                compact: "px-2 py-0.5 text-xs",
                sm: "px-2.5 py-1.5 text-xs", // ~10px horizontal, 6px vertical
                md: "px-3 py-1.5 text-xs",
                lg: "px-4 py-2 text-sm",
            }
        },
        defaultVariants: {
            variant: "outline",
            size: "md",
        },
    }
);

const Badge = ({
    className,
    variant,
    size,
    showDot = false,
    leftIcon,
    children,
    ...props
}) => {
    // Auto-detect dot if not forced
    const shouldShowDot = showDot || [
        'not-started',
        'in-progress',
        'completed',
        'failed',
        'passed'
    ].includes(variant);

    // Dynamic dot color based on variant
    const getDotColor = () => {
        if (variant?.includes('progress') || variant === 'warning') return 'bg-amber-500';
        if (variant?.includes('complete') || variant === 'passed' || variant === 'success') return 'bg-green-500';
        if (variant === 'failed' || variant === 'danger' || variant === 'mandatory') return 'bg-red-500';
        return 'bg-slate-400 dark:bg-slate-500';
    };

    return (
        <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
            {shouldShowDot && (
                <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", getDotColor())} />
            )}
            {leftIcon && <span className="mr-1">{leftIcon}</span>}
            {children}
        </span>
    );
};

export { Badge, badgeVariants };
export default Badge;
