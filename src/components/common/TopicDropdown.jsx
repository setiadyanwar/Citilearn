import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

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
    const [activeTopic, setActiveTopic] = useState('it'); // Default active for demo
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const activeChildren = TOPIC_DATA.find(t => t.id === activeTopic)?.children || [];

    return (
        <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer
                    ${isOpen
                        ? 'text-primary'
                        : 'text-secondary hover:text-primary'
                    }`}
            >
                View Topic <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-0 pt-4 left-0 w-[700px] z-100 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 flex gap-8">
                        {/* Left Column: Popular Topics */}
                        <div className="w-1/2 shrink-0">
                            <h3 className="text-secondary dark:text-slate-400 text-xs font-bold mb-4 text-left">Popular Topics</h3>
                            <div className="flex flex-col gap-1">
                                {TOPIC_DATA.map(topic => (
                                    <button
                                        key={topic.id}
                                        onMouseEnter={() => setActiveTopic(topic.id)}
                                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-left transition-all cursor-pointer
                                        ${activeTopic === topic.id
                                                ? 'bg-emerald-50 text-citilearn-green dark:bg-emerald-900/20'
                                                : 'text-main dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                                            }`}
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
                </div>
            )}
        </div>
    );
};

export default TopicDropdown;
