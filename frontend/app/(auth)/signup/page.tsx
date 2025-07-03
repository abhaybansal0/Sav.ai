'use client'

import { useEffect, useState } from "react";
import Link from "next/link"
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'


const SignupPage = () => {

  const router = useRouter()

  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const signMeUp = async (e: React.FormEvent) => {

    setButtonDisabled(true);
    setLoading(true);
    try {
      e.preventDefault();

      const response = await axios.post("/api/signup", inputData)

      toast.success('Account Successfully Created!')
      setTimeout(() => {
        router.push('/signup/forward')      
      }, 2000);

      
    } catch (error: any) {
      

      if (error.response.data.message === 'User Already Exists!') {
        toast.error("User Already Exists")
      }

      else if (error.response.data.message === 'Username Not Available') {
        toast("Username Not Available!")
      }
      else {

        console.log(error);
      }
    }
    setButtonDisabled(false);
    setLoading(false);
  };


  useEffect(() => {
    if (inputData.username.trim() === "" ||
      inputData.email.trim() === "" ||
      inputData.password.trim() === "") {
      setButtonDisabled(true)
    }
    else {
      setButtonDisabled(false)
    }
  }, [inputData])



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-300 p-4">

      <Link href={"/"}>
        <Image src="./home.svg" alt="Home" width={40} height={40} className="absolute left-2 top-2 " />
      </Link>

      <div className="bg-white/100 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
        {/* Title & Subtitle */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
          {/* <p className="text-gray-400 mt-2">Join us and explore amazing features!</p> */}
        </div>

        {/* Form */}
        <form onSubmit={signMeUp} className="mt-6 space-y-5">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-gray-400 text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={inputData.username}
              onChange={OnChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-500"
              placeholder="Enter your username"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-400 text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={inputData.email}
              onChange={OnChange}
              required
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-500"
              placeholder="Enter your email"
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
          <div>

            <button
              className={`w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md  transition-transform transform  
                flex justify-center gap-4
                ${loading ? 'animate-pulse' : ''}
                ${buttonDisabled ? 'hover:cursor-not-allowed' : 'hover:bg-blue-700 hover:scale-105'}
              `}

              disabled={buttonDisabled}
              type='submit'
            >{loading ? (
              <>
                <img src="./loading.svg" alt="" className='animate-spin ' />
                Loading...
              </>
            ) : 'Create Account'}</button>
          </div>
        </form>

        {/* Sign-in Redirect */}
        <p className="text-center text-gray-700 mt-4">
          Already have an account?{' '}
          <Link href="/signin" className="text-blue-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>


  );
};

export default SignupPage;