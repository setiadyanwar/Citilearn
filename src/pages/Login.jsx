import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginImage from '../assets/login-left-image.png';

const LoginPage = () => {
    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            {/* Left Section - Image */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden rounded-r-xl">
                <img
                    src={loginImage}
                    alt="Citilink Citilearn"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white lg:bg-gray-50/30">
                <div className="w-full max-w-md p-10 bg-white rounded-4xl">
                    {/* Logo & Header */}
                    <div className="mb-10 text-left">
                        <div className="mb-6 flex items-center">
                            <img src="/Logo/Mark.svg" alt="Citilink Logo" className="w-12 h-12 object-contain" />
                        </div>
                        <h1 className="text-3xl font-bold text-main tracking-tight mb-2">Welcome to Citilearn</h1>
                        <p className="text-tertiary text-sm font-medium">Let's learn and grow up together</p>
                    </div>

                    <form className="space-y-7">
                        <div>
                            <Label htmlFor="email" className="block text-sm font-semibold text-secondary mb-2.5">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="setiadyibrahim@gmail.com"
                                className="bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all h-11 rounded-xl px-5 text-sm"
                            />
                        </div>

                        <div>
                            <Label htmlFor="password" className="block text-sm font-semibold text-secondary mb-2.5">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••"
                                className="bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all h-11 rounded-xl px-5 text-sm"
                            />
                        </div>

                        <div className="pt-2">
                            <Button type="submit" className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-white rounded-xl transition-all active:scale-[0.98]">
                                Login
                            </Button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="text-center text-sm text-gray-500 mt-10 font-medium">
                        Don't have access yet?
                        <a href="#" className="text-primary hover:underline font-bold ml-1">
                            Contact the HC Administrator.
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
