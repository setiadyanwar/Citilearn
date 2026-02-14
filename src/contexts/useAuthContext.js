import { useContext } from 'react';
import { AuthContext } from './AuthContext.context';

/**
 * useAuthContext
 * Custom hook to access auth context
 * 
 * @returns {Object} Auth context value
 * @throws {Error} If used outside AuthProvider
 */
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }
    
    return context;
};
