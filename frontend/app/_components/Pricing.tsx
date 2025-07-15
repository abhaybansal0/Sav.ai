export default function PricingSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 md:text-3xl">Start Learning</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8 md:grid-cols-1">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-300 transition-colors duration-200">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Free Tier</h3>
            <p className="text-2xl mb-6 text-gray-900">$0<span className="text-gray-500 text-lg">/forever</span></p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                Basic formula library
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                Daily streak tracking
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                Community support
              </li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-4 rounded-full hover:bg-blue-700 transition-colors duration-200 font-semibold">
              Get Started
            </button>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Sav.ai Pro</h3>
            <p className="text-2xl mb-6 text-gray-900">$9<span className="text-gray-500 text-lg">/month</span></p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                Advanced problem sets
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                Detailed progress analytics
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                Priority support
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                Unlimited practice problems
              </li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-4 rounded-full hover:bg-blue-700 transition-colors duration-200 font-semibold">
              Go Pro
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}