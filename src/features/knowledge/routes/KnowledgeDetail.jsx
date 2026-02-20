import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Share2, Calendar, User, Clock, ChevronRight, Home, MessageSquare, ThumbsUp, Bookmark, Book, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Breadcrumb from '@/components/common/Breadcrumb';
import UserProfile from '@/components/common/UserProfile';
import PostCard from '@/features/knowledge/components/PostCard';

const KnowledgeDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Mock Article Data
    const article = {
        title: "Mengenal UI Design: Definisi Hingga Proses",
        category: "UI/UX",
        date: "20 April 2025",
        author: {
            name: "Capt Budiman",
            initial: "B",
            role: "Senior UI/UX Designer"
        },
        image: "https://www.lawencon.com/wp-content/uploads/2024/11/Mengenal-User-Interface-UI-Fungsi-Cara-Kerja-dan-Contohnya-1024x640.webp",
        content: `
            <p class="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                <strong>UI/UX</strong> - Dalam dunia desain digital yang terus berkembang, istilah UI/UX adalah sesuatu yang tidak asing lagi di telinga para desainer, developer, maupun pelaku bisnis online. Istilah ini sering muncul dalam diskusi tentang pengembangan website, aplikasi, atau produk digital lainnya. Namun, apa sebenarnya UI/UX adalah, dan mengapa begitu penting untuk kesuksesan produk digital? Artikel ini akan mengupas tuntas topik tersebut. Yuk, kita jelajahi bersama!
            </p>
            <p class="text-base leading-relaxed text-slate-600 dark:text-slate-400 mb-8">
                Secara sederhana, UI/UX adalah dua elemen inti dalam desain produk digital yang saling melengkapi. UI (User Interface) berkaitan dengan tampilan visual, sedangkan UX (User Experience) berfokus pada pengalaman pengguna secara keseluruhan. Meski sering disebut bersamaan, keduanya memiliki peran yang berbeda namun sama-sama krusial.
            </p>

            <h2 class="text-2xl font-bold text-slate-800 dark:text-emerald-50 mb-6 font-lato">Challenges implements new safety protocol</h2>

            <div class="overflow-x-auto mb-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <table class="w-full text-sm text-left">
                    <thead class="bg-slate-900 text-white dark:bg-emerald-950/50">
                        <tr>
                            <th class="px-6 py-4 font-bold border-r border-white/10">Aspek</th>
                            <th class="px-6 py-4 font-bold border-r border-white/10">UI (User Interface)</th>
                            <th class="px-6 py-4 font-bold">UX (User Experience)</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr class="bg-white dark:bg-slate-900/50">
                            <td class="px-6 py-4 font-bold text-slate-900 dark:text-white border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">Fokus</td>
                            <td class="px-6 py-4 text-slate-600 dark:text-slate-400 border-r border-slate-100 dark:border-slate-800">Tampilan visual dan estetika</td>
                            <td class="px-6 py-4 text-slate-600 dark:text-slate-400">Pengalaman pengguna secara keseluruhan</td>
                        </tr>
                        <tr class="bg-slate-50/30 dark:bg-slate-900/20">
                            <td class="px-6 py-4 font-bold text-slate-900 dark:text-white border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">Tujuan Utama</td>
                            <td class="px-6 py-4 text-slate-600 dark:text-slate-400 border-r border-slate-100 dark:border-slate-800">Merancang elemen visual yang menarik</td>
                            <td class="px-6 py-4 text-slate-600 dark:text-slate-400">Memastikan alur pengguna efisien dan memuaskan</td>
                        </tr>
                        <tr class="bg-white dark:bg-slate-900/50">
                            <td class="px-6 py-4 font-bold text-slate-900 dark:text-white border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">Keterlibatan</td>
                            <td class="px-6 py-4 text-slate-600 dark:text-slate-400 border-r border-slate-100 dark:border-slate-800">Desain grafis dan antarmuka</td>
                            <td class="px-6 py-4 text-slate-600 dark:text-slate-400">Riset pengguna, pengujian, dan analisis</td>
                        </tr>
                        <tr class="bg-slate-50/30 dark:bg-slate-900/20">
                            <td class="px-6 py-4 font-bold text-slate-900 dark:text-white border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">Contoh</td>
                            <td class="px-6 py-4 text-slate-600 dark:text-slate-400 border-r border-slate-100 dark:border-slate-800">Warna, ikon, tombol, tata letak</td>
                            <td class="px-6 py-4 text-slate-600 dark:text-slate-400">Navigasi, kepuasan pengguna, alur pengguna</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p class="text-base leading-relaxed text-slate-600 dark:text-slate-400 mb-6">
                When I walked into Allegiant Stadium in Las Vegas, I expected to be blown away by Swift and the 44 songs she performs live for the "Eras Tour." But I didn't expect to feel uncomfortable at her declaration of her unbridled ambition.
            </p>
            <p class="text-base leading-relaxed text-slate-600 dark:text-slate-400 mb-6">
                The timing of her declaration was a little cheeky; it was part of her introduction to the song, "The Man," which calls attention to the sexist double standards that women face, including ones Swift has battled in the music industry.
            </p>
            <p class="text-base leading-relaxed text-slate-600 dark:text-slate-400 mb-6">
                "What's it like to brag about raking in dollars and getting bitches and models," she sang. "If I was out flashing my dollars, I'd be a bitch, not a baller."
            </p>
            <p class="text-base leading-relaxed text-slate-600 dark:text-slate-400 mb-6">
                When she shouted out her accomplishment in Las Vegas, alongside a matching victory dance, I'm sure it was meant to conjure masculinity and highlight the double standard surrounding success, since nothing Taylor Alison Swift does is unintentional. She's known for leaving an unending trail of Easter eggs for her fans to find and decipher, which reveal clues about things like album drops and the true meaning of a lyric.
            </p>
            <p class="text-base leading-relaxed text-slate-600 dark:text-slate-400 mb-6 font-medium italic border-l-4 border-emerald-500 pl-6 my-8">
                She's a mastermind in everything she does, sings and shouts to a football stadium full of fans.
            </p>
            <p class="text-base leading-relaxed text-slate-600 dark:text-slate-400 mb-6">
                That's why, even if the timing was part of her performance around "The Man," it was also no accident that Swift decided to belt out her success that night.
            </p>
            <p class="text-base leading-relaxed text-slate-600 dark:text-slate-400 mb-6">
                And whether we were cringing in our seats, like me, or cheering her on, also like me, her words delivered a powerful message.
            </p>
        `
    };

    const otherArticles = [
        {
            id: 2,
            title: "Panduan Lengkap Digital Marketing: Tips Belajar",
            date: "20 April 2025",
            author: { name: "Capt Budiman", initial: "B" },
            image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=2074",
            slug: "panduan-digital-marketing"
        },
        {
            id: 3,
            title: "Panduan Lengkap Digital Marketing: Tips Belajar",
            date: "20 April 2025",
            author: { name: "Capt Budiman", initial: "B" },
            image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=2074",
            slug: "panduan-digital-marketing-2"
        },
        {
            id: 4,
            title: "Panduan Lengkap Digital Marketing: Tips Belajar",
            date: "20 April 2025",
            author: { name: "Capt Budiman", initial: "B" },
            image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=2074",
            slug: "panduan-digital-marketing-3"
        },
        {
            id: 5,
            title: "Panduan Lengkap Digital Marketing: Tips Belajar",
            date: "20 April 2025",
            author: { name: "Capt Budiman", initial: "B" },
            image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=2074",
            slug: "panduan-digital-marketing-4"
        }
    ];

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
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-emerald-50 leading-tight mb-6 font-lato tracking-tight">
                                {article.title}
                            </h1>

                            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <UserProfile
                                        name={article.author.name}
                                        size="sm"
                                        shape="circle"
                                        showBorder={false}
                                    />
                                    <div>
                                        <div className="text-sm font-bold text-slate-800 dark:text-emerald-100">{article.author.name}</div>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={12} className="text-emerald-500" />
                                                {article.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group cursor-pointer">
                                    <Upload size={18} className="stroke-[1.5px]" />
                                    <span className="text-sm font-bold border-b border-slate-200 dark:border-slate-800 group-hover:border-emerald-600 dark:group-hover:border-emerald-400 transition-colors pb-0.5 leading-none">Share</span>
                                </button>
                            </div>
                        </div>

                        <div
                            className="prose prose-slate dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Article Footer / Engagement */}
                        <div className="pt-10 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors">
                                    <ThumbsUp size={18} />
                                    <span className="text-sm font-bold">Helpful</span>
                                </button>
                                <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors">
                                    <MessageSquare size={18} />
                                    <span className="text-sm font-bold">Comment</span>
                                </button>
                            </div>
                            <button className="text-slate-500 hover:text-emerald-600 transition-colors">
                                <Bookmark size={18} />
                            </button>
                        </div>
                    </article>

                    {/* Sidebar (Right) */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-28">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-emerald-50 mb-6 flex items-center gap-2">
                                Other Article
                                <div className="h-1 flex-1 bg-linear-to-r from-emerald-500/20 to-transparent rounded-full ml-4" />
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

                            {/* Promotional / Related Section in Sidebar */}
                            <div className="mt-12 p-6 rounded-3xl bg-linear-to-br from-emerald-600 to-teal-700 text-white relative overflow-hidden shadow-lg shadow-emerald-500/20 group">
                                <div className="relative z-10 space-y-4">
                                    <h3 className="font-bold text-lg leading-tight">Mastering UI/UX Design Series</h3>
                                    <p className="text-emerald-50/80 text-xs leading-relaxed">Elevate your skills with our curated learning paths and expert insights.</p>
                                    <Button className="w-full bg-white text-emerald-700 hover:bg-emerald-50 font-bold rounded-xl h-10 transition-transform group-hover:scale-[1.02]">
                                        Explore Path
                                    </Button>
                                </div>
                                <div className="absolute -bottom-6 -right-6 opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                    <Book size={120} />
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeDetail;
