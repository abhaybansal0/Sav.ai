import MentorAvatar from '@/components/MentorAvatar';
import React from 'react'
import AlienUFO from '../../../components/SpaceShip';

const SpaceCraft = ({ theme, isFlying = false, size = 'medium' }: {
  theme: string,
  isFlying: boolean,
  size: 'small' | 'medium' | 'large'
}) => {

  const sizeClasses = {
    small: 'w-16 h-20',
    medium: 'w-20 h-24',
    large: 'w-24 h-28'
  };

  const hoverAnimation = isFlying ? 'animate-bounce' : 'hover:scale-110';

  return (
    <div className={`relative z-10 ${hoverAnimation} transition-transform ease-in-out duration-300`}>
            <div className={`${sizeClasses[size]} theme-${theme} relative`}>
                
                {/* Sharp nose cone - very pointed */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 shadow-lg overflow-hidden" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30" />
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-white/25 blur-sm" />
                </div>

                {/* Main hull/body - realistic metallic finish */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-700 rounded-t-lg rounded-b-2xl shadow-2xl shadow-gray-800 dark:shadow-black overflow-hidden">
                    
                    {/* Cockpit window - realistic glass effect */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-gradient-to-b from-cyan-200/90 via-blue-400/70 to-blue-700/50 rounded-t-2xl rounded-b-sm shadow-inner">
                        <div className="absolute inset-0.5 rounded-t-2xl rounded-b-sm bg-gradient-to-b from-white/50 via-cyan-100/30 to-transparent" />
                        <div className="absolute top-0.5 left-0.5 w-2 h-1.5 rounded-full bg-white/70 blur-sm" />
                        <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1 rounded-full bg-white/40 blur-sm" />
                    </div>

                    {/* Hull panel lines with depth */}
                    <div className="absolute top-7 left-0.5 right-0.5 h-0.5 bg-gradient-to-r from-transparent via-black/40 to-transparent shadow-sm" />
                    <div className="absolute top-8 left-0.5 right-0.5 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="absolute top-9.5 left-0.5 right-0.5 h-0.5 bg-gradient-to-r from-transparent via-black/30 to-transparent shadow-sm" />
                    <div className="absolute top-11 left-0.5 right-0.5 h-0.5 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    <div className="absolute top-12.5 left-0.5 right-0.5 h-0.5 bg-gradient-to-r from-transparent via-black/25 to-transparent shadow-sm" />
                    
                    {/* Engine vents - realistic heat effect */}
                    <div className="absolute bottom-1 left-2 w-2.5 h-2.5 bg-gradient-radial from-orange-400 via-red-500 to-red-800 rounded-full shadow-inner">
                        <div className="absolute inset-0.5 rounded-full bg-gradient-radial from-yellow-300/60 to-orange-600/40" />
                        <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white/40 blur-sm" />
                    </div>
                    <div className="absolute bottom-1 right-2 w-2.5 h-2.5 bg-gradient-radial from-orange-400 via-red-500 to-red-800 rounded-full shadow-inner">
                        <div className="absolute inset-0.5 rounded-full bg-gradient-radial from-yellow-300/60 to-orange-600/40" />
                        <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white/40 blur-sm" />
                    </div>

                    {/* Side panels with realistic depth */}
                    <div className="absolute top-8 left-0 w-1.5 h-6 bg-gradient-to-b from-gray-500 via-gray-600 to-gray-700 rounded-l-sm shadow-lg">
                        <div className="absolute inset-0.5 rounded-l-sm bg-gradient-to-b from-white/15 via-transparent to-black/20" />
                    </div>
                    <div className="absolute top-8 right-0 w-1.5 h-6 bg-gradient-to-b from-gray-500 via-gray-600 to-gray-700 rounded-r-sm shadow-lg">
                        <div className="absolute inset-0.5 rounded-r-sm bg-gradient-to-b from-white/15 via-transparent to-black/20" />
                    </div>

                    {/* Hull surface details */}
                    <div className="absolute inset-0 rounded-t-lg rounded-b-2xl bg-gradient-to-br from-white/15 via-transparent to-black/25" />
                    <div className="absolute top-1 left-1 w-6 h-8 bg-white/20 rounded-t-lg rounded-b-xl blur-md" />
                </div>

                {/* Sharp swept wings - more realistic */}
                <div className="absolute top-10 left-0 w-5 h-10 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-700 transform -skew-y-12 shadow-2xl overflow-hidden" style={{ clipPath: 'polygon(0% 0%, 100% 20%, 100% 80%, 0% 100%)' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30" />
                    <div className="absolute top-1 left-1 w-2 h-6 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-sm" />
                    {/* Wing tip light */}
                    <div className="absolute bottom-2 left-1 w-2 h-2 rounded-full bg-gradient-radial from-green-300 via-green-400 to-green-600 shadow-lg animate-pulse" style={{ animationDuration: '2s' }}>
                        <div className="absolute inset-0.5 rounded-full bg-green-200/60" />
                    </div>
                </div>

                <div className="absolute top-10 right-0 w-5 h-10 bg-gradient-to-bl from-gray-400 via-gray-500 to-gray-700 transform skew-y-12 shadow-2xl overflow-hidden" style={{ clipPath: 'polygon(0% 20%, 100% 0%, 100% 100%, 0% 80%)' }}>
                    <div className="absolute inset-0 bg-gradient-to-bl from-white/20 via-transparent to-black/30" />
                    <div className="absolute top-1 right-1 w-2 h-6 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-sm" />
                    {/* Wing tip light */}
                    <div className="absolute bottom-2 right-1 w-2 h-2 rounded-full bg-gradient-radial from-red-300 via-red-400 to-red-600 shadow-lg animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }}>
                        <div className="absolute inset-0.5 rounded-full bg-red-200/60" />
                    </div>
                </div>

                {/* Rear stabilizers - sharp fins */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-5 bg-gradient-to-b from-gray-500 via-gray-600 to-gray-800 shadow-lg overflow-hidden" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20" />
                    <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/20 blur-sm" />
                </div>

                {/* Engine glow effect when flying - realistic plasma */}
                {isFlying && (
                    <>
                        <div className="absolute bottom-0 left-2 w-2.5 h-8 bg-gradient-to-b from-transparent via-cyan-400/80 to-cyan-600/90 rounded-b-full shadow-lg blur-sm animate-pulse" style={{ animationDuration: '0.5s' }} />
                        <div className="absolute bottom-0 right-2 w-2.5 h-8 bg-gradient-to-b from-transparent via-cyan-400/80 to-cyan-600/90 rounded-b-full shadow-lg blur-sm animate-pulse" style={{ animationDuration: '0.5s', animationDelay: '0.1s' }} />
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-12 bg-gradient-to-b from-transparent via-cyan-300/60 to-cyan-500/80 rounded-b-full shadow-xl blur-md animate-pulse" style={{ animationDuration: '0.8s' }} />
                    </>
                )}

                {/* Communication antenna - detailed */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gradient-to-t from-gray-500 to-gray-700 shadow-sm">
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gradient-radial from-red-400 via-red-500 to-red-700 rounded-full shadow-lg animate-pulse" style={{ animationDuration: '1.5s' }}>
                        <div className="absolute inset-0.5 rounded-full bg-red-200/60" />
                    </div>
                </div>

                {/* Landing gear system (when not flying) */}
                {!isFlying && (
                    <>
                        {/* Landing struts */}
                        <div className="absolute bottom-0 left-3 w-1 h-3 bg-gradient-to-b from-gray-500 to-gray-700 shadow-lg">
                            <div className="absolute inset-0.5 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
                        </div>
                        <div className="absolute bottom-0 right-3 w-1 h-3 bg-gradient-to-b from-gray-500 to-gray-700 shadow-lg">
                            <div className="absolute inset-0.5 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
                        </div>
                        
                        {/* Landing pads */}
                        <div className="absolute -bottom-1 left-2 w-3 h-1.5 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full shadow-xl">
                            <div className="absolute inset-0.5 rounded-full bg-gradient-to-b from-white/15 to-transparent" />
                        </div>
                        <div className="absolute -bottom-1 right-2 w-3 h-1.5 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full shadow-xl">
                            <div className="absolute inset-0.5 rounded-full bg-gradient-to-b from-white/15 to-transparent" />
                        </div>

                        {/* Landing gear connections (for large size) */}
                        {size === 'large' && (
                            <>
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gradient-to-b from-gray-400 to-gray-600 rounded-lg shadow-lg">
                                    <div className="absolute inset-0.5 rounded-lg bg-gradient-to-b from-white/20 via-transparent to-black/15" />
                                </div>
                                <div className="absolute bottom-1 left-2.5 w-1.5 h-1.5 bg-gradient-to-b from-gray-500 to-gray-700 rounded-full shadow-inner" />
                                <div className="absolute bottom-1 right-2.5 w-1.5 h-1.5 bg-gradient-to-b from-gray-500 to-gray-700 rounded-full shadow-inner" />
                            </>
                        )}
                    </>
                )}

                {/* Hull surface details */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-gray-400/60 to-transparent rounded-full shadow-sm" />
                <div className="absolute top-13 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-transparent via-gray-300/40 to-transparent" />
                
                {/* Navigation lights - realistic with glow */}
                <div className="absolute top-5 left-0.5 w-1.5 h-1.5 bg-gradient-radial from-blue-300 via-blue-400 to-blue-600 rounded-full shadow-lg animate-pulse" style={{ animationDuration: '3s' }}>
                    <div className="absolute inset-0.5 rounded-full bg-blue-200/60" />
                    <div className="absolute -inset-0.5 rounded-full bg-blue-400/30 blur-sm" />
                </div>
                <div className="absolute top-5 right-0.5 w-1.5 h-1.5 bg-gradient-radial from-blue-300 via-blue-400 to-blue-600 rounded-full shadow-lg animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>
                    <div className="absolute inset-0.5 rounded-full bg-blue-200/60" />
                    <div className="absolute -inset-0.5 rounded-full bg-blue-400/30 blur-sm" />
                </div>

                {/* Additional surface weathering */}
                <div className="absolute top-9 left-2 w-4 h-2 bg-black/10 rounded-full blur-sm" />
                <div className="absolute top-14 right-2 w-3 h-1.5 bg-black/8 rounded-full blur-sm" />
                <div className="absolute top-11 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-white/10 rounded-full blur-md" />
            </div>
        </div>
  );
};



const page = () => {
  return (
    <div className="flex items-center justify-center gap-8 p-8 bg-gray-900 pt-72">
      <SpaceCraft theme="blue" isFlying={false} size="small" />
      <SpaceCraft theme="green" isFlying={true} size="medium" />
      <SpaceCraft theme="purple" isFlying={false} size="large" />


      <MentorAvatar
        seed="newton"
        options={{
          hair: ['short15'],
          facialHair: ['beardMedium'],
          clothes: ['shirt'],
        }}
        className="w-32 h-32"
      />

      <AlienUFO size='large' />
    </div>
  )
}

export default page
