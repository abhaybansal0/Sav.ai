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
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 md:text-3xl">
          Why Sav.ai Works
        </h2>
        <div className="grid grid-cols-3 gap-8 md:grid-cols-1">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}