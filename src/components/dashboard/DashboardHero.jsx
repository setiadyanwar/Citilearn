import React, { useRef, useEffect } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import MainSearchBar from './MainSearchBar';
import Card from '../common/Card';
import CircularProgress from '../common/CircularProgress';
import { COURSE_CATEGORIES, COURSE_STATUS_LIST } from '../../constants/course';

const DashboardHero = ({
    searchQuery,
    handleSearch,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    isStatusDropdownOpen,
    setIsStatusDropdownOpen
}) => {
    const statusDropdownRef = useRef(null);

    // Handle click outside for status dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
                setIsStatusDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsStatusDropdownOpen]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8 items-stretch">
            {/* Left Card: Welcome & Search & Filters */}
            <Card rounded="rounded-[28px]" padding="p-10" className="lg:col-span-6 relative flex flex-col justify-between overflow-hidden">
                {/* Background Illustration Container */}
                <div className="absolute inset-0 pointer-events-none select-none overflow-hidden rounded-[28px]">
                    <img
                        src="/illustrasi.svg"
                        alt="Hero Illustration"
                        className="absolute top-0 right-0 h-[25%] md:h-[40%] w-auto object-contain translate-x-1 -translate-y-2 md:-translate-y-2 opacity-95 dark:opacity-40 transition-all duration-700 hover:scale-105"
                    />
                </div>

                <div className="relative z-10 space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-primary dark:text-emerald-400 font-bold text-base md:text-lg">
                                Welcome Back
                            </span>
                            <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                                <img src="/budi_pratama.png" alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white leading-tight">
                            Capt. Setiady Anwar
                        </h2>

                        <p className="text-sm text-gray-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm">
                            Monitor your training progress, complete mandatory updates, and access your operational manuals here.
                        </p>
                    </div>

                    <div className="max-w-full">
                        <MainSearchBar searchQuery={searchQuery} handleSearch={handleSearch} variant="inline" />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                        {/* Category Filter */}
                        <div className="flex bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800 rounded-xl p-1 overflow-x-auto no-scrollbar max-w-full">
                            {COURSE_CATEGORIES.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setSelectedCategory(filter)}
                                    className={`text-[11px] md:text-xs font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all whitespace-nowrap ${selectedCategory === filter
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-gray-500 dark:text-slate-400 hover:text-primary dark:hover:text-white'}`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        {/* Status Filter Dropdown */}
                        <div className="relative z-[50]" ref={statusDropdownRef}>
                            <button
                                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                                className={`flex items-center justify-between gap-3 px-4 py-2 rounded-xl border text-[11px] md:text-xs font-bold transition-all
                                    ${isStatusDropdownOpen
                                        ? 'border-primary bg-white dark:bg-slate-800'
                                        : 'border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400'}`}
                            >
                                <span>Status: {selectedStatus}</span>
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isStatusDropdownOpen && (
                                <div className="absolute top-full mt-2 left-0 sm:left-auto sm:right-0 w-48 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {COURSE_STATUS_LIST.map(status => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                setSelectedStatus(status);
                                                setIsStatusDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-[11px] md:text-xs font-bold transition-colors
                                                ${selectedStatus === status
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Right Column: Stats */}
            <div className="lg:col-span-6 flex flex-col gap-4">
                {/* Circular Stats Card */}
                <Card rounded="rounded-[28px]" padding="p-10" className="flex flex-col sm:flex-row items-center justify-between gap-6 h-full">
                    <div className="flex items-center gap-4 md:gap-5">
                        <CircularProgress progress={60} size="w-14 h-14 md:w-16 md:h-16" />
                        <div className="text-left">
                            <h4 className="text-base md:text-lg font-bold text-slate-800 dark:text-white leading-tight">Course Completed</h4>
                            <p className="text-xs md:text-sm font-medium text-slate-400 dark:text-slate-500 mt-0.5">in 2d 40h</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
                        <div className="bg-primary text-white p-2.5 md:p-3 px-4 md:px-5 rounded-xl text-center min-w-[80px] md:min-w-[90px] flex-1 sm:flex-none">
                            <p className="text-lg md:text-xl font-black mb-0">7</p>
                            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider opacity-90">Enrolled</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-2.5 md:p-3 px-4 md:px-5 rounded-xl text-center min-w-[80px] md:min-w-[90px] flex-1 sm:flex-none">
                            <p className="text-lg md:text-xl font-black text-slate-800 dark:text-white mb-0">3</p>
                            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-gray-400">Completed</p>
                        </div>
                    </div>
                </Card>

                {/* Bottom Row Stats */}
                <div className="hidden sm:grid grid-cols-2 gap-4 flex-1">
                    <Card rounded="rounded-[28px]" className="flex flex-col justify-between">
                        <div>
                            <p className="text-primary text-2xl font-black mb-0.5">112</p>
                            <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Course Citilearn</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-800 w-10 h-10 rounded-lg flex items-center justify-center self-start mt-2">
                            <BookOpen size={24} className="text-gray-300" />
                        </div>
                    </Card>

                    <Card rounded="rounded-[28px]" className="flex flex-col justify-between">
                        <div>
                            <p className="text-primary text-2xl font-black mb-0.5">220</p>
                            <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Course Modules</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-800 w-10 h-10 rounded-lg flex items-center justify-center self-start mt-2">
                            <svg className="w-6 h-6 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                            </svg>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardHero;
