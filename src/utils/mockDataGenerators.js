/**
 * Mock Data Generators
 * Utilities to generate consistent mock data for development
 */

import data from '@/data.json';

/**
 * Deterministic pseudo-random based on a string seed.
 */
export const seededRandom = (seed) => {
    let h = 0;
    for (let i = 0; i < seed.length; i++) {
        h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
    }
    h = ((h >>> 16) ^ h) * 0x45d9f3b | 0;
    h = ((h >>> 16) ^ h) * 0x45d9f3b | 0;
    h = (h >>> 16) ^ h;
    return Math.abs(h) / 0x7fffffff;
};

/**
 * Generate mock grades for students across courses
 * @param {Array} students List of student objects
 * @returns {Array} List of grade objects with IDs
 */
export const generateMockGrades = (students) => {
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
            // We use filter then push to emulate mutation or just reassign
            const filtered = generatedGrades.filter(g => !(g.student.id === 'S-9012' && g.course.id === 'c1'));
            // Reset generatedGrades content and push filtered
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
    return generatedGrades.map((g, idx) => ({ ...g, id: idx + 1 }));
};
