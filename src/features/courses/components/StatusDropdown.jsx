import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { COURSE_STATUS_LIST } from '@/constants/course';

const StatusDropdown = ({ selectedStatus, onSelectStatus, isOpen, onToggle }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                if (isOpen) onToggle(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onToggle]);

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <button
                onClick={() => onToggle(!isOpen)}
                className={`flex items-center justify-between gap-3 px-4 h-10 md:h-11 rounded-full border text-2xs md:text-sm font-bold transition-all cursor-pointer
                    ${isOpen
                        ? 'border-primary bg-white dark:bg-slate-800'
                        : 'border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 text-secondary dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'}`}
            >
                <span><span className="hidden sm:inline">Status: </span>{selectedStatus}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl shadow-black/5">
                    {COURSE_STATUS_LIST.map(status => (
                        <button
                            key={status}
                            onClick={() => {
                                onSelectStatus(status);
                                onToggle(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-2xs md:text-sm font-bold transition-colors cursor-pointer
                                ${selectedStatus === status
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-secondary dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StatusDropdown;
