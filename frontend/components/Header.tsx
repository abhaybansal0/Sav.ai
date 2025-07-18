"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    // Check initial scroll position
    handleScroll();

    const debouncedScroll = () => {
      let ticking = false;
      return () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
    };

    const scrollHandler = debouncedScroll();
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);


  const ForwardMe = () => {
    router.push('/signup')
  }
  const ForwardMeLogin = () => {
    router.push('/login')
  }

  return (
    <header
      className={`
        fixed w-full top-0 z-50 
        ${isScrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-transparent'} 
        transition-all duration-500 ease-out
      `}
    >
      <nav
        className={`
          container mx-auto px-6 relative
          ${isScrolled ? 'py-4' : 'py-8'} 
          transition-all duration-500
        `}
      >
        {/* Left Button - Login (only when scrolled) */}
        <button
        onClick={ForwardMeLogin}
          className={`
            absolute left-6 top-1/2 -translate-y-1/2
            text-gray-600 text-sm font-medium
            px-4 py-1.5 rounded-full 
            hover:text-gray-900 hover:bg-gray-100
            transition-all duration-300
            ${isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
          `}
        >
          Login
        </button>

        {/* Logo - Always centered */}
        <div className="flex justify-center items-center">
          <span
            className={`
              font-bold text-gray-900 p-1
              ${isScrolled ? 'text-3xl' : 'text-4xl'} 
              ${isScrolled ? '' : 'transform translate-y-8'} 
              transition-all duration-500
              font-serif italic tracking-tight
              bg-gradient-to-r from-blue-600 to-blue-800 
              bg-clip-text text-transparent
            `}
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontStyle: 'italic',
              letterSpacing: '0.02em'
            }}
          >
            Sav.ai
          </span>
        </div>

        {/* Right Button - Get Started (only when scrolled) */}
        <button
          onClick={ForwardMe}
          className={`
            absolute right-6 top-1/2 -translate-y-1/2
            bg-blue-600 text-white 
            px-6 py-2 rounded-full text-lg font-medium
            hover:bg-blue-700 shadow-lg hover:shadow-xl
            transition-all duration-300
            md:text-sm md:py-1 md:px-2.5 md:font-semibold 
            ${isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
          `}
        >
          Get Started
        </button>
      </nav>

      {/* Border - only shows when scrolled */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 h-px bg-gray-100 
          transition-opacity duration-500
          ${isScrolled ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Add custom font import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700;1,900&display=swap');
      `}</style>
    </header>
  );
}