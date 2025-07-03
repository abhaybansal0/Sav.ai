export type UserProfile = {
    username: string;
    email: string;

    // Gemification
    streak: number;
    xp: number;
    coursesNo: number;
    todayProgress: {
        questionsDone: number;
        lastUpdateDate: Date;
    };
    questionsDone: number;
    everyDayGoal: number;


    preferences: {
        theme: string;
    };

    isVerified: boolean;
    isAdmin: boolean;
    avatar: string;
    level: number;
    badges: [string];
    friends: [string];
    createdAt: Date;
    updatedAt: Date;
    lastStreakDate: Date;
}

