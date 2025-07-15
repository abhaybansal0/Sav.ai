export default function HowItWorks() {
  const steps = [
    { number: '1', title: 'Daily Formula', description: 'Start with one key physics concept each day' },
    { number: '2', title: 'Practice Drills', description: 'Solve 5 interactive problems to master it' },
    { number: '3', title: 'Progress Unlocks', description: 'Unlock new topics as you maintain your streak' }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 md:text-3xl">How It Works</h2>
        <div className="grid grid-cols-3 gap-8 md:grid-cols-1">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}