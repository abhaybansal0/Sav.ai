"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const ForwardMe = () => {
    router.push('/signup')
  }

  return (
    <>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient blobs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
          
          {/* Floating clouds */}
          <div className="absolute top-20 left-10 w-72 h-24 bg-white/20 rounded-full filter blur-2xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-32 bg-white/20 rounded-full filter blur-2xl animate-float-delayed"></div>
          <div className="absolute bottom-40 left-1/3 w-80 h-28 bg-white/20 rounded-full filter blur-2xl animate-float-slow"></div>
          
          {/* Moving grid pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-grid-pattern animate-slide"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10 pt-48">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Main headline with physics/learning focus */}
            <h1 className="text-7xl md:text-6xl lg:text-5xl font-bold mb-6 leading-none">
              <span className="text-gray-900 block mb-2">Master Physics</span>
              <span className="bg-gradient-to-r p-2 from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
                The Fun Way
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-2xl md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Interactive lessons, visual formulas, and playful experiments to make learning physics enjoyable and effective.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center items-center">
              <button 
              onClick={ForwardMe}
              className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden group">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 pt-16 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-6">Join thousands of students learning physics better</p>

            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-particle"></div>
          <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-particle-delayed"></div>
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-particle-slow"></div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9) rotate(240deg);
          }
          100% {
            transform: translate(0px, 0px) scale(1) rotate(360deg);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(10px) translateX(-10px);
          }
          75% {
            transform: translateY(-10px) translateX(20px);
          }
        }
        @keyframes slide {
          0% {
            transform: translateX(0) translateY(0);
          }
          100% {
            transform: translateX(60px) translateY(60px);
          }
        }
        @keyframes particle {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          50% {
            transform: translate(100px, -100px) scale(1);
            opacity: 0.5;
          }
          100% {
            transform: translate(200px, -200px) scale(0);
            opacity: 0;
          }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 20s ease-in-out infinite;
          animation-delay: 5s;
        }
        .animate-float-slow {
          animation: float 25s ease-in-out infinite;
          animation-delay: 10s;
        }
        .animate-slide {
          animation: slide 30s linear infinite;
        }
        .animate-particle {
          animation: particle 10s linear infinite;
        }
        .animate-particle-delayed {
          animation: particle 15s linear infinite;
          animation-delay: 5s;
        }
        .animate-particle-slow {
          animation: particle 20s linear infinite;
          animation-delay: 10s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(99, 102, 241, 0.03)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E");
        }
      `}</style>
    </>
  );
}