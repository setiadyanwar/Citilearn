import { useState, useCallback } from 'react';

/**
 * useDashboardFilter
 * Manages dashboard filter state (search, category, status)
 */
export const useDashboardFilter = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const handleSearch = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const resetFilters = useCallback(() => {
        setSearchQuery('');
        setSelectedCategory('All');
        setSelectedStatus('All');
    }, []);

    return {
        searchQuery,
        setSearchQuery,
        handleSearch,
        selectedCategory,
        setSelectedCategory,
        selectedStatus,
        setSelectedStatus,
        resetFilters,
    };
};
