import React, { useState } from 'react';
import { PanelLeft, User, BookOpen, BarChart2, Bookmark, Award, Settings, Home, ChevronRight, X } from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import Header from './Header';

// eslint-disable-next-line no-unused-vars
const ProfileSidebarItem = ({ icon: Icon, label, collapsed, active, to }) => (
    <Link
        to={to}
        className={`flex items-center gap-3 p-3 rounded-xl transition-all mb-1 group relative ${active
            ? 'bg-citilearn-green/10 text-citilearn-green font-bold'
            : 'text-secondary hover:bg-gray-50 hover:text-primary'
            }`}
    >
        <div className="shrink-0 flex items-center justify-center w-6 h-6">
            <Icon size={20} className={active ? 'text-citilearn-green' : 'text-gray-400 group-hover:text-gray-600'} />
        </div>
        {!collapsed && (
            <span className="whitespace-nowrap overflow-hidden transition-all duration-300 origin-left text-sm font-bold">
                {label}
            </span>
        )}
        {collapsed && (
            <div className={`absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-100 whitespace-nowrap font-bold`}>
                {label}
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
            </div>
        )}
    </Link>
);

import data from '@/data.json';

const ProfileLayout = () => {
    const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);
    const [isDark, setIsDark] = useState(false);
    const location = useLocation();

    // Auto-collapse on mobile when route changes or window resize
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setCollapsed(true);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        if (window.innerWidth < 1024) {
            setCollapsed(true);
        }
    }, [location.pathname]);

    const getBreadcrumbs = () => {
        const path = location.pathname;
        const parts = path.split('/').filter(p => p);

        const labels = {
            'profile': 'My Profile',
            'learning': 'My Learning',
            'leaderboard': 'Leaderboard',
            'saved': 'Saved Course',
            'certificates': 'My Certificates',
            'settings': 'Settings',
            'grades': 'Grades'
        };

        return (
            <div className={`flex items-center gap-2 text-sm overflow-hidden whitespace-nowrap ${isDark ? 'text-slate-400' : 'text-secondary'}`}>
                <Link to="/" className="hover:text-primary flex items-center gap-1.5 transition-colors">
                    <Home size={14} />
                    <span className="hidden sm:inline">Dashboard</span>
                </Link>
                {parts.map((part, index) => {
                    const isLast = index === parts.length - 1;

                    // Logic to resolve Course ID to Course Title
                    let label = labels[part];
                    if (!label) {
                        // Check if this looks like a course ID (e.g., starts with 'c' followed by numbers)
                        const course = data.courses.find(c => c.id === part);
                        if (course) {
                            label = course.title;
                        } else {
                            label = part.charAt(0).toUpperCase() + part.slice(1);
                        }
                    }

                    const to = '/' + parts.slice(0, index + 1).join('/');

                    if (part.length > 50 || !isNaN(part)) return null;

                    return (
                        <React.Fragment key={index}>
                            <ChevronRight size={14} className="text-gray-400 shrink-0" />
                            {isLast ? (
                                <span className="font-bold text-citilearn-green truncate max-w-64">{label}</span>
                            ) : (
                                <Link to={to} className="hover:text-primary transition-colors truncate max-w-32">
                                    {label}
                                </Link>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        );
    };

    const menuItems = [
        { icon: User, label: 'My Profile', path: '/profile' },
        { icon: BookOpen, label: 'My Learning', path: '/profile/learning' },
        { icon: BarChart2, label: 'Leaderboard and performance', path: '/profile/leaderboard' },
        { icon: Bookmark, label: 'Saved Course', path: '/profile/saved' },
        { icon: Award, label: 'My Certificates', path: '/profile/certificates' },
        { icon: Settings, label: 'Settings', path: '/profile/settings' },
    ];

    return (
        <div className={`h-screen flex flex-col font-lato overflow-hidden transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50'}`}>
            {/* Header */}
            <Header
                isDark={isDark}
                setIsDark={setIsDark}
                hideSidebarToggle={true}
            />

            {/* Breadcrumb Bar with Sidebar Toggle */}
            <div className={`px-6 py-4 flex items-center gap-4 shrink-0 z-[110] ${isDark ? 'bg-slate-900/50 border-b border-white/5' : ''}`}>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCollapsed(!collapsed);
                    }}
                    className={`p-2 rounded-xl border transition-all ${isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-gray-200 text-secondary hover:bg-gray-50'}`}
                    title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    <PanelLeft
                        size={18}
                        className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
                    />
                </button>
                <div className={`h-6 w-px mx-1 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}></div>
                {getBreadcrumbs()}
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden p-0 lg:p-6 lg:pt-0 gap-0 lg:gap-6 relative">
                {/* Mobile Overlay */}
                <div
                    className={`fixed inset-0 bg-slate-900/60 z-[120] lg:hidden transition-opacity duration-300 backdrop-blur-sm ${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    onClick={() => setCollapsed(true)}
                />

                {/* Sidebar */}
                <aside
                    className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'} lg:rounded-3xl border-r lg:border flex flex-col transition-all duration-300 ease-in-out shrink-0 h-full lg:h-fit fixed lg:sticky top-0 left-0 z-[130] lg:z-50 
                    ${collapsed
                            ? 'w-0 lg:w-20 -translate-x-full lg:translate-x-0 pointer-events-none lg:pointer-events-auto shadow-none overflow-visible'
                            : 'w-[300px] translate-x-0 shadow-2xl lg:shadow-none overflow-hidden'
                        }`}
                >
                    {/* Mobile Sidebar Header */}
                    {!collapsed && (
                        <div className={`lg:hidden flex items-center justify-between p-4 border-b ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
                            <span className={`font-bold ${isDark ? 'text-white' : 'text-main'}`}>Dashboard Profile</span>
                            <button
                                onClick={() => setCollapsed(true)}
                                className={`p-2 -mr-2 transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-primary'}`}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}

                    <div className={`p-4 transition-opacity duration-300 ${collapsed ? 'opacity-0 lg:opacity-100' : 'opacity-100'}`}>
                        <nav className="flex flex-col gap-1">
                            {menuItems.map((item) => (
                                <ProfileSidebarItem
                                    key={item.path}
                                    icon={item.icon}
                                    label={item.label}
                                    to={item.path}
                                    collapsed={collapsed && window.innerWidth >= 1024}
                                    active={location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/profile')}
                                />
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0 scroll-smooth p-4 lg:p-0 overflow-y-auto">
                    <div className="min-h-full pb-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfileLayout;
