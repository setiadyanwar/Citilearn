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
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    // Close sidebar on mobile when route changes
    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsCollapsed(true);
        }
    }, [location.pathname]);

    // Auto-hide global PiP if we return to learning page
    const showGlobalPip = pipVideo && !isLearningPage;

    return (
        <TooltipProvider>
            <div className={`min-h-screen font-lato relative transition-colors duration-300 ${isDark ? 'dark bg-slate-950 text-white' : 'bg-background text-main'}`}>
                <Sidebar
                    isCollapsed={isCollapsed}
                    toggleSidebar={() => setIsCollapsed(!isCollapsed)}
                    isDark={isDark}
                    setIsDark={setIsDark}
                />
                <main className={`flex flex-col min-w-0 transition-all duration-300 min-h-screen ${isCollapsed ? 'md:pl-16' : 'md:pl-64'}`}>
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

                    <div className="p-3 md:p-8 flex-1">
                        {children}
                    </div>
                </main>
            </div>
        </TooltipProvider>
    );
};
