import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, X, ArrowLeft, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TOPIC_DATA = [
    { id: 'sms', label: 'Safety Management System (SMS)', children: ['Risk Management', 'Safety Assurance', 'Safety Promotion', 'Safety Policy'] },
    { id: 'avsec', label: 'Aviation Security & Compliance', children: ['Airport Security', 'Cargo Security', 'In-flight Security'] },
    { id: 'flight', label: 'Flight Operations', children: ['Flight Planning', 'Navigation', 'Meteorology'] },
    { id: 'people', label: 'People Management', children: ['Leadership', 'Conflict Resolution', 'Team Building'] },
    { id: 'learning', label: 'Learning & Development', children: ['Instructional Design', 'LMS Management', 'Training Delivery'] },
    { id: 'hr', label: 'HR Compliance', children: ['Labor Laws', 'Workplace Safety', 'Ethics'] },
    { id: 'legal', label: 'Corporate Legal Essentials', children: ['Contract Law', 'Intellectual Property', 'Data Privacy'] },
    { id: 'risk', label: 'Risk & Compliance', children: ['Auditing', 'Regulatory Compliance', 'Enterprise Risk'] },
    { id: 'it', label: 'Information Technology', children: ['Networking Fundamentals', 'Server Management', 'Cloud Computing', 'Data Protection', 'React', 'Golang', 'Rust'] },
    { id: 'marketing', label: 'Creative & Marketing', children: ['Digital Marketing', 'Content Strategy', 'SEO/SEM'] },
];

const TopicDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTopic, setActiveTopic] = useState('it');
    const [mobileStage, setMobileStage] = useState('topics'); // 'topics' | 'category'
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (window.innerWidth >= 768 && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen && window.innerWidth < 768) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '0px'; // Prevent scrollbar shift if any
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const activeTopicData = TOPIC_DATA.find(t => t.id === activeTopic);
    const activeChildren = activeTopicData?.children || [];

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setMobileStage('topics');
        }
    };

    return (
        <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => window.innerWidth >= 768 && setIsOpen(true)}
            onMouseLeave={() => window.innerWidth >= 768 && setIsOpen(false)}
        >
            <button
                onClick={() => window.innerWidth < 768 && toggleDrawer()}
                className={`flex items-center gap-2 transition-all cursor-pointer font-bold
                    ${window.innerWidth < 768
                        ? 'fixed bottom-6 right-6 z-990 bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/20 scale-100 active:scale-90 flex items-center gap-2 transition-all'
                        : `px-4 py-2.5 rounded-full text-sm flex items-center gap-2 transition-all ${isOpen ? 'text-primary' : 'text-secondary hover:text-primary'}`
                    }`}
            >
                {window.innerWidth < 768 ? (
                    <>
                        <BookOpen size={20} />
                        <span className="text-sm">Browse Topics</span>
                    </>
                ) : (
                    <>
                        View Topic <ChevronDown size={14} className={`transition-transform duration-200 ${(isOpen && window.innerWidth >= 768) ? 'rotate-180' : ''}`} />
                    </>
                )}
            </button>

            {/* Desktop Dropdown */}
            <AnimatePresence>
                {isOpen && window.innerWidth >= 768 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-0 pt-4 left-0 w-[700px] z-100"
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 flex gap-8 shadow-2xl">
                            {/* Left Column: Popular Topics */}
                            <div className="w-1/2 shrink-0">
                                <h3 className="text-secondary dark:text-slate-400 text-xs font-bold mb-4 text-left">Popular Topics</h3>
                                <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto no-scrollbar">
                                    {TOPIC_DATA.map(topic => (
                                        <button
                                            key={topic.id}
                                            onMouseEnter={() => setActiveTopic(topic.id)}
                                            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-left transition-all cursor-pointer
                                            ${activeTopic === topic.id
                                                    ? 'bg-emerald-50 text-citilearn-green dark:bg-emerald-900/20'
                                                    : 'text-main dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                                        >
                                            {topic.label}
                                            {activeTopic === topic.id && <ChevronRight size={16} />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: Category/Sub-topics */}
                            <div className="w-1/2 shrink-0 border-l border-gray-100 dark:border-slate-800 pl-8">
                                <h3 className="text-secondary dark:text-slate-400 text-xs font-bold mb-4 text-left">Category</h3>
                                <div className="flex flex-col gap-4">
                                    {activeChildren.length > 0 ? (
                                        activeChildren.map((child, idx) => (
                                            <button
                                                key={idx}
                                                className="text-left text-sm font-medium text-main dark:text-slate-300 hover:text-primary transition-colors py-1 cursor-pointer"
                                            >
                                                {child}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-sm text-secondary italic">No categories available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && window.innerWidth < 768 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 z-999 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-x-0 bottom-0 bg-white dark:bg-slate-900 z-1000 rounded-t-4xl max-h-[85vh] overflow-hidden flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {mobileStage === 'category' && (
                                        <button
                                            onClick={() => setMobileStage('topics')}
                                            className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                                        >
                                            <ArrowLeft size={20} className="text-main dark:text-white" />
                                        </button>
                                    )}
                                    <h2 className="text-lg font-bold text-main dark:text-white">
                                        {mobileStage === 'topics' ? 'Popular Topics' : activeTopicData?.label}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full text-secondary"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Drawer Content */}
                            <div className="flex-1 overflow-y-auto p-4 pb-12">
                                {mobileStage === 'topics' ? (
                                    <div className="grid gap-2">
                                        {TOPIC_DATA.map(topic => (
                                            <button
                                                key={topic.id}
                                                onClick={() => {
                                                    setActiveTopic(topic.id);
                                                    setMobileStage('category');
                                                }}
                                                className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 text-left transition-all"
                                            >
                                                <span className="font-bold text-main dark:text-slate-200">{topic.label}</span>
                                                <ChevronRight size={18} className="text-tertiary" />
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid gap-4 p-2">
                                        {activeChildren.map((child, idx) => (
                                            <button
                                                key={idx}
                                                className="w-full text-left p-4 rounded-2xl border border-gray-100 dark:border-slate-800 text-sm font-bold text-main dark:text-slate-300 hover:border-primary hover:text-primary transition-all"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {child}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TopicDropdown;
