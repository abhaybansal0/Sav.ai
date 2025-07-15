import Lesson from '../models/lesson.js'
import Unit from '../models/unit.js'
import Subject from '../models/subject.js';
import mongoose from 'mongoose';
import Progress from '../models/progress.js';


const getLessons = async (req, res) => {
    try {

        const { unitId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(unitId)) {
            return res.status(400).json({ message: "Invalid unitId", success: false });
        }

        const populatedUnit = await Unit.findById(unitId)
            .populate({
                path: 'lessons',
                model: 'Lesson',
                options: { sort: { __v: 1 } }
            })
            .populate({
                path: 'subject',
                model: 'Subject',
                select: '_id name'
            })
            .lean();

        if (!populatedUnit) {
            return res.status(422).json({
                message: 'Invalid unit Id',
                success: false
            })
        }


        // Logic for the user progress adition

        const userId = req.user._id;

        const progressDoc = await Progress.findOne({
            user: userId,
            units: {
                $elemMatch: { unit: unitId }
            }
        })
            .lean();

        const progressObj = progressDoc?.units.find(u => u.unit.toString() === unitId) || {};

        const progressArray = progressObj?.lessonsCompleted || [];

        const progressSet = new Set(
            progressArray.map(lessonId => lessonId.toString())
        )

        let userCompletedLessonsCount = 0;
        for (const lesson of populatedUnit.lessons) {
            const completed = progressSet.has(lesson._id.toString()) ? true : false;
            lesson.completed = completed || false;
            if (completed) userCompletedLessonsCount++;
        }

        populatedUnit.userCompletedLessonsCount = userCompletedLessonsCount;

        res.status(200).json({
            message: 'Lessons retrieved successfully',
            success: true,
            unit: populatedUnit
        })

    } catch (error) {
        console.log('Error in fetching the Lessons:', error);

        res.status(500).send({
            message: 'Server Error, Please try again later',
            success: false
        })
    }
}


const addLesson = async (req, res) => {
    try {

        const lesson = req.body;
        const creator = req.user.username;

        if (!lesson?.unit || !lesson?.subject) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields!"
            })
        }

        const ownerSubjectId = lesson.subject;
        const ownerUnitId = lesson.unit;

        lesson.creator = creator;
        const newLesson = new Lesson(lesson);
        const savedLesson = await newLesson.save();

        // Unit addition
        const ownerUnit = await Unit.findById(ownerUnitId);

        if (!ownerUnit) {
            return res.status(400).json({
                message: "The parent Unit does not exist",
                success: false
            })
        }

        ownerUnit.lessons.push(savedLesson._id.toString());
        ownerUnit.lessonCount += 1;

        await ownerUnit.save();

        // Subject Addition
        const ownerSubject = await Subject.findById(ownerSubjectId)

        if (!ownerSubject) {
            return res.status(400).json({
                message: "The parent Subject does not exist",
                success: false
            })
        }

        ownerSubject.totalLessons += 1;
        if(typeof ownerSubject.startingLesson !== mongoose.Schema.Types.ObjectId) ownerSubject.startingLesson = savedLesson._id;
        await ownerSubject.save();

        res.status(201).json({
            success: true,
            message: "Successfully cretead a new Lesson!",
            savedLesson
        })


    } catch (error) {
        console.log('Error in making the Lesson:', error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'A Lesson with this name already exists'
            });
        }

        res.status(500).send({
            message: 'Server Error, Please try again later',
            success: false
        })
    }
}


const getLesson = async (req, res) => {
    try {

        const { lessonId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(lessonId)) {
            return res.status(400).json({ message: "Invalid lessonId", success: false });
        }

        const lesson = await Lesson.findById(lessonId).lean();

        if (!lesson) {
            return res.status(422).json({
                message: 'Invalid lesson Id',
                success: false
            })
        }

        res.status(200).json({
            message: 'Lesson data fetch was successfull!',
            success: true,
            lesson
        })

    } catch (error) {
        console.log('Error in fetching the Lesson:', error);

        res.status(500).send({
            message: 'Server Error, Please try again later',
            success: false
        })
    }
}

export {
    getLessons,
    addLesson,
    getLesson
}