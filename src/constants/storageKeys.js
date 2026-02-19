/**
 * Centralized localStorage key constants.
 * Always use these instead of hardcoding strings to prevent key mismatches.
 */

export const STORAGE_KEYS = {
    /** `Set` of completed lesson IDs for a specific course. Value: JSON string of an array. */
    courseProgress: (courseId) => `course_progress_${courseId}`,

    /** Array of quiz attempt history objects for a specific lesson. Value: JSON string of an array. */
    quizHistory: (lessonId) => `quiz_history_${lessonId}`,
};
