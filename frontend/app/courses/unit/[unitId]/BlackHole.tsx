import React from 'react'

const BlackHole = () => {
  return (
    <div className="relative mt-20 mx-auto w-32 h-32 flex hover:cursor-none items-center justify-center hover:scale-105 transition-transform duration-300 ease-out">
      
      {/* Outer gravitational field distortion */}
      <div className="absolute -inset-8 rounded-full">
        <div className="absolute inset-0 rounded-full border border-gray-300/30 dark:border-slate-700/20 animate-pulse"
             style={{animationDuration: '8s'}} />
        <div className="absolute inset-4 rounded-full border border-gray-400/20 dark:border-slate-600/15 animate-pulse"
             style={{animationDuration: '6s', animationDelay: '1s'}} />
      </div>
      
      {/* Background stars being stretched */}
      <div className="absolute -inset-6">
        <div className="absolute top-2 left-8 w-px h-3 bg-gradient-to-b from-transparent via-gray-600/60 dark:via-slate-400/40 to-transparent rotate-45" />
        <div className="absolute bottom-4 right-6 w-px h-4 bg-gradient-to-b from-transparent via-gray-600/50 dark:via-slate-400/30 to-transparent -rotate-12" />
        <div className="absolute top-10 right-4 w-px h-2 bg-gradient-to-b from-transparent via-gray-600/55 dark:via-slate-400/35 to-transparent rotate-75" />
      </div>
      
      {/* Outer accretion disk with matter spiraling in */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-28 h-28 rounded-full rotate-12">
          <div className="absolute inset-0 rounded-full opacity-60">
            <div className="absolute inset-0 rounded-full bg-gradient-conic from-transparent via-orange-500/30 dark:via-orange-600/20 via-yellow-500/35 dark:via-yellow-600/25 via-orange-600/30 dark:via-orange-700/20 to-transparent animate-spin"
                 style={{animationDuration: '25s'}} />
            {/* Spiral arms in disk */}
            <div className="absolute inset-2 rounded-full bg-gradient-conic from-transparent via-transparent via-orange-400/25 dark:via-orange-500/15 via-transparent to-transparent animate-spin"
                 style={{animationDuration: '20s', animationDirection: 'reverse'}} />
          </div>
        </div>
      </div>
      
      {/* Mid accretion disk with hot spots */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full">
          <div className="absolute inset-0 rounded-full bg-gradient-conic from-orange-500/40 dark:from-orange-600/30 via-yellow-400/60 dark:via-yellow-500/50 via-orange-400/50 dark:via-orange-500/40 via-red-500/45 dark:via-red-600/35 to-orange-500/40 dark:to-orange-600/30 animate-spin"
               style={{animationDuration: '15s'}} />
          {/* Hot spots in disk */}
          <div className="absolute inset-0 rounded-full">
            <div className="absolute top-4 left-6 w-2 h-2 bg-yellow-500/60 dark:bg-yellow-400/40 rounded-full blur-sm animate-pulse" />
            <div className="absolute bottom-5 right-4 w-1.5 h-1.5 bg-orange-400/70 dark:bg-orange-300/50 rounded-full blur-sm animate-pulse"
                 style={{animationDelay: '1s'}} />
          </div>
        </div>
      </div>
      
      {/* Inner hot accretion disk with doppler effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full">
          <div className="absolute inset-0 rounded-full bg-gradient-conic from-orange-400/60 dark:from-orange-500/50 via-yellow-300/80 dark:via-yellow-400/70 via-white/50 dark:via-white/30 via-yellow-400/70 dark:via-yellow-500/60 to-orange-400/60 dark:to-orange-500/50 animate-spin"
               style={{animationDuration: '8s', animationDirection: 'reverse'}} />
          {/* Doppler brightening on approaching side */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-transparent to-yellow-200/30 dark:to-yellow-300/20 animate-spin"
               style={{animationDuration: '6s'}} />
        </div>
      </div>
      
      {/* Photon sphere - last stable orbit */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full">
          <div className="absolute inset-0 rounded-full border-2 border-yellow-300/60 dark:border-yellow-200/40 shadow-lg shadow-yellow-400/30 dark:shadow-yellow-300/20" />
          <div className="absolute inset-0 rounded-full border border-gray-300/40 dark:border-white/20 animate-spin"
               style={{animationDuration: '3s'}} />
        </div>
      </div>
      
      {/* Event horizon glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-gradient-radial from-orange-500/50 dark:from-orange-400/40 via-red-800/40 dark:via-red-900/30 to-transparent blur-sm" />
      </div>
      
      {/* Black hole shadow with Schwarzschild radius */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-gray-900 dark:bg-black"
             style={{
               boxShadow: `
                 0 0 20px 5px rgba(0, 0, 0, 0.5),
                 0 0 40px 10px rgba(139, 92, 246, 0.15),
                 inset 0 0 20px rgba(0, 0, 0, 0.8),
                 inset 0 0 10px rgba(0, 0, 0, 0.9)
               `
             }} />
      </div>
      
      {/* Relativistic jets with particles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Top jet */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <div className="w-1.5 h-10 bg-gradient-to-t from-blue-500/60 dark:from-blue-400/50 via-blue-400/40 dark:via-blue-300/30 to-transparent blur-sm animate-pulse"
               style={{animationDuration: '2s'}} />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-blue-400/80 dark:bg-blue-300/60 rounded-full animate-pulse" />
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-blue-500/60 dark:bg-blue-400/40 rounded-full animate-pulse"
               style={{animationDelay: '0.5s'}} />
        </div>
        {/* Bottom jet */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-1.5 h-10 bg-gradient-to-b from-blue-500/60 dark:from-blue-400/50 via-blue-400/40 dark:via-blue-300/30 to-transparent blur-sm animate-pulse"
               style={{animationDuration: '2s', animationDelay: '1s'}} />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-blue-400/80 dark:bg-blue-300/60 rounded-full animate-pulse" />
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-blue-500/60 dark:bg-blue-400/40 rounded-full animate-pulse"
               style={{animationDelay: '1.5s'}} />
        </div>
      </div>
      
      {/* Gravitational lensing effect - Einstein ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-18 h-18 rounded-full border-t border-l border-orange-400/30 dark:border-orange-300/20 -rotate-45 animate-spin"
             style={{animationDuration: '12s', animationDirection: 'reverse'}} />
      </div>
      
      {/* X-ray emissions */}
      <div className="absolute inset-0 flex items-center justify-center animate-pulse"
           style={{animationDuration: '3s'}}>
        <div className="absolute top-3 right-5 w-px h-px bg-purple-500/80 dark:bg-purple-400/60 shadow-sm shadow-purple-500/40 dark:shadow-purple-400/30" />
        <div className="absolute bottom-4 left-4 w-px h-px bg-purple-400/70 dark:bg-purple-300/50 shadow-sm shadow-purple-400/30 dark:shadow-purple-300/20" />
      </div>
    </div>
  )
}

export default BlackHole