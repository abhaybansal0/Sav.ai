import { Award, CheckCircle, Flame } from 'lucide-react';
import React from 'react'

interface ActivityItem {
  id: string;
  type: 'completed' | 'earned' | 'streak';
  title: string;
  timeAgo: string;
  icon: React.ReactNode;
}

const RecentActivity: React.FC = () => {
    const activities: ActivityItem[] = [
        {
            id: '1',
            type: 'completed',
            title: 'Variables and Data Types',
            timeAgo: '2 hours ago',
            icon: <CheckCircle className="w-5 h-5 text-green-500" />
        },
        {
            id: '2',
            type: 'earned',
            title: 'JavaScript Rookie badge',
            timeAgo: '1 day ago',
            icon: <Award className="w-5 h-5 text-yellow-500" />
        },
        {
            id: '3',
            type: 'streak',
            title: '7-day learning streak!',
            timeAgo: 'Today',
            icon: <Flame className="w-5 h-5 text-orange-500" />
        }
    ];

    const getActivityPrefix = (type: string) => {
        switch (type) {
            case 'completed':
                return 'Completed:';
            case 'earned':
                return 'Earned:';
            default:
                return '';
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-sectionDark  rounded-xl p-6 shadow-sm w-full">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
            </h2>

            {activities.length > 0 ? (
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-0.5">
                                {activity.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm text-gray-900 dark:text-white">
                                    {activity.type !== 'streak' && (
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {getActivityPrefix(activity.type)}{' '}
                                        </span>
                                    )}
                                    <span className="font-medium">{activity.title}</span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {activity.timeAgo}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="text-gray-400 dark:text-gray-500 mb-2">
                        <CheckCircle className="w-12 h-12 mx-auto opacity-30" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Ready to start learning?
                    </p>
                    <p className="text-blue-500 text-sm font-medium mt-1 cursor-pointer hover:text-blue-600">
                        Practice?
                    </p>
                </div>
            )}
        </div>
    );
};

export default RecentActivity
