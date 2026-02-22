import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Database, Briefcase, Share2 } from 'lucide-react';
import AdminPageShell from '../components/layout/AdminPageShell';
import ManagementHeader from '../components/layout/ManagementHeader';
import FilterBar from '../components/shared/FilterBar';
import Tabs from '@/components/common/Tabs';
import { Button } from "@/components/ui/button";
import MainSearchBar from '@/features/dashboard/components/MainSearchBar';
import Pagination from '@/components/common/Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Eye, Calendar } from 'lucide-react';

const CompanyHubManagement = () => {
    const { type } = useParams(); // 'culture' or 'collaboration'
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const displayTitle = type === 'culture' ? 'Corporate Culture' : 'Collaboration Hub';
    const displayDesc = type === 'culture'
        ? 'Manage company values, manifestos, and cultural articles.'
        : 'Manage collaboration tools, templates, and team resources.';

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));

            // Mock Data based on type
            const mockData = type === 'culture' ? [
                { id: 1, title: 'Our Core Values', category: 'Values', date: '2024-01-15', status: 'Published', author: 'HR Team' },
                { id: 2, title: 'Annual Kick-off 2024', category: 'Events', date: '2023-12-20', status: 'Published', author: 'Corporate Comm' },
                { id: 3, title: 'DIVERSITY & INCLUSION', category: 'Manifesto', date: '2023-11-05', status: 'Draft', author: 'HR Team' },
            ] : [
                { id: 1, title: 'Design System Guidelines', category: 'Design', date: '2024-02-01', status: 'Published', author: 'Design Ops' },
                { id: 2, title: 'Project Management Template', category: 'Templates', date: '2024-01-10', status: 'Published', author: 'PMO' },
                { id: 3, title: 'API Documentation Hub', category: 'Tech', date: '2023-10-15', status: 'Draft', author: 'Engineering' },
            ];

            setItems(mockData);
            setIsLoading(false);
        };

        fetchData();
    }, [type]);

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (activeTab === 'all' || item.status.toLowerCase() === activeTab.toLowerCase())
    );

    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setItems(prev => prev.filter(i => i.id !== id));
        }
    };

    return (
        <AdminPageShell>
            <ManagementHeader
                title={displayTitle}
                description={displayDesc}
            >
                <Link to={`/admin/cms/${type}/create`}>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl h-10 px-6">
                        <Plus size={18} className="mr-2" />
                        Add New {type === 'culture' ? 'Item' : 'Resource'}
                    </Button>
                </Link>
            </ManagementHeader>

            <FilterBar
                searchSlot={
                    <MainSearchBar
                        placeholder={`Search ${type}...`}
                        variant="compact"
                        hideButton={true}
                        searchQuery={searchQuery}
                        handleSearch={(e) => setSearchQuery(e.target.value)}
                    />
                }
                filterSlot={
                    <Tabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        tabs={[
                            { id: 'all', label: 'All', count: filteredItems.length },
                            { id: 'published', label: 'Published' },
                            { id: 'draft', label: 'Draft' },
                        ]}
                    />
                }
            />

            <div className="mt-6">
                {isLoading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
                        ))}
                    </div>
                ) : paginatedItems.length > 0 ? (
                    <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-none">
                        <Table>
                            <TableHeader className="bg-slate-50 border-b border-slate-200">
                                <TableRow className="hover:bg-transparent border-none">
                                    <TableHead className="font-semibold text-tertiary h-12 pl-6  text-3xs ">Title</TableHead>
                                    <TableHead className="font-semibold text-tertiary h-12  text-3xs ">Category</TableHead>
                                    <TableHead className="font-semibold text-tertiary h-12  text-3xs ">Author</TableHead>
                                    <TableHead className="font-semibold text-tertiary h-12  text-3xs ">Status</TableHead>
                                    <TableHead className="text-right font-semibold text-tertiary h-12 pr-6  text-3xs ">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedItems.map((item) => (
                                    <TableRow key={item.id} className="group hover:bg-slate-50/50 border-slate-100 transition-all">
                                        <TableCell className="py-4 pl-6">
                                            <div className="font-semibold text-main group-hover:text-emerald-600 transition-colors">
                                                {item.title}
                                            </div>
                                            <div className="text-3xs text-tertiary font-medium flex items-center gap-1 mt-1">
                                                <Calendar size={10} /> {item.date}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex px-2 py-0.5 rounded-md text-3xs font-bold  bg-slate-100 text-secondary border border-slate-200">
                                                {item.category}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-xs font-medium text-secondary">
                                            {item.author}
                                        </TableCell>
                                        <TableCell>
                                            <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-3xs font-bold  border ${item.status === 'Published'
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                : 'bg-amber-50 text-amber-700 border-amber-100'
                                                }`}>
                                                {item.status}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-tertiary hover:text-emerald-600">
                                                    <Eye size={16} />
                                                </Button>
                                                <Link to={`/admin/cms/${type}/${item.id}/edit`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-tertiary hover:text-blue-600">
                                                        <Edit size={16} />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-tertiary hover:text-red-600"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
                        <Database className="mx-auto text-slate-200 mb-4" size={48} />
                        <h3 className="text-lg font-bold text-main">No records found</h3>
                        <p className="text-sm text-secondary">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </AdminPageShell>
    );
};

export default CompanyHubManagement;
