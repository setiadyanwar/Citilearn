import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const ActionMenu = ({ actions }) => (
    <Popover>
        <PopoverTrigger asChild>
            <button
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                onClick={e => e.stopPropagation()}
            >
                <MoreHorizontal size={16} />
            </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-44 p-1.5 rounded-xl">
            {actions.map((action) => (
                <button
                    key={action.label}
                    onClick={action.onClick}
                    className={cn(
                        'w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                        action.danger ? 'text-red-500 hover:bg-red-50' : 'text-slate-700 hover:bg-slate-50'
                    )}
                >
                    {action.icon && <action.icon size={14} />}
                    {action.label}
                </button>
            ))}
        </PopoverContent>
    </Popover>
);

export default ActionMenu;
