/**
 * Application Configuration
 * Centralized app-wide configuration settings
 */

export const APP_CONFIG = {
    // Application Info
    APP_NAME: 'CitiLearn',
    APP_VERSION: '1.0.0',
    APP_DESCRIPTION: 'Enterprise Learning Management System',

    // API Configuration
    API: {
        BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
        TIMEOUT: 10000,
        RETRY_ATTEMPTS: 3,
    },

    // Pagination
    PAGINATION: {
        DEFAULT_PAGE_SIZE: 10,
        PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
    },

    // File Upload
    FILE_UPLOAD: {
        MAX_SIZE_MB: 10,
        ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm'],
        ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    },

    // Date & Time
    DATE_FORMAT: {
        SHORT: 'MMM DD, YYYY',
        LONG: 'MMMM DD, YYYY',
        TIME: 'HH:mm',
        DATETIME: 'MMM DD, YYYY HH:mm',
    },

    // Course Settings
    COURSE: {
        MIN_PROGRESS_TO_COMPLETE: 80,
        VIDEO_PROGRESS_INTERVAL: 5000, // Save progress every 5 seconds
        QUIZ_PASS_PERCENTAGE: 70,
    },

    // UI Settings
    UI: {
        THEME: {
            DEFAULT: 'light',
            OPTIONS: ['light', 'dark'],
        },
        SIDEBAR: {
            DEFAULT_COLLAPSED: true,
            BREAKPOINT: 1024, // px
        },
        TOAST: {
            DURATION: 3000, // ms
            POSITION: 'top-right',
        },
    },

    // Feature Flags
    FEATURES: {
        ENABLE_DARK_MODE: true,
        ENABLE_NOTIFICATIONS: true,
        ENABLE_CERTIFICATES: true,
        ENABLE_SOCIAL_SHARING: false,
        ENABLE_OFFLINE_MODE: false,
    },

    // External Links
    LINKS: {
        SUPPORT: 'https://support.citilearn.com',
        DOCUMENTATION: 'https://docs.citilearn.com',
        PRIVACY_POLICY: 'https://citilearn.com/privacy',
        TERMS_OF_SERVICE: 'https://citilearn.com/terms',
    },
};

export default APP_CONFIG;
