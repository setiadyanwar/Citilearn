import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';

const BookmarkButton = ({ isBookmarked: initialBookmarked = false, className, size = 18 }) => {
    const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

    const handleBookmark = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsBookmarked(!isBookmarked);
    };

    return (
        <button
            onClick={handleBookmark}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 flex items-center justify-center ${isBookmarked
                    ? 'bg-white/90 text-primary shadow-sm hover:bg-white'
                    : 'bg-black/20 text-white hover:bg-black/40'
                } ${className}`}
            title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        >
            <Bookmark size={size} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
    );
};

export default BookmarkButton;
