import React, { useState } from 'react';
import {
    Clock,
    BookOpen,
    CheckCircle2,
    XCircle,
    ChevronRight,
    ChevronDown,
    X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { GradeBadge, TypeBadge } from './GradingBadges';
import UserProfile from '@/components/common/UserProfile';
import MainSearchBar from '@/features/dashboard/components/MainSearchBar';

/**
 * StudentGradingRow
 */
const StudentGradingRow = ({ group, isSelected, onSelect }) => {
    const { student, attempts: assessments } = group;

    const avgScore = Math.round(assessments.reduce((acc, curr) => acc + curr.score, 0) / assessments.length) || 0;
    const passed = assessments.filter(a => a.status === 'Passed').length;
    const failed = assessments.length - passed;

    return (
        <TableRow
            className={cn(
                "group cursor-pointer transition-all duration-200 border-slate-100",
                isSelected ? "bg-slate-50 border-slate-200" : "hover:bg-slate-100/60"
            )}
            onClick={() => onSelect(group)}
        >
            <TableCell className="py-4 pl-6 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <UserProfile
                        imageUrl={null}
                        name={student.name}
                        size="sm"
                    />
                    <div className="min-w-0">
                        <p className="text-xs md:text-sm font-bold text-main leading-tight group-hover:text-primary transition-colors truncate max-w-[120px] md:max-w-none">{student.name}</p>
                        <p className="text-[10px] text-tertiary mt-0.5 tracking-tight font-medium uppercase truncate">ID: {student.id}</p>
                    </div>
                </div>
            </TableCell>

            <TableCell className="py-4 text-center hidden md:table-cell whitespace-nowrap">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary">
                    <BookOpen size={14} className="text-tertiary" />
                    {[...new Set(assessments.map(a => a.course.id))].length} Programs
                </span>
            </TableCell>

            <TableCell className="py-4 text-center hidden md:table-cell whitespace-nowrap">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-100 text-3xs font-semibold text-secondary">
                    <Clock size={12} className="text-tertiary" />
                    {assessments.length} Assessments
                </div>
            </TableCell>

            <TableCell className="py-4 text-center whitespace-nowrap">
                <div className="flex flex-col items-center">
                    <span className={cn(
                        "text-sm md:text-base font-black leading-none",
                        avgScore >= 80 ? "text-citilearn-green" : avgScore >= 60 ? "text-amber-500" : "text-red-500"
                    )}>
                        {avgScore}%
                    </span>
                    <span className="text-[10px] font-bold text-slate-300 mt-1 uppercase tracking-tighter">Avg</span>
                </div>
            </TableCell>

            <TableCell className="py-4 text-center whitespace-nowrap">
                <div className="flex items-center justify-center gap-2 md:gap-3">
                    <div className="flex items-center gap-1 text-[10px] md:text-2xs font-bold text-citilearn-green">
                        <CheckCircle2 size={13} strokeWidth={2.5} /> {passed}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] md:text-2xs font-bold text-red-500">
                        <XCircle size={13} strokeWidth={2.5} /> {failed}
                    </div>
                </div>
            </TableCell>

            <TableCell className="py-4 text-right pr-6 whitespace-nowrap">
                <Button
                    variant="link"
                    className={cn(
                        "h-auto p-0 text-[11px] md:text-3xs font-bold",
                        isSelected ? "text-primary" : "text-slate-400 group-hover:text-primary"
                    )}
                    onClick={() => onSelect(group)}
                >
                    Details
                </Button>
            </TableCell>
        </TableRow>
    );
};

