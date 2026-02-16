import React, { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import morningBanner from '@/assets/profile-morning.svg';
import nightBanner from '@/assets/profile-night.svg';
import ProfileAvatar from './ProfileAvatar';

const ProfileBanner = ({ user, onEditPhoto }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Check every minute
        return () => clearInterval(timer);
    }, []);

    const hours = currentTime.getHours();
    // Logic: Morning form 4 AM - 4 PM (16:00). Night from 4 PM - 4 AM.
    const isMorning = hours >= 4 && hours < 16;

    return (
        <div className={`relative rounded-3xl overflow-hidden p-6 md:p-10 flex items-center justify-between text-white transition-colors duration-1000 h-full md:h-[252px] ${isMorning ? 'bg-linear-to-r from-cyan-400 to-blue-500' : 'bg-slate-900'}`}>

            {/* SVG Background Layer */}
            <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
                <img
                    src={isMorning ? morningBanner : nightBanner}
                    alt={isMorning ? "Morning Banner" : "Night Banner"}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Layer (z-10 to stay on top) */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full">
                <ProfileAvatar
                    imageUrl={user.avatar}
                    name={user.name}
                    points={user.points || 35}
                    showPoints={false}
                />

                <div className="text-center md:text-left space-y-0 flex-1">
                    <h1 className="text-lg md:text-[20px] font-bold uppercase tracking-wide">
                        {user.name}
                    </h1>
                    <p className="text-white/90 text-sm md:text-base font-medium">
                        {user.email}
                    </p>

                    <Button
                        onClick={onEditPhoto}
                        variant="white"
                        className="mt-3 md:mt-3 font-bold gap-2 text-sm h-10 md:h-10 px-6 md:px-4 rounded-xl"
                        size="sm"
                    >
                        <Edit size={14} />
                        Edit Photo
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileBanner;
