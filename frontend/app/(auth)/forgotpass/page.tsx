'use client'

import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import Link from "next/link"
import toast from "react-hot-toast";
import { ArrowLeft, Mail, Clock } from 'lucide-react';

const ForgotPass = () => {
    const INITIAL_COUNT = 120

    const [inputData, setInputData] = useState({
        username_email: ''
    })

    const [ButtonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [counter, setCounter] = useState<number>(INITIAL_COUNT);
    const [sendDisabled, setSendDisabled] = useState(false)
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            if (inputData.username_email.trim() === '') {
                return toast.error('Please enter your email address')
            }

            const response = await axios.post('/api/auth/forgotpass', inputData)

            if (response.data.success) {
                toast.success('Password reset link sent to your email!')
            }

            setCounter(INITIAL_COUNT);
            setSendDisabled(true);

        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.response?.data.message === 'User does not exist') {
                    toast.error('No account found with this email')
                }
                else if (error.response?.data.message === 'Server Crashed!') {
                    toast.error('Server error. Please try again later')
                }
                console.log(error)
            } else if (error instanceof Error) {
                console.error("Something went wrong:", error.message);
            } else {
                console.error("Unknown error", error);
            }
        } finally {
            setLoading(false)
            setButtonDisabled(true)
        }
    };

    // Format MM:SS
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // Use Effects
    useEffect(() => {
        if (inputData.username_email.trim() === '') {
            setButtonDisabled(true)
        }
        else {
            setButtonDisabled(false)
        }
    }, [inputData])

    // Handle countdown
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (sendDisabled) {
            timer = setInterval(() => {
                setCounter(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setSendDisabled(false);
                        setButtonDisabled(false)
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [sendDisabled]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50/50 to-white">
            {/* Back button */}
            <button
                onClick={() => window.history.back()}
                className="absolute left-6 top-6 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 z-10"
            >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Form Container */}
            <div className={`bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-md w-full border border-white/50 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Title & Subtitle */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mb-3">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Reset Password
                        </span>
                    </h2>
                    <p className="text-gray-600 text-lg">We'll send you a reset link</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email / Username */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                name="username_email"
                                type="email"
                                disabled={sendDisabled}
                                value={inputData.username_email}
                                onChange={OnChange}
                                required
                                className={`w-full px-4 py-3 pl-12 text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200 placeholder-gray-400
                                    ${sendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Enter your registered email"
                            />
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Info Message when countdown is active */}
                    {sendDisabled && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm text-blue-900 font-medium">Check your email!</p>
                                <p className="text-xs text-blue-700 mt-1">
                                    We've sent a password reset link to your email address. 
                                    You can request a new link in {formatTime(counter)}.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={ButtonDisabled}
                            className={`w-full py-4 text-white font-medium rounded-full shadow-lg transform transition-all duration-200 relative overflow-hidden group
                                ${loading ? 'animate-pulse' : ''}
                                ${ButtonDisabled || sendDisabled ? 'opacity-50 cursor-not-allowed bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 hover:shadow-xl'}
                            `}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        {sendDisabled ? (
                                            <>
                                                <Clock className="w-5 h-5" />
                                                Resend in {formatTime(counter)}
                                            </>
                                        ) : 'Send Reset Link'}
                                    </>
                                )}
                            </span>
                            {!ButtonDisabled && !sendDisabled && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            )}
                        </button>
                    </div>
                </form>

                {/* Bottom Links */}
                <div className="mt-8 space-y-3">
                    <p className="text-center text-gray-600">
                        Remember your password?{' '}
                        <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                            Sign in
                        </Link>
                    </p>
                    <p className="text-center text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;