'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const CheckEmailPage: React.FC = () => {
  // 3 minutes in seconds
  const INITIAL_COUNT = 120;

  const [counter, setCounter] = useState<number>(INITIAL_COUNT);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isDisabled) {
      timer = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isDisabled]);

  const handleResend = () => {
    // TODO: integrate your actual resend logic here
    toast.success('Verification email resent!');
    toast.error('NOT IMPLIMENTED');

    // Reset countdown
    setCounter(INITIAL_COUNT);
    setIsDisabled(true);
  };

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

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

      {/* Email verification container */}
      <div className={`bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/50 text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Email icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Check Your Email
          </span>
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          We've sent a verification link to your email. Please check your inbox and click the link to continue.
        </p>

        {/* Resend Email Button */}
        <button
          onClick={handleResend}
          disabled={isDisabled}
          className={`mt-8 w-full py-4 rounded-full font-medium shadow-lg transform transition-all duration-200 relative overflow-hidden group
            ${isDisabled 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 hover:shadow-xl'
            }`}
        >
          <span className="relative z-10">
            {isDisabled
              ? `Resend in ${formatTime(counter)}`
              : 'Resend Verification Email'}
          </span>
          {!isDisabled && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          )}
        </button>

        {/* Additional help text */}
        <p className="text-sm text-gray-500 mt-4">
          Didn't receive the email? Check your spam folder.
        </p>

        {/* Sign-in Redirect */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-gray-600">
            Already verified?{' '}
            <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
              Sign in
            </Link>
          </p>
        </div>
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

export default CheckEmailPage;