import React, { useState } from 'react';
import { PanelLeft, LayoutDashboard, FolderOpen, ClipboardCheck, Database, Users, ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../layout/Header';
import budi_pratama from '../../assets/budi_pratama.png';

const AdminSidebarItem = ({ icon: Icon, label, collapsed, active, to }) => (
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
            <div className={`absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] whitespace-nowrap font-bold`}>
                {label}
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
            </div>
        )}
    </Link>
);

const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
    const location = useLocation();

    // Auto-collapse on mobile when route changes or window resize
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setCollapsed(true);
            }
        };
        window.addEventListener('resize', handleResize);
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
        // ... (rest of breadcrumbs logic remains same)
        const path = location.pathname;
        const parts = path.split('/').filter(p => p);

        const labels = {
            'admin': 'Admin',
            'courses': 'Course Management',
            'assessment': 'Assessment',
            'cms': 'CMS CompanyHub',
            'users': 'Users Hub',
            'create': 'Create New',
            'edit': 'Edit',
            'module': 'Module',
            'lesson': 'Lesson'
        };

        return (
            <div className="flex items-center gap-2 text-sm text-secondary overflow-hidden whitespace-nowrap">
                <Link to="/" className="hover:text-primary flex items-center gap-1.5 transition-colors">
                    <Home size={14} />
                    <span className="hidden sm:inline">Home</span>
                </Link>
                {parts.map((part, index) => {
                    const isLast = index === parts.length - 1;
                    const label = labels[part] || part.charAt(0).toUpperCase() + part.slice(1);
                    const to = '/' + parts.slice(0, index + 1).join('/');

                    if (part.length > 20 || !isNaN(part)) return null;

                    return (
                        <React.Fragment key={index}>
                            <ChevronRight size={14} className="text-gray-400 shrink-0" />
                            {isLast ? (
                                <span className="font-bold text-citilearn-green truncate max-w-[150px]">{label}</span>
                            ) : (
                                <Link to={to} className="hover:text-primary transition-colors truncate max-w-[100px]">
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
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: FolderOpen, label: 'Course Management', path: '/admin/courses' },
        { icon: ClipboardCheck, label: 'Assessment & Grading', path: '/admin/assessment' },
        { icon: Database, label: 'CMS CompanyHub', path: '/admin/cms' },
        { icon: Users, label: 'Users Hub', path: '/admin/users' },
    ];

    return (
        <div className="h-screen bg-gray-50 flex flex-col font-lato overflow-hidden">
            {/* Header */}
            <Header hideSidebarToggle={true} />

            {/* Breadcrumb Bar with Sidebar Toggle */}
            <div className="px-6 py-4 flex items-center gap-4 shrink-0 z-30">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-secondary transition-colors"
                    title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    <PanelLeft
                        size={18}
                        className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
                    />
                </button>
                <div className="h-6 w-px bg-gray-200 mx-1"></div>
                {getBreadcrumbs()}
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden p-0 lg:p-6 lg:pt-0 gap-0 lg:gap-6 bg-gray-50/50 relative">
                {/* Mobile Overlay */}
                <div
                    className={`fixed inset-0 bg-slate-900/60 z-[90] lg:hidden transition-opacity duration-300 backdrop-blur-sm ${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    onClick={() => setCollapsed(true)}
                />

                {/* Sidebar */}
                <aside
                    className={`bg-white lg:rounded-3xl border-r lg:border border-gray-100 flex flex-col transition-all duration-300 ease-in-out shrink-0 h-full fixed lg:sticky top-0 left-0 z-100 lg:z-50 
                    ${collapsed
                            ? 'w-0 lg:w-[80px] -translate-x-full lg:translate-x-0'
                            : 'w-[280px] translate-x-0 lg:shadow-none'
                        }`}
                >
                    <div className={`flex-1 p-4 custom-scrollbar overflow-y-auto ${collapsed ? 'opacity-0 lg:opacity-100' : 'opacity-100'}`}>
                        <nav className="flex flex-col gap-1">
                            {menuItems.map((item) => (
                                <AdminSidebarItem
                                    key={item.path}
                                    icon={item.icon}
                                    label={item.label}
                                    to={item.path}
                                    collapsed={collapsed && window.innerWidth >= 1024}
                                    active={location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin')}
                                />
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className={`flex-1 min-w-0 relative scroll-smooth z-0 p-4 lg:p-0 ${isFixedPage ? 'overflow-hidden flex flex-col' : 'overflow-y-auto'}`}>
                    <div className={`min-h-full ${isFixedPage ? 'h-full flex flex-col' : 'pb-10'}`}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
