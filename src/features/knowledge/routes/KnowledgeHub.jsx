import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Calendar, BookOpen, Book, Search, Menu, Filter, Share2, Tag, PlayCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PostCard from '@/features/knowledge/components/PostCard';
import FeaturedPost from '@/features/knowledge/components/FeaturedPost';
import Tabs from '@/components/common/Tabs';

const KnowledgeHub = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const popularPosts = {
        featured: {
            id: 1,
            title: "Mengenal UI Design: Definisi Hingga Proses",
            description: "Di era di mana internet menjadi pusat informasi dan interaksi, digital marketing telah menjadi salah satu pilar utama kesuksesan bisnis. Dalam panduan ini, kita akan membahas secara detail berbagai aspek...",
            date: "20 April 2025",
            author: { name: "Capt Budiman", initial: "B" },
            image: "https://www.lawencon.com/wp-content/uploads/2024/11/Mengenal-User-Interface-UI-Fungsi-Cara-Kerja-dan-Contohnya-1024x640.webp",
            category: "Design",
            slug: "mengenal-ui-design"
        },
        list: [
            {
                id: 2,
                title: "Panduan Lengkap Digital Marketing: Tips Belajar",
                excerpt: "Strategi pemasaran digital yang efektif untuk pemula hingga mahir.",
                date: "20 April 2025",
                author: { name: "Capt Budiman", initial: "B" },
                image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=2074",
                slug: "panduan-digital-marketing"
            },
            {
                id: 3,
                title: "Software Engineering: Tips Belajar",
                excerpt: "Langkah awal memulai karir sebagai software engineer profesional.",
                date: "20 April 2025",
                author: { name: "Capt Budiman", initial: "B" },
                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2070",
                slug: "software-engineering-tips"
            },
            {
                id: 4,
                title: "Product Management: Definisi, Skill & Gaji",
                excerpt: "Apa itu Product Management dan skill apa saja yang dibutuhkan?",
                date: "20 April 2025",
                author: { name: "Capt Budiman", initial: "B" },
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
                slug: "product-management-guide"
            }
        ]
    };

    const latestPosts = [
        {
            id: 5,
            title: "Data Analytics for Beginners: Path to Success",
            excerpt: "Learn how to start your journey into data analytics with our comprehensive guide...",
            date: "18 April 2025",
            author: { name: "Capt Budiman", initial: "B" },
            image: "https://tse4.mm.bing.net/th/id/OIP.WlcHl7AIPGzBTHyZ70CFRwHaEK?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3",
            slug: "data-analytics-guide"
        },
        {
            id: 6,
            title: "Mastering React: Tips for Modern Web Dev",
            excerpt: "Advanced techniques for creating fast and responsive React applications...",
            date: "15 April 2025",
            author: { name: "Capt Budiman", initial: "B" },
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2070",
            slug: "mastering-react"
        },
        {
            id: 7,
            title: "Cyber Security: Essential Practices for Teams",
            excerpt: "Protecting your organization in an increasingly digital world requires vigilant staff...",
            date: "12 April 2025",
            author: { name: "Capt Budiman", initial: "B" },
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
            slug: "cyber-security-essential"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20 animate-fade-in transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-8">

                {/* Header Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-[#E3F5EB] dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/50 p-8 md:p-10 text-center">
                    <div className="relative z-10 max-w-2xl mx-auto space-y-2">
                        <h1 className="text-3xl md:text-2xl font-bold text-emerald-950 dark:text-emerald-50 tracking-tight">
                            Knowledge hub
                        </h1>
                        <p className="text-base md:text-base text-emerald-800/70 dark:text-emerald-400/70 font-medium pb-2">
                            Empowering Minds Through Insightful Articles
                        </p>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-28 left-18 -translate-y-1/2 opacity-20 rotate-12">
                        <Book size={160} className="text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <div className="absolute top-1/2 -right-12 -translate-y-1/2 opacity-20 -rotate-12">
                        <BookOpen size={160} className="text-emerald-600 dark:text-emerald-500" />
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
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default KnowledgeHub;
