import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, ShieldCheck } from 'lucide-react';

const LessonContent = ({ activeLesson, course, isPip, videoContainerRef, videoRef }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            ref={videoContainerRef}
            className="bg-transparent relative w-full aspect-video z-20"
        >
            <motion.div
                initial={false}
                animate={isPip && (activeLesson?.type === 'video' || activeLesson?.type === 'youtube') ? {
                    position: "fixed",
                    bottom: isMobile ? 16 : 24,
                    right: isMobile ? 16 : 24,
                    width: isMobile ? 240 : 320,
                    height: isMobile ? 135 : 180,
                    borderRadius: 12,
                    zIndex: 50
                } : {
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: 16,
                    zIndex: 0
                }}
                transition={{ duration: 0 }}
                className="bg-black overflow-hidden group border border-gray-900/10 dark:border-slate-800"
            >
                {isPip && (activeLesson?.type === 'video' || activeLesson?.type === 'youtube') && (
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="p-1.5 bg-black/50 text-white rounded-full hover:bg-primary backdrop-blur-sm"
                        >
                            <Maximize2 size={14} />
                        </button>
                    </div>
                )}

                {activeLesson?.type === 'quiz' ? (
                    <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                        <div className="relative z-10 space-y-6 max-w-md">
                            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20">
                                <ShieldCheck size={40} className="text-primary animate-pulse" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white mb-2">Final Knowledge Check</h2>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    You have reached the end of this module. Complete this comprehensive assessment to validate your learning and proceed to the next stage.
                                </p>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                    <div className="text-[10px] uppercase font-black text-slate-500 mb-1">Pass Score</div>
                                    <div className="text-sm font-bold text-white">100%</div>
                                </div>
                                <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                    <div className="text-[10px] uppercase font-black text-slate-500 mb-1">Time Limit</div>
                                    <div className="text-sm font-bold text-white">No Limit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : activeLesson?.type === 'video' ? (
                    <video
                        ref={videoRef}
                        src={activeLesson.content}
                        controls={!(isPip && (activeLesson?.type === 'video' || activeLesson?.type === 'youtube'))}
                        className="w-full h-full object-cover"
                        autoPlay={false}
                    />
                ) : activeLesson?.type === 'youtube' ? (
                    <iframe
                        src={activeLesson?.content}
                        title="Content"
                        className="w-full h-full border-none"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : activeLesson?.type === 'pdf' ? (
                    <object
                        data={`${activeLesson?.content}#view=FitH`}
                        type="application/pdf"
                        className="w-full h-full rounded-xl bg-white dark:bg-slate-900"
                    >
                        <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400">
                            <p className="font-bold mb-2">Unable to display PDF directly.</p>
                            <a
                                href={activeLesson?.content}
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary font-bold hover:underline"
                            >
                                Download PDF to view
                            </a>
                        </div>
                    </object>
                ) : (
                    <iframe
                        src={activeLesson?.content}
                        title="Content"
                        className="w-full h-full border-none"
                    />
                )}

                {isPip && (activeLesson?.type === 'video' || activeLesson?.type === 'youtube') && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4 pointer-events-none">
                        <p className="text-xs font-bold text-white truncate">{activeLesson.title}</p>
                        <p className="text-[10px] text-gray-300 truncate">{course.title}</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default LessonContent;
