import React, { useState, useEffect } from 'react';
import { Plus, Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import { knowledgeData } from '@/data/knowledge';
import Tabs from '@/components/common/Tabs';
import Pagination from '@/components/common/Pagination';
import { Button } from "@/components/ui/button";
import MainSearchBar from '@/features/dashboard/components/MainSearchBar';

// Standard Admin Components
import AdminPageShell from '../components/layout/AdminPageShell';
import ManagementHeader from '../components/layout/ManagementHeader';
import FilterBar from '../components/shared/FilterBar';

// Sub-components
import KnowledgeManagementTable from '../components/knowledge/management/KnowledgeManagementTable';
import { Skeleton } from '@/components/ui/skeleton';

const KnowledgeManagement = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            // Simulate network latency
            await new Promise(resolve => setTimeout(resolve, 600));

            const loadedArticles = knowledgeData.map(article => ({
                ...article,
                status: 'Published', // Mock status
            }));
            setArticles(loadedArticles);
            setIsLoading(false);
        };

        fetchArticles();
    }, []);

    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const counts = {
        all: articles.length,
        published: articles.filter(a => a.status === 'Published').length,
        draft: articles.filter(a => a.status === 'Draft').length,
    };

    const filterTabs = [
        { id: 'all', label: 'All', count: counts.all },
        { id: 'published', label: 'Published', count: counts.published },
        { id: 'draft', label: 'Draft', count: counts.draft },
    ];

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStatus = activeTab === 'all' || article.status.toLowerCase() === activeTab;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
    const paginatedArticles = filteredArticles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeTab]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            setArticles(prev => prev.filter(a => a.id !== id));
        }
    };

    return (
        <AdminPageShell>
            <ManagementHeader
                title="Knowledge Hub Management"
                description="Create, edit, and manage knowledge articles"
            >
                <Link to="/admin/knowledge/create">
                    <Button className="font-bold rounded-xl h-10 px-6 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none bg-emerald-600 hover:bg-emerald-700 text-white">
                        <Plus size={18} className="mr-2" />
                        Create Article
                    </Button>
                </Link>
            </ManagementHeader>

            <FilterBar
                searchSlot={
                    <MainSearchBar
                        placeholder="Search articles..."
                        variant="compact"
                        hideButton={true}
                        searchQuery={searchQuery}
                        handleSearch={(e) => setSearchQuery(e.target.value)}
                    />
                }
                filterSlot={
                    <Tabs
                        tabs={filterTabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                }
            />

            {/* Content Area */}
            {isLoading ? (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 h-12 flex items-center px-6">
                        <div className="flex gap-4 w-full">
                            <Skeleton className="h-3 w-[45%]" />
                            <Skeleton className="h-3 w-[20%]" />
                            <Skeleton className="h-3 w-[10%]" />
                            <Skeleton className="h-3 w-[10%]" />
                            <Skeleton className="h-3 w-[10%]" />
                            <Skeleton className="h-3 w-[5%] ml-auto" />
                        </div>
                    </div>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex h-20 items-center px-6 border-b border-slate-50 last:border-0">
                            <div className="flex items-center gap-4 w-full">
                                <Skeleton className="w-20 h-14 rounded-lg shrink-0" />
                                <div className="space-y-2 flex-1 min-w-0">
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-3 w-1/3" />
                                </div>
                                <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : paginatedArticles.length > 0 ? (
                <>
                    <KnowledgeManagementTable
                        articles={paginatedArticles}
                        onDelete={handleDelete}
                    />

                    {/* Footer / Pagination */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
                        <div className="text-2xs text-slate-400 font-medium whitespace-nowrap">
                            Showing {paginatedArticles.length} of {filteredArticles.length} articles
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            className="mt-0"
                        />
                    </div>
                </>
            ) : (
                <div className="border border-slate-200 bg-white rounded-2xl h-80 flex flex-col items-center justify-center text-center shadow-none">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 border border-slate-100">
                        <Book size={40} className="text-slate-300" />
                    </div>
                    <h4 className="font-bold text-xl text-main tracking-tight">No articles found</h4>
                    <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto font-medium">
                        We couldn't find any articles matching "{searchQuery}".
                    </p>
                    <Button
                        variant="outline"
                        className="mt-6 border-slate-200 rounded-xl px-8 font-bold hover:bg-slate-50 shadow-none h-11"
                        onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                    >
                        Clear All Filters
                    </Button>
                </div>
            )}
        </AdminPageShell>
    );
};

export default KnowledgeManagement;
