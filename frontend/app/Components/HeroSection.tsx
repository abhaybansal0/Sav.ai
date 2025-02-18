// components/HeroSection.tsx
export default function HeroSection() {
    return (
      <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Master Physics Through
                <span className="text-blue-600 block mt-2">Playful Learning</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Build your physics superpower with daily streaks, interactive challenges, 
                and addictive progress tracking. Powered by Sav.ai
              </p>
              <div className="flex gap-4">

                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg hover:bg-blue-50 transition">
                  How It Works
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-blue-100 rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                  {/* Mockup of streak counter and progress map */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-blue-600 mb-4">
                      <span className="font-bold text-2xl">🔥 7-Day Streak</span>
                    </div>
                    <div className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }