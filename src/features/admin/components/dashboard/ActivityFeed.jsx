import React from 'react';
import UserProfile from '@/components/common/UserProfile';

const recentActivities = [
    { id: 1, user: 'Budi Pratama', action: 'Earned 500 Miles from', target: 'Aviation Safety', time: '2 mins ago', type: 'primary', avatar: 'https://i.pravatar.cc/150?u=budi' },
    { id: 2, user: 'Siti Nurhaliza', action: 'Achieved 95% on', target: 'Customer Service', time: '15 mins ago', type: 'slate', avatar: 'https://i.pravatar.cc/150?u=siti' },
    { id: 3, user: 'Ahmad Yani', action: 'Failed Quiz on', target: 'Airbus A320 Tech', time: '1 hour ago', type: 'slate', avatar: 'https://i.pravatar.cc/150?u=ahmad' },
    { id: 4, user: 'Dewi Lestari', action: 'Enrolled in', target: 'Meteorology', time: '3 hours ago', type: 'secondary', avatar: 'https://i.pravatar.cc/150?u=dewi' },
    { id: 5, user: 'Rian Hidayat', action: 'Earned 1,200 Miles from', target: 'Technical Ops', time: '5 hours ago', type: 'primary', avatar: 'https://i.pravatar.cc/150?u=rian' },
    { id: 6, user: 'Lina Marlina', action: 'Perfect Score 100 on', target: 'Safety First', time: '8 hours ago', type: 'primary', avatar: 'https://i.pravatar.cc/150?u=lina' },
    { id: 7, user: 'Agus Setiawan', action: 'Started new module', target: 'Crew CRM', time: '12 hours ago', type: 'slate', avatar: 'https://i.pravatar.cc/150?u=agus' },
    { id: 8, user: 'Maya Indah', action: 'Earned 350 Miles from', target: 'DGR Basics', time: '1 day ago', type: 'primary', avatar: 'https://i.pravatar.cc/150?u=maya' },
    { id: 9, user: 'Eko Putra', action: 'Shared Course', target: 'Aviation Tech', time: '2 days ago', type: 'secondary', avatar: 'https://i.pravatar.cc/150?u=eko' },
];

const ActivityFeed = () => (
    <div>
        <h3 className="text-lg font-bold text-main mb-6">Activity Feed</h3>
        <div className="relative h-[380px]">
            <div className="h-full overflow-y-auto pr-2 custom-scrollbar pb-10">
                <ul className="mb-0">
                    {recentActivities.map((activity, idx) => (
                        <li key={activity.id}>
                            <div className="relative pb-6">
                                {idx !== recentActivities.length - 1 ? (
                                    <span className="absolute top-4 left-4 -ml-px h-full w-px bg-slate-50" aria-hidden="true" />
                                ) : null}
                                <div className="relative flex items-start space-x-3">
                                    <UserProfile
                                        imageUrl={activity.avatar}
                                        name={activity.user}
                                        size="xs"
                                        className="mt-0.5 shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <p className="text-3xs font-bold text-main leading-none">{activity.user}</p>
                                            <span className="text-3xs font-bold text-tertiary">{activity.time}</span>
                                        </div>
                                        <p className="text-2xs text-secondary mt-1 leading-tight font-medium">
                                            {activity.action} <span className="font-bold text-main">{activity.target}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Gradient Fade Mask */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-gray-50 dark:from-slate-950 to-transparent pointer-events-none" />
        </div>
    </div>
);

export default ActivityFeed;
