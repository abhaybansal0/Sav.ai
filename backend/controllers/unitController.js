import Unit from '../models/unit.js'
import Subject from '../models/subject.js'
import Progress from '../models/progress.js'
import mongoose from 'mongoose';

const getUnits = async (req, res) => {
    try {

        const { subjectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(subjectId)) {
            return res.status(400).json({ message: "Invalid subjectId", success: false });
        }


        const populatedSub = await Subject.findById(subjectId)
            .populate({
                path: 'units',
                model: 'Unit',
                options: { sort: { position: 1 } }
            })
            .lean();


        // lets add a logic of adding user progress along with the units
        const userId = req.user._id;

        const progressDoc = await Progress.findOne({
            user: userId,
            subject: subjectId
        }).lean();

        const userProgressArray = progressDoc?.units || [];

        const progressMap = new Map(
            userProgressArray.map(pu => [pu.unit.toString(), pu.lessonsCompleted])
        )

        let totalLessons = 0;
        let totalCompletedLessons = 0;
        for (const unit of populatedSub.units) {
            const unitId = unit._id.toString();
            const completedLessons = progressMap.get(unitId) || [];

            totalLessons += unit.lessonCount;
            totalCompletedLessons += completedLessons.length;
            unit.userCompletedLessonsCount = completedLessons.length;
            unit.userCompletedLessons = completedLessons;
        }

        populatedSub.totalCompletedLessons = totalCompletedLessons;
        populatedSub.totalLessons = totalLessons;


        res.status(200).json({
            message: 'Units retrieved successfully',
            success: true,
            populatedSub
        })


    } catch (error) {
        console.log('Error while fetching units: ', error);
        res.status(500).json({
            message: 'Server issue, Please try again later',
            success: false
        })
    }
}

const addUnit = async (req, res) => {
    try {

        const unit = req.body;

        if (!unit?.name || !unit?.subject || !unit?.position) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields!"
            })
        }

        const subjectId = unit.subject;
        const ownerSubject = await Subject.findOne({
            _id: subjectId
        });

        if (!ownerSubject) {
            return res.status(400).json({
                message: "The parent subject does not exist",
                success: false
            })
        }


        const newUnit = new Unit(unit);
        await newUnit.save();

        ownerSubject.unitCount += 1;
        ownerSubject.units.push(newUnit._id.toString());

        const savedSubejct = await ownerSubject.save();


        res.status(201).json({
            message: "Successfully cretead a new Unit",
            success: true,
            newUnit
        })


    } catch (error) {
        console.log('Error in making the Unit:', error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'A Unit with this name already exists'
            });
        }

        res.status(500).send({
            message: 'Server Error, Please try again later',
            success: false
        })
    }
}

const getIds = async (req, res) => {
    try {

        const { unitId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(unitId)) {
            return res.status(400).json({ message: "Invalid unitId", success: false });
        }

        const unit = await Unit.findById(unitId).lean();

        const { subject, _id } = unit;

        res.status(200).json({
            message: 'Required Ids fetched successfully!',
            success: true,
            Ids: {
                unitId: _id,
                subId: subject
            }
        })


    } catch (error) {
        console.log('Error in making the Unit:', error);

        res.status(500).send({
            message: 'Server Error, Please try again later',
            success: false
        })
    }
}

export {
    getUnits,
    addUnit,
    getIds
}