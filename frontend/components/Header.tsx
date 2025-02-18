// components/Header.tsx
'use client';

import { useEffect, useState } from 'react';

interface HeaderProps {
  isVisible: boolean;
}


export default function Header({ isVisible }: HeaderProps) {
  return (
    <header className={`fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md transition-all ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
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