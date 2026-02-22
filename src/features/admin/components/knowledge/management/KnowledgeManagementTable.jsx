import React from 'react';
import {
    Edit,
    Trash2,
    Eye,
    Clock,
    User,
    Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import UserProfile from '@/components/common/UserProfile';

const KnowledgeManagementTable = ({ articles, onDelete }) => {
    return (
        <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-none">
            <Table>
                <TableHeader className="bg-slate-50 border-b border-slate-200">
                    <TableRow className="hover:bg-transparent border-none">
                        <TableHead className="w-[45%] font-semibold text-tertiary h-12 pl-6 uppercase text-3xs tracking-wider">Article Info</TableHead>
                        <TableHead className="w-[20%] font-semibold text-tertiary h-12 uppercase text-3xs tracking-wider">Author</TableHead>
                        <TableHead className="w-[10%] font-semibold text-tertiary h-12 uppercase text-3xs tracking-wider">Category</TableHead>
                        <TableHead className="w-[10%] font-semibold text-tertiary h-12 uppercase text-3xs tracking-wider">Date</TableHead>
                        <TableHead className="w-[10%] font-semibold text-tertiary h-12 uppercase text-3xs tracking-wider">Status</TableHead>
                        <TableHead className="w-[5%] text-right font-semibold text-tertiary h-12 pr-6 uppercase text-3xs tracking-wider">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {articles.map((article) => (
                        <TableRow key={article.id} className="group hover:bg-slate-50/50 border-slate-100 transition-all duration-200">
                            <TableCell className="py-4 pl-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-100 bg-slate-100 group-hover:border-slate-200 transition-all duration-300">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80'; }}
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <Link to={`/admin/knowledge/${article.id}/edit`} className="block">
                                            <h3 className="font-semibold text-main truncate leading-tight mb-1 group-hover:text-emerald-600 transition-colors">{article.title}</h3>
                                        </Link>
                                        <p className="text-2xs text-slate-500 line-clamp-1 mb-1.5 font-medium">{article.excerpt || "No excerpt avaliable."}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <UserProfile
                                        name={article.author.name}
                                        size="xs"
                                        shape="circle"
                                        showBorder={false}
                                        className="shrink-0"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-slate-700">{article.author.name}</span>
                                        <span className="text-3xs text-slate-400">{article.author.role || 'Writer'}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="inline-flex px-2.5 py-1 rounded-md text-3xs font-semibold uppercase tracking-wide border bg-slate-50 text-slate-600 border-slate-200">
                                    {article.category}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                    <Calendar size={12} className="text-slate-400" />
                                    <span>{article.date}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className={`inline-flex items-center pl-1.5 pr-2.5 py-1 rounded-full text-3xs font-semibold border transition-colors uppercase tracking-wider ${article.status === 'Draft'
                                    ? 'bg-slate-50 text-slate-500 border-slate-200'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${article.status === 'Draft' ? 'bg-slate-400' : 'bg-emerald-500'
                                        }`}></span>
                                    {article.status || 'Published'}
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-6">
                                <div className="flex items-center justify-end gap-1">
                                    <Link to={`/knowledge/${article.slug}`} target="_blank">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg shadow-none">
                                            <Eye size={16} />
                                        </Button>
                                    </Link>
                                    <Link to={`/admin/knowledge/${article.id}/edit`}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg shadow-none">
                                            <Edit size={16} />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg shadow-none"
                                        onClick={() => onDelete(article.id)}
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
    );
};

export default KnowledgeManagementTable;
