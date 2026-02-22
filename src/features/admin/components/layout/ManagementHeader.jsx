import React from 'react';
import { cn } from "@/lib/utils";

/**
 * Reusable Header for Management Pages (List views)
 */
const ManagementHeader = ({
    title,
    description,
    children, // Right side actions
    className
}) => {
    return (
        <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8", className)}>
            <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-bold text-main tracking-tight">
                    {title}
                </h1>
                {description && (
                    <p className="text-slate-500 text-sm font-medium">
                        {description}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
                {children}
            </div>
        </div>
    );
};

export default ManagementHeader;
