import React from 'react';

const DashboardSkeleton = () => {
    return (
        <div className="space-y-12 animate-pulse">
            {/* Hero Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8 items-stretch">
                {/* Left Card (Welcome) */}
                <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-10 h-full flex flex-col justify-between min-h-[400px]">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-slate-800" />
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-800" />
                        </div>
                        <div className="h-12 w-3/4 rounded bg-gray-200 dark:bg-slate-800" />
                        <div className="h-6 w-full max-w-md rounded bg-gray-200 dark:bg-slate-800" />
                    </div>
                    <div className="mt-8 space-y-6">
                        <div className="h-12 w-full rounded-2xl bg-gray-200 dark:bg-slate-800" />
                        <div className="flex gap-3">
                            <div className="h-10 w-full rounded-full bg-gray-200 dark:bg-slate-800" />
                            <div className="h-10 w-48 rounded-full bg-gray-200 dark:bg-slate-800" />
                        </div>
                    </div>
                </div>

                {/* Right Card (Stats) */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-8 flex flex-row items-stretch justify-between gap-6 overflow-hidden min-h-[200px]">
                        <div className="flex flex-col justify-between gap-4">
                            <div className="h-20 w-20 rounded-full border-4 border-gray-200 dark:border-slate-800" />
                            <div className="space-y-2">
                                <div className="h-4 w-32 rounded bg-gray-200 dark:bg-slate-800" />
                                <div className="h-3 w-20 rounded bg-gray-200 dark:bg-slate-800" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-full sm:w-auto">
                            <div className="flex gap-3">
                                <div className="h-20 w-24 rounded-2xl bg-gray-200 dark:bg-slate-800" />
                                <div className="h-20 w-24 rounded-2xl bg-gray-200 dark:bg-slate-800" />
                            </div>
                            <div className="h-12 w-full rounded-2xl bg-gray-200 dark:bg-slate-800" />
                        </div>
                    </div>
                    <div className="hidden sm:grid grid-cols-2 gap-4 flex-1">
                        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 h-32 flex flex-col justify-between">
                            <div className="h-8 w-16 rounded bg-gray-200 dark:bg-slate-800" />
                            <div className="h-10 w-10 rounded bg-gray-200 dark:bg-slate-800 self-end" />
                        </div>
                        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 h-32 flex flex-col justify-between">
                            <div className="h-8 w-16 rounded bg-gray-200 dark:bg-slate-800" />
                            <div className="h-10 w-10 rounded bg-gray-200 dark:bg-slate-800 self-end" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mandatory & Resume Skeleton */}
            <div className="grid grid-cols-1 xl:grid-cols-10 gap-6 mb-8 h-[380px]">
                {/* Mandatory */}
                <div className="hidden lg:block xl:col-span-7 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <div className="h-8 w-48 rounded bg-gray-200 dark:bg-slate-800" />
                        <div className="h-8 w-24 rounded-lg bg-gray-200 dark:bg-slate-800" />
                    </div>
                    <div className="flex gap-4 overflow-hidden">
                        <div className="h-[250px] w-[400px] shrink-0 rounded-2xl bg-gray-200 dark:bg-slate-800" />
                        <div className="h-[250px] w-[400px] shrink-0 rounded-2xl bg-gray-200 dark:bg-slate-800" />
                    </div>
                </div>
                {/* Resume */}
                <div className="hidden lg:flex xl:col-span-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 h-full flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div className="h-6 w-32 rounded bg-gray-200 dark:bg-slate-800" />
                        <div className="h-4 w-16 rounded bg-gray-200 dark:bg-slate-800" />
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-3 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800">
                                <div className="h-16 w-24 rounded-xl bg-gray-200 dark:bg-slate-800 shrink-0" />
                                <div className="flex-1 space-y-2 py-1">
                                    <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-slate-800" />
                                    <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-slate-800" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Course Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 h-[380px] rounded-2xl overflow-hidden flex flex-col">
                        <div className="h-48 w-full bg-gray-200 dark:bg-slate-800" />
                        <div className="p-5 space-y-4 flex-1">
                            <div className="flex justify-between">
                                <div className="h-4 w-20 rounded-full bg-gray-200 dark:bg-slate-800" />
                                <div className="h-4 w-16 rounded bg-gray-200 dark:bg-slate-800" />
                            </div>
                            <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-slate-800" />
                            <div className="h-4 w-full rounded bg-gray-200 dark:bg-slate-800" />
                            <div className="flex gap-4 mt-auto pt-2">
                                <div className="h-4 w-16 rounded bg-gray-200 dark:bg-slate-800" />
                                <div className="h-4 w-20 rounded bg-gray-200 dark:bg-slate-800" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardSkeleton;
