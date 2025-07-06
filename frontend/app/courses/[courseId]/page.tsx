'use client'
import React, { useState } from 'react';
import { CheckCircle, Lock, Play, Star, Zap, Trophy, Target } from 'lucide-react';

const CourseUnitsRoadmap = () => {
  const [expandedUnit, setExpandedUnit] = useState(null);

  const courseData = {
    title: "JavaScript Fundamentals",
    description: "Learn the basics of JavaScript programming",
    progress: 85,
    currentXP: 1020,
    totalXP: 1200,
    streak: 5
  };

  const units = [
    {
      id: 1,
      title: "Variables and Data Types",
      xp: 150,
      status: "completed",
      stars: 3,
      icon: "💾",
      lessons: [
        { id: 1, title: "What are Variables?", completed: true },
        { id: 2, title: "String Data Type", completed: true },
        { id: 3, title: "Numbers and Booleans", completed: true },
        { id: 4, title: "Practice Quiz", completed: true }
      ]
    },
    {
      id: 2,
      title: "Functions and Scope",
      xp: 200,
      status: "completed",
      stars: 3,
      icon: "⚡",
      lessons: [
        { id: 5, title: "Function Basics", completed: true },
        { id: 6, title: "Parameters and Arguments", completed: true },
        { id: 7, title: "Return Values", completed: true },
        { id: 8, title: "Scope Concepts", completed: true }
      ]
    },
    {
      id: 3,
      title: "Objects and Arrays",
      xp: 180,
      status: "completed",
      stars: 2,
      icon: "📦",
      lessons: [
        { id: 9, title: "Object Literals", completed: true },
        { id: 10, title: "Array Methods", completed: true },
        { id: 11, title: "Nested Structures", completed: true }
      ]
    },
    {
      id: 4,
      title: "Control Flow",
      xp: 170,
      status: "completed",
      stars: 3,
      icon: "🔄",
      lessons: [
        { id: 12, title: "If/Else Statements", completed: true },
        { id: 13, title: "Loops", completed: true },
        { id: 14, title: "Switch Cases", completed: true }
      ]
    },
    {
      id: 5,
      title: "DOM Manipulation",
      xp: 120,
      status: "current",
      stars: 1,
      icon: "🌐",
      lessons: [
        { id: 15, title: "Selecting Elements", completed: true },
        { id: 16, title: "Modifying Content", completed: false },
        { id: 17, title: "Event Listeners", completed: false }
      ]
    },
    {
      id: 6,
      title: "Event Handling",
      xp: 200,
      status: "locked",
      stars: 0,
      icon: "🎯",
      lessons: [
        { id: 18, title: "Click Events", completed: false },
        { id: 19, title: "Form Handling", completed: false },
        { id: 20, title: "Event Propagation", completed: false }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-blue-500';
      case 'locked': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-6 h-6 text-white" />;
      case 'current': return <Play className="w-6 h-6 text-white" />;
      case 'locked': return <Lock className="w-6 h-6 text-white" />;
      default: return <Lock className="w-6 h-6 text-white" />;
    }
  };

  const renderStars = (count) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
      />
    ));
  };

  const renderDottedLine = (index, isLast) => {
    if (isLast) return null;
    
    return (
      <div className="flex justify-center my-4">
        <div className="w-0.5 h-12 border-l-2 border-dashed border-gray-600 opacity-50"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <nav className="flex items-center text-sm text-gray-400 mb-6">
          <span>Dashboard</span>
          <span className="mx-2">›</span>
          <span>Courses</span>
          <span className="mx-2">›</span>
          <span className="text-white">JavaScript Fundamentals</span>
        </nav>

        {/* Course Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">{courseData.title}</h1>
            <p className="text-blue-100 mb-6">{courseData.description}</p>
            
            {/* Progress Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">{courseData.currentXP} / {courseData.totalXP} XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-400" />
                  <span className="font-semibold">{courseData.streak} day streak!</span>
                </div>
              </div>
              <span className="text-2xl font-bold">{courseData.progress}%</span>
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${courseData.progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-400/20 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Units Roadmap */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold">Course Units</h2>
        </div>

        <div className="relative">
          {/* Roadmap Path */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-gray-600 opacity-30 rounded-full"></div>
          
          {units.map((unit, index) => (
            <div key={unit.id} className="relative">
              {/* Unit Card */}
              <div className={`relative mb-6 ${index % 2 === 0 ? 'ml-0 mr-auto' : 'ml-auto mr-0'} w-full max-w-lg`}>
                <div
                  className={`
                    relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 
                    border border-gray-700 shadow-xl cursor-pointer transition-all duration-300 
                    hover:scale-105 hover:shadow-2xl
                    ${unit.status === 'current' ? 'ring-2 ring-blue-500 shadow-blue-500/20' : ''}
                    ${unit.status === 'completed' ? 'ring-2 ring-green-500 shadow-green-500/20' : ''}
                  `}
                  onClick={() => setExpandedUnit(expandedUnit === unit.id ? null : unit.id)}
                >
                  {/* Status Badge */}
                  <div className={`absolute -left-4 top-6 w-12 h-12 rounded-full ${getStatusColor(unit.status)} flex items-center justify-center shadow-lg z-10`}>
                    {getStatusIcon(unit.status)}
                  </div>
                  
                  {/* Unit Icon */}
                  <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                    {unit.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="pl-8">
                    <h3 className="text-xl font-bold mb-2">{unit.title}</h3>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-yellow-400">{unit.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(unit.stars)}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-400">
                      {unit.lessons.length} lessons • {unit.lessons.filter(l => l.completed).length} completed
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-4">
                      {unit.status === 'completed' && (
                        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                          Review
                        </button>
                      )}
                      {unit.status === 'current' && (
                        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                          Continue
                        </button>
                      )}
                      {unit.status === 'locked' && (
                        <button className="bg-gray-600 cursor-not-allowed px-4 py-2 rounded-lg text-sm font-semibold">
                          Locked
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Expanded Lessons */}
                  {expandedUnit === unit.id && (
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <h4 className="font-semibold mb-3 text-gray-300">Lessons:</h4>
                      <div className="space-y-2">
                        {unit.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/50">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              lesson.completed ? 'bg-green-500' : 'bg-gray-600'
                            }`}>
                              {lesson.completed && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                            <span className={`text-sm ${lesson.completed ? 'text-white' : 'text-gray-400'}`}>
                              {lesson.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Dotted Connection Line */}
              {renderDottedLine(index, index === units.length - 1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseUnitsRoadmap;