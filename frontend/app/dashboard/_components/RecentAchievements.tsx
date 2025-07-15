import { Award, Code, Star, Users } from 'lucide-react';
import React from 'react'

interface Achievement {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  isNew?: boolean;
}

const RecentAchievements: React.FC = () => {
  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'First Steps',
      icon: <Star className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    {
      id: '2',
      name: 'Consistent Learner',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-orange-500'
    },
    {
      id: '3',
      name: 'Code Master',
      icon: <Code className="w-6 h-6" />,
      color: 'bg-blue-500',
      isNew: true
    }
  ];

  return (
    <div className=" bg-white/40  dark:bg-gray-900/50 backdrop-blur-sm   rounded-2xl w-full p-6 shadow-sm mt-4 ">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Achievements
      </h2>

      {achievements.length > 0 ? (
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex flex-col items-center space-y-2 relative">
              {achievement.isNew && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  New
                </div>
              )}
              <div className={`${achievement.color} rounded-full p-4 text-white relative`}>
                {achievement.icon}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white text-center max-w-[80px]">
                {achievement.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-400 dark:text-gray-500 mb-2">
            <Award className="w-12 h-12 mx-auto opacity-30" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No achievements yet
          </p>
          <p className="text-blue-500 text-sm font-medium mt-1 cursor-pointer hover:text-blue-600">
            Start learning to unlock badges!
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentAchievements
