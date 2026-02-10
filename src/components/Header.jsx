import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Bell,
    PanelLeft,
    User,
    LogOut,
    Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MainSearchBar from './dashboard/MainSearchBar';
import budi_pratama from '../assets/budi_pratama.png';

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
        <header className={`h-16 border-b flex items-center justify-between px-2 md:px-10 sticky top-0 z-90 transition-colors duration-300 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
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
                                        className={`absolute top-full left-0 mt-2 w-72 p-4 rounded-2xl border z-100 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}
                                    >
                                        <div className="space-y-4">
                                            <div>
                                                <p className={`text-2xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Category</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {['All', 'Aviation', 'Safety', 'Technical', 'Leadership'].map(cat => (
                                                        <button
                                                            key={cat}
                                                            onClick={() => setSelectedCategory(cat)}
                                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCategory === cat
                                                                ? 'bg-primary text-white'
                                                                : isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                                        >
                                                            {cat}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <p className={`text-2xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Status</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {['All', 'Not Started', 'On Progress', 'Done'].map(stat => (
                                                        <button
                                                            key={stat}
                                                            onClick={() => setSelectedStatus(stat)}
                                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedStatus === stat
                                                                ? 'bg-amber-500 text-white'
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
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-citilearn-secondary rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-2xs text-main font-bold">1</div>
                </button>

                <div className="profile-dropdown-container relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 transition-all"
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden shrink-0">
                            <img src={budi_pratama} alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="hidden sm:flex flex-col items-start leading-tight">
                            <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-main'}`}>Setiady Anwar</span>
                            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>Senior Flight Instructor</span>
                        </div>
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className={`absolute right-0 mt-2 w-48 rounded-xl border z-100 overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}
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

export default Header;
