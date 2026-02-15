import React from 'react';
import loginImageDay from '@/assets/login-left-image.png';
import loginImageNight from '@/assets/left-image-night.png';
import LoginForm from '@/features/auth/components/LoginForm';

const LoginPage = () => {
    // Get current time to determine image
    // Day: 4 AM (04:00) to 4 PM (16:00)
    // Night: 4 PM (16:00) to 4 AM (04:00)
    const hour = new Date().getHours();
    const isNight = hour >= 16 || hour < 4;
    const loginImage = isNight ? loginImageNight : loginImageDay;

    return (
        <div className="flex h-screen w-full bg-white overflow-hidden font-lato">
            {/* Left Section - Image */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden rounded-r-xl">
                <img
                    src={loginImage}
                    alt="Citilink Citilearn"
                    className="w-full h-full object-cover transition-opacity duration-500"
                />
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 bg-white lg:bg-gray-50/30">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;

