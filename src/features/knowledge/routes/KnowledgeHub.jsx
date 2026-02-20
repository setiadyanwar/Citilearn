import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown, User, Calendar, BookOpen, Book, Search, Menu, Filter, Share2, Tag, PlayCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PostCard from '@/features/knowledge/components/PostCard';
import FeaturedPost from '@/features/knowledge/components/FeaturedPost';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
            <div className="max-w-[1400px] mx-auto px-4 space-y-8">

                {/* Header Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-[#E3F5EB] dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/50 p-8 md:p-10 text-center">
                    <div className="relative z-10 max-w-2xl mx-auto space-y-2">
                        <h1 className="text-2xl md:text-4xl font-bold text-primary dark:text-white tracking-tight">
                            Knowledge hub
                        </h1>
                        <p className="text-xs md:text-sm text-primary dark:text-primary/80 font-medium pb-2">
                            Empowering Minds Through Insightful Articles
                        </p>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-1/2 -left-10 md:left-18 -translate-y-1/2 opacity-20 rotate-12 transition-all duration-500">
                        <Book className="w-24 h-24 md:w-32 lg:w-40 text-primary dark:text-white" />
                    </div>
                    <div className="absolute top-1/2 -right-12 md:-right-12 -translate-y-1/2 opacity-20 -rotate-12 transition-all duration-500">
                        <BookOpen className="w-24 h-24 md:w-32 lg:w-40 text-primary dark:text-white" />
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
                                className="lg:max-h-[504px] overflow-x-auto lg:overflow-y-auto lg:pr-2 custom-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0"
                                style={{
                                    WebkitMaskImage: 'var(--mask-image)',
                                    maskImage: 'var(--mask-image)',
                                }}
                            >
                                <div className="flex flex-row lg:flex-col gap-3 py-4 lg:py-8 min-w-max lg:min-w-0 lg:space-y-3">
                                    {popularPosts.list.map((post) => (
                                        <PostCard
                                            key={post.id}
                                            post={post}
                                            variant="horizontal"
                                            size="compact"
                                            disableHover={true}
                                            className="w-[280px] md:w-[320px] lg:w-full bg-white dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 lg:bg-transparent lg:dark:bg-transparent lg:border-0 lg:p-0"
                                        />
                                    ))}
                                    {/* Mock extra items to demonstrate scrolling if list is short */}
                                    {[...popularPosts.list, ...popularPosts.list].map((post, idx) => (
                                        <PostCard
                                            key={`${post.id}-extra-${idx}`}
                                            post={post}
                                            variant="horizontal"
                                            size="compact"
                                            disableHover={true}
                                            className="w-[280px] md:w-[320px] lg:w-full bg-white dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 lg:bg-transparent lg:dark:bg-transparent lg:border-0 lg:p-0"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Mask style via head/style */}
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                .custom-scrollbar {
                                    --mask-image: none;
                                }
                                @media (min-width: 1024px) {
                                    .custom-scrollbar {
                                        --mask-image: linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent);
                                    }
                                }
                            `}} />
                        </div>
                    </div>
                </section>

                {/* Latest Post Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-main dark:text-white">Latest Post</h2>

                        {/* Optional Filter Tags */}
                        {/* Filter Category */}
                        {/* Filter Category */}
                        <div className="w-[140px] md:w-[160px]">
                            <Select value={activeFilter} onValueChange={setActiveFilter}>
                                <SelectTrigger className="h-9 text-xs">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All" className="text-xs">All</SelectItem>
                                    <SelectItem value="UI/UX" className="text-xs">UI/UX</SelectItem>
                                    <SelectItem value="Design" className="text-xs">Design</SelectItem>
                                    <SelectItem value="Development" className="text-xs">Development</SelectItem>
                                    <SelectItem value="Product" className="text-xs">Product</SelectItem>
                                </SelectContent>
                            </Select>
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
