import React, { useRef, useEffect } from 'react';
import Card from '@/components/common/Card';
import { VideoOff } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProctoringCamera = ({ isPostTest, cameraActive, videoRef }) => {
    if (!isPostTest) return null;

    return (
        <Card
            className={cn(
                "pointer-events-auto transition-all duration-300",
                // Mobile Styles
                "overflow-hidden bg-black dark:bg-black relative flex items-center justify-center", // Base styles
                // Mobile Styles
                "fixed bottom-6 right-6 w-32 aspect-3/4 z-50 shadow-2xl border-2 border-white dark:border-slate-800",
                // Tablet Adjustments
                "md:w-48 md:aspect-video",
                // Desktop Styles (Reset to Sidebar)
                "lg:static lg:w-full lg:aspect-video lg:shadow-none lg:border-0 lg:z-auto"
            )}
            padding="p-0"
            rounded="rounded-xl lg:rounded-2xl"
        >
            {cameraActive ? (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform scale-x-[-1]"
                />
            ) : (
                <div className="flex flex-col items-center text-slate-500">
                    <VideoOff className="w-8 h-8 mb-2" />
                    <span className="text-xs">Camera Inactive</span>
                </div>
            )}

            <div className="absolute top-3 left-3 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
        </Card>
    );
};

export default ProctoringCamera;
