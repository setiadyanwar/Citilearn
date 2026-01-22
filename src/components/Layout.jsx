import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    BookOpen,
    Settings,
    Bell,
    PanelLeft,
    Home,
    Sun,
    Moon,
    User,
    LogOut,
    ChevronDown,
    Search,
    Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MainSearchBar from './dashboard/MainSearchBar';

const Sidebar = ({ isCollapsed, toggleSidebar, isDark, setIsDark }) => {
    return (
        <>
            {/* Mobile Overlay */}
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-[95] md:hidden backdrop-blur-sm transition-opacity"
                    onClick={toggleSidebar}
                />
            )}
            <aside
                className={`flex flex-col fixed md:sticky top-0 h-screen z-[100] transition-all duration-300 ease-in-out border-r
                ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} 
                ${isCollapsed ? 'w-0 -translate-x-full md:w-20 md:translate-x-0' : 'w-64 translate-x-0'}`}
            >
                <div className={`h-20 flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'px-4 gap-2'}`}>
                    <img
                        src="/Logo/Mark.svg"
                        alt="CitiLearn Logo"
                        className="w-10 h-10 shrink-0 object-contain"
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

                <nav className="flex flex-col gap-1.5 flex-1 p-3">
                    <NavItem to="/" icon={<Home size={20} />} label="Dashboard" isCollapsed={isCollapsed} isDark={isDark} end />
                    <NavItem
                        to="/courses"
                        icon={<BookOpen size={20} />}
                        label="My Course"
                        isCollapsed={isCollapsed}
                        isDark={isDark}
                        activePatterns={['/course', '/learn']}
                    />
                </nav>

                <div className={`mt-auto border-t ${isDark ? 'border-slate-800' : 'border-gray-100'} p-3`}>
                    <div className="flex items-center justify-between gap-1 overflow-hidden">
                        <NavLink
                            to="/settings"
                            className={({ isActive }) => `flex items-center gap-3 py-2.5 rounded-xl transition-all duration-200 flex-1 
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
                                className={`p-2.5 rounded-xl transition-colors ${isDark ? 'text-primary hover:bg-slate-800' : 'text-gray-400 hover:bg-gray-50'}`}
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

const NavItem = ({ to, icon, label, isCollapsed, end, activePatterns, isDark }) => {
    const location = useLocation();
    const isExtraActive = activePatterns?.some(pattern => location.pathname.startsWith(pattern));

    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) => `
      flex items-center py-3 rounded-lg transition-all duration-200 group overflow-hidden whitespace-nowrap
      ${isCollapsed ? 'justify-center px-0' : 'px-4 gap-3'}
      ${(isActive || isExtraActive)
                    ? 'bg-primary-light text-primary font-bold'
                    : isDark ? 'text-gray-400 hover:bg-slate-800 hover:text-white font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-citilink-dark font-medium'}
    `}
        >
            {({ isActive }) => (
                <>
                    <div className={`shrink-0 relative flex items-center justify-center w-5 h-5 ${(isActive || isExtraActive) ? 'text-primary' : ''}`}>
                        {icon}
                    </div>
                    {!isCollapsed && (
                        <span className="text-sm transition-all duration-300">
                            {label}
                        </span>
                    )}
                </>
            )}
        </NavLink>
    );
};

/* PLACEHOLDERS removed, now using MainSearchBar's internal placeholders */

const Header = ({
    isDark,
    setIsDark,
    searchQuery,
    handleSearch,
    showSearch,
    toggleSidebar,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus
}) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const dropdownRef = useRef(null);
    const filterRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/' || path.includes('/list')) return 'Dashboard';
        if (path === '/courses') return 'My Course';
        if (path.includes('/course')) return 'Course Details';
        if (path.includes('/learn')) return 'Learning Session';
        if (path.includes('/achievements')) return 'Achievements';
        if (path.includes('/settings')) return 'Settings';
        return 'Dashboard';
    };

    return (
        <header className={`h-20 border-b flex items-center justify-between px-6 md:px-10 sticky top-0 z-[90] transition-colors duration-300 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center gap-6 flex-1 min-w-0">
                <button
                    onClick={toggleSidebar}
                    className={`p-2 rounded-lg border transition-all ${isDark ? 'border-slate-800 text-slate-400 hover:bg-slate-800' : 'border-gray-200 text-gray-500 hover:bg-gray-50'} hover:text-primary hover:border-primary/30`}
                >
                    <PanelLeft size={20} />
                </button>
                <AnimatePresence mode="wait">
                    {(!showSearch || window.innerWidth >= 768) ? (
                        <motion.h1
                            key="title"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className={`text-xl font-bold shrink-0 ${isDark ? 'text-white' : 'text-gray-700'}`}
                        >
                            {getPageTitle()}
                        </motion.h1>
                    ) : null}
                </AnimatePresence>

                <AnimatePresence>
                    {showSearch && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex flex-1 md:max-w-md w-full relative group"
                            ref={filterRef}
                        >
                            <MainSearchBar
                                searchQuery={searchQuery}
                                handleSearch={handleSearch}
                                variant="compact"
                                rightIcon={(location.pathname === '/' || location.pathname === '/list') ? <Filter size={16} /> : null}
                                onRightIconClick={() => {
                                    if (location.pathname === '/' || location.pathname === '/list') {
                                        setIsFilterOpen(!isFilterOpen);
                                    }
                                }}
                            />

                            {/* Floating Filter Dropdown */}
                            <AnimatePresence>
                                {isFilterOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className={`absolute top-full left-0 mt-2 w-72 p-4 rounded-2xl shadow-2xl border z-[100] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}
                                    >
                                        <div className="space-y-4">
                                            <div>
                                                <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Category</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {['All', 'Aviation', 'Safety', 'Technical', 'Leadership'].map(cat => (
                                                        <button
                                                            key={cat}
                                                            onClick={() => setSelectedCategory(cat)}
                                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCategory === cat
                                                                ? 'bg-primary text-white shadow-md'
                                                                : isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                                        >
                                                            {cat}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Status</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {['All', 'Not Started', 'On Progress', 'Done'].map(stat => (
                                                        <button
                                                            key={stat}
                                                            onClick={() => setSelectedStatus(stat)}
                                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedStatus === stat
                                                                ? 'bg-amber-500 text-white shadow-md'
                                                                : isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                                        >
                                                            {stat}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-1 text-slate-400 hover:text-primary transition-colors">
                    <Bell size={24} />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white font-bold shadow-sm">1</div>
                </button>

                <div className="profile-dropdown-container relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 transition-all"
                    >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-sm shrink-0">
                            <img src="/budi_pratama.png" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="hidden sm:flex flex-col items-start leading-tight">
                            <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#334155]'}`}>Budi Pratama</span>
                            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-[#94a3b8]'}`}>Senior Flight Instructor</span>
                        </div>
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl border z-[100] overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}
                            >
                                <div className="p-1.5">
                                    <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${isDark ? 'text-gray-300 hover:bg-slate-800 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`}>
                                        <User size={18} />
                                        Profile
                                    </button>
                                    <div className={`h-px my-1 ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`} />
                                    <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10`}>
                                        <LogOut size={18} />
                                        Sign Out
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export const Layout = ({
    children,
    pipVideo,
    onClosePip,
    searchQuery,
    handleSearch,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus
}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isDark, setIsDark] = useState(false);
    const [showScrollSearch, setShowScrollSearch] = useState(false);
    const location = useLocation();
    const isLearningPage = location.pathname.includes('/learn');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 350) {
                setShowScrollSearch(true);
            } else {
                setShowScrollSearch(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-hide global PiP if we return to learning page
    const showGlobalPip = pipVideo && !isLearningPage;

    return (
        <div className={`flex min-h-screen font-lato relative transition-colors duration-300 ${isDark ? 'dark bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <Sidebar
                isCollapsed={isCollapsed}
                toggleSidebar={() => setIsCollapsed(!isCollapsed)}
                isDark={isDark}
                setIsDark={setIsDark}
            />
            <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                <Header
                    isDark={isDark}
                    setIsDark={setIsDark}
                    searchQuery={searchQuery}
                    handleSearch={handleSearch}
                    showSearch={showScrollSearch && (location.pathname === '/' || location.pathname === '/list')}
                    toggleSidebar={() => setIsCollapsed(!isCollapsed)}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />

                <div className="p-4 md:p-8 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
};
