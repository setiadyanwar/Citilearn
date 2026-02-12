/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

import apiClient from '../client';
import API_ENDPOINTS from '../endpoints';

const authService = {
    /**
     * Login user
     * @param {Object} credentials - { email, password }
     * @returns {Promise} User data and token
     */
    login: async (credentials) => {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
        if (response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        return response;
    },

    /**
     * Logout user
     * @returns {Promise} Logout result
     */
    logout: async () => {
        try {
            await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
        } finally {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        }
    },

    /**
     * Register new user
     * @param {Object} userData - User registration data
     * @returns {Promise} Registration result
     */
    register: async (userData) => {
        return await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    },

    /**
     * Refresh authentication token
     * @returns {Promise} New token
     */
    refreshToken: async () => {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
        if (response.token) {
            localStorage.setItem('authToken', response.token);
        }
        return response;
    },

    /**
     * Verify email address
     * @param {string} token - Verification token
     * @returns {Promise} Verification result
     */
    verifyEmail: async (token) => {
        return await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
    },

    /**
     * Request password reset
     * @param {string} email - User email
     * @returns {Promise} Reset request result
     */
    forgotPassword: async (email) => {
        return await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    },

    /**
     * Reset password with token
     * @param {Object} data - { token, newPassword }
     * @returns {Promise} Reset result
     */
    resetPassword: async (data) => {
        return await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
    },

    /**
     * Get current user from localStorage
     * @returns {Object|null} User object or null
     */
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    /**
     * Check if user is authenticated
     * @returns {boolean} Authentication status
     */
    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    },
};

export default authService;
