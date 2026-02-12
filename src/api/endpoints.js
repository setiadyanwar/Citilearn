/**
 * API Endpoints Configuration
 * Centralized endpoint definitions for all API calls
 */

const API_ENDPOINTS = {
    // Authentication
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REGISTER: '/auth/register',
        REFRESH_TOKEN: '/auth/refresh',
        VERIFY_EMAIL: '/auth/verify-email',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },

    // User
    USER: {
        PROFILE: '/user/profile',
        UPDATE_PROFILE: '/user/profile',
        CHANGE_PASSWORD: '/user/change-password',
        UPLOAD_AVATAR: '/user/avatar',
    },

    // Courses
    COURSES: {
        LIST: '/courses',
        DETAIL: (id) => `/courses/${id}`,
        ENROLL: (id) => `/courses/${id}/enroll`,
        UNENROLL: (id) => `/courses/${id}/unenroll`,
        PROGRESS: (id) => `/courses/${id}/progress`,
        BOOKMARK: (id) => `/courses/${id}/bookmark`,
        CATEGORIES: '/courses/categories',
        SEARCH: '/courses/search',
    },

    // Modules
    MODULES: {
        LIST: (courseId) => `/courses/${courseId}/modules`,
        DETAIL: (courseId, moduleId) => `/courses/${courseId}/modules/${moduleId}`,
        COMPLETE: (courseId, moduleId) => `/courses/${courseId}/modules/${moduleId}/complete`,
    },

    // Lessons
    LESSONS: {
        DETAIL: (courseId, moduleId, lessonId) =>
            `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
        COMPLETE: (courseId, moduleId, lessonId) =>
            `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/complete`,
        VIDEO_PROGRESS: (courseId, moduleId, lessonId) =>
            `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/video-progress`,
    },

    // Quiz
    QUIZ: {
        START: (courseId, moduleId, lessonId) =>
            `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/quiz/start`,
        SUBMIT: (courseId, moduleId, lessonId) =>
            `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/quiz/submit`,
        RESULTS: (courseId, moduleId, lessonId) =>
            `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/quiz/results`,
    },

    // Dashboard
    DASHBOARD: {
        STATS: '/dashboard/stats',
        RECENT_COURSES: '/dashboard/recent-courses',
        MANDATORY_COURSES: '/dashboard/mandatory-courses',
        RECOMMENDATIONS: '/dashboard/recommendations',
    },

    // Certificates
    CERTIFICATES: {
        LIST: '/certificates',
        DOWNLOAD: (certificateId) => `/certificates/${certificateId}/download`,
    },

    // Notifications
    NOTIFICATIONS: {
        LIST: '/notifications',
        MARK_READ: (id) => `/notifications/${id}/read`,
        MARK_ALL_READ: '/notifications/read-all',
    },
};

export default API_ENDPOINTS;
