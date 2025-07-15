'use client'

import { useEffect, useState } from "react";
import Link from "next/link"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react';

const SignupPage = () => {
  const router = useRouter()

  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
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

  const signMeUp = async (e: React.FormEvent) => {
    setButtonDisabled(true);
    setLoading(true);
    try {
      e.preventDefault();

      const response = await axios.post("/api/auth/register", inputData)

      toast.success('Account Successfully Created!')
      setTimeout(() => {
        router.push('/signup/forward')      
      }, 2000);
      
    } catch (error: any) {
      if (error.response.data.message === 'Username, email, and password are required') {
        toast.error("All fields are required!")
      }
      else if (error.response.data.message === 'Password must be at least 8 characters long') {
        toast("Password must be at least 8 characters long")
      }
      else if (error.response.data.message === 'Username must be between 3 and 30 characters') {
        toast("Username must be between 3 and 30 characters")
      }
      else if (error.response.data.message === 'An account with this email already exists') {
        toast("User already exists!")
      }
      else if (error.response.data.message === 'Username is not available') {
        toast("Username is not available")
      }
      else {
        toast.error('Error during signup, Please try again later')
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
        
        {/* Floating clouds */}
        <div className="absolute top-20 left-10 w-72 h-24 bg-white/20 rounded-full filter blur-2xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-32 bg-white/20 rounded-full filter blur-2xl animate-float-delayed"></div>
        
        {/* Moving grid pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-grid-pattern animate-slide"></div>
        </div>
      </div>

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
              Join the Journey
            </span>
          </h2>
          <p className="text-gray-600 text-lg">Create your account to start learning</p>
        </div>

        {/* Form */}
        <form onSubmit={signMeUp} className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-gray-700 text-sm font-semibold">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={inputData.username}
              onChange={OnChange}
              required
              className="w-full px-4 py-3 text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200 placeholder-gray-400"
              placeholder="Choose a username"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={inputData.email}
              onChange={OnChange}
              required
              className="w-full px-4 py-3 text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200 placeholder-gray-400"
              placeholder="your@email.com"
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
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              className={`w-full py-4 bg-blue-600 text-white font-medium rounded-full shadow-lg transform transition-all duration-200 relative overflow-hidden group
                ${loading ? 'animate-pulse' : ''}
                ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:scale-105 hover:shadow-xl'}
              `}
              disabled={buttonDisabled}
              type='submit'
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : 'Create Account'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </form>

        {/* Sign-in Redirect */}
        <p className="text-center text-gray-600 mt-8">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
            Sign in
          </Link>
        </p>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-particle"></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-particle-delayed"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-particle-slow"></div>
      </div>
    </div>
  );
};

export default SignupPage;