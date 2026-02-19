import React, { useState } from 'react';
import {
    Search,
    Filter,
    ChevronDown,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/common/Pagination';
import MainSearchBar from '@/features/dashboard/components/MainSearchBar';

// Sub-components
import GradingTable from '../components/grading/GradingTable';
import GradingDetailView from '../components/grading/GradingDetailView';

// --- Mock Data ---
const MOCK_GRADES = [
    {
        id: 'g1',
        student: { id: 's1', name: 'Budi Setiadi', avatar: null },
        course: { id: 'c1', title: 'Aviation Safety Management System' },
        assessment: { id: 'l1', title: 'Pre Test', type: 'Pre-test' },
        score: 85,
        passingScore: 80,
        attempts: 1,
        maxAttempts: 3,
        date: '2026-02-17T14:30:00',
        status: 'Passed'
    },
    {
        id: 'g2',
        student: { id: 's1', name: 'Budi Setiadi', avatar: null },
        course: { id: 'c1', title: 'Aviation Safety Management System' },
        assessment: { id: 'l-m1-quiz', title: 'Module 1 Quiz', type: 'Quiz' },
        score: 60,
        passingScore: 80,
        attempts: 2,
        maxAttempts: 3,
        date: '2026-02-18T09:15:00',
        status: 'Failed'
    },
    {
        id: 'g3',
        student: { id: 's2', name: 'Ani Wijaya', avatar: null },
        course: { id: 'c1', title: 'Aviation Safety Management System' },
        assessment: { id: 'l1', title: 'Pre Test', type: 'Pre-test' },
        score: 95,
        passingScore: 80,
        attempts: 1,
        maxAttempts: 3,
        date: '2026-02-15T16:45:00',
        status: 'Passed'
    },
    {
        id: 'g4',
        student: { id: 's3', name: 'Iwan Pratama', avatar: null },
        course: { id: 'c2', title: 'Customer Service Excellence for Cabin Crew' },
        assessment: { id: 'q-s1', title: 'Service Standards Quiz', type: 'Quiz' },
        score: 40,
        passingScore: 75,
        attempts: 3,
        maxAttempts: 3,
        date: '2026-02-18T20:00:00',
        status: 'Failed'
    },
    {
        id: 'g5',
        student: { id: 's3', name: 'Iwan Pratama', avatar: null },
        course: { id: 'c1', title: 'Aviation Safety Management System' },
        assessment: { id: 'l-final', title: 'Final Knowledge Check', type: 'Post-test' },
        score: 88,
        passingScore: 80,
        attempts: 1,
        maxAttempts: 3,
        date: '2026-02-18T22:30:00',
        status: 'Passed'
    }
];

const MOCK_ATTEMPT_DETAILS = {
    g1: {
        questions: [
            {
                id: 1,
                text: "What is the primary objective of a Safety Management System (SMS)?",
                options: [
                    "Maximizing quarterly flight revenue",
                    "Automating pilot communication",
                    "Identifying hazards and managing safety risks",
                    "Reducing ground handling time"
                ],
                studentAnswer: 2,
                correctAnswer: 2,
                isCorrect: true
            },
            {
                id: 2,
                text: "Which of these is a key component of Safety Assurance?",
                options: [
                    "Safety performance monitoring and measurement",
                    "In-flight catering standards",
                    "Staff uniform design",
                    "Ticket pricing strategy"
                ],
                studentAnswer: 0,
                correctAnswer: 0,
                isCorrect: true
            }
        ]
    }
};

const GradingReview = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('All Courses');
    const [selectedType, setSelectedType] = useState('All Types');
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const courses = ['All Courses', ...new Set(MOCK_GRADES.map(g => g.course.title))];
    const types = ['All Types', 'Pre-test', 'Quiz', 'Post-test'];

    const filteredGrades = MOCK_GRADES.filter(grade => {
        const matchesSearch = grade.student.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCourse = selectedCourse === 'All Courses' || grade.course.title === selectedCourse;
        const matchesType = selectedType === 'All Types' || grade.assessment.type === selectedType;
        return matchesSearch && matchesCourse && matchesType;
    });

    if (selectedGrade) {
        return (
            <GradingDetailView
                selectedGrade={selectedGrade}
                attemptDetails={MOCK_ATTEMPT_DETAILS[selectedGrade.id]}
                onBack={() => setSelectedGrade(null)}
            />
        );
    }

    return (
        <div className="space-y-10 animate-fade-in pb-20 max-w-7xl mx-auto px-4 md:px-0">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Assessment & Grading</h1>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Monitoring digital learning performance and test results.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl font-bold text-sm select-none shadow-none">
                        Total: {filteredGrades.length} Attempts
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="flex flex-col lg:flex-row items-center gap-4">
                <div className="flex-1 w-full lg:w-auto">
                    <MainSearchBar
                        placeholder="Search student name..."
                        variant="compact"
                        hideButton={true}
                        searchQuery={searchTerm}
                        handleSearch={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="relative group w-full lg:w-64">
                        <select
                            className="w-full h-11 pl-4 pr-10 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 appearance-none focus:ring-2 focus:ring-slate-100 outline-none cursor-pointer tracking-tight transition-all"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            {courses.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-primary transition-colors" size={16} />
                    </div>

                    <div className="relative group w-full lg:w-40">
                        <select
                            className="w-full h-11 pl-4 pr-10 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 appearance-none focus:ring-2 focus:ring-slate-100 outline-none cursor-pointer tracking-tight transition-all"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            {types.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-primary transition-colors" size={16} />
                    </div>

                    <Button variant="ghost" className="h-11 w-11 rounded-xl bg-white border border-slate-200 shrink-0 hover:bg-slate-50 text-slate-400 shadow-none">
                        <Filter size={18} />
                    </Button>
                </div>
            </div>

            {/* Results Area */}
            {filteredGrades.length > 0 ? (
                <>
                    <GradingTable
                        grades={filteredGrades}
                        onReview={(grade) => setSelectedGrade(grade)}
                    />

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
                        <div className="text-2xs text-slate-400 font-medium whitespace-nowrap">
                            Showing {filteredGrades.length} of {MOCK_GRADES.length} assessment results
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={2}
                            onPageChange={setCurrentPage}
                            className="mt-0"
                        />
                    </div>
                </>
            ) : (
                <div className="border border-slate-200 bg-white rounded-2xl h-64 flex flex-col items-center justify-center gap-4 shadow-none">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
                        <AlertCircle size={32} />
                    </div>
                    <div className="text-center">
                        <h4 className="text-lg font-bold text-slate-700 leading-none">No results found</h4>
                        <p className="text-sm text-slate-400 mt-1.5 font-medium leading-relaxed">
                            Adjust your filters or search terms to find assessments.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setSearchTerm(''); setSelectedCourse('All Courses'); setSelectedType('All Types'); }}
                        className="rounded-xl border-slate-200 hover:bg-slate-50 font-bold px-6 h-10 shadow-none transition-all"
                    >
                        Clear Filters
                    </Button>
                </div>
            )}
        </div>
    );
};

export default GradingReview;
