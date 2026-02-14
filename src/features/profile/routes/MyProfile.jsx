import React from 'react';
import { Mail, Edit, Upload, LogOut } from 'lucide-react';
import budi_pratama from '@/assets/budi_pratama.png';
import Badge from '@/components/common/Badge';

const MyProfile = () => {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Banner Section */}
            <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-cyan-500 to-blue-400 p-8 md:p-10 flex items-center justify-between text-white">
                {/* Content */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 z-10">
                    <div className="relative shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full ring-4 ring-white/30 overflow-hidden bg-white">
                            <img src={budi_pratama} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                            <span className="bg-citilearn-green text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white">
                                Boarding
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">Setiady Ibrahim Anwar</h1>
                        <p className="flex items-center gap-2 text-white/90 text-sm md:text-base font-medium">
                            setiadyanwar@gmail.com
                        </p>
                        <button className="mt-2 inline-flex items-center gap-2 bg-white text-cyan-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/90 transition-colors">
                            <Edit size={16} />
                            Edit Photo
                        </button>
                    </div>
                </div>

                {/* Decorative Elements (Plane Wing Abstract) */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block opacity-20 pointer-events-none">
                    {/* Placeholder for plane graphic - functionality over pixel-perfect asset for now */}
                    <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-current">
                        <path d="M0,200 L100,0 L200,200 Z" />
                    </svg>
                </div>
                {/* Cloud decorations */}
                <div className="absolute top-10 right-20 text-white/30 hidden md:block">
                    <svg width="60" height="40" viewBox="0 0 60 40" fill="currentColor">
                        <path d="M20,30 Q30,10 50,20 T60,30 H20 Z" />
                    </svg>
                </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-400 mb-6">Basic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-12">
                    {/* Column 1 */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Full Name</label>
                            <p className="text-gray-500 font-medium">SETIADY IBRAHIM ANWAR</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Division</label>
                            <p className="text-gray-500 font-medium">HCIS Development</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Email</label>
                            <p className="text-gray-500 font-medium">setiadyanwar@gmail.com</p>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Unit</label>
                            <p className="text-gray-500 font-medium">JKT48X</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Jenis Kelamin</label>
                            <p className="text-gray-500 font-medium">Laki-laki</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Join Date</label>
                            <p className="text-gray-500 font-medium">12-01-2021</p>
                        </div>
                    </div>

                    {/* Column 3 - Resume */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-main">CV/Resume</label>
                        <div className="border border-citilearn-green rounded-xl flex items-center overflow-hidden bg-white">
                            <button className="bg-white text-citilearn-green font-bold text-sm px-4 py-2 hover:bg-gray-50 transition-colors">
                                Choose File
                            </button>
                            <span className="flex-1 px-3 py-2 text-sm text-gray-600 truncate border-l border-gray-100">
                                cv-setiady.pdf
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">document .pdf</p>
                    </div>
                </div>
            </div>

            {/* Biografi */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-400 mb-6">Biografi</h3>
                <textarea
                    className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:border-citilearn-green focus:ring-2 focus:ring-citilearn-green/20 outline-none resize-none text-gray-600 placeholder:text-gray-400 transition-all font-medium"
                    placeholder="Write here..."
                ></textarea>
            </div>

            {/* Logout Button */}
            <div className="flex justify-end pt-4">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all flex items-center gap-2">
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default MyProfile;
