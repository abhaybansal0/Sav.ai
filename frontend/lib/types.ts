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

export interface CoursesType {
    _id: string,
    name: string,
    description: string,
    icon: string,
    unitCount: number,
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
    prerequisites: [string],
    units: [UnitsType],
    createdAt: Date,
    __v: number,
    progress: number,
    isStarted: boolean

    rating?: number
    students?: number
    duration?: string,
    gradientColors?: string

    totalLessons: number
    totalCompletedLessons: number
}

export interface UnitsType {
    _id: string;
    subject: string;
    name: string;
    desciption: string;
    lessonCount: number,
    lessons: [LessonType],
    unlockRequirements: [],
    position: number,
    createdAt: Date,
    updatedAt: Date,
    __v: number,
    userCompletedLessonsCount: number,
    userCompletedLessons: [],
    theme: 'Yellow' | 'Brown' | 'Blue' | 'Green' | 'Orange' | 'Red' | 'Cyan' | 'Teal' | 'Pink' | 'Purple' | 'Gray'
}

export interface LessonType {
    _id: string,
    class: number,
    chapter: string,
    concept: string,
    mentor: string,
    unit: string,
    formulae: [],
    explanation:  string,
    creator: string,
    questions: [],
    revisionCards: [],
    prereqs: [],
    createdAt: Date,
    updatedAt: Date,
    __v: number,
    completed: boolean,
    theme: 'Amber' | 'Blue' | 'Green' | 'Red' | 'Purple' | 'Orange' | 'Yellow' | 'Rose'
}
