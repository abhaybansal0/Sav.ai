// app/page.tsx
'use client'

import HeroSection from './Components/HeroSection';
import FeaturesSection from './Components/Features';
import HowItWorks from './Components/HowitWorks';
import PricingSection from './Components/Pricing';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Testimonials from './Components/Testimonials';

import { useEffect, useState } from 'react';

export default function Home() {

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
    <div className="min-h-screen">

      pages:
      <ul>
        <a href="/signup">
          <li>1. Signup</li>
        </a>
        <a href="/signin">
          <li>2. Signin</li>
        </a>
        <a href="/verifypass">
          <li>3. verification page</li>
        </a>
        <a href="/forgotpass">
          <li>4. Forgot Password</li>
        </a>
        <a href="/dashboard">
          <li>5. User Dashboard</li>
        </a> 
        <a href="/dashboard">
          <li>5. User Dashboard</li>
        </a> 
      </ul>


      <Header isVisible={showHeader} />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <PricingSection />
      <Footer />
    </div>
  );
}