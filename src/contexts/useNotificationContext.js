import { useContext } from 'react';
import { NotificationContext } from './NotificationContext.context';

/**
 * useNotificationContext
 * Custom hook to access notification context
 * 
 * @returns {Object} Notification context value with convenience methods
 * @throws {Error} If used outside NotificationProvider
 */
export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    
    if (!context) {
        throw new Error('useNotificationContext must be used within NotificationProvider');
    }
    
    return context;
};
