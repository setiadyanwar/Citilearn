/**
 * Course API Service
 * Handles all course-related API calls
 */

import apiClient from '../client';
import API_ENDPOINTS from '../endpoints';

const courseService = {
    /**
     * Get all courses with optional filters
     * @param {Object} params - Query parameters (category, status, search, etc.)
     * @returns {Promise} Course list
     */
    getAllCourses: async (params = {}) => {
        return await apiClient.get(API_ENDPOINTS.COURSES.LIST, { params });
    },

    /**
     * Get course details by ID
     * @param {string} courseId - Course ID
     * @returns {Promise} Course details
     */
    getCourseById: async (courseId) => {
        return await apiClient.get(API_ENDPOINTS.COURSES.DETAIL(courseId));
    },

    /**
     * Enroll in a course
     * @param {string} courseId - Course ID
     * @returns {Promise} Enrollment result
     */
    enrollCourse: async (courseId) => {
        return await apiClient.post(API_ENDPOINTS.COURSES.ENROLL(courseId));
    },

    /**
     * Unenroll from a course
     * @param {string} courseId - Course ID
     * @returns {Promise} Unenrollment result
     */
    unenrollCourse: async (courseId) => {
        return await apiClient.delete(API_ENDPOINTS.COURSES.UNENROLL(courseId));
    },

    /**
     * Get course progress
     * @param {string} courseId - Course ID
     * @returns {Promise} Progress data
     */
    getCourseProgress: async (courseId) => {
        return await apiClient.get(API_ENDPOINTS.COURSES.PROGRESS(courseId));
    },

    /**
     * Toggle course bookmark
     * @param {string} courseId - Course ID
     * @returns {Promise} Bookmark status
     */
    toggleBookmark: async (courseId) => {
        return await apiClient.post(API_ENDPOINTS.COURSES.BOOKMARK(courseId));
    },

    /**
     * Get all course categories
     * @returns {Promise} Categories list
     */
    getCategories: async () => {
        return await apiClient.get(API_ENDPOINTS.COURSES.CATEGORIES);
    },

    /**
     * Search courses
     * @param {string} query - Search query
     * @param {Object} filters - Additional filters
     * @returns {Promise} Search results
     */
    searchCourses: async (query, filters = {}) => {
        return await apiClient.get(API_ENDPOINTS.COURSES.SEARCH, {
            params: { q: query, ...filters },
        });
    },

    /**
     * Get course modules
     * @param {string} courseId - Course ID
     * @returns {Promise} Modules list
     */
    getCourseModules: async (courseId) => {
        return await apiClient.get(API_ENDPOINTS.MODULES.LIST(courseId));
    },

    /**
     * Get module details
     * @param {string} courseId - Course ID
     * @param {string} moduleId - Module ID
     * @returns {Promise} Module details
     */
    getModuleById: async (courseId, moduleId) => {
        return await apiClient.get(API_ENDPOINTS.MODULES.DETAIL(courseId, moduleId));
    },

    /**
     * Mark module as complete
     * @param {string} courseId - Course ID
     * @param {string} moduleId - Module ID
     * @returns {Promise} Completion result
     */
    completeModule: async (courseId, moduleId) => {
        return await apiClient.post(API_ENDPOINTS.MODULES.COMPLETE(courseId, moduleId));
    },
};

export default courseService;
