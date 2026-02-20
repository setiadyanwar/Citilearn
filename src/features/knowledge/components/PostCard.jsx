import React from 'react';
import { ArrowLeft, ArrowRight, User, Calendar, BookOpen, Search, Menu, Filter, Share2, Tag, PlayCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/common/Badge';
import UserProfile from '@/components/common/UserProfile';

const PostCard = ({ post, variant = 'vertical', className = '', size = 'default', disableHover = false }) => {
    // Determine layout classes based on variant
    const isHorizontal = variant === 'horizontal';
    const isCompact = size === 'compact' && isHorizontal;

    return (
        <div className={`group flex ${isHorizontal ? 'flex-row gap-4 items-stretch' : 'flex-col gap-4'} ${className} animate-in fade-in slide-in-from-right-4 duration-500`}>
            {/* Image Thumbnail */}
            <div className={`relative overflow-hidden rounded-[1rem] bg-slate-100 dark:bg-slate-900 shrink-0 ${isHorizontal ? (isCompact ? 'w-20 md:w-24' : 'w-36 md:w-40') : 'w-full aspect-video'}`}>
                <img
                    src={post.image}
                    alt={post.title}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80'; }}
                    className="w-full h-full object-cover transition-transform duration-500"
                />
                {post.isFeatured && (
                    <div className="absolute top-4 left-4 px-2 py-1 bg-emerald-600 text-3xs font-bold text-white rounded-lg shadow-lg flex items-center gap-1 animate-pulse">
                        <Tag size={10} />
                        FEATURED
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col h-full min-w-0 py-0">
                {/* Category & Date */}
                <div className={`${isCompact ? 'flex flex-col-reverse items-start gap-1 md:flex-row md:items-center md:gap-2' : 'flex items-center gap-2'} mb-2`}>
                    <Badge variant="secondary" size="compact" className="font-medium whitespace-nowrap">
                        {post.category || 'General'}
                    </Badge>
                    <span className="font-normal text-slate-400 dark:text-slate-500 whitespace-nowrap text-xs">
                        {post.date}
                    </span>
                </div>

                {/* Title */}
                <Link
                    to={`/knowledge/${post.slug}`}
                    className={`block ${!disableHover ? 'group-hover:text-emerald-600' : ''} transition-colors mb-2.5 ${!isHorizontal ? 'min-h-12 md:min-h-14' : ''}`}
                >
                    <h3 className={`${isCompact ? 'font-semibold text-base leading-tight' : 'font-semibold'} text-main dark:text-white tracking-tight line-clamp-2 ${isCompact ? '' : (isHorizontal ? 'text-base md:text-base leading-snug' : 'text-base md:text-lg leading-snug')}`}>
                        {post.title}
                    </h3>
                </Link>

                {/* Author below Title */}
                <div className="flex items-center gap-2 mb-3">
                    <UserProfile
                        name={post.author.name}
                        size="xs"
                        shape="circle"
                        className="shrink-0 scale-90 origin-left"
                        showBorder={false}
                    />
                    <span className={`font-medium text-slate-500 dark:text-slate-400 truncate ${isCompact ? 'text-3xs' : 'text-xs'}`}>
                        {post.author.name}
                    </span>
                </div>



                {/* Excerpt (Only Vertical) */}
                {!isHorizontal && (
                    <p className="text-slate-500 dark:text-slate-400 text-xs md:text-xs line-clamp-2 mb-4 leading-relaxed font-medium">
                        {post.excerpt}
                    </p>
                )}

                {/* Read More Link - Only if NOT compact */}
                {!isCompact && (
                    <div className="mt-auto pt-2">
                        <Link
                            to={`/knowledge/${post.slug}`}
                            className="inline-flex items-center text-xs md:text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors hover:underline underline-offset-4 w-fit"
                        >
                            Read more
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCard;
