import Lesson from '../models/lesson.js'
import Unit from '../models/unit.js'
import User from '../models/user.js';
import Progress from '../models/progress.js';
import Subject from '../models/subject.js';


const getSubjectProgress = async (req, res) => {
    try {

        const userId = req.user._id;



    } catch (error) {
        console.log('Error in fetching user progress: ', error);

        res.status(500).send({
            message: 'Server Error, Please try again later',
            success: false
        })
    }
}

const submitLessonProgress = async (req, res) => {
    try {

        const submitForm = req.body;
        const { unitId, subjectId, lessonId } = submitForm;
        const user = req.user;
        let earnedXP = 0;

        if (!submitForm || !subjectId || !unitId || !lessonId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields!"
            })
        }


        let progressDoc = await Progress.findOne({
            user: user._id,
            subject: subjectId
        });

        if (!progressDoc) {
            progressDoc = await Progress.create({
                user: user._id,
                subject: subjectId,
                units: []
            });
        }

        const unitStr = unitId.toString();
        let uProg = progressDoc.units.find(u => u.unit.toString() === unitStr);

        if (uProg) {

            const lessonStr = lessonId.toString();

            if (!uProg.lessonsCompleted.map(id => id.toString()).includes(lessonStr)) {
                uProg.lessonsCompleted.push(lessonId);

                earnedXP = submitForm.correctCount * 15;
                user.xp += earnedXP;
                if (user.shipFuel != 4) user.shipFuel += 1;
            }

        } else {
            progressDoc.units.push({
                unit: unitId,
                lessonsCompleted: [lessonId],
                percentCompleted: 0,
                averageScore: 0,
                lastAccessed: new Date()
            });

            earnedXP = submitForm.correctCount * 15;
            user.xp += earnedXP;
            if (user.shipFuel != 4) user.shipFuel += 1;

            // grab the new subdoc reference for later
            uProg = progressDoc.units[progressDoc.units.length - 1];
        }

        uProg.lastAccessed = new Date();

        await progressDoc.save();



        // Streak Update
        const today = new Date();
        const todayKey = today.toISOString().slice(0, 10);
        const userLastStreakDate = user.lastStreakDate?.toISOString().slice(0, 10) || null;

        if (userLastStreakDate !== todayKey) {
            user.streak = (user.streak || 0) + 1;
            user.lastStreakDate = todayKey;
        }

        // Progress Update
        const lastProgressUpdateDate = user.todayProgress.lastUpdateDate;
        const todaysProgress = user.todayProgress.questionsDone;

        if (lastProgressUpdateDate === todayKey) {
            user.todayProgress.questionsDone += submitForm.correctCount;
            user.todayProgress.lastUpdateDate = todayKey;
        } else {
            user.todayProgress.questionsDone = submitForm.correctCount;
            user.todayProgress.lastUpdateDate = todayKey;
        }



        await user.save();

        const streakObj = {
            streak: user.streak,
            lastStreakDate: user.lastStreakDate
        }
        res.cookie("user-streak", JSON.stringify(streakObj), {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
        })


        res.status(201).json({
            success: true,
            message: "User progress saved successfully",
            xpGained: earnedXP,
            newStreak: user.streak
        })


    } catch (error) {
        console.log('Error in submitting user progress: ', error);

        res.status(500).send({
            message: 'Server Error, Please try again later',
            success: false
        })
    }
}

const submitpreferences = async (req, res) => {
    try {

        const { dailyGoal, standard, startSubject } = req.body
        const { user } = req;

        if (!dailyGoal || !standard || !startSubject) {
            return res.status(401).json({
                message: 'Insufficient fields!',
                success: false
            })
        }

        user.everyDayGoal = dailyGoal;
        user.standard = standard;
        await user.save();

        const sub = await Subject.findOne({ name: startSubject }).lean();
        let desiredLessonId = sub?.startingLesson;

        if (!desiredLessonId) {
            const defaultSub = await Subject.findOne({ name: 'Physics' }).lean();
            desiredLessonId = defaultSub.startingLesson;
        }

        console.log(desiredLessonId)
        res.status(200).json({
            message: 'User preferences set successfully!',
            success: true,
            lessonId: desiredLessonId
        })

    } catch (error) {
        console.log('Error in submitting user preferences: ', error);

        res.status(500).send({
            message: 'Server Error, Please try again later',
            success: false
        })
    }
}

export {
    getSubjectProgress,
    submitLessonProgress,
    submitpreferences
}