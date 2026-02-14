import React, { useRef, useEffect } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import MainSearchBar from './MainSearchBar';
import Card from '@/components/common/Card';
import CircularProgress from '@/components/common/CircularProgress';
import { COURSE_CATEGORIES, COURSE_STATUS_LIST } from '@/constants/course';
import illustrasi from '@/assets/illustrasi.svg';
import budi_pratama from '@/assets/budi_pratama.png';


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
            <Card rounded="rounded-3xl" padding="p-4 sm:p-10" className="lg:col-span-6 relative flex flex-col justify-between z-20">
                {/* Background Illustration Container */}
                <div className="absolute inset-0 pointer-events-none select-none overflow-hidden rounded-3xl">
                    <img
                        src={illustrasi}
                        alt="Hero Illustration"
                        className="absolute top-0 right-0 h-[20%] md:h-[40%] w-auto object-contain translate-x-1 -translate-y-2 md:-translate-y-2 opacity-90 dark:opacity-30 transition-all duration-700 hover:scale-105"
                    />
                </div>

                <div className="relative z-10 space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-primary dark:text-emerald-400 font-bold text-base md:text-lg">
                                Welcome Back
                            </span>
                            <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white shrink-0">
                                <img src={budi_pratama} alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-main dark:text-white leading-tight">
                            Capt. Setiady Anwar
                        </h2>

                        <p className="text-base text-secondary dark:text-slate-400 font-medium leading-relaxed max-w-lg">
                            Monitor your training progress, complete mandatory updates, and access your operational manuals here.
                        </p>
                    </div>

                    <div className="max-w-full">
                        <MainSearchBar searchQuery={searchQuery} handleSearch={handleSearch} variant="inline" />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 flex-wrap">
                        {/* Category Filter */}
                        <div className="flex gap-2 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800 rounded-full p-1 overflow-x-auto no-scrollbar max-w-full items-center h-10 md:h-11 flex-1 min-w-0">
                            {COURSE_CATEGORIES.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setSelectedCategory(filter)}
                                    className={`text-2xs md:text-sm font-bold px-2 md:px-4 h-full rounded-full transition-all whitespace-nowrap ${selectedCategory === filter
                                        ? 'bg-primary text-white'
                                        : 'text-secondary dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-main dark:hover:text-white'}`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        {/* Status Filter Dropdown */}
                        <div className="relative z-50 shrink-0" ref={statusDropdownRef}>
                            <button
                                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                                className={`flex items-center justify-between gap-3 px-4 h-10 md:h-11 rounded-full border text-2xs md:text-xs font-bold transition-all
                                    ${isStatusDropdownOpen
                                        ? 'border-primary bg-white dark:bg-slate-800'
                                        : 'border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 text-secondary dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'}`}
                            >
                                <span>Status: {selectedStatus}</span>
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isStatusDropdownOpen && (
                                <div className="absolute top-full mt-2 left-0 sm:left-auto sm:right-0 w-48 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {COURSE_STATUS_LIST.map(status => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                setSelectedStatus(status);
                                                setIsStatusDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-2xs md:text-xs font-bold transition-colors
                                                ${selectedStatus === status
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'text-secondary dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
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
                <Card rounded="rounded-3xl" padding="p-4 sm:p-8" className="flex flex-row items-stretch justify-between gap-6 h-full relative overflow-hidden">
                    {/* Background Blur Effect */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#6AC100]/30 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col justify-between items-start gap-4 z-10">
                        <CircularProgress progress={60} size="w-16 h-16 md:w-20 md:h-20" strokeWidth={10} textSize="text-lg md:text-xl" />
                        <div className="text-left mt-auto">
                            <h4 className="text-sm md:text-base font-bold text-main dark:text-white leading-tight">Course Completed</h4>
                            <p className="text-xs font-medium text-tertiary dark:text-slate-500 mt-1">in 2d 40h</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full sm:w-auto z-10">
                        <div className="flex gap-3">
                            <div className="bg-[#00703C] text-white p-3 rounded-2xl text-center min-w-25 flex-1 flex flex-col justify-center items-center">
                                <p className="text-2xl font-bold mb-0 leading-none">7</p>
                                <p className="text-sm font-medium opacity-90 mt-1">Enrolled</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-3 rounded-2xl text-center min-w-25 flex-1 flex flex-col justify-center items-center">
                                <p className="text-2xl font-bold text-main dark:text-white mb-0 leading-none">3</p>
                                <p className="text-sm font-medium text-tertiary mt-1">Completed</p>
                            </div>
                        </div>

                        <div className="bg-white/50 dark:bg-slate-800/40 backdrop-blur-md border border-gray-100 dark:border-slate-700 rounded-2xl p-2 px-3 flex items-center justify-center gap-3 relative">
                            <div className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                            <span className="text-lg font-bold text-main dark:text-white ml-1">5</span>
                            <span className="text-sm font-medium text-secondary dark:text-slate-400 leading-tight">Mandatory Incomplete</span>
                        </div>
                    </div>
                </Card>

                {/* Bottom Row Stats */}
                <div className="hidden sm:grid grid-cols-2 gap-4 flex-1">
                    <Card rounded="rounded-3xl" className="flex flex-col justify-between">
                        <div>
                            <p className="text-primary text-2xl font-bold mb-0.5">112</p>
                            <p className="text-sm font-medium text-secondary dark:text-slate-400">Course Citilearn</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-800 w-10 h-10 rounded-lg flex items-center justify-center self-start mt-2">
                            <BookOpen size={24} className="text-gray-300" />
                        </div>
                    </Card>

                    <Card rounded="rounded-3xl" className="flex flex-col justify-between">
                        <div>
                            <p className="text-primary text-2xl font-bold mb-0.5">220</p>
                            <p className="text-sm font-medium text-secondary dark:text-slate-400">Course Modules</p>
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
