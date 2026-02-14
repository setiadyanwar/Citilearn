import React from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { AuthContext } from './AuthContext.context';

/**
 * AuthProvider
 * Provides authentication state globally
 */
export const AuthProvider = ({ children }) => {
    const authData = useAuth();

    const value = {
        user: authData.user,
        isAuthenticated: authData.isAuthenticated,
        isLoading: authData.isLoading,
        login: authData.login,
        logout: authData.logout,
        register: authData.register,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
