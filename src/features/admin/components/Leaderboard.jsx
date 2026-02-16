import React from 'react';
import { Trophy, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MilesIcon from '@/components/icons/MilesIcon';
import UserProfile from '@/components/common/UserProfile';

const topPerformers = {
    miles: [
        { name: 'Budi Pratama', value: '45,200 point', avatar: 'https://i.pravatar.cc/150?u=budi' },
        { name: 'Rian Hidayat', value: '42,800 point', avatar: 'https://i.pravatar.cc/150?u=rian' },
    ],
    scores: [
        { name: 'Lina Marlina', value: 'Avg 98.5%', avatar: 'https://i.pravatar.cc/150?u=lina' },
        { name: ' Maya Indah', value: 'Avg 96.2%', avatar: 'https://i.pravatar.cc/150?u=maya' },
    ]
};

const Leaderboard = () => (
    <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 space-y-6 shadow-none">
        <div>
            <h3 className="text-lg font-bold text-main mb-6 flex items-center gap-2">
                <Trophy size={20} className="text-amber-500" />
                Leaderboard
            </h3>

            <div className="space-y-6">
                {/* Miles Leaders */}
                <div>
                    <p className="text-3xs font-bold text-secondary mb-3 px-1">Most Miles Point</p>
                    <div className="space-y-3">
                        {topPerformers.miles.map((user, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <UserProfile
                                        imageUrl={user.avatar}
                                        name={user.name}
                                        size="xs"
                                        className="shrink-0"
                                    />
                                    <span className="text-xs font-bold text-main group-hover:text-primary transition-colors">{user.name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MilesIcon className="w-8 h-auto" />
                                    <span className="text-2xs font-bold text-main">{user.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Score Leaders */}
                <div>
                    <div className="flex justify-between items-center mb-3 px-1">
                        <p className="text-3xs font-bold text-secondary">Test Score</p>
                        <Button variant="link" size="sm" className="h-auto p-0 text-3xs font-bold text-primary">See all</Button>
                    </div>
                    <div className="space-y-3">
                        {topPerformers.scores.map((user, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <UserProfile
                                        imageUrl={user.avatar}
                                        name={user.name}
                                        size="xs"
                                        className="shrink-0"
                                    />
                                    <span className="text-xs font-bold text-main group-hover:text-primary transition-colors">{user.name}</span>
                                </div>
                                <div className="flex items-center gap-1 text-primary">
                                    <Star size={11} fill="currentColor" />
                                    <span className="text-2xs font-bold">{user.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Leaderboard;
