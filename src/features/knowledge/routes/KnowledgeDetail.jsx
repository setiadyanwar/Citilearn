import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Share2, Calendar, User, Clock, ChevronRight, Home, MessageSquare, ThumbsUp, Bookmark, Book, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Breadcrumb from '@/components/common/Breadcrumb';
import UserProfile from '@/components/common/UserProfile';
import PostCard from '@/features/knowledge/components/PostCard';
import { knowledgeData } from '@/data/knowledge';

const KnowledgeDetail = () => {
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);

    // Find article based on slug, default to first one if not found or no slug
    const currentArticle = (slug && knowledgeData.find(a => a.slug === slug)) || knowledgeData[0];
    const otherArticles = knowledgeData.filter(item => item.id !== currentArticle.id);

    // Use currentArticle instead of 'article' variable
    const article = currentArticle;


    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [slug]);

    if (loading) {
        return (
            <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-8 animate-pulse">
                <div className="h-6 w-1/4 bg-slate-200 dark:bg-slate-800 rounded mb-8" />
                <div className="w-full aspect-[2.4/1] bg-slate-200 dark:bg-slate-800 rounded-3xl mb-8" />
                <div className="space-y-4">
                    <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20 animate-fade-in transition-colors duration-300">
            {/* Breadcrumb Container */}
            <div className="max-w-[1400px] mx-auto px-6 py-6 pb-0">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <Link to="/" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                        <Home size={14} />
                        Dashboard
                    </Link>
                    <ChevronRight size={14} className="text-slate-300 dark:text-slate-700" />
                    <Link to="/knowledge" className="hover:text-emerald-600 transition-colors">
                        Knowledge hub
                    </Link>
                    <ChevronRight size={14} className="text-slate-300 dark:text-slate-700" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold truncate max-w-xs md:max-w-md">
                        {article.title}
                    </span>
                </div>
            </div>

            {/* Full Width Hero Image */}
            <div className="-mx-3 md:-mx-8 w-[calc(100%+1.5rem)] md:w-[calc(100%+4rem)] aspect-21/9 md:aspect-3/1 lg:aspect-3.5/1 overflow-hidden mb-10 bg-slate-200 dark:bg-slate-900">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-[1400px] mx-auto px-6">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Content (Left) */}
                    <article className="lg:col-span-8 space-y-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-semibold text-main dark:text-white leading-tight mb-6 font-lato tracking-tight">
                                {article.title}
                            </h1>

                            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <UserProfile
                                        name={article.author.name}
                                        size="xs"
                                        shape="circle"
                                        showBorder={false}
                                        className="shrink-0"
                                    />
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="font-semibold text-slate-700 dark:text-emerald-50">{article.author.name}</span>
                                        <span className="text-slate-300 dark:text-slate-700">•</span>
                                        <span className="text-slate-500 dark:text-slate-400 font-medium">{article.date}</span>
                                    </div>
                                </div>

                                <button className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group cursor-pointer">
                                    <Upload size={18} className="stroke-[1.5px]" />
                                    <span className="text-sm font-bold border-b border-slate-200 dark:border-slate-800 group-hover:border-emerald-600 dark:group-hover:border-emerald-400 transition-colors pb-0.5 leading-none">Share</span>
                                </button>
                            </div>
                        </div>

                        <div
                            className="
                                text-slate-600 dark:text-slate-400
                                [&_p]:mb-6 [&_p]:leading-relaxed
                                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:dark:text-emerald-50 [&_h2]:mt-10 [&_h2]:mb-6 [&_h2]:font-lato
                                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:dark:text-emerald-100 [&_h3]:mt-8 [&_h3]:mb-4
                                [&_h4]:font-bold [&_h4]:text-slate-800 [&_h4]:dark:text-white [&_h4]:mb-2
                                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-8 [&_ul]:space-y-2
                                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-8 [&_ol]:space-y-2
                                [&_strong]:font-bold [&_strong]:text-slate-900 [&_strong]:dark:text-slate-200
                                [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500 [&_blockquote]:pl-6 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:bg-slate-50 [&_blockquote]:dark:bg-slate-900/50 [&_blockquote]:py-4 [&_blockquote]:rounded-r-lg
                                
                                

                                [&_.table-container]:overflow-x-auto [&_.table-container]:mb-8 [&_.table-container]:rounded-xl [&_.table-container]:border [&_.table-container]:border-slate-200 [&_.table-container]:dark:border-slate-800
                                [&_table]:w-full [&_table]:text-sm [&_table]:text-left
                                [&_thead]:bg-slate-900 [&_thead]:text-white [&_thead]:dark:bg-emerald-950/50
                                [&_th]:px-6 [&_th]:py-4 [&_th]:font-bold
                                [&_td]:px-6 [&_td]:py-4 [&_td]:border-b [&_td]:border-slate-100 [&_td]:dark:border-slate-800
                                [&_tr:last-child_td]:border-0

                                [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-xl [&_iframe]:mb-8
                            "
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Article Footer (engagement removed) */}
                        <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
                        </div>
                    </article>

                    {/* Sidebar (Right) */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-28">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-emerald-50 mb-6 flex items-center gap-2">
                                Other Article
                                <div className=" h-0.5 w-full flex-1 bg-slate-200 dark:bg-slate-800 rounded-full ml-4" />
                            </h2>

                            <div className="space-y-6">
                                {otherArticles.map((item) => (
                                    <PostCard
                                        key={item.id}
                                        post={item}
                                        variant="horizontal"
                                        size="compact"
                                        className="hover:bg-white dark:hover:bg-slate-900 p-2.5 -m-2.5 rounded-2xl transition-all duration-300"
                                    />
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeDetail;
