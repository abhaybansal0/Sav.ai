'use client'

import { useEffect, useState } from "react";
import Link from "next/link"
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye, EyeOff, Check, X } from 'lucide-react';

const SignupPage = () => {
  const router = useRouter()

  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  })

  // Username validation
  const [usernameValidation, setUsernameValidation] = useState({
    length: false,
    validChars: true
  })

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Password strength checker
  useEffect(() => {
    const password = inputData.password;
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password)
    });
  }, [inputData.password]);

  // Username validation
  useEffect(() => {
    const username = inputData.username;
    setUsernameValidation({
      length: username.length >= 3 && username.length <= 30,
      validChars: /^[a-zA-Z0-9_-]+$/.test(username) || username === ''
    });
  }, [inputData.username]);

  // Button disabled state
  useEffect(() => {
    const isPasswordValid = passwordStrength.length &&
      passwordStrength.uppercase &&
      passwordStrength.lowercase &&
      passwordStrength.number;

    const isUsernameValid = usernameValidation.length && usernameValidation.validChars;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputData.email);

    setButtonDisabled(
      !isPasswordValid ||
      !isUsernameValid ||
      !isEmailValid ||
      inputData.username.trim() === "" ||
      inputData.email.trim() === "" ||
      inputData.password.trim() === ""
    );
  }, [inputData, passwordStrength, usernameValidation]);

  const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const signMeUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!usernameValidation.validChars) {
      return toast.error("Username can only contain letters, numbers, underscores, and hyphens");
    }

    setButtonDisabled(true);
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", inputData)

      if (res.data.success) {
        toast.success('Account Successfully Created!')
        setTimeout(() => {
          router.push('/signup/forward')
        }, 2000);
      }

    } catch (error: unknown) {
      if (isAxiosError(error)) {

        const errorMessage = error.response?.data?.message;

        switch (errorMessage) {
          case 'Username, email, and password are required':
            toast.error("All fields are required!");
            break;
          case 'Password must be at least 8 characters long':
            toast.error("Password must be at least 8 characters long");
            break;
          case 'Username must be between 3 and 30 characters':
            toast.error("Username must be between 3 and 30 characters");
            break;
          case 'An account with this email already exists':
            toast.error("An account with this email already exists!");
            break;
          case 'Username is not available':
            toast.error("Username is already taken");
            break;
          default:
            toast.error('Error during signup. Please try again later');
        }
      }
      else if (error instanceof Error) {
        console.error("Something went wrong:", error.message);
      }
      else {
        // totally unexpected
        console.error("Unknown error", error);
      }
    } finally {
      setButtonDisabled(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50/50 to-white">
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

            {/* Username validation feedback */}
            {inputData.username && (
              <div className="space-y-1 mt-2">
                <div className={`text-xs flex items-center gap-1 ${usernameValidation.length ? 'text-green-600' : 'text-gray-400'}`}>
                  {usernameValidation.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  3-30 characters
                </div>
                {!usernameValidation.validChars && (
                  <div className="text-xs flex items-center gap-1 text-red-600">
                    <X className="w-3 h-3" />
                    Only letters, numbers, underscores, and hyphens allowed
                  </div>
                )}
              </div>
            )}
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
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={inputData.password}
                onChange={OnChange}
                required
                className="w-full px-4 py-3 pr-12 text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password strength indicators */}
            {inputData.password && (
              <div className="space-y-2 mt-3">
                <p className="text-xs font-medium text-gray-600">Password must contain:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`flex items-center gap-1 ${passwordStrength.length ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordStrength.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    At least 8 characters
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordStrength.uppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    One uppercase letter
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordStrength.lowercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    One lowercase letter
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.number ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordStrength.number ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    One number
                  </div>
                </div>

                {/* Password strength bar */}
                <div className="mt-2">
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${Object.values(passwordStrength).filter(Boolean).length <= 1 ? 'bg-red-500 w-1/4' :
                        Object.values(passwordStrength).filter(Boolean).length <= 2 ? 'bg-orange-500 w-2/4' :
                          Object.values(passwordStrength).filter(Boolean).length <= 3 ? 'bg-yellow-500 w-3/4' :
                            'bg-green-500 w-full'
                        }`}
                    />
                  </div>
                  <p className="text-xs mt-1 text-gray-500">
                    Password strength: {
                      Object.values(passwordStrength).filter(Boolean).length <= 1 ? 'Weak' :
                        Object.values(passwordStrength).filter(Boolean).length <= 2 ? 'Fair' :
                          Object.values(passwordStrength).filter(Boolean).length <= 3 ? 'Good' :
                            'Strong'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              className={`w-full py-4 bg-blue-600 text-white font-medium rounded-full shadow-lg transform transition-all duration-200 relative overflow-hidden group
                ${loading ? 'animate-pulse' : ''}
                ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:scale-105 hover:shadow-xl'}
              `}
              disabled={buttonDisabled || loading}
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
    </div>
  );
};

export default SignupPage;