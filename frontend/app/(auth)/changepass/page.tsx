'use client'

import { useState, useEffect } from "react";
import Link from "next/link"
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";



const SignupPage = () => {

    const Router = useRouter();

    const [ButtonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [inputData, setInputData] = useState({
        password: '',
        repassword: ''
    })




    { /* Functions */ }

    const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const ChangePass = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const SearchParams = new URLSearchParams(window.location.search)
            const verifyToken = SearchParams.get("token");

            if (inputData.password.trim() === '' || inputData.repassword.trim() === '' ||
                inputData.password !== inputData.repassword) {
                return toast.error('Passwords Dont Match!')
            }

            const response = await axios.post('/api/auth/changepass', {
                token: verifyToken,
                newPassword: inputData.password
            })

            if (response.data.success) {
                toast.success('Password Changed and Signed In!');
                Router.push('/dashboard')
            }

        } catch (error: any) {
            console.log(error)

            if (error.response.data.message === 'Password must be at least 6 characters long!') {
                toast('Password must be longer than 6 characters')
            }
            else if (error.response.data.message === 'Invalid or expired password reset token!') {
                toast.error('Token Expired!')
            }
            else if (error.response.data.message === 'Token and new password are required!') {
                toast.error('Missing Fields!')
            }
            else {
                toast.error('Server Issue, Please try again later');
            }
        }
    };


    // useEffect(() => {
    //     if (inputData.password.trim() !==
    //         inputData.repassword.trim()) {
    //         setButtonDisabled(true)
    //         return
    //     }
    //     else {
    //         setButtonDisabled(false)
    //     }

    // }, [inputData])


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-300 p-4">

            <Link href={"/"}>
                <Image src="./home.svg" alt="Home" width={40} height={40} className="absolute left-2 top-2 " />
            </Link>

            <div className="bg-white/100 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
                {/* Title & Subtitle */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Change Password
                    </h2>
                    {/* <p className="text-gray-400 mt-2">Join us and explore amazing features!</p> */}
                </div>

                {/* Form */}
                <form onSubmit={ChangePass} className="mt-6 space-y-5">


                    {/* Email / Username */}
                    <div>
                        <label htmlFor="newpass" className="block text-gray-400 text-sm font-medium">
                            New Password
                        </label>
                        <input
                            id="newpass"
                            name="password"
                            type="text"
                            value={inputData.password}
                            onChange={OnChange}
                            required
                            className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-500"
                            placeholder="Enter new password"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-gray-400 text-sm font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            name="repassword"
                            type="password"
                            value={inputData.repassword}
                            onChange={OnChange}
                            required
                            className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-500"
                            placeholder="Renter your password"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-center pt-4">
                        <button
                            type="submit"
                            className={`w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md transition-transform transform  
                                            flex items-center justify-center gap-4 hover:bg-blue-700
                                            ${loading ? 'animate-pulse cursor-not-allowed' : ''}
                                                
                                        `}
                        >
                            {loading ?
                                (
                                    <Image src="./loading.svg" alt="loader" className='animate-spin ' width={25} height={25} />

                                ) : "Confirm"}

                        </button>
                    </div>
                </form>

                {/* Sign-in Redirect */}
                <p className="text-center text-gray-700 mt-8">
                    Dont have an account?{' '}
                    <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>


    );
};

export default SignupPage;