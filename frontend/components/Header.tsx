"use client"

import { useEffect, useState } from 'react';


export default function Header() {

  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > window.innerHeight * 0.8;
      setShowHeader(shouldShow);
    };

    // Add debounce to scroll handler
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

    window.addEventListener('scroll', debouncedScroll());
    return () => window.removeEventListener('scroll', debouncedScroll());
  }, []);


  return (
    <header className={`fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md transition-all ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">Sav.ai</span>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </nav>
    </header>
  );
}