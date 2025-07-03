'use client'; // IMPORTANT

import Lottie from 'lottie-react';
import animationData from '@/app/assets/Animation.json';

export default function LottieAnimation() {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: '100%', height: '100%' }}
      className='absolute left-1 w-screen h-screen'
    />
  );
}
