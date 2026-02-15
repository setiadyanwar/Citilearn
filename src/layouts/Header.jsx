import React, { useState } from 'react';
import UserMenu from '@/features/profile/components/UserMenu';
import { useLocation } from 'react-router-dom';
import {
    Bell,
    PanelLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import budi_pratama from '@/assets/budi_pratama.png';

import { useAuthContext } from '@/contexts/useAuthContext';

const Header = ({
    isDark,
    setIsDark,
    showSearch,
    toggleSidebar,
    hideSidebarToggle = false
}) => {
    const { user } = useAuthContext();

    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/' || path.includes('/list')) return 'Dashboard';
        if (path === '/courses') return 'Explore Courses';
        if (path.includes('/course')) return 'Course Details';
        if (path.includes('/learn')) return 'My Learning';
        if (path.includes('/achievements')) return 'Achievements';
        if (path.includes('/settings')) return 'Settings';
        if (path.includes('/profile')) return 'Dashboard Profile';
        return 'Dashboard';
    };

    return (
        <header className={`h-16 border-b flex items-center justify-between px-3 md:px-8 sticky top-0 z-90 transition-colors duration-300 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center gap-6 flex-1 min-w-0">
                {!hideSidebarToggle && (
                    <button
                        onClick={toggleSidebar}
                        className={`p-2 rounded-lg border transition-all ${isDark ? 'border-slate-800 text-slate-400 hover:bg-slate-800' : 'border-gray-200 text-gray-500 hover:bg-gray-50'} hover:text-primary hover:border-primary/30`}
                    >
                        <PanelLeft size={20} />
                    </button>
                )}
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
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-1 text-slate-400 hover:text-primary transition-colors">
                    <Bell size={24} />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-citilearn-secondary rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-2xs text-main font-bold">1</div>
                </button>

                {/* Extracted User Menu Component */}
                <UserMenu user={user} isDark={isDark} />
            </div>
        </header>
    );
};

export default Header;
