import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, UserCog } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UserLevelCapsule from './UserLevelCapsule';

const UserMenu = ({ user, isDark }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 transition-all rounded-xl"
            >
                {/* Avatar & Miles Capsule Component */}
                <UserLevelCapsule
                    imageUrl={user.avatar}
                    name={user.name}
                    points={user.points}
                    isDark={isDark}
                />

                {/* User Info (Name + Role) */}
                <div className="hidden sm:flex flex-col items-start leading-tight">
                    <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-main'}`}>
                        {user.name}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                        {user.role}
                    </span>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={`absolute right-0 mt-2 w-56 rounded-xl border z-100 overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200 shadow-lg shadow-gray-200/50'}`}
                    >
                        <div className="p-1.5 space-y-0.5">
                            <Link to="/profile" className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isDark ? 'text-gray-300 hover:bg-slate-800 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`}>
                                <User size={18} />
                                Profile & Dashboard
                            </Link>

                            <div className={`h-px mx-2 ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`} />

                            <Link to="/admin" className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isDark ? 'text-gray-300 hover:bg-slate-800 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`}>
                                <UserCog size={18} />
                                Admin Panel
                            </Link>

                            <div className={`h-px mx-2 ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`} />

                            <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-500 hover:bg-red-50'}`}>
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserMenu;
