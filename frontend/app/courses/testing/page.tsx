import React from 'react';
import { Check, Play, Lock, Clock, Trophy, Zap, BookOpen, Star } from 'lucide-react';

const UnitsPage = () => {
  const units = [
    {
      id: 1,
      title: "Variables and Data Types",
      xp: 100,
      difficulty: 3,
      lessons: 4,
      completed: true,
      status: "completed",
      planet: "earth",
      color: "from-green-400 to-blue-500"
    },
    {
      id: 2,
      title: "Functions and Scope",
      xp: 200,
      difficulty: 3,
      lessons: 4,
      completed: true,
      status: "completed",
      planet: "mars",
      color: "from-red-400 to-orange-500"
    },
    {
      id: 3,
      title: "Objects and Arrays",
      xp: 150,
      difficulty: 2,
      lessons: 5,
      completed: false,
      status: "current",
      planet: "jupiter",
      color: "from-yellow-400 to-orange-600"
    },
    {
      id: 4,
      title: "Control Flow",
      xp: 175,
      difficulty: 3,
      lessons: 30,
      completed: false,
      status: "current",
      planet: "saturn",
      color: "from-purple-400 to-pink-500"
    },
    {
      id: 5,
      title: "DOM Manipulation",
      xp: 120,
      difficulty: 2,
      lessons: 3,
      completed: false,
      status: "locked",
      planet: "neptune",
      color: "from-blue-400 to-indigo-600"
    }
  ];

  const generateLessons = (unitId, totalLessons, status) => {
    const lessons = [];
    for (let i = 0; i < totalLessons; i++) {
      let lessonStatus = 'locked';
      if (status === 'completed') {
        lessonStatus = 'completed';
      } else if (status === 'current' && i < 2) {
        lessonStatus = i === 0 ? 'completed' : 'current';
      }

      lessons.push({
        id: `${unitId}-${i}`,
        number: i + 1,
        status: lessonStatus
      });
    }
    return lessons;
  };

  const PlanetaryUnit = ({ unit, index }) => {
    const lessons = generateLessons(unit.id, unit.lessons, unit.status);

    const getStatusIcon = () => {
      switch (unit.status) {
        case 'completed':
          return <Check className="w-4 h-4 text-green-600" />;
        case 'current':
          return <Play className="w-4 h-4 text-blue-600" />;
        case 'locked':
          return <Lock className="w-4 h-4 text-gray-400" />;
        default:
          return <BookOpen className="w-4 h-4" />;
      }
    };

    const getStatusColor = () => {
      switch (unit.status) {
        case 'completed':
          return 'border-green-500 bg-green-50 dark:bg-green-900/20';
        case 'current':
          return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
        case 'locked':
          return 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50';
        default:
          return 'border-gray-300 dark:border-gray-600';
      }
    };

    const getLessonIcon = (lessonStatus) => {
      switch (lessonStatus) {
        case 'completed':
          return <Check className="w-3 h-3 text-green-600" />;
        case 'current':
          return <Play className="w-3 h-3 text-blue-600" />;
        case 'locked':
          return <Lock className="w-3 h-3 text-gray-400" />;
        default:
          return null;
      }
    };

    const getLessonColor = (lessonStatus) => {
      switch (lessonStatus) {
        case 'completed':
          return 'bg-green-500 border-green-600';
        case 'current':
          return 'bg-blue-500 border-blue-600';
        case 'locked':
          return 'bg-gray-300 dark:bg-gray-600 border-gray-400';
        default:
          return 'bg-gray-300 border-gray-400';
      }
    };

    return (
      <div className="relative flex items-center justify-center min-h-[400px] mb-16">
        {/* Orbital Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-80 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full opacity-30" />
        </div>

        {/* Central Planet */}
        <div className="relative z-10">
          <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${unit.color} shadow-2xl animate-spin-slow flex items-center justify-center`}>
            {/* Planet surface details */}
            <div className="absolute inset-2 rounded-full bg-black/10" />
            <div className="absolute top-4 left-6 w-4 h-4 rounded-full bg-black/20" />
            <div className="absolute bottom-6 right-4 w-6 h-6 rounded-full bg-white/20" />
            <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-white/30" />
          </div>
        </div>
        {/* Orbiting Satellites */}
        {lessons.map((lesson, lessonIndex) => {
          const angle = (lessonIndex * 360) / lessons.length;
          const radius = 140;

          return (
            <div
              key={lesson.id}
              className="absolute z-20"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${angle}deg)`,
                transformOrigin: '0 0'
              }}
            >
              <div
                className="w-3 h-3 rounded-full bg-white/80 shadow-lg animate-pulse"
                style={{
                  transform: `translateX(${radius}px)`,
                  animation: `inherit-rotation 12s linear infinite`,
                  animationDelay: `${lessonIndex * 0.5}s`
                }}
              >
              </div>
            </div>
          );
        })}

        {/* Unit Info Card */}
        {/* <div className={`absolute -right-4 top-8 w-64 border-2 rounded-xl p-4 ${getStatusColor()} shadow-lg z-30`}>
          <div className="flex items-center gap-2 mb-2">
            {getStatusIcon()}
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              {unit.title}
            </h3>
          </div>

          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-yellow-600" />
              <span>{unit.xp} XP</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span>{unit.lessons} lessons</span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <div className="flex gap-1">
                {[1, 2, 3].map((star) => (
                  <div
                    key={star}
                    className={`w-1.5 h-1.5 rounded-full ${star <= unit.difficulty
                      ? 'bg-yellow-400'
                      : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Progress: {lessons.filter(l => l.status === 'completed').length}/{lessons.length}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${(lessons.filter(l => l.status === 'completed').length / lessons.length) * 100}%`
                }}
              />
            </div>
          </div>
        </div> */}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-32 px-6 bg-gray-900 text-white relative overflow-hidden">
      {/* Cosmic Background */}
      {/* Stars */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#130F40] to-[#0b0c10]
">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Navigation breadcrumb */}
      <div className="relative z-10 bg-black/20 backdrop-blur-sm px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-300">
            <span>Dashboard</span>
            <span className="mx-2">›</span>
            <span>Courses</span>
            <span className="mx-2">›</span>
            <span className="text-white font-medium">JavaScript Fundamentals</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Course header */}
        <div className="mb-12 text-center">
          <div className="bg-gray-50/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              JavaScript Fundamentals
            </h1>
            <p className="text-blue-200 mb-6 text-lg">Explore the cosmic journey of JavaScript programming</p>

            <div className="flex items-center justify-center gap-8 text-sm mb-6">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>1030 / 1200 XP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400">🔥</span>
                <span>5 day streak!</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>85% Complete</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="max-w-md mx-auto">
              <div className="w-full bg-white/20 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Solar System of Units */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Course Universe
            </h2>
            <p className="text-gray-300">Each planet represents a unit, with orbiting lessons to master</p>
          </div>

          <div className="space-y-8">
            {units.map((unit, index) => (
              <PlanetaryUnit key={unit.id} unit={unit} index={index} />
            ))}
          </div>
        </div>


      </div>

    </div>
  );
};

export default UnitsPage;