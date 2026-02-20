/**
 * useAuth Hook
 * Manages authentication state and operations
 */

import { useState } from 'react';
import authService from '../api/authService';

import budi_pratama from '@/assets/budi_pratama.png';

export const useAuth = () => {
    // Mock user for development
    const mockUser = {
        name: "Admin Setiady",
        email: "admin@citilearn.dev",
        role: "Senior Flight Instructor",
        points: 3000,
        avatar: budi_pratama,
        badge: "Captain" // This will be dynamic based on points anyway
    };

    const [user, setUser] = useState(authService.getCurrentUser() || mockUser);
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated() || true); // Default to true for dev
    const [isLoading, setIsLoading] = useState(false);



    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            setUser(response.user);
            setIsAuthenticated(true);
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        register,
    };
};

export default useAuth;
