import React from 'react';
import { cn } from "@/lib/utils";

/**
 * Reusable Filter Bar for Management Pages
 */
const FilterBar = ({
    searchSlot,
    filterSlot,
    className
}) => {
    return (
        <div className={cn("flex flex-col lg:flex-row items-center justify-between gap-6 mb-8", className)}>
            <div className="w-full lg:w-96">
                {searchSlot}
            </div>
            <div className="flex items-center gap-4 w-full lg:w-auto">
                {filterSlot}
            </div>
        </div>
    );
};

export default FilterBar;
