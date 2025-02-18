// components/FeaturesSection.tsx
export default function FeaturesSection() {
    const features = [
      {
        icon: '🚀',
        title: 'Addictive Streaks',
        description: 'Daily challenges that keep you coming back to maintain your learning momentum'
      },
      {
        icon: '🗺️',
        title: 'Progress Mapping',
        description: 'Visualize your journey through physics concepts with our achievement map'
      },
      {
        icon: '🧠',
        title: 'Smart Retention',
        description: 'AI-powered spaced repetition ensures formulas stick in your long-term memory'
      }
    ];
  
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Why Savai Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }