/**
 * Validation Utilities
 * Common validation functions for forms and data
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with strength level
 */
export const validatePassword = (password) => {
    const result = {
        isValid: false,
        strength: 'weak',
        errors: [],
    };

    if (password.length < 8) {
        result.errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
        result.errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
        result.errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
        result.errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*]/.test(password)) {
        result.errors.push('Password must contain at least one special character (!@#$%^&*)');
    }

    if (result.errors.length === 0) {
        result.isValid = true;
        result.strength = 'strong';
    } else if (result.errors.length <= 2) {
        result.strength = 'medium';
    }

    return result;
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid phone number
 */
export const isValidPhone = (phone) => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid URL
 */
export const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Validate required field
 * @param {*} value - Value to validate
 * @returns {boolean} Is valid (not empty)
 */
export const isRequired = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @returns {boolean} Is valid
 */
export const minLength = (value, minLength) => {
    return value && value.length >= minLength;
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @returns {boolean} Is valid
 */
export const maxLength = (value, maxLength) => {
    return value && value.length <= maxLength;
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} Is valid
 */
export const isInRange = (value, min, max) => {
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
};

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {Array} allowedTypes - Allowed MIME types
 * @returns {boolean} Is valid file type
 */
export const isValidFileType = (file, allowedTypes = []) => {
    if (!file) return false;
    return allowedTypes.includes(file.type);
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSizeInMB - Maximum size in MB
 * @returns {boolean} Is valid file size
 */
export const isValidFileSize = (file, maxSizeInMB = 5) => {
    if (!file) return false;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
};

/**
 * Validate date is in the past
 * @param {Date|string} date - Date to validate
 * @returns {boolean} Is in the past
 */
export const isDateInPast = (date) => {
    return new Date(date) < new Date();
};

/**
 * Validate date is in the future
 * @param {Date|string} date - Date to validate
 * @returns {boolean} Is in the future
 */
export const isDateInFuture = (date) => {
    return new Date(date) > new Date();
};
