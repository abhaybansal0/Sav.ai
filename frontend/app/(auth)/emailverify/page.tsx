'use client'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import axios, { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const EmailVerify: React.FC = () => {
  const router = useRouter();
  const [verifystatus, setVerifystatus] = useState<string>('nill')
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const verifyMe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const SearchParams = new URLSearchParams(window.location.search)
      const token = SearchParams.get("token");

      if (!token) {
        return toast.error('No Token!');
      }

      setVerifystatus('verifying')
      const response = await axios.post(`/api/auth/verifyemail?token=${token}`)

      if (response.data.success) {
        setVerifystatus('Verified')
        toast.success('Verification Successful!');
        return setTimeout(() => {
          router.push('/welcome')
        }, 2000);
      }

    } catch (error: unknown) {
      if (isAxiosError(error)) {

        console.log(error)
        if (error.response?.data?.message === 'Invalid or expired verification token!') {
          toast.error('User already verified!')
        }

        if (error.response?.data?.message === 'Verification token is required!') {
          toast.error('Verification token Timed out!')
        }
      } else if (error instanceof Error) {
        console.error("Something went wrong:", error.message);
      } else {
        // totally unexpected
        console.error("Unknown error", error);
      }
    } finally {
      setVerifystatus('nill')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
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

      {/* Verification Container */}
      <div className={`bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-md w-full border border-white/50 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Title & Subtitle */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Email Verification
            </span>
          </h2>
          <p className="text-gray-600 text-lg mb-8">Click the button below to verify your email</p>

          {/* Submit Button */}
          <button
            className={`w-full py-4 bg-blue-600 text-white font-medium rounded-full shadow-lg transform transition-all duration-200 relative overflow-hidden group
              ${verifystatus === 'verifying' ? 'animate-pulse' : ''}
              ${verifystatus === 'Verified' ? 'bg-green-600' : ''}
              hover:bg-blue-700 hover:scale-105 hover:shadow-xl
            `}
            onClick={verifyMe}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {verifystatus === 'verifying' ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : verifystatus === 'Verified' ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Verified!
                </>
              ) : (
                'Verify My Email'
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-particle"></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-particle-delayed"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-particle-slow"></div>
      </div>
    </div>
  )
}

export default EmailVerify