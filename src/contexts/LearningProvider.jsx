import React, { useState } from 'react';
import { LearningContext } from './LearningContext.context';

/**
 * LearningProvider
 * Provides learning-related global state
 * - Current course & lesson
 * - PiP video state (local to learning session only)
 */
export const LearningProvider = ({ children }) => {
    const [currentCourse, setCurrentCourse] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(null);

    const value = {
        // Course & Lesson
        currentCourse,
        setCurrentCourse,
        currentLesson,
        setCurrentLesson,
    };

    return (
        <LearningContext.Provider value={value}>
            {children}
        </LearningContext.Provider>
    );
};
