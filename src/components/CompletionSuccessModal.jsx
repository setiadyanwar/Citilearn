import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Plane } from 'lucide-react';

const CompletionSuccessModal = ({ isOpen }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl dark:shadow-none flex flex-col items-center justify-center relative overflow-hidden max-w-sm w-full mx-4 border border-transparent dark:border-slate-800"
                    >
                        {/* Animated Background Rays */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent dark:from-primary/10 z-0"
                        />

                        {/* Flying Plane Animation */}
                        <motion.div
                            initial={{ x: -200, y: 50, scale: 0.5 }}
                            animate={{ x: 200, y: -50, scale: 1.2 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute text-primary/20 dark:text-primary/10 z-0"
                        >
                            <Plane size={150} />
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative z-10 flex flex-col items-center"
                        >
                            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-200/50 dark:shadow-none">
                                <CheckCircle2 size={40} className="text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-1">Awesome!</h3>
                            <p className="text-gray-500 dark:text-slate-400 font-bold text-sm">Lesson Completed</p>
                        </motion.div>

                        {/* Decorative Plane (Smaller, fast) */}
                        <motion.div
                            initial={{ x: -300, y: 100 }}
                            animate={{ x: 300, y: -100 }}
                            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                            className="absolute text-primary z-20"
                        >
                            <Plane size={24} fill="currentColor" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CompletionSuccessModal;
