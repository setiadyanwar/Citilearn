import React, { useState, useEffect } from 'react';
import { AlertCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/common/Pagination';
import MainSearchBar from '@/features/dashboard/components/MainSearchBar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import data from '@/data.json';

// Standard Admin Components
import AdminPageShell from '../components/AdminPageShell';
import ManagementHeader from '../components/ManagementHeader';
import FilterBar from '../components/FilterBar';

// Sub-components
import StudentGradingTable from '../components/grading/StudentGradingTable';
import { Skeleton } from '@/components/ui/skeleton';

const GradingReview = () => {
    const navigate = useNavigate();

    // --- State for Data Management ---
    const [grades, setGrades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- State for Filters ---
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('All Courses');
    const [selectedType, setSelectedType] = useState('All Types');
    const [currentPage, setCurrentPage] = useState(1);

    /**
     * Simulation of API Call to fetch list of grades
     * REPLACE with: const response = await axios.get('/api/admin/grading');
     */
    useEffect(() => {
        const fetchGrades = async () => {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 800));

                /**
                 * Deterministic pseudo-random based on a string seed.
                 */
                const seededRandom = (seed) => {
                    let h = 0;
                    for (let i = 0; i < seed.length; i++) {
                        h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
                    }
                    h = ((h >>> 16) ^ h) * 0x45d9f3b | 0;
                    h = ((h >>> 16) ^ h) * 0x45d9f3b | 0;
                    h = (h >>> 16) ^ h;
                    return Math.abs(h) / 0x7fffffff;
                };

                const students = [
                    { id: 'S-7721', name: 'Budi Setiadi' },
                    { id: 'S-8832', name: 'Ani Wijaya' },
                    { id: 'S-1293', name: 'Iwan Pratama' },
                    { id: 'S-4482', name: 'Siti Aminah' },
                    { id: 'S-9012', name: 'Rudi Hartono' },
                    { id: 'S-2231', name: 'Dewi Lestari' },
                    { id: 'S-5562', name: 'Bambang Subiakto' }
                ];

                const BASE_DATE = new Date('2026-02-10T00:00:00').getTime();
                const generatedGrades = [];

                data.courses.forEach(course => {
                    course.modules.forEach(module => {
                        module.lessons.forEach(lesson => {
                            if (lesson.type === 'quiz') {
                                students.forEach((student, idx) => {
                                    // Rudi Hartono (S-9012) will be our "Super Student" with forced data
                                    const isRudi = student.id === 'S-9012';
                                    const isTargetCourse = course.id === 'c1' || course.id === 'c2' || course.id === 'c3';

                                    // Standard random chance
                                    const chance = (idx + course.id.length + lesson.id.length) % 5;

                                    // Force data for Rudi on target courses to show "Pre, Quiz, Post" requirement
                                    if (chance < 2 || (isRudi && isTargetCourse)) {
                                        const seed = `${course.id}-${lesson.id}-${student.id}`;
                                        const r1 = seededRandom(seed + 'score');
                                        const r2 = seededRandom(seed + 'attempt');
                                        const r3 = seededRandom(seed + 'date');

                                        const score = isRudi ? (85 + Math.floor(r1 * 12)) : (40 + Math.floor(r1 * 60));
                                        const passingScore = lesson.passingGrade || 80;

                                        generatedGrades.push({
                                            student,
                                            course: { id: course.id, title: course.title },
                                            assessment: {
                                                id: lesson.id,
                                                title: lesson.title,
                                                type: lesson.title.toLowerCase().includes('pre') ? 'Pre-test'
                                                    : lesson.title.toLowerCase().includes('final') ? 'Post-test'
                                                        : 'Quiz'
                                            },
                                            score,
                                            passingScore,
                                            attempts: isRudi ? 1 : (1 + Math.floor(r2 * 2)),
                                            maxAttempts: lesson.maxAttempts || 3,
                                            date: new Date(BASE_DATE + r3 * 1000 * 60 * 60 * 24 * 8).toISOString(),
                                            status: score >= passingScore ? 'Passed' : 'Failed',
                                            _meta: { courseId: course.id, lessonId: lesson.id }
                                        });
                                    }
                                });
                            }
                        });
                    });
                });

                // Explicitly ensure Rudi has a comprehensive history for C1 and C3
                const rudi = students.find(s => s.id === 'S-9012');
                const c1 = data.courses.find(c => c.id === 'c1');
                const c3 = data.courses.find(c => c.id === 'c3');

                if (rudi) {
                    // Custom assessments for C1 (Aviation Safety) to show "MANY QUIZZES"
                    if (c1) {
                        const c1Assessments = [
                            { id: 'l-pre-c1', title: 'Initial Assessment', type: 'Pre-test', score: 82, date: '2026-02-10T09:00:00Z' },
                            { id: 'l-q1-c1', title: 'Module 1: Safety Policy', type: 'Quiz', score: 88, date: '2026-02-11T10:00:00Z' },
                            { id: 'l-q2-c1', title: 'Module 2: Risk Management', type: 'Quiz', score: 92, date: '2026-02-12T14:30:00Z' },
                            { id: 'l-q3-c1', title: 'Module 3: Hazard Identification', type: 'Quiz', score: 85, date: '2026-02-14T11:00:00Z' },
                            { id: 'l-q4-c1', title: 'Module 4: Safety Assurance', type: 'Quiz', score: 90, date: '2026-02-15T15:00:00Z' },
                            { id: 'l-final-c1', title: 'Final Certification Exam', type: 'Post-test', score: 94, date: '2026-02-18T09:00:00Z' }
                        ];

                        // Clear existing random ones for Rudi in C1 to avoid duplicates
                        const filtered = generatedGrades.filter(g => !(g.student.id === 'S-9012' && g.course.id === 'c1'));
                        generatedGrades.length = 0;
                        generatedGrades.push(...filtered);

                        c1Assessments.forEach(m => {
                            generatedGrades.push({
                                student: rudi,
                                course: { id: c1.id, title: c1.title },
                                assessment: { id: m.id, title: m.title, type: m.type },
                                score: m.score,
                                passingScore: 80,
                                attempts: 1,
                                maxAttempts: 3,
                                date: m.date,
                                status: 'Passed',
                                _meta: { courseId: c1.id, lessonId: m.id }
                            });
                        });
                    }

                    // For C3
                    if (c3 && !generatedGrades.find(g => g.student.id === 'S-9012' && g.course.id === 'c3')) {
                        const mockAssessments = [
                            { id: 'l-pre-c3', title: 'Pre-Test: Technical Basics', type: 'Pre-test' },
                            { id: 'l-quiz-c3', title: 'Module 3: Systems Quiz', type: 'Quiz' },
                            { id: 'l-final-c3', title: 'A320 Final Certification', type: 'Post-test' }
                        ];
                        mockAssessments.forEach((m, i) => {
                            generatedGrades.push({
                                student: rudi,
                                course: { id: c3.id, title: c3.title },
                                assessment: { id: m.id, title: m.title, type: m.type },
                                score: 88 + i,
                                passingScore: 80,
                                attempts: 1,
                                maxAttempts: 3,
                                date: new Date(BASE_DATE + (i * 2 + 5) * 1000 * 60 * 60 * 24).toISOString(),
                                status: 'Passed',
                                _meta: { courseId: c3.id, lessonId: m.id }
                            });
                        });
                    }
                }

                // Assign IDs
                generatedGrades.sort((a, b) => new Date(b.date) - new Date(a.date));
                const gradesWithIds = generatedGrades.map((g, idx) => ({ ...g, id: idx + 1 }));

                sessionStorage.setItem('admin_grades_cache', JSON.stringify(gradesWithIds));
                setGrades(gradesWithIds);
            } catch (error) {
                console.error("Failed to fetch grades:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGrades();
    }, []);

    const handleReviewGrade = (grade) => {
        navigate(`/admin/assessment/${grade.id}`);
    };

    const courseOptions = ['All Courses', ...new Set(grades.map(g => g.course.title))];
    const typeOptions = ['All Types', 'Pre-test', 'Quiz', 'Post-test'];
    const itemsPerPage = 8;

    // Filter logic
    const filteredGrades = grades.filter(grade => {
        const matchesSearch = grade.student.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCourse = selectedCourse === 'All Courses' || grade.course.title === selectedCourse;
        const matchesType = selectedType === 'All Types' || grade.assessment.type === selectedType;
        return matchesSearch && matchesCourse && matchesType;
    });

    // Grouping
    const groupedData = Object.values(
        filteredGrades.reduce((acc, grade) => {
            const sid = grade.student.id;
            if (!acc[sid]) {
                acc[sid] = {
                    student: grade.student,
                    attempts: [],
                    summary: { totalAttempts: 0, passed: 0, failed: 0, avgScore: 0 }
                };
            }
            acc[sid].attempts.push(grade);
            return acc;
        }, {})
    ).map(group => {
        const passed = group.attempts.filter(a => a.status === 'Passed').length;
        const failed = group.attempts.length - passed;
        const avgScore = Math.round(group.attempts.reduce((acc, curr) => acc + curr.score, 0) / group.attempts.length);
        return {
            ...group,
            summary: { totalAttempts: group.attempts.length, passed, failed, avgScore }
        };
    });

    const totalPages = Math.ceil(groupedData.length / itemsPerPage);
    const paginatedGroups = groupedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCourse, selectedType]);

    return (
        <AdminPageShell>
            <ManagementHeader
                title="Grading Review"
                description="Monitor student academic performance across all modules and courses."
            />

            <FilterBar
                searchSlot={
                    <MainSearchBar
                        placeholder="Search student name..."
                        variant="compact"
                        hideButton={true}
                        searchQuery={searchTerm}
                        handleSearch={(e) => setSearchTerm(e.target.value)}
                    />
                }
                filterSlot={
                    <>
                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                            <SelectTrigger className="w-full lg:w-64 font-medium text-slate-700 border-slate-200 bg-white">
                                <SelectValue placeholder="All Courses" />
                            </SelectTrigger>
                            <SelectContent>
                                {courseOptions.map(c => (
                                    <SelectItem key={c} value={c} className="font-medium text-slate-600 focus:bg-slate-50">
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger className="w-full lg:w-40 font-medium text-slate-700 border-slate-200 bg-white">
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                                {typeOptions.map(t => (
                                    <SelectItem key={t} value={t} className="font-medium text-slate-600 focus:bg-slate-50">
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </>
                }
            />

            {/* Results Area */}
            {isLoading ? (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="bg-slate-50/30 h-12 border-b border-slate-100 flex items-center px-6">
                        <div className="flex gap-4 w-full">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-16 ml-auto" />
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-8" />
                        </div>
                    </div>
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex h-16 items-center px-6 border-b border-slate-50 last:border-0">
                            <div className="flex items-center gap-3 w-full">
                                <Skeleton className="w-10 h-10 rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <div className="ml-auto flex items-center gap-12">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-12" />
                                    <Skeleton className="h-4 w-12" />
                                    <Skeleton className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : paginatedGroups.length > 0 ? (
                <>
                    <StudentGradingTable
                        studentGroups={paginatedGroups}
                        onReview={handleReviewGrade}
                    />

                    {/* Footer / Pagination */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
                        <div className="text-2xs text-slate-400 font-medium whitespace-nowrap">
                            Showing {paginatedGroups.length} of {groupedData.length} students · {filteredGrades.length} filtered results
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            className="mt-0"
                        />
                    </div>
                </>
            ) : (
                <div className="border border-slate-200 bg-white rounded-2xl h-64 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
                        <AlertCircle size={32} />
                    </div>
                    <div className="text-center">
                        <h4 className="text-lg font-bold text-slate-700 leading-none">No results found</h4>
                        <p className="text-sm text-slate-400 mt-1.5 font-medium leading-relaxed">
                            Adjust your filters or search terms to find students.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setSearchTerm(''); setSelectedCourse('All Courses'); setSelectedType('All Types'); }}
                        className="rounded-xl border-slate-200 hover:bg-slate-50 font-bold px-6 h-10 transition-all"
                    >
                        Clear Filters
                    </Button>
                </div>
            )}
        </AdminPageShell>
    );
};

export default GradingReview;
