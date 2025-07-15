import React from 'react';
import './ufo.css'

const SpaceShip = ({ mode = 'flying', size = 'medium' }: {
    mode?: 'flying' | 'stationary',
    size: 'small' | 'medium' | 'large'
}) => {
  const isFlying = mode === 'flying';
  
  const sizeClasses = {
    small: 'w-16 h-8',
    medium: 'w-24 h-12',
    large: 'w-32 h-16'
  };

  return (
    <div className={`relative ${isFlying ? 'animate-bounce' : ''} transition-all duration-500 ufo-wandering-fast`}>
      {/* Main UFO Body - Side View */}
      <div className={`relative ${sizeClasses[size]} mx-auto`}>
        {/* Main Hull - Lower Ellipse */}
        <svg
          viewBox="0 0 120 60"
          className={`absolute bottom-0 ${sizeClasses[size]} drop-shadow-xl`}
          style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
        >
          <defs>
            <linearGradient id="hullGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6b7280" />
              <stop offset="30%" stopColor="#4b5563" />
              <stop offset="70%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <linearGradient id="rimGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9ca3af" />
              <stop offset="50%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
          </defs>
          
          {/* Bottom hull */}
          <ellipse
            cx="60"
            cy="35"
            rx="55"
            ry="20"
            fill="url(#hullGradient)"
            stroke="#4b5563"
            strokeWidth="1"
          />
          
          {/* Outer rim */}
          <ellipse
            cx="60"
            cy="30"
            rx="58"
            ry="15"
            fill="url(#rimGradient)"
            stroke="#6b7280"
            strokeWidth="0.5"
          />
          
          {/* Inner rim detail */}
          <ellipse
            cx="60"
            cy="30"
            rx="50"
            ry="12"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="0.5"
            opacity="0.7"
          />
          
          {/* Rivets/Details on rim */}
          <circle cx="20" cy="30" r="1.5" fill="#374151" stroke="#9ca3af" strokeWidth="0.3" />
          <circle cx="35" cy="27" r="1.5" fill="#374151" stroke="#9ca3af" strokeWidth="0.3" />
          <circle cx="60" cy="25" r="1.5" fill="#374151" stroke="#9ca3af" strokeWidth="0.3" />
          <circle cx="85" cy="27" r="1.5" fill="#374151" stroke="#9ca3af" strokeWidth="0.3" />
          <circle cx="100" cy="30" r="1.5" fill="#374151" stroke="#9ca3af" strokeWidth="0.3" />
          
          {/* Panel lines */}
          <path d="M 15 35 Q 60 25 105 35" stroke="#9ca3af" strokeWidth="0.3" fill="none" opacity="0.6" />
          <path d="M 20 40 Q 60 30 100 40" stroke="#9ca3af" strokeWidth="0.3" fill="none" opacity="0.6" />
        </svg>
        
        {/* Cockpit Dome - Green Tinted */}
        <svg
          viewBox="0 0 40 25"
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-8"
        >
          <defs>
            <linearGradient id="cockpitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#86efac" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#4ade80" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#22c55e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="cockpitHighlight" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Main dome */}
          <ellipse
            cx="20"
            cy="18"
            rx="18"
            ry="15"
            fill="url(#cockpitGradient)"
            stroke="#22c55e"
            strokeWidth="1"
            opacity="0.9"
            className={isFlying ? 'animate-pulse' : ''}
          />
          
          {/* Highlight on dome */}
          <ellipse
            cx="20"
            cy="18"
            rx="18"
            ry="15"
            fill="url(#cockpitHighlight)"
          />
          
          {/* Window frame */}
          <ellipse
            cx="20"
            cy="18"
            rx="16"
            ry="13"
            fill="none"
            stroke="#16a34a"
            strokeWidth="0.5"
            opacity="0.7"
          />
          
          {/* Alien silhouette */}
          <circle cx="20" cy="15" r="2.5" fill="#065f46" opacity="0.6" />
          <ellipse cx="18" cy="13" rx="1" ry="1.5" fill="#065f46" opacity="0.4" />
          <ellipse cx="22" cy="13" rx="1" ry="1.5" fill="#065f46" opacity="0.4" />
        </svg>
        
        {/* Navigation Lights with better styling */}
        <div className={`absolute top-1/2 -left-1 w-2 h-2 rounded-full transform -translate-y-1/2 border border-red-300 ${isFlying ? 'bg-red-500 animate-pulse shadow-red-500/50 shadow-lg' : 'bg-red-800 opacity-50'}`}></div>
        <div className={`absolute top-1/2 -right-1 w-2 h-2 rounded-full transform -translate-y-1/2 border border-green-300 ${isFlying ? 'bg-green-500 animate-pulse shadow-green-500/50 shadow-lg' : 'bg-green-800 opacity-50'}`}></div>
        
        {/* Additional small lights */}
        <div className={`absolute top-1/3 left-1/4 w-1 h-1 rounded-full ${isFlying ? 'bg-blue-400 animate-pulse' : 'bg-blue-800 opacity-30'}`}></div>
        <div className={`absolute top-1/3 right-1/4 w-1 h-1 rounded-full ${isFlying ? 'bg-blue-400 animate-pulse' : 'bg-blue-800 opacity-30'}`}></div>
        
        {/* Propulsion Glow (only when flying) */}
        {isFlying && (
          <>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-blue-400 rounded-full blur-sm animate-pulse opacity-60"></div>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-cyan-300 rounded-full blur-sm animate-pulse opacity-40"></div>
          </>
        )}
        
        {/* Distress Effects (when stationary) */}
        {!isFlying && (
          <>
            {/* Smoke from different parts */}
            <div className="absolute -bottom-1 left-1/4 w-1 h-6 bg-gray-500 rounded-full blur-sm animate-pulse opacity-60"></div>
            <div className="absolute -bottom-1 right-1/4 w-1 h-4 bg-gray-400 rounded-full blur-sm animate-pulse opacity-40"></div>
            <div className="absolute -bottom-2 left-1/2 w-0.5 h-8 bg-gray-600 rounded-full blur-sm animate-pulse opacity-50 transform -translate-x-1/2"></div>
            
            {/* Emergency cockpit - red tinted */}
            <svg
              viewBox="0 0 40 25"
              className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-8"
            >
              <ellipse
                cx="20"
                cy="18"
                rx="18"
                ry="15"
                fill="#dc2626"
                fillOpacity="0.4"
                stroke="#dc2626"
                strokeWidth="1"
                className="animate-pulse"
              />
              <ellipse
                cx="20"
                cy="18"
                rx="16"
                ry="13"
                fill="none"
                stroke="#b91c1c"
                strokeWidth="0.5"
                opacity="0.7"
              />
            </svg>
            
            {/* Sparks */}
            <div className="absolute bottom-0 left-1/3 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-0 right-1/3 w-0.5 h-0.5 bg-orange-400 rounded-full animate-ping"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default SpaceShip;