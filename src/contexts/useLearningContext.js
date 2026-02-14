import { useContext } from 'react';
import { LearningContext } from './LearningContext.context';

/**
 * useLearningContext
 * Custom hook to access learning context
 * 
 * @returns {Object} Learning context value
 * @throws {Error} If used outside LearningProvider
 */
export const useLearningContext = () => {
    const context = useContext(LearningContext);
    
    if (!context) {
        throw new Error('useLearningContext must be used within LearningProvider');
    }
    
    return context;
};
