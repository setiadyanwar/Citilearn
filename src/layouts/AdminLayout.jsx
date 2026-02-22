import React, { useState } from 'react';
import { PanelLeft, LayoutDashboard, FolderOpen, ClipboardCheck, Database, Users, ChevronRight, Home, X, Book } from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import Header from './Header';


import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// eslint-disable-next-line no-unused-vars
const AdminSidebarItem = ({ icon: Icon, label, collapsed, active, to, subItems }) => {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);

    // Check if any sub-item is active
    const isChildActive = subItems?.some(sub => location.pathname.startsWith(sub.path));

    // Auto-expand if child is active
    React.useEffect(() => {
        if (isChildActive) setIsExpanded(true);
    }, [isChildActive]);

    const handleToggle = (e) => {
        if (subItems && !collapsed) {
            e.preventDefault();
            setIsExpanded(!isExpanded);
        }
    };

    const content = (
        <>
            <Link
                to={to}
                onClick={handleToggle}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all mb-1 group relative ${active && !subItems // Only highlight parent if no subitems or if explicitly active (but usually subitems mean parent isn't "active" page itself)
                    // Actually, if a child is active, we might want to style the parent differently or just let the child be highlighted.
                    // Let's style parent if it's strictly active OR if it's open/child-active?
                    // Typically: Parent active style if path matches exactly.
                    // If child matches, parent might show open state.
                    ? 'bg-citilearn-green/10 text-citilearn-green font-bold'
                    : isChildActive
                        ? 'text-citilearn-green font-bold'
                        : 'text-secondary hover:bg-gray-50 hover:text-primary font-medium'
                    }`}
            >
                <div className="shrink-0 flex items-center justify-center w-6 h-6">
                    <Icon size={20} className={active || isChildActive ? 'text-citilearn-green' : 'text-gray-400 group-hover:text-gray-600'} />
                </div>
                {!collapsed && (
                    <>
                        <span className="whitespace-nowrap overflow-hidden transition-all duration-300 origin-left text-sm flex-1">
                            {label}
                        </span>
                        {subItems && (
                            <ChevronRight
                                size={16}
                                className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                            />
                        )}
                    </>
                )}
            </Link>

            {/* Sub Menu */}
            {!collapsed && subItems && isExpanded && (
                <div className="ml-9 space-y-1 mb-2 animate-in slide-in-from-top-2 duration-200">
                    {subItems.map((sub, idx) => {
                        const isSubActive = location.pathname.startsWith(sub.path);
                        return (
                            <Link
                                key={idx}
                                to={sub.path}
                                className={`block py-2 px-3 text-sm rounded-lg transition-colors ${isSubActive
                                    ? 'text-citilearn-green font-bold bg-citilearn-green/5'
                                    : 'text-slate-500 hover:text-main hover:bg-gray-50'
                                    }`}
                            >
                                {sub.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );

    if (collapsed) {
        return (
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    {/* Wrap in div because Link with onClick might be tricky with TooltipTrigger which expects a ref */}
                    <div>{content}</div>
                </TooltipTrigger>
                <TooltipContent side="right">
                    {label}
                </TooltipContent>
            </Tooltip>
        );
    }

    return <div>{content}</div>;
};

const AdminLayout = () => {
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
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        if (window.innerWidth < 1024) {
            setCollapsed(true);
        }
    }, [location.pathname]);

    // Check if current page requires fixed layout (no main scrollbar)
    const isFixedPage = false; // Allow natural scrolling for better visibility on all screens

    const getBreadcrumbs = () => {
        const path = location.pathname;
        const parts = path.split('/').filter(p => p);

        const labels = {
            'admin': 'Admin',
            'courses': 'Course Management',
            'assessment': 'Assessment & Grading',
            'cms': 'CMS CompanyHub',
            'users': 'Users Hub',
            'create': 'Create New',
            'edit': 'Edit',
            'test': 'Test',
            'new': 'New',
        };

        // Segments that are structural prefixes — no standalone page, skip from breadcrumb
        const skipSegments = new Set(['course', 'module', 'lesson', 'question']);

        const crumbs = [];
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            // Skip IDs (numeric) and very long slugs (e.g. UUIDs)
            if (!isNaN(part) || part.length > 20) continue;

            // Skip structural-only segments (they have no routable page on their own)
            if (skipSegments.has(part)) continue;

            const label = labels[part] || part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');

            // Context-aware: 'test' should go back to the Course Editor curriculum tab
            let to;
            if (part === 'test') {
                const courseIdx = parts.indexOf('course');
                const courseId = courseIdx !== -1 ? parts[courseIdx + 1] : null;
                to = courseId ? `/admin/course/${courseId}/edit?tab=curriculum` : '/admin';
            } else if (part === 'edit') {
                to = '/' + parts.slice(0, i + 1).join('/') + '?tab=curriculum';
            } else {
                to = '/' + parts.slice(0, i + 1).join('/');
            }

            crumbs.push({ label, to });
        }

        return (
            <div className={`flex items-center gap-2 text-sm overflow-hidden whitespace-nowrap ${isDark ? 'text-slate-400' : 'text-secondary'}`}>
                <Link to="/" className="hover:text-primary flex items-center gap-1.5 transition-colors">
                    <Home size={14} />
                    <span className="hidden sm:inline">Home</span>
                </Link>
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;
                    return (
                        <React.Fragment key={index}>
                            <ChevronRight size={14} className="text-gray-400 shrink-0" />
                            {isLast ? (
                                <span className="font-bold text-citilearn-green truncate max-w-37.5">{crumb.label}</span>
                            ) : (
                                <Link to={crumb.to} className="hover:text-primary transition-colors truncate max-w-25">
                                    {crumb.label}
                                </Link>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        );
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: FolderOpen, label: 'Course Management', path: '/admin/courses' },
        { icon: ClipboardCheck, label: 'Assessment & Grading', path: '/admin/assessment' },
        { icon: Book, label: 'CMS Knowledge Hub', path: '/admin/knowledge' },
        {
            icon: Database,
            label: 'CMS CompanyHub',
            path: '/admin/cms',
            subItems: [
                { label: 'Culture', path: '/admin/cms/culture' },
                { label: 'Collaboration', path: '/admin/cms/collaboration' },
            ]
        },
        { icon: Users, label: 'Users Hub', path: '/admin/users' },
    ];

    return (
        <TooltipProvider>
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
                                <span className={`font-bold ${isDark ? 'text-white' : 'text-main'}`}>Dashboard Admin</span>
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
                                    <AdminSidebarItem
                                        key={item.path}
                                        icon={item.icon}
                                        label={item.label}
                                        to={item.path}
                                        collapsed={collapsed && window.innerWidth >= 1024}
                                        active={location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin' && !item.subItems)}
                                        subItems={item.subItems}
                                    />
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className={`flex-1 min-w-0 relative scroll-smooth p-4 lg:p-0 ${isFixedPage ? 'overflow-hidden flex flex-col' : 'overflow-y-auto'}`}>
                        <div className={`min-h-full ${isFixedPage ? 'h-full flex flex-col' : 'pb-10'}`}>
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default AdminLayout;
