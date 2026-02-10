import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    BookOpen,
    Settings,
    Home,
    Sun,
    Moon,
    ChevronDown,
    Compass,
    Smile
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavItem = ({ to, icon, label, isCollapsed, end, activePatterns, isDark, onClick }) => {
    const location = useLocation();
    // Only check active if 'to' is provided
    const isActive = to ? (location.pathname === to || (end && location.pathname === to) || (activePatterns?.some(pattern => location.pathname.startsWith(pattern)))) : false;

    const content = (
        <>
            <div className={`shrink-0 relative flex items-center justify-center w-5 h-5 ${(isActive) ? 'text-primary' : ''}`}>
                {icon}
            </div>
            {!isCollapsed && (
                <span className="text-sm transition-all duration-300 truncate">
                    {label}
                </span>
            )}
        </>
    );

    const baseClasses = `
      flex items-center py-3.5 rounded-lg transition-all duration-200 group overflow-hidden whitespace-nowrap cursor-pointer
      ${isCollapsed ? 'justify-center px-0' : 'px-4 gap-3'}
      ${isActive
            ? 'bg-primary-light text-primary font-bold'
            : isDark ? 'text-gray-400 hover:bg-slate-800 hover:text-white font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-main font-medium'}
    `;

    if (to) {
        return (
            <NavLink to={to} end={end} className={baseClasses}>
                {content}
            </NavLink>
        );
    }

    return (
        <div onClick={onClick} className={baseClasses}>
            {content}
        </div>
    );
};

const NavGroup = ({ icon, label, children, isCollapsed, isDark, isOpen, onToggle }) => {
    return (
        <div>
            <div
                onClick={() => !isCollapsed && onToggle()}
                className={`
                    flex items-center py-3.5 rounded-lg transition-all duration-200 group overflow-hidden whitespace-nowrap cursor-pointer select-none
                    ${isCollapsed ? 'justify-center px-0' : 'px-4 gap-3 justify-between'}
                    ${isOpen && !isCollapsed
                        ? 'bg-primary-light text-primary font-bold'
                        : isDark ? 'text-gray-400 hover:bg-slate-800 hover:text-white font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-main font-medium'}
                `}
            >
                <div className="flex items-center gap-3">
                    <div className={`shrink-0 relative flex items-center justify-center w-5 h-5`}>
                        {icon}
                    </div>
                    {!isCollapsed && (
                        <span className="text-sm transition-all duration-300 truncate">
                            {label}
                        </span>
                    )}
                </div>
                {!isCollapsed && (
                    <div className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'}>
                        <ChevronDown size={16} />
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isOpen && !isCollapsed && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col gap-1 mt-1 pl-12">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const Sidebar = ({ isCollapsed, toggleSidebar, isDark, setIsDark }) => {
    const location = useLocation();
    const [openGroup, setOpenGroup] = useState('');

    useEffect(() => {
        if (location.pathname.toLowerCase().includes('culture')) {
            setOpenGroup('Culture');
        } else if (location.pathname.toLowerCase().includes('collaboration')) {
            setOpenGroup('Collaboration');
        }
    }, [location.pathname]);

    const handleToggle = (group) => {
        setOpenGroup(prev => prev === group ? '' : group);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-95 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={toggleSidebar}
                />
            )}
            <aside
                className={`flex flex-col fixed md:sticky top-0 h-screen z-100 transition-all duration-300 ease-in-out border-r
                ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} 
                ${isCollapsed ? 'w-0 -translate-x-full md:w-16 md:translate-x-0' : 'w-64 translate-x-0'}`}
            >
                <div className={`h-16 flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'px-4 gap-2'}`}>
                    <img
                        src="/Logo/Mark.svg"
                        alt="CitiLearn Logo"
                        className="w-8 h-8 shrink-0 object-contain"
                    />
                    {!isCollapsed && (
                        <div className="transition-all duration-300 origin-left flex items-center">
                            <img
                                src="/Logo/Teks.svg"
                                alt="CitiLearn"
                                className="h-5 w-auto object-contain"
                            />
                        </div>
                    )}
                </div>

                <nav className="flex flex-col gap-6 flex-1 p-2 overflow-y-auto custom-scrollbar">
                    {/* General Section */}
                    <div className="flex flex-col gap-1.5">
                        {!isCollapsed && (
                            <div className="px-4 text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                                General
                            </div>
                        )}
                        <NavItem to="/" icon={<Home size={20} />} label="Dashboard" isCollapsed={isCollapsed} isDark={isDark} end />
                        <NavItem
                            to="/courses"
                            icon={<BookOpen size={20} />}
                            label="Explore Courses"
                            isCollapsed={isCollapsed}
                            isDark={isDark}
                            activePatterns={['/course', '/learn']}
                        />
                        <NavItem to="/knowledge" icon={<Compass size={20} />} label="Knowledge Hub" isCollapsed={isCollapsed} isDark={isDark} />
                    </div>

                    {/* Company Hub Section */}
                    <div className="flex flex-col gap-1.5">
                        {!isCollapsed && (
                            <div className="px-4 text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1 mt-2">
                                Company Hub
                            </div>
                        )}

                        <NavGroup
                            icon={<Smile size={20} />}
                            label="Culture"
                            isCollapsed={isCollapsed}
                            isDark={isDark}
                            isOpen={openGroup === 'Culture'}
                            onToggle={() => handleToggle('Culture')}
                        >
                            {['About Culture', 'Agent of Culture', 'Culture Activation', 'Culture Award'].map((item) => (
                                <NavLink
                                    key={item}
                                    to={`/culture/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className={({ isActive }) => `
                                        block py-3.5 px-4 text-sm transition-colors
                                        ${isActive ? 'text-primary font-bold' : isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-main'}
                                    `}
                                >
                                    {item}
                                </NavLink>
                            ))}
                        </NavGroup>

                        <NavGroup
                            icon={<BookOpen size={20} />}
                            label="Collaboration"
                            isCollapsed={isCollapsed}
                            isDark={isDark}
                            isOpen={openGroup === 'Collaboration'}
                            onToggle={() => handleToggle('Collaboration')}
                        >
                            {['Supergreeners Care', 'Supergreeners Talk', "Supergreneers Story"].map((item) => (
                                <NavLink
                                    key={item}
                                    to={`/collaboration/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className={({ isActive }) => `
                                        block py-3.5 px-4 text-sm transition-colors
                                        ${isActive ? 'text-primary font-bold' : isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-main'}
                                    `}
                                >
                                    {item}
                                </NavLink>
                            ))}
                        </NavGroup>
                    </div>
                </nav>

                <div className={`mt-auto border-t ${isDark ? 'border-slate-800' : 'border-gray-100'} p-2`}>
                    <div className="flex items-center justify-between gap-1 overflow-hidden">
                        <NavLink
                            to="/settings"
                            className={({ isActive }) => `flex items-center gap-3 py-3.5 rounded-lg transition-all duration-200 flex-1 
                        ${isCollapsed ? 'justify-center px-0' : 'px-3'}
                        ${isActive
                                    ? 'bg-primary-light text-primary font-bold'
                                    : isDark ? 'text-gray-400 hover:bg-slate-800 hover:text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <Settings size={20} className="shrink-0" />
                            {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
                        </NavLink>

                        {!isCollapsed && (
                            <button
                                onClick={() => setIsDark(!isDark)}
                                className={`p-2 rounded-lg transition-colors ${isDark ? 'text-primary hover:bg-slate-800' : 'text-gray-400 hover:bg-gray-50'}`}
                            >
                                {isDark ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};
