import Lesson from '../models/lesson.js'
import Unit from '../models/unit.js'
import Subject from '../models/subject.js';
import mongoose from 'mongoose';


const getLessons = async (req, res) => {
    try {

        const { unitId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(unitId)) {
            return res.status(400).json({ message: "Invalid unitId", success: false });
        }

        const lessons = await Lesson.find({
            unit: unitId
        }).sort('class').lean();


        res.status(200).json({
            message: 'Lessons retrieved successfully',
            success: true,
            lessons
        })

    } catch (error) {
        console.log('Error in fetching the Lesson:', error);

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

        const ownerSubjectId = lesson.sub;
        const ownerUnitId = lesson.unit;

        lesson.creator = creator;
        const newLesson = new Lesson(lesson);
        const savedLesson = await newLesson.save();

        // Unit addition
        const ownerUnit = await Unit.findOne({
            _id: ownerUnitId
        });

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
        const ownerSubject = await Subject.findOne({
            _id: ownerSubjectId
        })

        if (!ownerSubject) {
            return res.status(400).json({
                message: "The parent Unit does not exist",
                success: false
            })
        }

        ownerSubject.totalLessons += 1;
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


export {
    getLessons,
    addLesson
}