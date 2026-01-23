import React, { useState, useEffect, useRef } from 'react';
import data from '../data.json';
import CourseCard from '../components/dashboard/CourseCard';
import MainSearchBar from '../components/dashboard/MainSearchBar';
import { BookOpen, Search, Filter, LayoutGrid, List as ListIcon, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const MyCourses = ({ searchQuery: globalSearchQuery, handleSearch: handleGlobalSearch }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // grid, list
    const [activeTab, setActiveTab] = useState('all'); // all, ongoing, completed
    const [localSearch, setLocalSearch] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const [timeFilter, setTimeFilter] = useState('Month');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            scrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const enrolled = data.courses.filter(c => c.progress > 0 || c.status === 'Completed' || c.status === 'On Progress');
            setCourses(enrolled);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const filteredCourses = courses.filter(course => {
        const query = localSearch || globalSearchQuery;
        const matchesSearch = course.title.toLowerCase().includes(query.toLowerCase());
        const matchesTab =
            activeTab === 'all' ? true :
                activeTab === 'ongoing' ? (course.status === 'On Progress' || (course.progress > 0 && course.progress < 100)) :
                    activeTab === 'completed' ? (course.status === 'Completed' || course.progress === 100) : true;

        return matchesSearch && matchesTab;
    });

    const ongoingCourses = courses.filter(c => c.progress > 0 && c.progress < 100);

    const getTopicsData = () => {
        switch (timeFilter) {
            case 'Day':
                return [
                    { name: 'Aviation', value: 40, color: '#DCF4E9' },
                    { name: 'Leadership', value: 20, color: '#065F46' },
                    { name: 'Safety', value: 30, color: '#5DB38E' },
                    { name: 'Technical', value: 10, color: '#042A1E' },
                ];
            case 'Year':
                return [
                    { name: 'Aviation', value: 25, color: '#DCF4E9' },
                    { name: 'Leadership', value: 30, color: '#065F46' },
                    { name: 'Safety', value: 15, color: '#5DB38E' },
                    { name: 'Technical', value: 30, color: '#042A1E' },
                ];
            default: // Month
                return [
                    { name: 'Aviation', value: 35, color: '#DCF4E9' },
                    { name: 'Leadership', value: 25, color: '#065F46' },
                    { name: 'Safety', value: 22, color: '#5DB38E' },
                    { name: 'Technical', value: 18, color: '#042A1E' },
                ];
        }
    };

    const topicsData = getTopicsData();

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const renderActiveShape = (props) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
        return (
            <g>
                <path
                    d={`M ${cx},${cy} m 0,${-outerRadius - 4} a ${outerRadius + 4},${outerRadius + 4} 0 1,1 0,${(outerRadius + 4) * 2} a ${outerRadius + 4},${outerRadius + 4} 0 1,1 0,${-(outerRadius + 4) * 2}`}
                    fill="none"
                    stroke={fill}
                    strokeWidth={2}
                    opacity={0.3}
                />
                <motion.path
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.05 }}
                    d={`M ${cx},${cy} m 0,${-outerRadius} a ${outerRadius},${outerRadius} 0 1,1 0,${outerRadius * 2} a ${outerRadius},${outerRadius} 0 1,1 0,${-outerRadius * 2}`}
                    fill={fill}
                />
            </g>
        );
    };

    return (
        <div className="space-y-8 animate-fade-in pb-8">
            {/* Top Section: Resume & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Resume Training */}
                <div className="lg:col-span-8 flex flex-col">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h2 className="text-xl font-black flex items-center gap-2.5 text-citilink-dark dark:text-white">
                            <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                            Resume Training
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="p-1.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-400 hover:text-primary transition-colors active:scale-90"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="p-1.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-400 hover:text-primary transition-colors active:scale-90"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto gap-5 pb-2 no-scrollbar scroll-smooth h-full"
                        >
                            {ongoingCourses.length > 0 ? (
                                ongoingCourses.map(course => (
                                    <div key={course.id} className="min-w-[280px] md:min-w-[320px] max-w-[320px] h-full">
                                        <CourseCard course={course} compact />
                                    </div>
                                ))
                            ) : (
                                <div className="w-full bg-gray-50 dark:bg-slate-900 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-8 text-center text-gray-400 font-medium flex items-center justify-center">
                                    No courses to resume
                                </div>
                            )}
                        </div>
                        {/* Right Fade Overlay */}
                        <div className="absolute top-0 right-0 bottom-2 w-20 pointer-events-none bg-gradient-to-l from-gray-50/80 dark:from-slate-950/80 via-transparent to-transparent z-10 hidden md:block"></div>
                    </div>
                </div>

                {/* Course Topic Donut Chart */}
                <div className="lg:col-span-4">
                    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm h-full flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4 relative">
                            <h2 className="text-xl font-black text-gray-800 dark:text-white">Course Topic</h2>
                            <div className="relative">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl text-[10px] font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group"
                                >
                                    {timeFilter} <ChevronDown size={14} className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
                                </button>

                                <AnimatePresence>
                                    {isFilterOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-28 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden"
                                        >
                                            {['Day', 'Month', 'Year'].map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => {
                                                        setTimeFilter(option);
                                                        setIsFilterOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 text-[11px] font-bold transition-colors ${timeFilter === option
                                                        ? 'bg-primary/10 text-primary'
                                                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800'
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center">
                            {/* Recharts Pie Chart - Clean & Simple */}
                            <div className="relative w-full h-64 mb-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={topicsData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={100}
                                            paddingAngle={0}
                                            dataKey="value"
                                            stroke="none"
                                            onMouseEnter={onPieEnter}
                                            onMouseLeave={() => setActiveIndex(null)}
                                            animationDuration={1500}
                                        >
                                            {topicsData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.color}
                                                    style={{
                                                        filter: activeIndex === index ? 'drop-shadow(0 0 12px rgba(0,0,0,0.12))' : 'none',
                                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                                    }}
                                                    className="outline-none cursor-pointer"
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '16px',
                                                border: 'none',
                                                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                                                fontSize: '13px',
                                                fontWeight: 'bold',
                                                padding: '12px 16px'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full px-1">
                                {topicsData.map((topic, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-center gap-2.5 cursor-default"
                                        onMouseEnter={() => setActiveIndex(i)}
                                        onMouseLeave={() => setActiveIndex(null)}
                                        animate={{ opacity: activeIndex === null || activeIndex === i ? 1 : 0.5 }}
                                    >
                                        <div className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: topic.color }}></div>
                                        <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                            <span className="text-[14px] font-bold text-gray-500 dark:text-slate-400 truncate">{topic.name}</span>
                                            <span className="text-[14px] font-black text-gray-800 dark:text-white ml-auto">{topic.value}%</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Controls Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-gray-100 dark:border-slate-800">
                <div className="flex bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800 p-1 rounded-xl w-full md:w-fit overflow-x-auto no-scrollbar">
                    {[
                        { id: 'all', label: 'All Courses', count: courses.length },
                        { id: 'ongoing', label: 'On Progress', count: courses.filter(c => c.status === 'On Progress' || (c.progress > 0 && c.progress < 100)).length },
                        { id: 'completed', label: 'Completed', count: courses.filter(c => c.status === 'Completed' || c.progress === 100).length }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-[#059669] text-white'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'
                                }`}
                        >
                            <span>{tab.label}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-md min-w-[20px] text-center ${activeTab === tab.id
                                ? 'bg-white/20 text-white'
                                : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 font-bold'
                                }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    {/* Reusing MainSearchBar component */}
                    <div className="flex-1 md:w-80">
                        <MainSearchBar
                            searchQuery={localSearch}
                            handleSearch={(e) => setLocalSearch(e.target.value)}
                            variant="compact"
                        />
                    </div>

                    {/* View Mode Toggles */}
                    <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-xl transition-all ${viewMode === 'grid'
                                ? 'bg-[#059669] text-white shadow-sm'
                                : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'
                                }`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-xl transition-all ${viewMode === 'list'
                                ? 'bg-[#059669] text-white shadow-sm'
                                : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'
                                }`}
                        >
                            <ListIcon size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <div className={viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                : "flex flex-col gap-4"
            }>
                {loading ? (
                    [1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 h-80 rounded-3xl animate-pulse" />
                    ))
                ) : filteredCourses.length > 0 ? (
                    filteredCourses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <CourseCard course={course} />
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center space-y-4">
                        <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                            <Search size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">No courses found</h3>
                        <p className="text-gray-500 max-w-xs mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCourses;
