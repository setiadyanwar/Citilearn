import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import Header from './Header';
import { TooltipProvider } from '../ui/tooltip';

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
        <TooltipProvider>
            <div className={`flex min-h-screen font-lato relative transition-colors duration-300 ${isDark ? 'dark bg-slate-950 text-white' : 'bg-background text-main'}`}>
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

                    <div className="p-4 md:p-10 flex-1">
                        {children}
                    </div>
                </main>
            </div>
        </TooltipProvider>
    );
};
