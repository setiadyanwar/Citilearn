import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown, User, Calendar, BookOpen, Book, Search, Menu, Filter, Share2, Tag, PlayCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PostCard from '@/features/knowledge/components/PostCard';
import FeaturedPost from '@/features/knowledge/components/FeaturedPost';
import Tabs from '@/components/common/Tabs';

// Import data
import { knowledgeData } from '@/data/knowledge';

const KnowledgeHub = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    // Derived from knowledgeData
    const popularPosts = {
        featured: {
            ...knowledgeData[0],
            description: knowledgeData[0].excerpt // Map excerpt to description for FeaturedPost component
        },
        list: knowledgeData.slice(1, 4)
    };

    // Reuse some posts for "Latest" since we only have 5 mock items
    const latestPosts = [
        knowledgeData[4],
        knowledgeData[1],
        knowledgeData[2]
    ];


    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20 animate-fade-in transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-8">

                {/* Header Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-[#E3F5EB] dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/50 p-8 md:p-10 text-center">
                    <div className="relative z-10 max-w-2xl mx-auto space-y-2">
                        <h1 className="text-2xl md:text-4xl font-bold text-emerald-950 dark:text-emerald-50 tracking-tight">
                            Knowledge hub
                        </h1>
                        <p className="text-sm md:text-lg text-emerald-800/70 dark:text-emerald-400/70 font-medium pb-2">
                            Empowering Minds Through Insightful Articles
                        </p>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-1/2 -left-10 md:left-18 -translate-y-1/2 opacity-20 rotate-12 transition-all duration-500">
                        <Book className="w-24 h-24 md:w-32 lg:w-40 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <div className="absolute top-1/2 -right-12 md:-right-12 -translate-y-1/2 opacity-20 -rotate-12 transition-all duration-500">
                        <BookOpen className="w-24 h-24 md:w-32 lg:w-40 text-emerald-600 dark:text-emerald-500" />
                    </div>

                    {/* Abstract Circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400/20 dark:bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-300/20 dark:bg-emerald-400/10 blur-[100px] rounded-full pointer-events-none" />
                </div>

                {/* Popular Post Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-main dark:text-white">Popular Post</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Featured Post (Left) */}
                        <div className="lg:col-span-7 xl:col-span-8">
                            <FeaturedPost post={popularPosts.featured} />
                        </div>

                        {/* Popular List (Right) */}
                        <div className="lg:col-span-5 xl:col-span-4 relative group">
                            <div
                                className="max-h-[504px] overflow-y-auto pr-2 space-y-5 custom-scrollbar"
                                style={{
                                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent)',
                                    maskImage: 'linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent)'
                                }}
                            >
                                <div className="py-10"> {/* Padding to allow scrolling into full view despite mask */}
                                    {popularPosts.list.map((post) => (
                                        <PostCard key={post.id} post={post} variant="horizontal" className="mb-5 last:mb-0" />
                                    ))}
                                    {/* Mock extra items to demonstrate scrolling if list is short */}
                                    {[...popularPosts.list, ...popularPosts.list].map((post, idx) => (
                                        <PostCard key={`${post.id}-extra-${idx}`} post={post} variant="horizontal" className="mb-5 last:mb-0" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Latest Post Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-main dark:text-white">Latest Post</h2>

                        {/* Optional Filter Tags */}
                        <div className="hidden md:flex">
                            <Tabs
                                activeTab={activeFilter}
                                onTabChange={setActiveFilter}
                                tabs={[
                                    { id: 'All', label: 'All' },
                                    { id: 'Design', label: 'Design' },
                                    { id: 'Development', label: 'Development' },
                                    { id: 'Product', label: 'Product' }
                                ]}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>

                    <div className="mt-8 text-center pb-12">
                        <Button variant="link" className="text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-700 dark:hover:text-emerald-300 hover:no-underline flex items-center gap-2 mx-auto group transition-all">
                            Load More Articles
                            <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default KnowledgeHub;
