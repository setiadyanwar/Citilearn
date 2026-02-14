import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import data from '@/data.json';

/**
 * useCourseLearningData
 * Manages course and lesson data
 */
export const useCourseLearningData = () => {
    const { id: courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completedLessons, setCompletedLessons] = useState(new Set());

    // Load course data on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            const foundCourse = data.courses.find((c) => c.id === courseId);
            if (foundCourse) {
                setCourse(foundCourse);
                // Set first lesson as active by default
                if (foundCourse.modules && foundCourse.modules.length > 0) {
                    const firstLesson = foundCourse.modules[0].lessons?.[0];
                    if (firstLesson) {
                        setActiveLesson(firstLesson);
                    }
                }
            }
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [courseId]);

    const selectLesson = useCallback((lesson) => {
        setActiveLesson(lesson);
    }, []);

    const markLessonCompleted = useCallback((lessonId) => {
        setCompletedLessons((prev) => new Set([...prev, lessonId]));
    }, []);

    return {
        course,
        setCourse,
        activeLesson,
        setActiveLesson,
        loading,
        setLoading,
        completedLessons,
        setCompletedLessons,
        selectLesson,
        markLessonCompleted,
    };
};
