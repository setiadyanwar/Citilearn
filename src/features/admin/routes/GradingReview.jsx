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
import { generateMockGrades } from '@/utils/mockDataGenerators';

// Standard Admin Components
import AdminPageShell from '../components/layout/AdminPageShell';
import ManagementHeader from '../components/layout/ManagementHeader';
import FilterBar from '../components/shared/FilterBar';

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

                // Import dynamically or use the utility if imported at top
                // Since we need to modify imports anyway, I'll assume we add the import at the top later.
                // But for replace_file_content, I only replace this block.

                const students = [
                    { id: 'S-7721', name: 'Budi Setiadi' },
                    { id: 'S-8832', name: 'Ani Wijaya' },
                    { id: 'S-1293', name: 'Iwan Pratama' },
                    { id: 'S-4482', name: 'Siti Aminah' },
                    { id: 'S-9012', name: 'Rudi Hartono' },
                    { id: 'S-2231', name: 'Dewi Lestari' },
                    { id: 'S-5562', name: 'Bambang Subiakto' }
                ];

                const gradesWithIds = generateMockGrades(students);

                setGrades(gradesWithIds);
                // Removed unused sessionStorage cache
            } catch (error) {
                console.error("Failed to fetch grades:", error);
                // In a real app, we would set an error state here
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
                            <SelectTrigger className="w-fit text-secondary border-slate-200 bg-white">
                                <SelectValue placeholder="All Courses" />
                            </SelectTrigger>
                            <SelectContent>
                                {courseOptions.map(c => (
                                    <SelectItem key={c} value={c} className="text-xs font-normal text-secondary focus:bg-slate-50">
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger className="w-fit h-10 rounded-xl text-xs font-normal text-secondary border-slate-200 bg-white">
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                                {typeOptions.map(t => (
                                    <SelectItem key={t} value={t} className="text-xs font-normal text-secondary focus:bg-slate-50">
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
                        <div className="text-2xs text-tertiary font-medium whitespace-nowrap">
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
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-tertiary border border-slate-100">
                        <AlertCircle size={32} />
                    </div>
                    <div className="text-center">
                        <h4 className="text-lg font-bold text-main leading-none">No results found</h4>
                        <p className="text-sm text-tertiary mt-1.5 font-medium leading-relaxed">
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
