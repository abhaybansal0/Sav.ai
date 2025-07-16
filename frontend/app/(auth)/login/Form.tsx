'use client'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from 'axios';

const Form = () => {
    const Router = useRouter();

    const [inputData, setInputData] = useState({
        username_email: '',
        password: ''
    })

    const [ButtonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    async function submitAction(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            if (inputData.password.trim() === '' || inputData.username_email.trim() === '') {
                setLoading(false);
                return toast.error('All Fields are Required!')
            }

            const res = await axios.post(`/api/auth/login`,
                inputData,
                { withCredentials: true }
            );

            console.log(res.data);

            Router.push('/dashboard')
            toast.success('Signed In Successfully!');

        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.response?.data.message === 'Invalid credentials!') {
                    toast.error('Please check your credentials!')
                }
                else {
                    toast.error('Empty Fields!')
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

    useEffect(() => {
        if (inputData.password.trim() === '' ||
            inputData.username_email.trim() === '') {
            setButtonDisabled(true)
        }
        else {
            setButtonDisabled(false)
        }
    }, [inputData])

    const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <form onSubmit={submitAction} className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Email / Username */}
            <div className="space-y-2">
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold">
                    Email or Username
                </label>
                <input
                    id="email"
                    name="username_email"
                    type="text"
                    value={inputData.username_email}
                    onChange={OnChange}
                    required
                    className="w-full px-4 py-3 text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    placeholder="Enter your email or username"
                />
            </div>

            {/* Password */}
            <div className="space-y-2">
                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={inputData.password}
                    onChange={OnChange}
                    required
                    className="w-full px-4 py-3 text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    placeholder="Enter your password"
                />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
                <button
                    type="submit"
                    disabled={ButtonDisabled || loading}
                    className={`w-full py-4 bg-blue-600 text-white font-medium rounded-full shadow-lg transform transition-all duration-200 relative overflow-hidden group
                        ${loading ? 'animate-pulse' : ''}
                        ${ButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:scale-105 hover:shadow-xl'}
                    `}
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </>
                        ) : 'Continue'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
            </div>
        </form>
    )
}

export default Form