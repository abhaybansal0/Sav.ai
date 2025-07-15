'use client';
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import MathJax, disable SSR, and show a placeholder while loading
const MathJax = dynamic(
  () => import('better-react-mathjax').then(mod => mod.MathJax),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center space-y-2 gap-4">
        <div className="h-8 w-1/2 rounded-full bg-gray-300 animate-pulse"></div>
      </div>
    ),
  }
);

export default function MathBlock({ latex }: { latex: string }) {
  // Wrap inline math if not already in $$ ... $$
  const needsWrap = !/^\$\$.*\$\$$/.test(latex);
  const tex = needsWrap ? `$$${latex}$$` : latex;

  return <MathJax inline dynamic>{tex}</MathJax>;
}
