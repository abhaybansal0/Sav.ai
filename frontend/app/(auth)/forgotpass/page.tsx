'use client'

import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import Link from "next/link"
import Image from "next/image";
import toast from "react-hot-toast";



const ForgotPass = () => {


    { /* Use States */ }

    const INITIAL_COUNT = 120

    const [inputData, setInputData] = useState({
        username_email: ''
    })

    const [ButtonDisabled, setButtonDisabled] = useState(true)

    const [loading, setLoading] = useState(false)

    const [counter, setCounter] = useState<number>(INITIAL_COUNT);
    const [sendDisabled, setSendDisabled] = useState(false)


    const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    { /* Functions */ }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        // setButtonDisabled(true)
        try {

            if (inputData.username_email.trim() === '') {
                return toast.error('No Email is Entered!')
            }

            const response = await axios.post('/api/auth/forgotpass', inputData)

            if (response.data.success) {
                toast.success('Link Sent Successfully!')
            }

            setCounter(INITIAL_COUNT);
            setSendDisabled(true);


        } catch (error: unknown) {
            if (isAxiosError(error)) {

                if (error.response?.data.message === 'User does not exist') {
                    toast.error('Email is not Registered!')
                }
                else if (error.response?.data.message === 'Server Crashed!') {
                    toast.error('Servers are Down')
                }
                console.log(error)

                console.log(inputData);
            } else if (error instanceof Error) {
                console.error("Something went wrong:", error.message);
            } else {
                // totally unexpected
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



    // {Use Effects}

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-300 p-4">

            <Link href={"/"}>
                <Image src="./home.svg" alt="Home" width={40} height={40} className="absolute left-2 top-2 " />
            </Link>

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
                            disabled={sendDisabled}
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
                            disabled={ButtonDisabled}
                            className={`w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform  
                                flex justify-center align-middle gap-4
                                ${loading ? 'animate-pulse cursor-not-allowed' : ''}
                                ${ButtonDisabled ? 'cursor-not-allowed' : 'hover:scale-105'}
                                ${sendDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed hover:!bg-gray-400' : ''}
                                `}
                        >
                            {loading ? (
                                <Image src={'./loading.svg'} alt="loader" width={25} height={25}
                                    className="animate-spin"
                                />

                            ) : (
                                <>
                                    {sendDisabled ? `Resend in ${formatTime(counter)}` : "Send Email"}
                                </>
                            )}
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