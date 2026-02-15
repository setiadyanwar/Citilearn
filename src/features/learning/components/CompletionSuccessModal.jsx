import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Plane } from 'lucide-react';

const CompletionSuccessModal = ({ isOpen, onContinue }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden max-w-sm w-full mx-4 border border-transparent dark:border-slate-800"
                    >
                        {/* Animated Background Rays */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent dark:from-primary/10 z-0"
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
                            className="relative z-10 flex flex-col items-center w-full"
                        >
                            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 size={40} className="text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-main dark:text-white mb-1">Awesome!</h3>
                            <p className="text-secondary dark:text-slate-400 font-bold text-sm mb-8">Lesson Completed</p>

                            <button
                                onClick={onContinue}
                                className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 group"
                            >
                                Continue to next lesson
                                <motion.div
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <Plane size={18} className="rotate-90 group-hover:translate-x-1 transition-transform" />
                                </motion.div>
                            </button>
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
