import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import Header from './Header';
import { TooltipProvider } from '@/components/ui/tooltip';

export const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isDark, setIsDark] = useState(false);
    const [showScrollSearch, setShowScrollSearch] = useState(false);
    const location = useLocation();

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
        // Use requestAnimationFrame to defer state update
        const timerId = requestAnimationFrame(() => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            }
        });

        return () => cancelAnimationFrame(timerId);
    }, [location.pathname]);

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
                        showSearch={showScrollSearch && (location.pathname === '/' || location.pathname === '/list')}
                        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
                    />

                    <div className="p-3 md:p-8 flex-1">
                        <Outlet context={{ isCollapsed }} />
                    </div>
                </main>
            </div>
        </TooltipProvider>
    );
};
