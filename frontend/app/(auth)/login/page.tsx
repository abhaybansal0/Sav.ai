import Link from "next/link"
import Form from "./Form";
import BackBtn from "./BackBtn";

const SignupPage = () => {
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
            <BackBtn />

            {/* Form Container */}
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-md w-full border border-white/50 relative z-10">
                {/* Title & Subtitle */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mb-3">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Welcome Back
                        </span>
                    </h2>
                    <p className="text-gray-600 text-lg">Sign in to continue learning</p>
                </div>

                {/* Form */}
                <Form />

                {/* Links */}
                <div className="mt-8 space-y-4">
                    <p className="text-center text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                            Sign Up
                        </Link>
                    </p>
                    <p className="text-center">
                        <Link href='/forgotpass' className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                            Forgot Password?
                        </Link>
                    </p>
                </div>
            </div>


        </div>
    );
};

export default SignupPage;