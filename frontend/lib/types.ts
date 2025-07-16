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
    shipFuel: 0 | 1 | 2 | 3 | 4; 
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

    NoOfUnitsDone: number
    totalLessons: number
    totalCompletedLessons: number
}

export interface UnitsType {
    _id: string;
    subject: {
        _id: string,
        name: string
    };
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
    standard: number,
    chapter: string,
    concept: string,
    theme: 'Amber' | 'Blue' | 'Green' | 'Red' | 'Purple' | 'Orange' | 'Yellow' | 'Rose',
    creator: string,
    mentor: string,
    unit: string,


    // --- Core Content ---
    explanation:  string,
    formulae: {
        latex: string,
        symbols: string[],
    }[],

    // --- Questions ---
    questions: {
        questionText: string,
        answerOptions: {
            optionId: string,
            optionText: string,
        }[],
        correctAnswers: string[],

        explanation: string,
        xpPoint: number
    }[],

    // --- Gamification ---
    revisionCards: string[],
    prereqs: string[],
    createdAt: Date,
    updatedAt: Date,
    __v: number,

    // --- User Info ---
    completed: boolean,
}
