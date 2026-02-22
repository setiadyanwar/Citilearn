import React, { useState, useRef } from 'react';
import { LogOut, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfileBanner from '../components/ProfileBanner';
import ProfileInfoCard from '../components/ProfileInfoCard';
import { useAuthContext } from '@/contexts/useAuthContext';

const MyProfile = () => {
    const { user } = useAuthContext();
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);

    const handleEditPhoto = () => {
        alert('Edit Photo Clicked');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="pb-10 w-full space-y-8 animate-fade-in">
            {/* Banner Section */}
            <ProfileBanner user={user} onEditPhoto={handleEditPhoto} />

            {/* Basic Information */}
            <ProfileInfoCard title="Basic Information">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-12">
                    {/* Column 1 */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-main">Full Name</label>
                            <p className="text-secondary font-medium">Setiady Ibrahim Anwar</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-main">Division</label>
                            <p className="text-secondary font-medium">HCIS Development</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-main">Email</label>
                            <p className="text-secondary font-medium">setiadyanwar@gmail.com</p>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Unit</label>
                            <p className="text-secondary font-medium">JKT48X</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Jenis Kelamin</label>
                            <p className="text-secondary font-medium">Laki-laki</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-main">Join Date</label>
                            <p className="text-secondary font-medium">12-01-2021</p>
                        </div>
                    </div>

                    {/* Column 3 - Resume */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-main">CV/Resume</label>
                        <div
                            onClick={handleButtonClick}
                            className="group cursor-pointer border border-dashed border-gray-300 hover:border-citilearn-green rounded-xl flex items-center h-12 overflow-hidden bg-gray-50/30 hover:bg-white transition-all duration-200"
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept=".pdf"
                            />
                            <div className="h-full w-[30%] min-w-[120px] bg-gray-100 group-hover:bg-citilearn-green group-hover:text-white text-secondary font-bold text-sm px-4 flex items-center justify-center transition-colors border-r border-gray-200">
                                Choose File
                            </div>
                            <span className={`w-[70%] px-4 text-sm truncate border-none outline-none ${!fileName ? 'text-tertiary italic' : 'text-main font-medium'}`}>
                                {fileName || 'Upload your CV (PDF max 2MB)'}
                            </span>
                        </div>
                        <p className="text-xs text-secondary mt-1">document .pdf</p>
                    </div>
                </div>
            </ProfileInfoCard>

            {/* Biografi */}
            <ProfileInfoCard title="Biografi">
                <textarea
                    className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:border-citilearn-green focus:ring-2 focus:ring-citilearn-green/20 outline-none resize-none text-gray-600 placeholder:text-tertiary transition-all font-medium"
                    placeholder="Write here..."
                ></textarea>
            </ProfileInfoCard>

            {/* Logout Button */}
            <div className="flex justify-end pt-4">
                <Button
                    variant="destructive"
                    className="py-6 px-8 rounded-xl font-bold flex items-center gap-2 text-base"
                >
                    <LogOut size={18} />
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default MyProfile;
