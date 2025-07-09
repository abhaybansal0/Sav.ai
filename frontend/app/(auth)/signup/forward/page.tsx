'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

const CheckEmailPage: React.FC = () => {
  // 3 minutes in seconds
  const INITIAL_COUNT = 120;

  const [counter, setCounter] = useState<number>(INITIAL_COUNT);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-indigo-300 p-4">
      <Link href="/">
        <Image
          src="/home.svg"
          alt="Home"
          width={40}
          height={40}
          className="absolute left-2 top-2"
        />
      </Link>

      <div className="bg-white backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200 text-center">
        {/* Title & Subtitle */}
        <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
        <p className="text-gray-600 mt-2">
          We've sent a verification link to your email. Please check your inbox.
        </p>

        {/* Resend Email Button */}
        <button
          onClick={handleResend}
          disabled={isDisabled}
          className={`mt-6 w-full py-2 rounded-lg shadow-md font-semibold transition-transform duration-200 \
            ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'}`}
        >
          {isDisabled
            ? `Resend in ${formatTime(counter)}`
            : 'Resend Verification Email'}
        </button>

        {/* Sign-in Redirect */}
        <p className="text-gray-700 mt-4">
          Already verified?{' '}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
