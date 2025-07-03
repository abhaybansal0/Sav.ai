'use client'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";
import axios from 'axios';



const Form = () => {

    const Router = useRouter();

    const [inputData, setInputData] = useState({
        username_email: '',
        password: ''
    })

    const [ButtonDisabled, setButtonDisabled] = useState(false)


    async function submitAction(e: React.FormEvent) {
        e.preventDefault();

        try {

            if (inputData.password.trim() === '' || inputData.username_email.trim() === '') {
                return toast.error('All Fields are Required!')
            }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/login`,
                inputData,
                { withCredentials: true }
            );

            console.log(res.data);

            Router.push('/dashboard')
            return toast.success('Signed In Successfully!');

        } catch (error: any) {

            if (error.response.data.message === 'Insufficient Credentials!' ||
                error.response.data.message === "Incorrect Credentials!"
            ) {
                toast.error('Please Check your credentials!')
            }
            else if (error.response.data.message === 'No Such User Found!') {
                toast.error('No User Found!')
            }
            else if (error.response.data.message === 'Server Crashed!') {
                toast.error('Server Crashed!')
            }

            else throw error
        }
    };



    useEffect(() => {
        if (inputData.password.trim() === '' ||
            inputData.username_email.trim() === '') {
            return
        }
        else {
            setButtonDisabled(false)
        }

    }, [ButtonDisabled])

    const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        setInputData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <form onSubmit={submitAction} className="mt-6 space-y-5">


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
                    placeholder="Enter your email or username"
                />
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password" className="block text-gray-400 text-sm font-medium">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={inputData.password}
                    onChange={OnChange}
                    required
                    className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-500"
                    placeholder="Enter your password"
                />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center pt-4">
                <button
                    type="submit"
                    disabled={ButtonDisabled}
                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                >
                    Sign In
                </button>
            </div>
        </form>
    )
}

export default Form
