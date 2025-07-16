'use client'

import { useState, useEffect } from "react";
import Link from "next/link"
import toast from "react-hot-toast";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Check, X } from 'lucide-react';

const ChangePass = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showRePassword, setShowRePassword] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [inputData, setInputData] = useState({
        password: '',
        repassword: ''
    })

    // Password strength indicators
    const [passwordStrength, setPasswordStrength] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    })

    useEffect(() => {
        setIsVisible(true);

        // Check if token exists
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get("token");

        if (!token) {
            toast.error('Invalid reset link');
            router.push('/login');
        }
    }, [router]);

    // Password strength checker
    useEffect(() => {
        const password = inputData.password;
        setPasswordStrength({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*]/.test(password)
        });
    }, [inputData.password]);

    // Button disabled state
    useEffect(() => {
        const isPasswordValid = passwordStrength.length &&
            passwordStrength.uppercase &&
            passwordStrength.lowercase &&
            passwordStrength.number;

        const passwordsMatch = inputData.password === inputData.repassword &&
            inputData.password.trim() !== '';

        setButtonDisabled(!isPasswordValid || !passwordsMatch);
    }, [inputData, passwordStrength]);

    const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const ChangePass = async (e: React.FormEvent) => {
        e.preventDefault();

        // Client-side validation
        if (inputData.password !== inputData.repassword) {
            return toast.error('Passwords do not match!');
        }

        if (inputData.password.length < 8) {
            return toast.error('Password must be at least 8 characters long!');
        }

        setLoading(true);

        try {
            const searchParams = new URLSearchParams(window.location.search);
            const verifyToken = searchParams.get("token");

            if (!verifyToken) {
                return toast.error('Invalid reset token!');
            }

            const response = await axios.post('/api/auth/changepass', {
                token: verifyToken,
                newPassword: inputData.password
            });

            if (response.data.success) {
                toast.success('Password changed successfully!');
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1500);
            }

        } catch (error: unknown) {
            if (isAxiosError(error)) {

                console.error('Password reset error:', error);

                const errorMessage = error.response?.data?.message;

                switch (errorMessage) {
                    case 'Invalid or expired password reset token!':
                        toast.error('Reset link has expired. Please request a new one.');
                        setTimeout(() => router.push('/forgot-password'), 2000);
                        break;
                    case 'Token and new password are required!':
                        toast.error('Missing required fields!');
                        break;
                    case 'Password must be at least 6 characters long!':
                        toast.error('Password is too short!');
                        break;
                    default:
                        toast.error('Failed to reset password. Please try again.');
                }

            } else if (error instanceof Error) {
                console.error("Something went wrong:", error.message);
            }
            else {
                // totally unexpected
                console.error("Unknown error", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
            {/* Back button */}
            <button
                onClick={() => router.push('/login')}
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
                    <p className="text-gray-600 text-lg">Create a strong new password</p>
                </div>

                {/* Form */}
                <form onSubmit={ChangePass} className="space-y-6">
                    {/* New Password */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={inputData.password}
                                onChange={OnChange}
                                required
                                className="w-full px-4 py-3 pr-12 text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Password strength indicators */}
                        {inputData.password && (
                            <div className="space-y-2 mt-3">
                                <p className="text-xs font-medium text-gray-600">Password must contain:</p>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className={`flex items-center gap-1 ${passwordStrength.length ? 'text-green-600' : 'text-gray-400'}`}>
                                        {passwordStrength.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                        At least 8 characters
                                    </div>
                                    <div className={`flex items-center gap-1 ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                                        {passwordStrength.uppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                        One uppercase letter
                                    </div>
                                    <div className={`flex items-center gap-1 ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                                        {passwordStrength.lowercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                        One lowercase letter
                                    </div>
                                    <div className={`flex items-center gap-1 ${passwordStrength.number ? 'text-green-600' : 'text-gray-400'}`}>
                                        {passwordStrength.number ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                        One number
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label htmlFor="repassword" className="block text-gray-700 text-sm font-semibold">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="repassword"
                                name="repassword"
                                type={showRePassword ? "text" : "password"}
                                value={inputData.repassword}
                                onChange={OnChange}
                                required
                                className="w-full px-4 py-3 pr-12 text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                placeholder="Re-enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowRePassword(!showRePassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showRePassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Password match indicator */}
                        {inputData.repassword && (
                            <div className={`text-xs flex items-center gap-1 mt-1 ${inputData.password === inputData.repassword ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {inputData.password === inputData.repassword ?
                                    <><Check className="w-3 h-3" /> Passwords match</> :
                                    <><X className="w-3 h-3" /> Passwords do not match</>
                                }
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={buttonDisabled || loading}
                            className={`w-full py-4 bg-blue-600 text-white font-medium rounded-full shadow-lg transform transition-all duration-200 relative overflow-hidden group
                                ${loading ? 'animate-pulse' : ''}
                                ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:scale-105 hover:shadow-xl'}
                            `}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Resetting Password...
                                    </>
                                ) : 'Reset Password'}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </button>
                    </div>
                </form>

                {/* Help text */}
                <p className="text-center text-gray-600 mt-8">
                    Remember your password?{' '}
                    <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                        Back to login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ChangePass;