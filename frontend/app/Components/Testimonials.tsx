'use client'

import { useState, useEffect, useCallback } from 'react';

const testimonials = [
  {
    text: "Savai turned formula memorization from a chore into a game. I've maintained a 45-day streak without even trying!",
    author: "Emily R.",
    role: "High School Physics Student"
  },
  {
    text: "The progress map gives me such satisfaction. I never thought I'd look forward to learning thermodynamics!",
    author: "Raj P.",
    role: "Engineering Student"
  },
  {
    text: "Finally an app that understands how to make physics addictive. The daily challenges are perfectly sized.",
    author: "Dr. Sarah M.",
    role: "Physics Teacher"
  },
  {
    text: "I went from struggling with basic kinematics to acing my exams. The streak system kept me motivated!",
    author: "Liam T.",
    role: "College Freshman"
  },
  {
    text: "The perfect blend of education and gamification. I find myself sneaking in lessons during coffee breaks.",
    author: "Sophia K.",
    role: "Lifelong Learner"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, [autoPlay, nextSlide]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          What Learners Say
        </h2>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="min-w-full flex-shrink-0 px-4" // Added horizontal padding
              >
                <div className="max-w-4xl mx-auto bg-blue-50 rounded-2xl p-8 md:p-12">
                  <p className="text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {testimonial.author[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {testimonial.author}
                      </p>
                      <p className="text-gray-600 truncate">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={prevSlide}
            className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <div 
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-blue-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}