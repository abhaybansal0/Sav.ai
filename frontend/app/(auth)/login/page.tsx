import Link from "next/link"
import Image from "next/image";
import Form from "./Form";


const SignupPage = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-300 p-4">

            <Link href={"/"}>
                <Image src="./home.svg" alt="Home" width={40} height={40} className="absolute left-2 top-2 " />
            </Link>

            <div className="bg-white/100 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
                {/* Title & Subtitle */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Sign In
                    </h2>
                    {/* <p className="text-gray-400 mt-2">Join us and explore amazing features!</p> */}
                </div>

                {/* Form */}
                <Form />

                {/* Sign-in Redirect */}
                <p className="text-center text-gray-700 mt-8">
                    Dont have an account?{' '}
                    <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
                <p className="text-center text-gray-700 mt-2">
                    <Link href={'/forgotpass'} className="text-blue-600 font-semibold hover:underline">
                        Forgot Password
                    </Link>
                </p>

            </div>
        </div>


    );
};

export default SignupPage;