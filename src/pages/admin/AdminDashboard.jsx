import React, { useState } from 'react';
import Card from '../../components/common/Card';
import MainSearchBar from '../../components/dashboard/MainSearchBar';

const AdminDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-main">Dashboard</h1>
                    <p className="text-secondary text-sm font-medium mt-1">Overview learning management</p>
                </div>

                <div className="w-full md:w-96">
                    <MainSearchBar
                        searchQuery={searchQuery}
                        handleSearch={(e) => setSearchQuery(e.target.value)}
                        variant="inline"
                    />
                </div>
            </div>

            {/* Empty State / Content Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* We can add stats cards here later */}
                <Card className="flex flex-col items-center justify-center min-h-[400px] col-span-full border-dashed border-2 bg-gray-50/50">
                    <p className="text-secondary font-bold">Admin Dashboard Content</p>
                    <p className="text-xs text-gray-400 mt-2">Select a menu item to get started</p>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
