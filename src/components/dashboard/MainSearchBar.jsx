import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Send, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PLACEHOLDERS = [
    "Find courses, manuals...",
    "Search for 'Emergency Protocols'...",
    "Try 'A320 Cockpit Guide'...",
    "Look up 'Safety Procedures'...",
    "Find 'Navigation Maps'..."
];

const MainSearchBar = ({ searchQuery, handleSearch, variant = 'default', rightIcon, onRightIconClick }) => {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [isSearchHovered, setIsSearchHovered] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Base styles for the search bar
    const containerClasses = (variant === 'large' || variant === 'inline' || variant === 'compact')
        ? "relative group w-full"
        : "relative group w-full max-w-md mb-6 mx-auto md:mx-0";

    const inputClasses = variant === 'large'
        ? "w-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-full py-6 md:py-7 pl-16 pr-20 text-lg font-medium text-main dark:text-white outline-none focus:border-primary/50 transition-all"
        : variant === 'inline'
            ? "w-full bg-gray-50/50 dark:bg-slate-800/30 border border-gray-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-16 text-sm font-bold text-main dark:text-white outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-primary/40 transition-all"
            : variant === 'compact'
                ? "w-full h-11 bg-gray-100 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl pl-10 pr-12 text-sm font-medium text-main dark:text-white outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-900 transition-all"
                : "w-full bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-full py-3.5 md:py-4 pl-12 pr-16 text-sm font-bold text-main dark:text-white outline-none focus:border-primary/50 transition-all placeholder:transition-all placeholder:duration-500";

    const iconSize = variant === 'large' ? 24 : 16;
    const iconLeft = (variant === 'large' || variant === 'inline' || variant === 'compact')
        ? (variant === 'large' ? "left-6" : (variant === 'compact' ? "left-3" : "left-4"))
        : "left-4";

    return (
        <div className={containerClasses}>
            <div className={`absolute inset-y-0 ${iconLeft} flex items-center pointer-events-none`}>
                <Search size={iconSize} className="text-tertiary group-focus-within:text-primary transition-colors" />
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && onRightIconClick && !rightIcon) {
                        onRightIconClick();
                    }
                }}
                placeholder={PLACEHOLDERS[placeholderIndex]}
                className={inputClasses}
            />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    if (onRightIconClick) onRightIconClick();
                }}
                onMouseEnter={() => setIsSearchHovered(true)}
                onMouseLeave={() => setIsSearchHovered(false)}
                className={`absolute flex items-center justify-center transition-all duration-500 active:scale-95 overflow-hidden
                    ${variant === 'large' ? 'right-3 top-3 bottom-3 aspect-square rounded-full' : 'right-1.5 top-1.5 bottom-1.5 aspect-square'}
                    ${variant === 'default' ? 'rounded-full' : (variant === 'inline' ? 'rounded-2xl' : 'rounded-xl')}
                    ${isSearchHovered || rightIcon
                        ? 'bg-primary text-white'
                        : 'bg-accent text-main'
                    }
                `}
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    <AnimatePresence initial={false}>
                        {rightIcon ? (
                            <motion.div
                                key="custom-icon"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute"
                            >
                                {rightIcon}
                            </motion.div>
                        ) : isSearchHovered ? (
                            <motion.div
                                key="plane"
                                initial={{ x: -25, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 30, y: -15, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute"
                            >
                                <Send size={iconSize} className="rotate-45 font-bold md:size-5" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="arrow"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 25, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute"
                            >
                                <ArrowRight size={iconSize} className="font-bold md:size-5" strokeWidth={variant === 'large' ? 3 : 2} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </button>
        </div>
    );
};

export default MainSearchBar;
