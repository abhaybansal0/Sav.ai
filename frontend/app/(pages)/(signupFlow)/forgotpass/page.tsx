'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"



const ForgotPass = () => {

    const [inputData, setInputData] = useState({
        username_email: ''
    })

    const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;

        setInputData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(inputData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-300 p-4">
            <div className="bg-white/100 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
                {/* Title & Subtitle */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                      Forgot Password
                    </h2>
                    {/* <p className="text-gray-400 mt-2">Join us and explore amazing features!</p> */}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">


                    {/* Email / Username */}
                    <div>
                        <label htmlFor="email" className="block text-gray-400 text-sm font-medium">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="username_email"
                            type="text"
                            value={inputData.username_email}
                            onChange={OnChange}
                            required
                            className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-500"
                            placeholder="Enter your email"
                        />
                    </div>



                    {/* Submit Button */}
                    <div className="flex items-center justify-center pt-4">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                        >
                            Send OTP
                        </button>
                    </div>
                </form>

                {/* Sign-in Redirect */}
                <p className="text-center text-gray-700 mt-4">
                    Dont have an account?{' '}
                    <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>


    );
};

export default ForgotPass;