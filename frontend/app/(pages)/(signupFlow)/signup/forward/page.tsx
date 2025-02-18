'use client'

import Link from "next/link";

const CheckEmailPage = () => {


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-indigo-300 p-4">
      <div className="bg-white/100 backdrop-blur-lg rounded-2xl shadow-2xl p-8  w-1/2 border border-gray-200 text-center">
        
        {/* Title & Subtitle */}
        <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
        <p className="text-gray-600 mt-2">
          We've sent a verification link to your email. Please check your inbox.
        </p>

        {/* Resend Email Button */}
        <button
          className="mt-6 w-1/2 bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 transition-transform hover:scale-105"
          onClick={() => alert("Resend email functionality here")}
        >
          Resend Verification Email
        </button>

        {/* Sign-in Redirect */}
        <p className="text-gray-700 mt-4">
          Already verified?{" "}
          <Link href="/signin" className="text-blue-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
