import React, { useState, useCallback } from 'react';
import { NotificationContext } from './NotificationContext.context';

/**
 * NotificationProvider
 * Provides global notification/toast functionality
 */
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, []);

    const addNotification = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now();
        const notification = { id, message, type };

        setNotifications((prev) => [...prev, notification]);

        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }

        return id;
    }, [removeNotification]);

    const value = {
        notifications,
        addNotification,
        removeNotification,
        // Convenience methods
        success: (message, duration) => addNotification(message, 'success', duration),
        error: (message, duration) => addNotification(message, 'error', duration),
        warning: (message, duration) => addNotification(message, 'warning', duration),
        info: (message, duration) => addNotification(message, 'info', duration),
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
