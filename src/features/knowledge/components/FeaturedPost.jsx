import React from 'react';
import { ArrowLeft, ArrowRight, User, Calendar, BookOpen, Search, Menu, Filter, Share2, Tag, PlayCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/common/Badge';
import UserProfile from '@/components/common/UserProfile';

const FeaturedPost = ({ post }) => {
    return (
        <div className="flex flex-col mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-xl w-full aspect-[2.4/1] group mb-4 bg-slate-100 dark:bg-slate-900">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="space-y-2">
                {/* Category Badge */}
                <Badge variant="secondary" size="compact" className="px-2.5 py-1 font-medium w-fit">
                    {post.category || 'General'}
                </Badge>

                {/* Meta: Author & Date */}
                <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                    <UserProfile
                        name={post.author.name}
                        size="sm"
                        shape="circle"
                        className="shrink-0"
                    />
                    <div className="flex items-center gap-2 font-medium">
                        <span>{post.author.name}</span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span>{post.date}</span>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-main dark:text-emerald-50 leading-tight tracking-tight">
                    {post.title}
                </h2>

                {/* Description */}
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed line-clamp-2 font-medium">
                    {post.description}
                </p>

                {/* Read More */}
                <div className="pt-1">
                    <Link
                        to={`/knowledge/${post.slug}`}
                        className="inline-flex items-center text-sm md:text-base font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors hover:underline underline-offset-4"
                    >
                        Read more
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedPost;
