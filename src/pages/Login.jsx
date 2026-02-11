import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import loginImageDay from '../assets/login-left-image.png';
import loginImageNight from '../assets/left-image-night.png';

const LoginPage = () => {
    const [loginMethod, setLoginMethod] = useState('sso'); // 'sso' or 'email'
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        // Simulate network delay for realistic experience
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 1. Empty Check
        if (!email || email.trim() === '') {
            setError("Email address is required to sign in.");
            setIsLoading(false);
            return;
        }

        // 2. Format Validaion
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format. Please enter a valid email address.");
            setIsLoading(false);
            return;
        }

        // 3. Domain Validation (Citilink only)
        if (!email.endsWith('@citilink.co.id')) {
            setError("Access restricted. Please use your official @citilink.co.id email address.");
            setIsLoading(false);
            return;
        }

        // 4. Enterprise Edge Cases Simulation
        if (email.startsWith('locked')) {
            setError("Account locked due to multiple failed attempts. Please contact IT Helpdesk.");
            setIsLoading(false);
            return;
        }

        if (email.startsWith('suspended')) {
            setError("Your account has been suspended. Please contact HR for assistance.");
            setIsLoading(false);
            return;
        }

        // 5. Success State
        setSuccess("A secured login link has been sent to your email. Please check your inbox.");
        setIsLoading(false);
        console.log("Login link sent to:", email);
    };

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

                    {/* Login Tabs */}
                    <div className="flex bg-citilink-gray p-1.5 rounded-2xl-m mb-8">
                        <button
                            disabled={isLoading}
                            onClick={() => {
                                setLoginMethod('sso');
                                setError(null);
                                setSuccess(null);
                            }}
                            className={`flex-1 py-3 px-4 rounded-xl text-base transition-all duration-200 ${loginMethod === 'sso'
                                ? 'bg-white text-primary font-medium'
                                : 'text-main font-regular hover:text-secondary'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            Sign in with SSO
                        </button>
                        <button
                            disabled={isLoading}
                            onClick={() => {
                                setLoginMethod('email');
                                setError(null);
                                setSuccess(null);
                            }}
                            className={`flex-1 py-3 px-4 rounded-xl text-base transition-all duration-200 ${loginMethod === 'email'
                                ? 'bg-white text-primary font-medium'
                                : 'text-main font-regular hover:text-secondary'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            Sign in with Email
                        </button>
                    </div>

                    {/* Method Content */}
                    <div className="min-h-[160px]">
                        {error && (
                            <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <Alert variant="success">
                                    <CheckCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        {success}
                                    </AlertDescription>
                                </Alert>
                            </div>
                        )}

                        {loginMethod === 'sso' ? (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <Button
                                    variant="outline"
                                    size="xl"
                                    disabled={isLoading}
                                    onClick={() => {
                                        setError(null);
                                        setSuccess(null);
                                    }}
                                    className="w-full bg-white border-gray-100 hover:bg-gray-50 text-main rounded-xl font-semibold flex items-center justify-center gap-3 transition-all active:scale-[0.99]"
                                >
                                    <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="9" height="9" fill="#F25022" />
                                        <rect x="11.5" y="0.5" width="9" height="9" fill="#7FBA00" />
                                        <rect x="0.5" y="11.5" width="9" height="9" fill="#00A4EF" />
                                        <rect x="11.5" y="11.5" width="9" height="9" fill="#FFB900" />
                                    </svg>
                                    Continue With SSO Microsoft
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <Input
                                    type="email"
                                    variant="filled"
                                    size="lg"
                                    icon={Mail}
                                    disabled={isLoading}
                                    placeholder="example@citilink.co.id"
                                    className="rounded-xl"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (error) setError(null);
                                        if (success) setSuccess(null);
                                    }}
                                />
                                <Button
                                    size="xl"
                                    onClick={handleLogin}
                                    disabled={isLoading || !email || email.trim() === ''}
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-base transition-all active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-400 disabled:opacity-100 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Sending Login Link...
                                        </>
                                    ) : (
                                        "Send Email"
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>

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

