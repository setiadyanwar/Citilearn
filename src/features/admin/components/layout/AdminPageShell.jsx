import React from 'react';
import { cn } from "@/lib/utils";

/**
 * Standard Page Shell for all Admin/Management pages
 */
const AdminPageShell = ({ children, className }) => {
    return (
        <div className={cn(
            "w-full animate-fade-in flex flex-col pb-20 max-w-7xl mx-auto px-4 md:px-0 pt-10",
            className
        )}>
            {children}
        </div>
    );
};

export default AdminPageShell;
