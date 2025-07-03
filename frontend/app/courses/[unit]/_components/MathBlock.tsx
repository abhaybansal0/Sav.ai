// components/MathBlock.tsx
'use client';
import React, { useEffect } from 'react';
import { MathJax } from 'better-react-mathjax';

export default function MathBlock({ latex }: { latex: string }) {

    const needsWrap = !/^\$\$.*\$\$$/.test(latex);
    const tex = needsWrap ? `\$$${latex}\$$` : latex;
    
    return <MathJax inline dynamic>{tex}</MathJax>;
}