const CourseAccordionItem = ({ courseGroup, isExpanded, onToggle, onReview }) => {
    return (
        <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white transition-all duration-200">
            <button
                onClick={onToggle}
                className={cn(
                    "w-full flex items-center justify-between px-5 py-4 text-left transition-colors",
                    isExpanded ? "bg-slate-50/50" : "hover:bg-slate-50/30"
                )}
            >
                <div className="flex items-center gap-3 min-w-0">
                    <div className={cn(
                        "p-2 rounded-lg shrink-0 transition-colors",
                        isExpanded ? "bg-primary/10 text-primary" : "bg-slate-50 text-tertiary"
                    )}>
                        <BookOpen size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-main truncate leading-tight">
                            {courseGroup.course.title}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-1 overflow-hidden">
                            <p className="text-[10px] text-tertiary font-medium shrink-0">
                                <span className="md:hidden">{courseGroup.items.length} Asm.</span>
                                <span className="hidden md:inline">{courseGroup.items.length} Assessment{courseGroup.items.length > 1 ? 's' : ''}</span>
                            </p>
                            <span className="w-0.5 h-0.5 rounded-full bg-slate-300 shrink-0" />
                            <p className="text-[10px] text-secondary font-semibold truncate uppercase tracking-tighter">
                                {new Date(Math.max(...courseGroup.items.map(item => new Date(item.date)))).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cn(
                    "p-1 rounded-md transition-transform duration-200 text-slate-400",
                    isExpanded ? "rotate-180 text-primary" : "rotate-0"
                )}>
                    <ChevronDown size={16} />
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <div className="px-5 pb-5 pt-1 space-y-1">
                            {courseGroup.items
                                .sort((a, b) => {
                                    const typeOrder = { 'Pre-test': 0, 'Quiz': 1, 'Post-test': 2 };
                                    if (typeOrder[a.assessment.type] !== typeOrder[b.assessment.type]) {
                                        return typeOrder[a.assessment.type] - typeOrder[b.assessment.type];
                                    }
                                    return new Date(a.date) - new Date(b.date);
                                })
                                .map(attempt => (
                                    <div
                                        key={attempt.id}
                                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                                    >
                                        <div className="flex-1 min-w-0 pr-2">
                                            <p className="text-xs font-bold text-main group-hover:text-primary transition-colors truncate">{attempt.assessment.title}</p>
                                            <div className="flex items-center gap-1.5 mt-1 overflow-hidden">
                                                <TypeBadge type={attempt.assessment.type} />
                                                <span className="text-[10px] text-tertiary font-medium tabular-nums truncate">
                                                    {new Date(attempt.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 md:gap-6 shrink-0">
                                            <div className="text-right">
                                                <p className={cn(
                                                    "text-sm font-black tabular-nums leading-none",
                                                    attempt.score >= attempt.passingScore ? "text-citilearn-green" : "text-red-500"
                                                )}>
                                                    {attempt.score}%
                                                </p>
                                                <p className="text-[10px] font-bold text-slate-300 mt-0.5 uppercase tracking-tighter">
                                                    #{attempt.attempts}
                                                </p>
                                            </div>
                                            <Button
                                                variant="link"
                                                className="h-auto p-0 text-[10px] font-bold text-primary hover:text-primary/80"
                                                onClick={() => onReview(attempt)}
                                            >
                                                Review
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/**
 * StudentGradingTable
 */
const StudentGradingTable = ({ studentGroups, onReview }) => {
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [expandedCourseIds, setExpandedCourseIds] = useState({});
    const [drawerSearchTerm, setDrawerSearchTerm] = useState('');

    const selectedGroup = studentGroups.find(g => g.student.id === selectedStudentId);

    const assessmentsByCourse = selectedGroup ? Object.values(
        selectedGroup.attempts.reduce((acc, curr) => {
            if (!acc[curr.course.id]) {
                acc[curr.course.id] = { course: curr.course, items: [] };
            }
            acc[curr.course.id].items.push(curr);
            return acc;
        }, {})
    ).filter(group =>
        group.course.title.toLowerCase().includes(drawerSearchTerm.toLowerCase())
    ) : [];

    // Handle student selection and auto-expand first course
    const handleSelectStudent = (id) => {
        setDrawerSearchTerm(''); // Reset search when switching students
        if (selectedStudentId === id) {
            setSelectedStudentId(null);
            setExpandedCourseIds({}); // Collapse all when deselecting
        } else {
            setSelectedStudentId(id);
            // We need to wait for the group to be found to get the first course ID
            const group = studentGroups.find(g => g.student.id === id);
            if (group && group.attempts.length > 0) {
                // Auto-expand the first course of the selected student
                setExpandedCourseIds({ [group.attempts[0].course.id]: true });
            } else {
                setExpandedCourseIds({});
            }
        }
    };

    const toggleCourse = (courseId) => {
        setExpandedCourseIds(prev => ({
            ...prev,
            [courseId]: !prev[courseId]
        }));
    };

    return (
        <div className="relative">
            {/* Main Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto scrollbar-none">
                <Table className="min-w-[600px] md:min-w-0">
                    <TableHeader className="bg-slate-50 border-b border-slate-200">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="pl-6 h-12 text-3xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Student</TableHead>
                            <TableHead className="h-12 text-center text-3xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell whitespace-nowrap">Programs</TableHead>
                            <TableHead className="h-12 text-center text-3xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell whitespace-nowrap">Assessments</TableHead>
                            <TableHead className="h-12 text-center text-3xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">GPA</TableHead>
                            <TableHead className="h-12 text-center text-3xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Outcomes</TableHead>
                            <TableHead className="h-12 pr-6" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {studentGroups.map(group => (
                            <StudentGradingRow
                                key={group.student.id}
                                group={group}
                                isSelected={selectedStudentId === group.student.id}
                                onSelect={(g) => handleSelectStudent(g.student.id)}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Slide-over Drawer (Overlay) */}
            <AnimatePresence>
                {selectedStudentId && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedStudentId(null)}
                            className="fixed inset-0 bg-slate-900/40 z-990"
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 right-0 h-full w-[80%] md:w-full max-w-lg bg-white z-1000 flex flex-col border-l border-slate-100"
                        >
                            {/* Drawer Header */}
                            <div className="px-4 md:px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <UserProfile
                                        imageUrl={null}
                                        name={selectedGroup.student.name}
                                        size="sm"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-main subtitle-base leading-tight">{selectedGroup.student.name}</h3>
                                        <p className="text-3xs text-tertiary mt-0.5 font-semibold">Academic assessment summary</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSelectedStudentId(null)}
                                    className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-xl"
                                >
                                    <X size={18} />
                                </Button>
                            </div>

                            {/* Drawer Content */}
                            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4 scrollbar-none">
                                {/* Search Course */}
                                <div className="mb-6">
                                    <MainSearchBar
                                        placeholder="Search program or course..."
                                        variant="compact"
                                        hideButton={true}
                                        searchQuery={drawerSearchTerm}
                                        handleSearch={(e) => setDrawerSearchTerm(e.target.value)}
                                    />
                                </div>

                                {assessmentsByCourse.length > 0 ? (
                                    assessmentsByCourse.map(courseGroup => (
                                        <CourseAccordionItem
                                            key={courseGroup.course.id}
                                            courseGroup={courseGroup}
                                            isExpanded={!!expandedCourseIds[courseGroup.course.id]}
                                            onToggle={() => toggleCourse(courseGroup.course.id)}
                                            onReview={onReview}
                                        />
                                    ))
                                ) : (
                                    <div className="py-12 text-center">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No programs found</p>
                                    </div>
                                )}
                            </div>

                            {/* Drawer Footer */}
                            <div className="px-4 md:px-8 py-6 border-t border-slate-50 bg-slate-50/10">
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="p-2.5 bg-white rounded-xl border border-slate-100 text-center">
                                        <p className="text-sm font-bold text-main leading-none">{selectedGroup.summary.totalAttempts}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-tighter">Total</p>
                                    </div>
                                    <div className="p-2.5 bg-white rounded-xl border border-slate-100 text-center">
                                        <p className="text-sm font-bold text-citilearn-green leading-none">{selectedGroup.summary.passed}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-tighter">Pass</p>
                                    </div>
                                    <div className="p-2.5 bg-white rounded-xl border border-slate-100 text-center">
                                        <p className="text-sm font-bold text-red-500 leading-none">{selectedGroup.summary.failed}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-tighter">Fail</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StudentGradingTable;
