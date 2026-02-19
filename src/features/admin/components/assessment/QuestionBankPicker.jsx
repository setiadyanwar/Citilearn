import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    X, Search, BookOpen, CheckCircle2, Circle,
    Filter, CheckSquare, ToggleLeft, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import data from '@/data.json';

const TYPE_LABELS = {
    'multiple-choice': 'Multiple Choice',
    'true-false': 'True / False',
    'multiple-answer': 'Multiple Answer',
};

const TYPE_ICONS = {
    'multiple-choice': CheckCircle2,
    'true-false': ToggleLeft,
    'multiple-answer': CheckSquare,
};

const TYPE_COLORS = {
    'multiple-choice': 'bg-blue-50 text-blue-600 border-blue-100',
    'true-false': 'bg-violet-50 text-violet-600 border-violet-100',
    'multiple-answer': 'bg-amber-50 text-amber-600 border-amber-100',
};

/**
 * QuestionBankPicker
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Callback to close the modal
 * @param {function} onSelect - Callback with array of selected question objects
 * @param {string[]} alreadyAddedIds - IDs of questions already in the assessment
 */
const QuestionBankPicker = ({ isOpen, onClose, onSelect, alreadyAddedIds = [] }) => {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [selectedIds, setSelectedIds] = useState(new Set());

    const bankQuestions = data.questionBank || [];

    // Derive unique categories from bank
    const categories = useMemo(() => {
        const cats = new Set(bankQuestions.map(q => q.category).filter(Boolean));
        return ['all', ...Array.from(cats)];
    }, [bankQuestions]);

    // Derive unique types from bank
    const types = useMemo(() => {
        const ts = new Set(bankQuestions.map(q => q.type).filter(Boolean));
        return ['all', ...Array.from(ts)];
    }, [bankQuestions]);

    // Filtered list
    const filtered = useMemo(() => {
        return bankQuestions.filter(q => {
            const matchSearch = !search || q.question.toLowerCase().includes(search.toLowerCase()) ||
                (q.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()));
            const matchType = filterType === 'all' || q.type === filterType;
            const matchCategory = filterCategory === 'all' || q.category === filterCategory;
            return matchSearch && matchType && matchCategory;
        });
    }, [bankQuestions, search, filterType, filterCategory]);

    const toggleSelect = (id) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleSelectAll = () => {
        const selectableIds = filtered.filter(q => !alreadyAddedIds.includes(q.id)).map(q => q.id);
        const allSelected = selectableIds.every(id => selectedIds.has(id));
        if (allSelected) {
            setSelectedIds(prev => {
                const next = new Set(prev);
                selectableIds.forEach(id => next.delete(id));
                return next;
            });
        } else {
            setSelectedIds(prev => {
                const next = new Set(prev);
                selectableIds.forEach(id => next.add(id));
                return next;
            });
        }
    };

    const handleAdd = () => {
        const toAdd = bankQuestions
            .filter(q => selectedIds.has(q.id))
            .map(q => ({
                id: `qb-${q.id}-${Date.now()}`,
                question: q.question,
                type: q.type,
                points: q.points,
                answers: q.options,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation || '',
                minWords: q.minWords,
                maxWords: q.maxWords,
                fromBank: true,
                bankId: q.id,
            }));
        onSelect(toAdd);
        setSelectedIds(new Set());
        onClose();
    };

    const handleClose = () => {
        setSelectedIds(new Set());
        onClose();
    };

    const selectableCount = filtered.filter(q => !alreadyAddedIds.includes(q.id)).length;
    const allFilteredSelected = selectableCount > 0 &&
        filtered.filter(q => !alreadyAddedIds.includes(q.id)).every(q => selectedIds.has(q.id));

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-9998"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white shadow-2xl z-9999 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <BookOpen size={18} className="text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-slate-900">Question Bank</h2>
                                    <p className="text-xs text-slate-400 font-medium">{bankQuestions.length} questions available</p>
                                </div>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Search and Filters */}
                        <div className="px-6 py-4 border-b border-slate-100 space-y-3 shrink-0">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <Input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search questions or tags..."
                                    className="pl-9 h-10 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-primary/20 shadow-none"
                                />
                            </div>

                            {/* Filter chips */}
                            <div className="flex gap-2 flex-wrap">
                                {/* Type filter */}
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    <Filter size={13} className="text-slate-400 shrink-0" />
                                    {types.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setFilterType(type)}
                                            className={cn(
                                                "px-2.5 py-1 rounded-lg text-xs font-bold border transition-all",
                                                filterType === type
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                                            )}
                                        >
                                            {type === 'all' ? 'All Types' : TYPE_LABELS[type] || type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category filter */}
                            <div className="flex gap-1.5 flex-wrap">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilterCategory(cat)}
                                        className={cn(
                                            "px-2.5 py-1 rounded-lg text-xs font-bold border transition-all",
                                            filterCategory === cat
                                                ? "bg-slate-800 text-white border-slate-800"
                                                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                                        )}
                                    >
                                        {cat === 'all' ? 'All Categories' : cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Select All row */}
                        {filtered.length > 0 && (
                            <div className="px-6 py-2.5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/60">
                                <button
                                    onClick={handleSelectAll}
                                    className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors"
                                >
                                    {allFilteredSelected ? (
                                        <CheckCircle2 size={15} className="text-primary" />
                                    ) : (
                                        <Circle size={15} />
                                    )}
                                    {allFilteredSelected ? 'Deselect All' : 'Select All'} ({selectableCount})
                                </button>
                                <span className="text-xs text-slate-400 font-medium">{filtered.length} results</span>
                            </div>
                        )}

                        {/* Questions List */}
                        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                            {filtered.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                                    <Search size={32} className="mb-3 opacity-30" />
                                    <p className="text-sm font-medium">No questions found</p>
                                    <p className="text-xs mt-1">Try adjusting your search or filters</p>
                                </div>
                            ) : (
                                filtered.map(q => {
                                    const isAdded = alreadyAddedIds.includes(q.id);
                                    const isSelected = selectedIds.has(q.id);
                                    const TypeIcon = TYPE_ICONS[q.type] || CheckCircle2;

                                    return (
                                        <motion.button
                                            key={q.id}
                                            layout
                                            disabled={isAdded}
                                            onClick={() => !isAdded && toggleSelect(q.id)}
                                            className={cn(
                                                "w-full text-left p-4 rounded-2xl border transition-all group",
                                                isAdded
                                                    ? "bg-slate-50 border-slate-100 opacity-50 cursor-not-allowed"
                                                    : isSelected
                                                        ? "bg-primary/5 border-primary/30 shadow-sm"
                                                        : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/80"
                                            )}
                                        >
                                            <div className="flex items-start gap-3">
                                                {/* Checkbox */}
                                                <div className="mt-0.5 shrink-0">
                                                    {isAdded ? (
                                                        <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center">
                                                            <CheckCircle2 size={14} className="text-slate-400" />
                                                        </div>
                                                    ) : isSelected ? (
                                                        <CheckCircle2 size={20} className="text-primary" />
                                                    ) : (
                                                        <Circle size={20} className="text-slate-300 group-hover:text-slate-400" />
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start gap-2 mb-2 flex-wrap">
                                                        {/* Type badge */}
                                                        <span className={cn(
                                                            "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold border shrink-0",
                                                            TYPE_COLORS[q.type] || 'bg-slate-50 text-slate-600 border-slate-100'
                                                        )}>
                                                            <TypeIcon size={11} />
                                                            {TYPE_LABELS[q.type] || q.type}
                                                        </span>
                                                        {/* Category */}
                                                        {q.category && (
                                                            <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200 shrink-0">
                                                                {q.category}
                                                            </span>
                                                        )}
                                                        {/* Points */}
                                                        <span className="ml-auto px-2 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 shrink-0">
                                                            {q.points} pt{q.points > 1 ? 's' : ''}
                                                        </span>
                                                        {isAdded && (
                                                            <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-green-50 text-green-700 border border-green-100 shrink-0">
                                                                Already Added
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Question text */}
                                                    <p className="text-sm font-semibold text-slate-800 leading-snug mb-2 line-clamp-2">
                                                        {q.question}
                                                    </p>

                                                    {/* Options preview */}
                                                    {q.options && (
                                                        <div className="space-y-1">
                                                            {q.options.slice(0, 2).map((opt, idx) => (
                                                                <div key={idx} className="flex items-center gap-1.5 text-xs">
                                                                    {idx === q.correctAnswer ? (
                                                                        <CheckCircle2 size={12} className="text-green-500 shrink-0" />
                                                                    ) : (
                                                                        <Circle size={12} className="text-slate-300 shrink-0" />
                                                                    )}
                                                                    <span className={idx === q.correctAnswer ? 'text-green-700 font-medium' : 'text-slate-400'}>
                                                                        {opt}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                            {q.options.length > 2 && (
                                                                <p className="text-xs text-slate-400 pl-[18px]">
                                                                    +{q.options.length - 2} more options...
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.button>
                                    );
                                })
                            )}
                        </div>

                        {/* Footer Action */}
                        <div className="px-6 py-4 border-t border-slate-100 bg-white shrink-0">
                            {selectedIds.size === 0 ? (
                                <p className="text-center text-sm text-slate-400 font-medium py-1">
                                    Select questions above to add them to the assessment
                                </p>
                            ) : (
                                <Button
                                    onClick={handleAdd}
                                    className="w-full h-11 rounded-xl font-bold gap-2"
                                >
                                    <Plus size={16} />
                                    Add {selectedIds.size} Question{selectedIds.size > 1 ? 's' : ''} to Assessment
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default QuestionBankPicker;
