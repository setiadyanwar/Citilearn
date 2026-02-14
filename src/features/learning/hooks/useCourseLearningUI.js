import { useState, useCallback } from 'react';

/**
 * useCourseLearningUI
 * Manages UI-related state for course learning
 */
export const useCourseLearningUI = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isPip, setIsPip] = useState(false);
    const [showCompletionSuccess, setShowCompletionSuccess] = useState(false);

    const toggleSidebar = useCallback(() => {
        setSidebarOpen((prev) => !prev);
    }, []);

    const togglePip = useCallback(() => {
        setIsPip((prev) => !prev);
    }, []);

    const closePip = useCallback(() => {
        setIsPip(false);
    }, []);

    return {
        activeTab,
        setActiveTab,
        isSidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        isPip,
        setIsPip,
        togglePip,
        closePip,
        showCompletionSuccess,
        setShowCompletionSuccess,
    };
};
