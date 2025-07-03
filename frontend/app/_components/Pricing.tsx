// components/PricingSection.tsx
export default function PricingSection() {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Start Learning</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="border-2 border-blue-100 rounded-xl p-8">
              <h3 className="text-3xl font-bold mb-4">Free Tier</h3>
              <p className="text-2xl mb-6">$0<span className="text-gray-500 text-lg">/forever</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">✓ Basic formula library</li>
                <li className="flex items-center">✓ Daily streak tracking</li>
                <li className="flex items-center">✓ Community support</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </div>
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-3xl font-bold mb-4">Savai Pro</h3>
              <p className="text-2xl mb-6">$9<span className="text-gray-500 text-lg">/month</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">✓ Advanced problem sets</li>
                <li className="flex items-center">✓ Detailed progress analytics</li>
                <li className="flex items-center">✓ Priority support</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition">
                Go Pro
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }